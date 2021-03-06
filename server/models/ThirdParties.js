const { Schema, model } = require('mongoose');

const ThirdPartySchema = new Schema({
    type: {
        type: String,
        required: [true, 'El tipo de tercero es necesario'],
        enum : ['Cliente','Proveedor','Cliente - Proveedor']        
    },
    name: {
        type: String,
        unique: [true, 'El nombre del tercero ya existe'],
        required: [true, 'El nombre del tercero es necesario'],
        minlength: [3, 'El nombre del tercero debe contener 3 o más caracteres']
    },
    contact:{
        type: String, 
        maxlength: [21, 'El contacto no puede exceder los 21 caracteres'],
    }, 
    adress: {
        type: String
    },
    user: {
        type: String,
        unique: [true, 'El nombre de usuario del tercero ya existe'],
        required: [true, 'El nombre de usuario del tercero es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
    }
});

module.exports = model('ThirdParty', ThirdPartySchema);
