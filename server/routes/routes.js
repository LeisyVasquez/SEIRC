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
    loanClientProvider,
    returnClientProvider,
    getBasketsReturn,
    getClientProviderByOrder,
    getProvider,
    getGeneralHistory,
    getHistoryByName,
    deleteMovementClientProvider,
    getPasswordSuperUser,
    getGeneralOrder,
    getOrderByName, 
    getQuantityTotalByMovement,
    getQuantityByTypeMovement,
    getSumTotalBasketsHistory,
    sumBasketsHistoryByData,
    getHistoryByTypeUser,
    getCompleteHistoryByName, 
    getDeletionHistory,
    getNamesAndCodesBaskets
} = require('./controller');


// Se realiza la creación de cada una de las rutas
router.get('/',getMain);
router.post('/registerBaskets',registerBaskets);
router.post('/registerThirdParties', registerUser);
router.post('/signIn',signIn);
router.get('/getClient',getClient);
router.get('/getProvider',getProvider);
router.get('/getClientProviderByOrder/:typeUser',getClientProviderByOrder);
router.get('/getBasketsCompany', getBasketsCompany);
router.get('/getBasketsProvider', getBasketsProvider);
router.get('/getBasketsReturn/:name/:typeUser', getBasketsReturn);
router.post('/loanClientProvider',loanClientProvider);
router.post('/returnClientProvider',returnClientProvider);
router.post('/routeComprobation',isAuth,isRolePage);
router.get('/getGeneralHistory/:typeUser',getGeneralHistory);
router.get('/getHistoryByName/:typeUser/:name',getHistoryByName);
router.put('/deleteMovementClientProvider',deleteMovementClientProvider);
router.get('/getPasswordSuperUser', getPasswordSuperUser);
router.get('/getGeneralOrder/:typeUser',getGeneralOrder);



router.get('/getOrderByName/:typeUser/:name',getOrderByName)
router.get('/getQuantityByTypeMovement/:typeUser/:date',getQuantityByTypeMovement)
router.get('/getQuantityTotalByMovement/:typeUser',getQuantityTotalByMovement);
router.get('/getSumTotalBasketsHistory/:typeUser',getSumTotalBasketsHistory)
router.post('/sumBasketsHistoryByData',sumBasketsHistoryByData)
router.get('/getHistoryByTypeUser/:typeUser',getHistoryByTypeUser);
router.get('/getCompleteHistoryByName/:typeUser/:name',getCompleteHistoryByName);
router.get('/getDeletionHistory',getDeletionHistory);
router.get('/getNamesAndCodesBaskets', getNamesAndCodesBaskets)
module.exports = router;