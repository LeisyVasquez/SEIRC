const { Schema, model } = require('mongoose');
const Baskets = require('./Baskets');

const HistorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre debe contener 3 o más caracteres']
    },
    typeUser: {
        type: String,
        required: [true, 'El tipo de usuario es necesario'],
        enum : ['cliente','proveedor']        
    },
    movemenType:{
        type:String,
        required: [true, 'El tipo de movimiento es necesario'],
        enum: ['prestamo','devolucion']
    }, 
    date:{
        type:String,
        required: [true, 'No se ingreso fecha']
    },
    baskets:{
        
    }
    
});

module.exports = model('History', HistorySchema);