const Baskets = require('../models/Baskets');
const User = require('../models/User');
const Order = require('../models/Order');
const History = require('../models/History')
const service = require('./services')
require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const path = require('path');
const { resolveSoa } = require('dns');
const axios = require('axios');
const{
    encript,
    generatorDate,
    generatorHour, 
    findNamesBaskets, 
    findNamesClientsProviders,
    findNamesClientsProvidersHistoryOrder,
    findTotalOneQuantityBaskets,
    findTotalQuantityBaskets,
    findSumQuantityByTypeMovement,
    getNameBasketsByCode
} = require ('../functions/functions')

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
        const clients = await User.find({ $or: [{ typeUser: 'cliente' }, { typeUser: 'clienteProveedor' }] });
        let namesClients = [];
        for (let i = 0; i < clients.length; i++) {
            namesClients.push(clients[i].name);
        }
        res.json(namesClients);
    },

    getProvider: async (req, res) => {
        const providers = await User.find({ $or: [{ typeUser: 'proveedor' }, { typeUser: 'clienteProveedor' }] });
        let namesProviders = [];
        for (let i = 0; i < providers.length; i++) {
            namesProviders.push(providers[i].name);
        }
        res.json(namesProviders);
    },

    getClientProviderByOrder: async (req, res) => {
        const users = await User.find({ $or: [{ typeUser: req.params.typeUser }, { typeUser: 'clienteProveedor' }] });
        const orders = await Order.find({ typeUser: req.params.typeUser });
        res.send(findNamesClientsProviders(orders, users));
    },
    //Nombre  de las canastillas de la empresa  
    getBasketsCompany: async (req, res) => {
        const basketsCompany = await Baskets.find({ $or: [{ type: 'Empresa' }, { type: 'Empresa-Proveedor' }] });
        let namesBasketsCompany = [];
        for (let i = 0; i < basketsCompany.length; i++) {
            namesBasketsCompany.push(basketsCompany[i].code + "-" + basketsCompany[i].name);
        }
        res.json(namesBasketsCompany);
    },

    //Nombre  de las canastillas de los proveedores
    getBasketsProvider: async (req, res) => {
        const basketsProvider = await Baskets.find({ $or: [{ type: 'Proveedor' }, { type: 'Empresa-Proveedor' }] });
        let namesBasketsProvider = [];
        for (let i = 0; i < basketsProvider.length; i++) {
            namesBasketsProvider.push(basketsProvider[i].code + "-" + basketsProvider[i].name);
        }clientes
        res.json(namesBasketsProvider);
    },
    getBasketsReturn: async (req, res) => {
        try {
            const baskets = await Baskets.find();
            let namesBaskets = {};
            let consolidated = [];
            for (let i = 0; i < baskets.length; i++) {
                namesBaskets[baskets[i].code] = baskets[i].name;
            }

            Order.findOne({ name: req.params.name, typeUser: req.params.typeUser }, async function (err, order) {
                console.log(order);
                if (!order) {
                    return res.status(255).json({});
                } if (order) {
                    consolidated = Object.keys(order.consolidated);
                    const result = findNamesBaskets(namesBaskets, consolidated);
                    return res.status(200).json({ res: result });

                } if (err) {
                    return res.status(254).send('Error inesperado');
                }
            })
        } catch (e) {
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
                role: user[0].typeUser,
                name: user[0].name
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

    loanClientProvider: (req, res) => {
        try {
            const name = req.body.name;
            const consolidated = req.body.basketsLoan;
            const typeUser = req.body.typeUser;
            const movemenType = "prestamo"
            const type = req.body.type;
            const date = generatorDate();
            const hour = generatorHour();

            Order.findOne({ name: name, typeUser: typeUser }, async function (err, order) {
                if (!order) {
                    const newOrder = new Order({ name, typeUser, consolidated });
                    await newOrder.save();
                } if (order) {
                    for (const property in consolidated) {
                        const increment = parseInt(consolidated[property], 10);
                        if (order.consolidated.hasOwnProperty(property)) order.consolidated[property] += increment;
                        else order.consolidated[property] = increment;
                    }
                    await Order.findByIdAndUpdate(order._id, { $set: order });
                } if (err) {
                    return res.status(254).send('Error inesperado')
                }
                if (type === 1) {
                    const newHistory = new History({ name: name, typeUser: typeUser, movemenType: movemenType, date: date, hour: hour, baskets: consolidated });
                    await newHistory.save();
                    return res.status(201).send('ok');
                } else {
                    return res.status(201).send('ok');
                }

            })
        }
        catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },
    returnClientProvider: (req, res) => {
        try {
            const name = req.body.name;
            const consolidated = req.body.basketsReturn;
            const typeUser = req.body.typeUser;
            const movemenType = "devolucion"
            const type = req.body.type;
            const date = generatorDate();
            const hour = generatorHour();

            Order.findOne({ name: name, typeUser: typeUser }, async function (err, order) {
                if (!order) {
                    res.status(254).json('No existe la order');  // 254 es provicional (500)
                } if (order) {

                    for (const property in consolidated) {
                        const decrement = parseInt(consolidated[property], 10);
                        if (order.consolidated.hasOwnProperty(property)) {
                            const valueAux = order.consolidated[property] - decrement;
                            var flag = false;
                            if (valueAux < 0) return res.status(255).json({ message: `La canastilla con código ${property} no se puede operar` });
                            else if (valueAux === 0) {
                                if (Object.keys(order.consolidated).length === 1) {
                                    await Order.deleteOne({ _id: order._id });
                                    flag = true;
                                } else delete order.consolidated[property];

                            } else order.consolidated[property] = valueAux;

                        } else {
                            return res.status(256).json({ message: `La canastilla con cógido ${property} no se encuentra prestada` });
                        }
                    }
                    if (!flag) await Order.findByIdAndUpdate(order._id, { $set: order });
                } if (err) {
                    return res.status(257).json({ message: 'Error inesperado' })
                }
                if (type === 1) {
                    const newHistory = new History({ name: name, typeUser: typeUser, movemenType: movemenType, date: date, hour: hour, baskets: consolidated });
                    await newHistory.save();
                    return res.status(201).send('ok');
                } else {
                    return res.status(201).send('ok');
                }
            })
        }
        catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },

    //Obtener historial de clientes / proveedores
    getGeneralHistory: (req, res) => {
        try {
            History.find({ typeUser: req.params.typeUser, date: generatorDate(), status: 'activo' }, function (err, historys) {
                if (err) {
                    return res.status(254).json(e)
                }
                if (!historys.length !== 0) {
                    return res.send([historys, findNamesClientsProvidersHistoryOrder(historys)]);
                } else {
                    return res.status(254).json('No existe el historial');
                }
            })
        } catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },

    getHistoryByName: (req, res) => {
        try {
            History.find({ name: req.params.name, typeUser: req.params.typeUser, date: generatorDate(), status: 'activo' }, function (err, historys) {
                if (err) {
                    return res.status(254).json(e)
                }
                if (!historys.length !== 0) {
                    return res.send(historys);
                } else {
                    return res.status(255).json('No existe el historial');
                }
            })
        } catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },

    getCompleteHistoryByName: (req, res) => {
        try {
            History.find({ name: req.params.name, typeUser: req.params.typeUser, status: 'activo' }, function (err, historys) {
                if (err) {
                    return res.status(254).json(e)
                }
                if (!historys.length !== 0) {
                    return res.send(historys);
                } else {
                    return res.status(255).json('No existe el historial');
                }
            })
        } catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },

    getGeneralOrder: (req, res) => {
        try {
            Order.find({ typeUser: req.params.typeUser }, function (err, orders) {
                console.log(orders);
                if (err) return res.status(254).json(e);
                if (orders.length !== 0) {
                    const list = findTotalOneQuantityBaskets(orders);
                    return res.send([orders, findNamesClientsProvidersHistoryOrder(orders), list, findTotalQuantityBaskets(list)]);
                } else {
                    return res.status(255).json('No existe el historial');
                }
            })
        } catch (e) {
            return res.status(254).json(e);
        }
    },
    getOrderByName: (req, res) => {
        try {
            Order.findOne({ name: req.params.name, typeUser: req.params.typeUser }, function (err, order) {
                if (err) return res.status(254).json(e);
                if (order.length !== 1) {
                    return res.send([order]);
                } else {
                    return res.status(255).json('No existe el historial');
                }
            })
        } catch (e) {
            res.status(254).json(e) // 254 es provicional (500)
        }
    },

    deleteMovementClientProvider: (req, res) => {
        try {
            const { password, idHistory } = req.body
            User.findOne({ $and: [{ typeUser: "superUsuario" }, { password: password }] }, function (errPassword, resultPassword) {
                if (errPassword) return res.status(254).send('bad');
                if (resultPassword) {
                    History.findById(idHistory, function (errHistory, resultHistory) {
                        if (errHistory) return res.status(254).send('mal');
                        if (resultHistory) {
                            const data = {
                                name: resultHistory.name,
                                typeUser: resultHistory.typeUser,
                                type: 2
                            }
                            if (resultHistory.movemenType === "devolucion") {
                                data["basketsLoan"] = resultHistory.baskets;
                                axios.post('http://localhost:8085/api/loanClientProvider', data).then((response) => {
                                    if (response.status === 201) {
                                        const hour = generatorHour();
                                        History.findByIdAndUpdate(idHistory, { $set: { status: 'inactivo', hour: hour } }, function (errUpdate, resultUpdate) {
                                            if (errUpdate) return res.status(254).send(errUpdate);
                                            return res.status(response.status).send(response.data);
                                        })
                                    } else {
                                        return res.status(response.status).send(response.data);
                                    }

                                }).catch((error) => {
                                    return res.status(254).send(error);
                                })
                            } else {
                                data["basketsReturn"] = resultHistory.baskets;
                                axios.post('http://localhost:8085/api/returnClientProvider', data).then((response) => {
                                    if (response.status === 201) {
                                        History.findByIdAndUpdate(idHistory, { $set: { status: 'inactivo', hour: hour } }, function (errUpdate, resultUpdate) {
                                            if (errUpdate) return res.status(254).send(errUpdate);
                                            return res.status(response.status).send(response.data);
                                        })
                                    } else {
                                        return res.status(response.status).send(response.data);
                                    }
                                }).catch((error) => {
                                    return res.status(254).send(error);
                                })
                            }
                        }
                    });
                }
            });
        } catch (e) {
            res.status(254).send('mal');
        }
    },

    getPasswordSuperUser: (req, res) => {
        try {
            User.findOne({ typeUser: "superUsuario" }, function (err, result) {
                if (err) res.status(254) // 254 es provicional (500)
                else {
                    res.status(200).json({ message: result.password })
                }
            })
        } catch (e) {
            console.log(e);
            res.status(254).send('bad')
        }
    },

    getQuantityByTypeMovement: (req, res) => {
        try {
            const { typeUser, date } = req.params;
            const dateChange = date.split('-')[0] + "/" + date.split('-')[1] + "/" + date.split('-')[2];

            History.find({ typeUser: typeUser, date: dateChange }, (err, historys) => {
                if (err) { return res.status(254).send(err); }
                if (historys.length !== 0) {
                    const result = findSumQuantityByTypeMovement(historys);
                    return res.send([{ id: 1, date: dateChange, typeMovement: 'Préstamo', total: result[0] }, { id: 2, date: dateChange, typeMovement: 'Devolución', total: result[1] }]);
                } else return res.status(255).send('Historys no encontradas');
            });
        } catch (e) {
            console.log("hola");
            res.status(254).send(e);
        }
    },
    getQuantityTotalByMovement: (req, res) => {
        try {
            const { typeUser } = req.params;
            History.find({ typeUser: typeUser }, (err, historys) => {
                if (err) return res.status(254).send(err);
                if (historys.length !== 0) {
                    const result = findSumQuantityByTypeMovement(historys);
                    return res.send([{ id: 1, date: generatorDate(), typeMovement: 'Préstamo', total: result[0] }, { id: 2, date: generatorDate(), typeMovement: 'Devolución', total: result[1] }]);
                } else return res.status(255).send('Historys no encontradas');
            });
        } catch (e) {
            res.status(254).send(e);
        }
    },

    getSumTotalBasketsHistory: (req, res) => {
        try {
            History.find(async (err, history) => {

                if (err) return res.status(254).send(err)

                const typeUser = req.params.typeUser;
                const basketsHistory = [];
                for (let i = 0; i < history.length; i++) {
                    basketsHistory.push({ typeUser: history[i].typeUser, movementType: history[i].movemenType, baskets: history[i].baskets })
                }
                const sumLoan = {}
                const sumReturn = {}
                for (let i = 0; i < basketsHistory.length; i++) {
                    const objectBaskets = basketsHistory[i].baskets;

                    if (basketsHistory[i].movementType === "prestamo" && basketsHistory[i].typeUser === typeUser) {
                        for (const propertyBasketsHistory in objectBaskets) {
                            if (sumLoan.hasOwnProperty(propertyBasketsHistory))
                                //Las claves de un objeto "se pueden entender como una variable"
                                sumLoan[propertyBasketsHistory] += objectBaskets[propertyBasketsHistory]
                            else sumLoan[propertyBasketsHistory] = objectBaskets[propertyBasketsHistory]
                        }
                    } else if (basketsHistory[i].typeUser === typeUser) {
                        for (const propertyBasketsHistory in objectBaskets) {
                            if (sumReturn.hasOwnProperty(propertyBasketsHistory))
                                sumReturn[propertyBasketsHistory] += objectBaskets[propertyBasketsHistory]
                            else sumReturn[propertyBasketsHistory] = objectBaskets[propertyBasketsHistory]
                        }
                    }
                }

                //Agregar ceros a las devoluciones necesarias. 
                for (const propertyBasketsLoan in sumLoan) {
                    if (!sumReturn.hasOwnProperty(propertyBasketsLoan))
                        sumReturn[propertyBasketsLoan] = 0;
                }

                const arrayCodeBaskets = Object.keys(sumLoan);
                const arrayNamesBasket = await getNameBasketsByCode(arrayCodeBaskets);

                const arrayOfObjectsBaskets = [];
                for (let i = 0; i < arrayCodeBaskets.length; i++) {
                    arrayOfObjectsBaskets.push({ codeBasket: arrayNamesBasket[i], sumLoan: sumLoan[arrayCodeBaskets[i]], sumReturn: sumReturn[arrayCodeBaskets[i]], debt: sumLoan[arrayCodeBaskets[i]] - sumReturn[arrayCodeBaskets[i]] })
                }

                return res.status(200).json({ arrayTable: arrayOfObjectsBaskets, basketNamesAndCodes: arrayNamesBasket });
            })
        } catch (e) {
            return res.status(254).send(e)
        }
    },

    sumBasketsHistoryByData: (req, res) => {
        try {
            const date = req.body.date;
            History.find({ date: date }, async (err, history) => {
                if (err) return res.status(254).send(err)
                const typeUser = req.body.typeUser;
                const basketsHistory = [];
                for (let i = 0; i < history.length; i++) {
                    basketsHistory.push({ typeUser: history[i].typeUser, movementType: history[i].movemenType, baskets: history[i].baskets })
                }
                const sumLoan = {}
                const sumReturn = {}
                for (let i = 0; i < basketsHistory.length; i++) {
                    const objectBaskets = basketsHistory[i].baskets;

                    if (basketsHistory[i].movementType === "prestamo" && basketsHistory[i].typeUser === typeUser) {
                        for (const propertyBasketsHistory in objectBaskets) {
                            if (sumLoan.hasOwnProperty(propertyBasketsHistory))
                                //Las claves de un objeto "se pueden entender como una variable"
                                sumLoan[propertyBasketsHistory] += objectBaskets[propertyBasketsHistory]
                            else sumLoan[propertyBasketsHistory] = objectBaskets[propertyBasketsHistory]
                        }
                    } else if (basketsHistory[i].typeUser === typeUser) {
                        for (const propertyBasketsHistory in objectBaskets) {
                            if (sumReturn.hasOwnProperty(propertyBasketsHistory))
                                sumReturn[propertyBasketsHistory] += objectBaskets[propertyBasketsHistory]
                            else sumReturn[propertyBasketsHistory] = objectBaskets[propertyBasketsHistory]
                        }
                    }
                }

                //Agregar ceros a las devoluciones necesarias. 
                for (const propertyBasketsLoan in sumLoan) {
                    if (!sumReturn.hasOwnProperty(propertyBasketsLoan))
                        sumReturn[propertyBasketsLoan] = 0;
                }

                const arrayCodeBaskets = Object.keys(sumLoan);
                const arrayNamesBasket = await getNameBasketsByCode(arrayCodeBaskets);

                const arrayOfObjectsBaskets = [];
                for (let i = 0; i < arrayCodeBaskets.length; i++) {
                    arrayOfObjectsBaskets.push({ codeBasket: arrayNamesBasket[i], sumLoan: sumLoan[arrayCodeBaskets[i]], sumReturn: sumReturn[arrayCodeBaskets[i]], debt: sumLoan[arrayCodeBaskets[i]] - sumReturn[arrayCodeBaskets[i]] })
                }
                return res.status(200).json({ arrayTable: arrayOfObjectsBaskets });
            })
        } catch (e) {
            return res.status(254).send('Error en el servidor');
        }
    },
    getHistoryByTypeUser: (req, res) => {
        try {
            const typeUser = req.params.typeUser;
            History.find({ $and: [{ $or: [{ typeUser: typeUser }, { typeUser: 'clienteProveedor' }] }, { status: 'activo' }] }, (request, response) => {
                if (response) {
                    const namesByHistory = [];
                    console.log(response)
                    for (let i = 0; i < response.length; i++) {
                        if (!namesByHistory.includes(response[i].name)) {
                            namesByHistory.push(response[i].name)
                        }
                    }
                    return res.status(200).json({ historyGeneral: response, namesByHistory: namesByHistory })
                }
                else return res.status(254).send('Error en el servidor')
            })
        } catch (e) {
            return res.status(254).send('Error en el servidor')
        }
    },

    getDeletionHistory: (req, res) => {
        try {
            History.find({status:'inactivo'} , (request, response) => {
                if (response) {
                    const namesByDeletionHistory = [];
                    console.log(response)
                    for (let i = 0; i < response.length; i++) {
                        if (!namesByDeletionHistory.includes(response[i].name)) {
                            namesByDeletionHistory.push(response[i].name)
                        }
                    }
                    return res.status(200).json({ deletionHistoryGeneral: response, namesByDeletionHistory: namesByDeletionHistory })
                }
                else return res.status(254).send('Error en el servidor')
            })
        } catch (e) {
            return res.status(254).send('Error en el servidor')
        }
    }
}

