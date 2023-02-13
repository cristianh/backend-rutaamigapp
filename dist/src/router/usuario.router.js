"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//path 
var path = require('path');
//Controllers
var usuario_controller_1 = require("../controllers/usuario.controller");
//Middleware
var middleware_1 = require("../middleware");
//Inicializamos Validacion.
var validation = new middleware_1.Validations();
var validationJWT = new middleware_1.ValidatiteJWT();
var router = (0, express_1.Router)();
//Inicializamos el controlador.
var usuarioController = new usuario_controller_1.UsuarioController();
// Usuarios
router.get("/:all?/:limit?/:skip?", validationJWT.validate, usuarioController.getAllUsers);
router.get("/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id", usuarioController.deleteUser);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map