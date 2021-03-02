require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
    
//Parseo de la cadena de conexión
    useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(db => console.log(`Base de datos conectada :)`))
.catch(error => console.error(error));

