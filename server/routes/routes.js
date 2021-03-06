//Se importan módulos necesarios
const {Router} = require('express');
const router = Router();
const {isAuth,isRole} = require('./middlewares');
const{ 
    getMain,
    registerBaskets,
    getClient,
    getBasketsCompany,
    getBasketsProvider
    
} = require('./controller');

// Se realiza la creación de cada una de las rutas

router.get('/',getMain);
router.post('/registerBaskets/',registerBaskets);
router.get('/getClient',getClient);
router.get('/getBasketsCompany', getBasketsCompany);
router.get('/getBasketsProvider', getBasketsProvider);
module.exports = router;