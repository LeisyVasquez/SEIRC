const Baskets = require('../models/Baskets');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const service = require('./services')

module.exports = {
    getMain: (req, res) => {
        res.send('<h1>Bienvenido a la API</h1>');
    },
    registerBaskets: (req, res) => {
        try {
            Baskets.findOne({ name: req.body.name }, async function (err, baskets) {
                if (err) {
                    res.status(500).json({ state: 0, message: err });
                } else {
                    if (!baskets) {
                        const newBaskets = new Baskets(req.body);
                        await newBaskets.save((err, resulset) => {
                            if (err) {
                                res.status(400).json({ message: err.message })
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
        const clients = await User.find({ $or: [{ typeUser: 'Cliente' }, { typeUser: 'Cliente-Proveedor' }] });
        let namesClients = [];
        for(let i = 0; i<clients.length; i++ ){
            namesClients.push(clients[i].name);
        }
        res.json(namesClients);
    },

    //Nombre  de las canastillas de la empresa
    getBasketsCompany: async (req, res) => {
        const basketsCompany = await Baskets.find({type:'Empresa'});
        let namesBasketsCompany = [];
        for(let i = 0; i<basketsCompany.length; i++ ){
            namesBasketsCompany.push(basketsCompany[i].name);
        }
        res.json(namesBasketsCompany);
    },

    //Nombre  de las canastillas de los proveedores
    getBasketsProvider: async (req, res) => {
        const basketsProvider = await Baskets.find({type:'Proveedor'});
        let namesBasketsProvider = [];
        for(let i = 0; i<basketsProvider.length; i++ ){
            namesBasketsProvider.push(basketsProvider[i].name);
        }
        res.json(namesBasketsProvider);
    },
    
    signIn: (req, res) => {
        User.find({ userName: req.body.userName }, (err, user) => {
            if (err) return res.status(500).send({ message: err })
            if (!user) return res.status(404).send({ message: 'No existe el usuario' })
            if (user.password !== req.body.password) res.status(401).send({ message: 'Contraseña incorrecta' })

            res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user),
                role: user.typeUser
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
            if (user.typeUser !== req.body.typeUser) res.status(401).send({ message: 'Acceso denegado' });
            res.status(200).send({ message: "Acceso permitido" });
        })
    },
    registerUser: (req, res) => {
        try {
            User.findOne({ name: req.body.name }, async function (err, user) {
                if (err) {
                    res.status(500).json({ state: 0, message: "Error 2: " + err });
                } else {
                    if (!user) {
                        User.findOne({ userName: req.body.userName }, async function (err, user) {
                            if (!user) {
                                req.body.userName = CryptoJS.AES.encrypt('Nombre encriptado', req.body.userName).toString();
                                req.body.phone = CryptoJS.AES.encrypt('Teléfono encriptado', req.body.phone).toString();
                                req.body.direction = CryptoJS.AES.encrypt('Dirección encriptada', req.body.direction).toString();
                                req.body.password = CryptoJS.AES.encrypt('Contraseña encriptada', req.body.password).toString();

                                const newUser = new User(req.body);
                                await newUser.save((err, resulset) => {
                                    if (err) {
                                        res.status(500).json({ state: 0, message: "Error 3: " + err.message })
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
            res.status(500).json({ state: 0, message: "Error 1: " + e })
        }
    },
}