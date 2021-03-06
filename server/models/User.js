const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'El nombre ya existe'],
        required: [true, 'El nombre es necesario'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre debe contener 3 o más caracteres']
    },
    userName: {
        type: String,
        unique: [true, 'El nombre de usuario ya existe'],
        required: [true, 'El nombre de usuario es necesario'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre debe contener 3 o más caracteres']
    },
    typeUser: {
        type: String,
        required: [true, 'El tipo de usuario es necesario'],
        enum : ['cliente','proveedor','clienteProveedor', 'administrador', 'superUsuario']        
    },
    phone: {
        type: Number,
        maxlength: [10, 'El número no puede exceder los 10 caracteres'],
        minlength: [7, 'El número debe contener 3 o más caracteres']
    }, 
    direction:{
        type: String, 
        maxlength: [100, 'La dirección no puede exceder los 100 caracteres'],
        minlength: [5, 'La dirección debe contener 5 o más caracteres']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    }
});

module.exports = model('User', UserSchema);