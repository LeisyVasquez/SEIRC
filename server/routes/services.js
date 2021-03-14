const jwt = require('jwt-simple');
require('dotenv').config({path: '../.env'});

module.exports = {
    createToken (user){
        const payload = {
            id: user[0]._id
        }
        return jwt.encode(payload,process.env.SECRETJWT);
    }
    
}