"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//path 
var path = require('path');
//Controllers
var usuario_controller_1 = require("../controllers/usuario.controller");
//Middleware
var validations_1 = require("../middleware/validations");
var router = (0, express_1.Router)();
//Inicializamos el controlador.
var usuarioController = new usuario_controller_1.UsuarioController();
//Inicializamos Validacion.
var validation = new validations_1.Validations();
// Usuarios
router.get("/:all?/:limit?/:skip?", usuarioController.getAllUsers);
router.get("/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id", usuarioController.deleteUser);
router.post("/login", validation.validateFormUsuarioLogin(), usuarioController.getUsuarioLogin);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map