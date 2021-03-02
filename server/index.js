const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config({path: '../.env'});
require('../server/config/db');


//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', routes);


//Asignación de variables
console.log(process.env.PORT);
app.set('port', process.env.PORT || 8083)


//Levantamiento del servidor 
app.listen(app.get('port'), ()=>{
    console.log(`Server running on port ${app.get('port')}!!`)
});

module.exports = app;