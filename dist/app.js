"use strict";
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
app.listen(PORT);
console.log("Server corriendo en http://localhost:".concat(PORT));
//# sourceMappingURL=app.js.map