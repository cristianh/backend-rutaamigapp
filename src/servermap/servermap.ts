import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    // test conexion
    console.log("cliente conectado");
    /* socket.disconnect() */
});

httpServer.listen(4000);

console.log("servidor corriendo en el puerto 4000")