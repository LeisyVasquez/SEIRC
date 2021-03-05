const { Schema, model } = require('mongoose');
const Baskets = require('./Baskets');

const OrderSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre debe contener 3 o más caracteres']
    },
    typeUser: {
        type: String,
        required: [true, 'El tipo de usuario es necesario'],
        enum : ['cliente','proveedor']        
    },
    consolidated: {     
    },
    actions:{
        income: {
            
        },
        expenses: {
            
        }
    }
});

module.exports = model('Order', OrderSchema);