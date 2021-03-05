//Se importan módulos necesarios
const {Router} = require('express');
const router = Router();
const {isAuth,isRole} = require('./middlewares');
const{ 
    getMain,
    registerBaskets
    
} = require('./controller');

// Se realiza la creación de cada una de las rutas

router.get('/',getMain);
router.post('/registerBaskets/',isAuth,isRole,registerBaskets);

module.exports = router;