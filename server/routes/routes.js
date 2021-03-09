//Se importan módulos necesarios
const {Router} = require('express');
const router = Router();
const {isAuth,isRole} = require('./middlewares');
const{ 
    getMain,
    registerBaskets,
    getClient,
    getBasketsCompany,
    getBasketsProvider,
    signIn,
    registerUser,
    isRolePage,
    loanClient,
    returnClient,
    getBasketsReturn
} = require('./controller');

// Se realiza la creación de cada una de las rutas

router.get('/',getMain);
router.post('/registerBaskets',registerBaskets);
router.post('/registerThirdParties', registerUser);
router.post('/signIn',signIn);
router.get('/getClient',getClient);
router.get('/getBasketsCompany', getBasketsCompany);
router.get('/getBasketsProvider', getBasketsProvider);
router.get('/getBasketsReturn/:name', getBasketsReturn);
router.post('/routeComprobation',isAuth,isRolePage);
router.post('/loanClient',loanClient);
router.post('/returnClient',returnClient);


module.exports = router;