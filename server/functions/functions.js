const Baskets = require('../models/Baskets');

function encript(obj) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', process.env.SECRETCRYPTO).update(obj).digest('hex');
    return hmac
}

function generatorDate() {
    var d = new Date();
    month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "/" + month + "/" + year;
}

function generatorHour() {
    var d = new Date();
    hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes;
}


function findNamesBaskets(allBaskets, consolidatedUser) {
    let listBasketsResult = [];
    for (let i = 0; i < consolidatedUser.length; i++) {
        listBasketsResult.push(consolidatedUser[i] + "-" + allBaskets[consolidatedUser[i]]);
    }
    return listBasketsResult;
}

function findNamesClientsProviders(orders, clients) {
    const ordersSet = new Set();
    const result = [];
    for (let i = 0; i < orders.length; i++) {
        ordersSet.add(orders[i].name);
    }
    for (let i = 0; i < clients.length; i++) {
        if (ordersSet.has(clients[i].name)) result.push(clients[i].name);
    }
    return result;
}

function findNamesClientsProvidersHistoryOrder(history) {
    const namesAux = new Set();
    const finalNames = [];
    for (let i = 0; i < history.length; i++) {
        if (!namesAux.has(history[i].name)) {
            namesAux.add(history[i].name);
            finalNames.push(history[i].name);
        }
    }
    return finalNames;
}

function findTotalOneQuantityBaskets(orders) {
    const finalTotalOneQuantityBaskets = {};
    for (let i = 0; i < orders.length; i++) {
        let sumQuantity = 0;
        for (property in orders[i].consolidated) {
            sumQuantity += orders[i].consolidated[property];
        }
        finalTotalOneQuantityBaskets[orders[i].name] = sumQuantity;
    }
    return finalTotalOneQuantityBaskets;
}

function findTotalQuantityBaskets(obj) {
    let sum = 0;
    for (property in obj) {
        sum += obj[property];
    }
    return sum;
}

function findSumQuantityByTypeMovement(historys) {
    let sumLoan = 0;
    let sumReturn = 0;
    for (let i = 0; i < historys.length; i++) {
        for (property in historys[i].baskets) {
            if (historys[i].movemenType === "prestamo") sumLoan += historys[i].baskets[property];
            if (historys[i].movemenType === "devolucion") sumReturn += historys[i].baskets[property];
        }
    }
    return [sumLoan, sumReturn];
}

async function getNameBasketsByCode(arrayCodeBaskets) {
    const basketNamesAndCodes = [];
    for (let i = 0; i < arrayCodeBaskets.length; i++) {
        const result = await Baskets.findOne({ code: arrayCodeBaskets[i] });
        basketNamesAndCodes.push(`${result.code}-${result.name}`);
    }
    return basketNamesAndCodes
}


module.exports = {
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
}