const http = require('http')
const socketIo = require('socket.io');
const User = require('../models/User')
const socket = app => {
    const server = http.createServer(app);
    const io = socketIo(server);
  
    io.on('connection', socket => {
      console.log('User connected!');
      socket.on('search', async (name) => {
        const res = await User.find({name:name});
        if(!socket.cantidad){
          socket.cantidad = res.length;
        }else{
          socket.cantidad += res.length;
        }
        socket.emit('response',{res:res,cantidad:socket.cantidad});
      });
    });
  
    return server;
};
  
module.exports = socket;