"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, { /* options */});
io.on("connection", function (socket) {
    // test conexion
    console.log("cliente conectado");
    /* socket.disconnect() */
});
httpServer.listen(4000);
console.log("servidor corriendo en el puerto 4000");
//# sourceMappingURL=servermap.js.map