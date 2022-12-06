"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
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
router.get("/usuario/:limit?/:skip?", usuarioController.getAllUsers);
router.get("/usuario/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/usuario/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/usuario/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/usuario/:id", usuarioController.updateUser);
router.delete("/usuario/:id", usuarioController.deleteUser);
router.post("/login", validation.validateFormUsuarioLogin(), usuarioController.getUsuarioLogin);
//ruta test pagina
router.get("/testPrueba", function (req, res) {
    res.send("hola mundo");
});
exports.default = router;
//# sourceMappingURL=usuario.router.js.map