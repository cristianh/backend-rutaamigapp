"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//path 
var path = require('path');
//Controllers
var user_controller_1 = require("../controllers/user.controller");
//Middleware
var middleware_1 = require("../middleware");
var validation = new middleware_1.Validations();
var validationJWT = new middleware_1.ValidatiteJWT();
var router = (0, express_1.Router)();
//Inicializamos el controlador.
var userController = new user_controller_1.UserController();
// Usuarios
router.get("/allusers/:all?/:limit?/:skip?", validationJWT.validate, userController.getAllUsers);
router.get("/:id/comentarios", userController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", userController.getUserByIdComentariesById);
router.get("/:id", userController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), userController.saveUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map