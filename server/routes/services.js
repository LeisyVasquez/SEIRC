const jwt = require('jwt-simple');
require('dotenv').config({path: '../.env'});

module.exports = {
    createToken (user){
        const payload = {
            id: user.id
        }
        return jwt.encode(payload,process.env.SECRETJWT);
    }
    
}