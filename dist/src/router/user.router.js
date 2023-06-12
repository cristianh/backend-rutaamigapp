"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_seed_1 = require("../../src/seeds/user.seed");
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
var usersedders = new user_seed_1.UserSeeder();
// Usuarios
router.get("/allusers/:all?/:limit?/:skip?", validationJWT.validate, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/userrols/:id", userController.getUserByRol);
router.post("/registro", validation.validateFormUsuarioRegister(), userController.saveUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
//Test
router.post("/createUsers/:nusuarios", validationJWT.validate, usersedders.CreateUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map