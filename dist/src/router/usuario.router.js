"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//path 
var path = require('path');
//Middleware
var middleware_1 = require("../middleware");
var validation = new middleware_1.Validations();
var validationJWT = new middleware_1.ValidatiteJWT();
var router = (0, express_1.Router)();
//Inicializamos el controlador.
var UserController = new UserController();
// Usuarios
router.get("/:all?/:limit?/:skip?", validationJWT.validate, UserController.getAllUsers);
router.get("/:id/comentarios", UserController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", UserController.getUserByIdComentariesById);
router.get("/:id", UserController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), UserController.saveUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map