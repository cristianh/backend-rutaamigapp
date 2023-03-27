"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the dependence of express
var express_1 = require("express");
/*Import router routes*/
var user_router_1 = require("./user.router");
var forum_router_1 = require("./forum.router");
var comment_router_1 = require("./comment.router");
var route_router_1 = require("./route.router");
var auth_router_1 = require("./auth.router");
var uploadFile_roter_1 = require("./uploadFile.roter");
var ROUTER = (0, express_1.Router)();
/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/usuario', user_router_1.default);
ROUTER.use('/foro', forum_router_1.default);
ROUTER.use('/comentario', comment_router_1.default);
ROUTER.use('/ruta', route_router_1.default);
ROUTER.use('/uploadFile', uploadFile_roter_1.default);
ROUTER.use('/auth', auth_router_1.default);
exports.default = ROUTER;
//# sourceMappingURL=index.js.map