  
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://leisy:wTyH95Xlmgrkdqmy@cluster0.m7dhv.mongodb.net/SEIRC?retryWrites=true&w=majority', {
    
//Parseo de la cadena de conexión
    useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(db => console.log(`Base de datos conectada :)`))
.catch(error => console.error(error));

