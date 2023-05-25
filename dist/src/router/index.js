"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the dependence of express
var express_1 = require("express");
/*Import router routes*/
var user_router_1 = require("./user.router");
var rol_router_1 = require("./rol.router");
var notifications_router_1 = require("./notifications.router");
var route_router_1 = require("./route.router");
var auth_router_1 = require("./auth.router");
var uploadFile_roter_1 = require("./uploadFile.roter");
var ROUTER = (0, express_1.Router)();
/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/user', user_router_1.default);
ROUTER.use('/route', route_router_1.default);
ROUTER.use('/rol', rol_router_1.default);
ROUTER.use('/notificacion', notifications_router_1.default);
ROUTER.use('/uploadFile', uploadFile_roter_1.default);
ROUTER.use('/auth', auth_router_1.default);
exports.default = ROUTER;
//# sourceMappingURL=index.js.map