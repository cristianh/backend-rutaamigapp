"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*CONEXION DB */
var app_data_source_1 = require("./app-data-source");
var express = require("express");
/* CARGA DE ARCHIVOS*/
/* import * as fileUpload from 'express-fileupload' */
/* INFORMACON SALIDA Y ENTRADA DE PETICIONES*/
var dotenv = require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
/* POLITICAS DE SEGURIDAD DE HOTS */
var cors = require("cors");
//Morgan - 
/* INFORMACON SALIDA Y ENTRADA DE PETICIONES*/
var morgan = require("morgan");
//IMPORTAMOS LAS RUTAS
var index_1 = require("./src/router/index");
/* LIBRERIAS AUXILIARES */
var path = require('path');
var bodyParser = require('body-parser');
var ServerApp = /** @class */ (function () {
    function ServerApp() {
        // INICIAMOS E INICIAALIZAMOS EXPRESS
        this.app = express();
        //DEFINIMOS UN PATH DE RUTA INICIAL
        this.path = '/api';
        //PASAMOS LA CONEXION DEL SERVER A EXPRESS
        this.PORT = process.env.PORT || 3000;
        this.configuracion();
        this.conexionDB();
        this.middleware();
        this.routes();
    }
    ServerApp.prototype.conexionDB = function () {
        // ESTABLECER CONEXION A LA BASE DE DATOS
        app_data_source_1.default
            .initialize()
            .then(function () {
            console.log("Data Source has been initialized!");
        })
            .catch(function (err) {
            console.error("Error during Data Source initialization:", err);
        });
    };
    ServerApp.prototype.configuracion = function () {
        /* CONFIGURACIO DE DOTENV */
        dotenv.config();
    };
    ServerApp.prototype.middleware = function () {
        // enable local connections - Cors
        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            //...
            next();
        });
        /*  var options = {
             "origin": "http://localhost:4200",
             "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
             "preflightContinue": false
         } */
        //this.app.options('*', cors())//EL '*' INDICA QUE SE ACEPTAN TODAS LAS CONEXIONES DE CUALQUIER SERVIDOR.
        this.app.use(cors()); //INDICAMOS A EXPRESS QUE UTILICE LOS CORS.
        this.app.use(morgan('dev'));
        // CONFIGURAMOS EL BODY DE LA PETICION POST PARA QUE SEA RECIBIDO EN LA PETICION.
        this.app.use(bodyParser.urlencoded({ extended: true })); //INDICAMOS A EXPRESS QUE TULICE BODIBANSER.
        // PASAMOS LA DATA APP. application/json
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        // Servimos los archivos que se encuentran en el directorio public
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use(express.static(path.join(__dirname, './uploads')));
        //Habilitando subida de archivos
        /*  this.app.use(fileUpload({
             createParentPath: true,
             limits: {
                 fileSize: 2 * 1024 * 1024 * 1024// Limitamos el  peso del archivo.
             }
         })) */
    };
    ServerApp.prototype.routes = function () {
        //RUTAS DE LA APLICACION PASADAS A EXPRESS
        this.app.use(this.path, index_1.default);
        /*  this.app.use(express.static('public')) */
        //RUTAs DE PRUEBA
        //!ELIINAR
        //ruta test pagina login
        this.app.get("/", function (req, res) {
            res.sendFile(path.resolve(__dirname, '../../view', 'loginDemo.html'));
        });
        //ruta test notificacion.
        this.app.get("/notificacion", function (req, res) {
            res.sendFile(path.resolve(__dirname, '../../view', 'notificacionDemo.html'));
        });
        //ruta para el mapa de
        this.app.get("/mapa", function (req, res) {
            res.sendFile(path.resolve(__dirname, './public/', 'mapa.html'));
        });
        //ruta para el mapa de
        this.app.get("/tableromensajes", function (req, res) {
            res.sendFile(path.resolve(__dirname, '../../view', 'tableroMensajeAdmin.html'));
        });
        //ruta test pagina listar usuarios
        this.app.get("/listarusuarios", function (req, res) {
            res.sendFile(path.resolve(__dirname, '../../view', 'listarUsuarioDemo.html'));
        });
        //ruta test pagina para enviar notificaciones push
        this.app.get("/notificaciones", function (req, res) {
            res.sendFile(path.resolve(__dirname, './public/', 'notificacionDemo.html'));
        });
        //ruta test pagina para subir archivos
        this.app.get("/cargarImagen", function (req, res) {
            res.sendFile(path.resolve(__dirname, './view/', 'subirArchivo.html'));
        });
    };
    ServerApp.prototype.listen = function () {
        this.app.listen(this.PORT);
        console.log("Server corriendo en http://localhost:".concat(this.PORT));
    };
    return ServerApp;
}());
exports.default = ServerApp;
//# sourceMappingURL=server.js.map