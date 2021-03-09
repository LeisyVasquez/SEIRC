const Baskets = require('../models/Baskets');
const User = require('../models/User');
const Order = require('../models/Order');
const History = require('../models/History')
const service = require('./services')
require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const path = require('path');
const { resolveSoa } = require('dns');

function encript(obj) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', process.env.SECRETCRYPTO).update(obj).digest('hex');
    return hmac
}

function generatorDate(){
    var d = new Date();
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    return day+"/"+month+"/"+year;
}

function generatorHour(){
    var d = new Date();
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes();
    return hours+":"+minutes;
}


function findNamesBaskets(allBaskets,consolidatedUser){
    let listBasketsResult = [];
    for(let i = 0; i<consolidatedUser.length;i++){
        listBasketsResult.push(consolidatedUser[i] + "-" + allBaskets[consolidatedUser[i]]);
    }
    return listBasketsResult;
}



module.exports = {
    getMain: (req, res) => {
        res.send('<h1>Bienvenido a la API</h1>');
    },
    registerBaskets: (req, res) => {

        try {
            const { name, type, description, baseQuantily } = req.body;
            Baskets.findOne({ name: name }, async function (err, baskets) {
                if (err) {
                    res.status(500).json({ state: 0, message: err });
                } else {
                    if (!baskets) {
                        let code = parseInt(fs.readFileSync(path.join(__dirname, '../config/createCode.txt')), 10) + 1;
                        fs.writeFileSync(path.join(__dirname, '../config/createCode.txt'), code + "");
                        let temporalBaseQuantily = baseQuantily;
                        let newBaskets;
                        if (type === "Empresa") newBaskets = new Baskets({ name, code, type, description, baseQuantily, temporalBaseQuantily });
                        else newBaskets = new Baskets({ name, code, type, description });

                        await newBaskets.save((err, resulset) => {
                            if (err) {
                                res.status(225).json({ message: err.message })
                                console.log(err.message)
                            } else {
                                res.status(201).json({ message: newBaskets });
                            }
                        });
                    } else {
                        res.status(200).json({ message: "Baskets exist" });
                    }
                }
            })
        } catch (e) {
            res.status(500).json({ state: 0, message: e })
        }
    },

    //Nombre de clientes
    getClient: async (req, res) => {
        const clients = await User.find({ $or: [{ typeUser: 'cliente' }, { typeUser: 'cliente-Proveedor' }] });
        let namesClients = [];
        for (let i = 0; i < clients.length; i++) {
            namesClients.push(clients[i].name);
        }
        res.json(namesClients);
    },

    //Nombre  de las canastillas de la empresa  
    getBasketsCompany: async (req, res) => {
        const basketsCompany = await Baskets.find({ type: 'Empresa' });
        let namesBasketsCompany = [];
        for (let i = 0; i < basketsCompany.length; i++) {
            namesBasketsCompany.push(basketsCompany[i].code + "-" + basketsCompany[i].name);
        }
        res.json(namesBasketsCompany);
    },

    //Nombre  de las canastillas de los proveedores
    getBasketsProvider: async (req, res) => {
        const basketsProvider = await Baskets.find({ type: 'Proveedor' });
        let namesBasketsProvider = [];
        for (let i = 0; i < basketsProvider.length; i++) {
            namesBasketsProvider.push(basketsProvider[i].code + "-" + basketsProvider[i].name);
        }
        res.json(namesBasketsProvider);
    },
    getBasketsReturn: async (req,res)=>{
        try{
            const baskets = await Baskets.find();
            let namesBaskets = {};
            let consolidated = [];
            for (let i = 0; i < baskets.length; i++) {  
                namesBaskets[baskets[i].code] = baskets[i].name;
            } 

            Order.findOne({ name: req.params.name }, async function (err, order) {
                if (!order) {
                    return res.status(255).json({});
                } if (order) {
                    consolidated = Object.keys(order.consolidated);
                    const result = findNamesBaskets(namesBaskets,consolidated);
                    return res.status(200).json({res:result});

                } if (err) {
                    return res.status(254).send('Error inesperado');
                }           
            })
        }catch(e){
            return res.status(254).send('Error inesperado');
        }
        
    },
    
    signIn: (req, res) => {
        const userNameCrypto = encript(req.body.userName);
        const passwordCrypto = encript(req.body.password);
        User.find({ userName: userNameCrypto }, function (err, user) {
            if (err) return res.status(500).json({ message: err })
            if (user.length === 0) return res.status(234).json({ message: 'No existe el usuario' })
            if (user[0].password !== passwordCrypto) return res.status(211).json({ message: 'Contraseña incorrecta' })
            return res.status(200).json({
                message: 'Te has logueado correctamente',
                token: service.createToken(user),
                role: user[0].typeUser
            })
        })
    },
    /*
    Validador de rutas respecto el rol
    Nos permite comprobar si el rol del usuario enviado por el token y 
    el enviado desde el cliente son iguales o no, si son iguales procedemos a enviar al cliente que el 
    acceso fue correcto de lo contrario enviamos el acceso denegado*/
    isRolePage: (req, res) => {
        User.find({ _id: req.user.id }, (err, user) => {
            if (err) return res.status(500).send({ message: err })
            if (!user) return res.status(404).send({ message: 'No existe el id' })
            for (let i = 0; i < req.body.typeUser.length; i++) {
                if (req.body.typeUser[i] === user[0].typeUser) return res.status(200).send({ message: "Acceso permitido" });
            }
            return res.status(201).send({ message: 'Acceso denegado' });
        })
    },
    registerUser: (req, res) => {
        try {
            User.findOne({ name: req.body.name }, async function (err, user) {
                if (err) {
                    res.status(500).json({ message: "Error al buscar usuarios existentes " + err });
                } else {
                    if (!user) {
                        User.findOne({ userName: req.body.userName }, async function (err, user) {
                            if (!user) {
                                req.body.userName = encript(req.body.userName);
                                req.body.phone = encript(req.body.phone);
                                req.body.direction = encript(req.body.direction);
                                req.body.password = encript(req.body.password);

                                const newUser = new User(req.body);
                                await newUser.save((err, resulset) => {
                                    if (err) {
                                        res.status(500).json({ message: "Error al guardar usuario: " + err.message })
                                    } else {
                                        res.status(201).json({ message: newUser });
                                    }
                                });
                            } else {
                                res.status(200).json({ message: "ThirdParty user already exist" });
                            }
                        })
                    } else {
                        res.status(200).json({ message: "ThirdParty name already exist" });
                    }
                }
            })
        } catch (e) {
            res.status(500).json({ message: e })
        }
    },

    loanClient: (req, res) => {
        try {
            const name = req.body.name;
            const consolidated = req.body.basketsLoan;
            const typeUser = "cliente"
            const movemenType = "prestamo"

            const date = generatorDate();
            const hour = generatorHour();

            Order.findOne({ name: name }, async function (err, order) {
                if (!order) {
                    const newOrder = new Order({name, typeUser, consolidated});
                    await newOrder.save();
                } if (order) {
                    for (const property in consolidated) {
                        const increment = parseInt(consolidated[property],10);
                        if(order.consolidated.hasOwnProperty(property)) order.consolidated[property]+= increment;
                        else order.consolidated[property] = increment;
                    }
                    await Order.findByIdAndUpdate(order._id,{$set:order});
                } if (err) {
                    return res.status(254).send('Error inesperado')
                }
                const newHistory = new History({name:name,typeUser:typeUser,movemenType:movemenType,date:date,hour:hour,baskets:consolidated});     
                await newHistory.save();
                return res.status(201).send('ok');              
            })
        }
        catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },
    returnClient: (req,res)=>{
        try {
            const name = req.body.name;
            const consolidated = req.body.basketsLoan;
            const typeUser = "cliente"
            const movemenType = "devolucion"

            const date = generatorDate();
            const hour = generatorHour();

            Order.findOne({ name: name }, async function (err, order) {
                if (!order) {
                    res.status(254).json('No existe la order');  // 254 es provicional (500)
                } if (order) {
                    for (const property in consolidated) {
                        const decrement = parseInt(consolidated[property],10);

                        if(order.consolidated.hasOwnProperty(property)){
                            const valueAux = order.consolidated[property] - decrement;
                            if(valueAux<0) res.status(255).json('No se puede generar esta acción, revisa de nuevo los datos');
                            else if(valueAux===0) delete order.consolidated[property];
                            else order.consolidated[property] = valueAux;
                        }else{
                            res.status(256).json('No se tiene la propiedad indicada');
                        }
                    }
                    await Order.findByIdAndUpdate(order._id,{$set:order});
                } if (err) {
                    return res.status(254).send('Error inesperado')
                }
                const newHistory = new History({name:name,typeUser:typeUser,movemenType:movemenType,date:date,hour:hour,baskets:consolidated});     
                await newHistory.save();
                return res.status(201).send('ok');              
            })
        }
        catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }


    }


}