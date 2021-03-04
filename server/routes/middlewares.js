const jwt = require('jwt-simple');
require('dotenv').config({path: '../.env'});
const User = require('../models/User');

module.exports = {

    /*Nos permite comprobar la validez del token si este es válido se guarda el 
    payload de este en el req */
    isAuth: (req,res, next)=>{
        if(!req.headers.autorization) return res.status(403).send({ message: 'No tienes autorización' });
        const token = req.headers.autorization.split(' ')[1];
        try{
            const payload = jwt.decode(token,process.env.SECRETJWT);
            req.user = payload;
            next();
        }catch(e){
            res.status(500).send({message:"Invalid Token"});
        }
    },

    /*
    Validador de roles antes de un servicio
    Nos permite comprobar si el rol del usuario enviado por el token y 
    el enviado desde el cliente son iguales o no, si son iguales procedemos a guardar
    la información del usuario en el req para tenerlo en cuenta en el servicio siguiente*/
    isRole: (req,res,next)=>{
        User.find({_id:req.user.id},(err,user)=>{
            if (err) return res.status(500).send({ message: err })
            if (!user) return res.status(404).send({ message: 'No existe el id' })
            if(user.typeUser !== req.body.typeUser) res.status(401).send({ message: 'Acceso denegado'});
            req.user = user;
            next();
        })
    }

}