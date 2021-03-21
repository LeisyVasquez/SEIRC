const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
require('dotenv').config({path: '../.env'});
require('../server/config/database');


//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', routes);

//Asignación de variables
console.log(process.env.PORT);
app.set('port', process.env.PORT || 8083)

// Configurar socket.io
const ioServer = require('./routes/socket')(app);
ioServer.listen(8085, () => console.log(`App running on port ${8085}`));

module.exports = app;