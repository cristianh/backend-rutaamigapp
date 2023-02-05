"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/*RUTAS*/
var usuario_router_1 = require("./usuario.router");
var comentario_router_1 = require("./comentario.router");
var ruta_router_1 = require("./ruta.router");
var uploadFile_roter_1 = require("./uploadFile.roter");
var ROUTER = (0, express_1.Router)();
/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/usuario', usuario_router_1.default);
ROUTER.use('/comentario', comentario_router_1.default);
ROUTER.use('/ruta', ruta_router_1.default);
ROUTER.use('/uploadFile', uploadFile_roter_1.default);
exports.default = ROUTER;
//# sourceMappingURL=index.js.map