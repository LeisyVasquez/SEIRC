const Baskets = require('../models/Baskets');

module.exports = {
    getMain: (req,res)=>{
        res.send('<h1>Bienvenido a la API</h1>');
    },
    registerBaskets: (req,res)=>{
        try{
            Baskets.findOne({name:req.body.name},async function(err,baskets){
                if(err){
                    res.status(500).json({state:0,message:err});
                }else{
                    if(!baskets){
                        const newBaskets = new Baskets(req.body);
                        await newBaskets.save();
                        res.status(201).json({state:1,message: newBaskets});
                    }else{
                        res.status(200).json({state:2,message:"Baskets exist"});
                    }
                }
            })
        }catch(e){
            res.status(500).json({state:0,message:err})
        }
    }
}