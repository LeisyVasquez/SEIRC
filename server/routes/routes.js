//Se importan módulos necesarios
const {Router} = require('express');
const router = Router();
const{ 
    getMain
} = require('./controller');

// Se realiza la creación de cada una de las rutas

router.get('/',getMain);

module.exports = router;