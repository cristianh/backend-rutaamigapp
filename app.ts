import * as express from "express"
import routerUsuario from './src/router/usuario.router'
import routerComentario from './src/router/comentario.router'
import routerRuta from './src/router/ruta.router'
import routerUploadFile from './src/router/uploadFile.roter'
import myDataSource from "./app-data-source"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as fileUpload from 'express-fileupload'
import { Request, Response } from "express"
dotenv.config()
import * as cors from "cors"
//Morgan
import * as morgan from 'morgan'
//Server
import { createServer } from "http";
import { Server } from "socket.io";




const path = require('path');


let bodyParser = require('body-parser')
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })



// create and setup express app
const app = express()
const httpServer = createServer(app);
const corsUrl = 'https://backrutaamigaapptestnotification-com.onrender.com'
//const corsUrl = 'http://localhost:6060'
const io = new Server(httpServer, {
    cors: {
        origin: corsUrl
    },
});

//Pasamos la conexion del server a express

const PORT = process.env.PORT || 3000;

//cors
app.options('*', cors())
app.use(cors());
app.use(morgan('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())

// Servimos los archivos que se encuentran en el directorio public
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './uploads')));



//Habilitando subida de archivos
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024// Limitamos el  peso del archivo.
    }
}))



//!Ojo esto es opcional se utilizara en el mapa.
// Indicamos que serviremos el archivo index.html cuando accedamos a esta ruta
/* app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
}); */

//Rutas
app.use('/app', routerUsuario)
app.use('/app', routerComentario)
app.use('/app', routerRuta)
app.use('/app', routerUploadFile)

// start express server
app.listen(PORT)

/* const usuariosConectados = [] */
/* const usuariosConectados = new Set(); */

io.on("connection", (client) => {
    Object.keys(io.sockets.sockets).forEach(function (s) {
        io.sockets.sockets[s].disconnect(true);
    });
    const users = [];
    for (let [id] of io.of("/").sockets) {
        users.push({
            userID: id
        });
    }
    /*client.emit("users", {"usuarios":users}); */
    client.emit("users", { users, "mensaje": "usuario conectado" });
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

    client.on("mensaje_privado", ({ mensaje, id }) => {
        console.log(mensaje, id)
        if (id != undefined) {
            console.log(id.userID)
            client.to(id.userID).emit('respuesta_mensaje_privado', mensaje);
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

httpServer.listen(3500);


console.log(`Server corriendo en http://localhost:${PORT}`)
console.log(`Socket corriendo en http://localhost:${'3500'}`)