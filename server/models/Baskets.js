const { Schema, model } = require('mongoose');

const BasketsSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'El nombre de la canastilla ya existe'],
        required: [true, 'El nombre de la canastilla es necesario'],
        maxlength: [50, 'El nombre de la canastilla no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre de la canastilla debe contener 3 o más caracteres']
    },
    code:{
        type: String,
        unique: [true, 'El código de la canastilla ya existe'],
        required: [true,'El código es necesario'],
        maxlength: [4,'El código puede tener hasta 4 caracteres'],
        minlength: [3, 'El código debe tener más de 3 caracteres']
        
    },
    type: {
        type: String,
        required: [true, 'El tipo de canastilla es necesario'],
        enum : ['Empresa','Proveedor','Empresa-Proveedor']        
    },
    description:{
        type: String, 
        maxlength: [200, 'La descrición no puede exceder los 200 caracteres'],
    }
});
module.exports = model('Baskets', BasketsSchema);