var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var server = http.createServer(app);
//socket 
var Server = require("socket.io").Server;
var io = new Server(server, { cors: true, origin: true, allowEIO3: true });
//SOCKET.io
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.emit('mensaje_bienvenida', "bienvenido usuario");
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        //socket.broadcast.emit('hi');
        io.emit('chat send server message', msg);
    });
    socket.emit('text', 'wow. such event. very real time.');
    //EVENTO PARA ENVIAR INFORMACION DE LAS RUTAS.
    socket.on('geo_posicion', function (msg) {
        console.log('objectposition: ' + msg);
        //socket.broadcast.emit('hi');
        io.emit('chat send server message', msg);
        io.emit('chat_send_server_message', msg);
    });
});
server.listen(process.env.PORT || 5000, function () {
    console.log('listening on http://localhost:5000');
});
//# sourceMappingURL=servermap.js.map