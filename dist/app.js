"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var usuario_router_1 = require("./src/router/usuario.router");
var comentario_router_1 = require("./src/router/comentario.router");
var ruta_router_1 = require("./src/router/ruta.router");
var app_data_source_1 = require("./app-data-source");
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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
//Rutas
app.use('/app', usuario_router_1.default);
app.use('/app', comentario_router_1.default);
app.use('/app', ruta_router_1.default);
// start express server
app.listen(3000);
//# sourceMappingURL=app.js.map