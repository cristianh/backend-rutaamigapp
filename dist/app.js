"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var usuario_router_1 = require("./src/router/usuario.router");
var comentario_router_1 = require("./src/router/comentario.router");
var ruta_router_1 = require("./src/router/ruta.router");
var uploadFile_roter_1 = require("./src/router/uploadFile.roter");
var app_data_source_1 = require("./app-data-source");
var dotenv = require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var fileUpload = require("express-fileupload");
dotenv.config();
var cors = require("cors");
//Morgan
var morgan = require("morgan");
var socket_io_1 = require("socket.io");
var path = require('path');
var bodyParser = require('body-parser');
// establish database connection
app_data_source_1.default
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
var app = express();
/* const httpServer = createServer(app); */
//Pasamos la conexion del server a express
var PORT = process.env.PORT || 3000;
//cors
app.options('*', cors());
app.use(cors());
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
// Servimos los archivos que se encuentran en el directorio public
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './uploads')));
//Habilitando subida de archivos
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 // Limitamos el  peso del archivo.
    }
}));
//!Ojo esto es opcional se utilizara en el mapa.
// Indicamos que serviremos el archivo index.html cuando accedamos a esta ruta
/* app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
}); */
//Rutas
app.use('/app', usuario_router_1.default);
app.use('/app', comentario_router_1.default);
app.use('/app', ruta_router_1.default);
app.use('/app', uploadFile_roter_1.default);
// start express server
var serverFull = app.listen(PORT);
var corsUrl = 'https://backrutaamigaapptestnotification-com.onrender.com';
//const corsUrl = 'http://localhost:6060'
var io = new socket_io_1.Server(serverFull, {
    cors: {
        origin: '*'
    },
});
/* const usuariosConectados = [] */
/* const usuariosConectados = new Set(); */
io.on("connection", function (client) {
    var e_1, _a;
    Object.keys(io.sockets.sockets).forEach(function (s) {
        io.sockets.sockets[s].disconnect(true);
    });
    var users = [];
    try {
        for (var _b = __values(io.of("/").sockets), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 1), id = _d[0];
            users.push({
                userID: id
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    /*client.emit("users", {"usuarios":users}); */
    client.emit("users", { users: users, "mensaje": "usuario conectado" });
    console.log('users', users);
    /* if (users.length != 0) {
        if (users.length == 1) {
            client.to(users[0].userID).emit('mensaje', { "mensaje": "hola1" });
        }
        if (users.length == 2) {
            client.to(users[1].userID).emit('mensaje', { "mensaje": "hola2" });
        }
    }

    

    client.to(users[1].userID).emit('mensaje', { "mensaje": "hola2" }); */
    client.on("mensaje_privado", function (_a) {
        var mensaje = _a.mensaje, id = _a.id;
        console.log(mensaje, id);
        if (id != undefined) {
            console.log(id);
            client.to(id).emit('respuesta_mensaje_privado', mensaje);
        }
    });
    // ...
    //Guardamos los usuarios en su clave respectiva del idusuario
    /*  usuariosConectados.push({id:client.id, client: client }) */
    /*  usuariosConectados.add(client); */
    //Enviamos una notificacion de conexion de usuario.
    /*  client.broadcast.emit('user_conection',{"mensaje":"usuario conectado"}) */
    /* client.emit('user_conection',{"mensaje":"usuario conectado"}) */
    /*test*/
    /* console.log(usuariosConectados); */
    /*  client.to(usuariosConectados[0].id).emit('user_conection', { "mensaje": "usuario conectado" }); */
    client.once('disconnect', function () {
        /* usuariosConectados.delete(client); */
        console.log(client.id);
        //Desconectamos a todos los usuario.
        /* Array.from(users).forEach((s) => {
            s.disconnect(true);
        }); */
        Object.keys(io.sockets.sockets).forEach(function (s) {
            io.sockets.sockets[s].disconnect(true);
        });
    });
    /* function getConnectedSockets() {
        return Array.from(users);
    }
     */
});
console.log("Server corriendo en http://localhost:".concat(PORT));
//# sourceMappingURL=app.js.map