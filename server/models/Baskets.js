const { Schema, model } = require('mongoose');

const BasketsSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'El nombre de la canastilla ya existe'],
        required: [true, 'El nombre de la canastilla es necesario'],
        maxlength: [50, 'El nombre de la canastilla no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre de la canastilla debe contener 3 o más caracteres']
    },
    type: {
        type: String,
        required: [true, 'El tipo de canastilla es necesario'],
        enum : ['Empresa','Proveedor']        
    },
    description:{
        type: String, 
        maxlength: [200, 'La descrición no puede exceder los 200 caracteres'],
    }, 
    baseQuantily: {
        type: Number
    }
});

module.exports = model('Baskets', BasketsSchema);