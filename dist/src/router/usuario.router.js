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
/* //ruta test pagina login
router.get("/login", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../view','loginDemo.html'));
}); */
//ruta test pagina login
router.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../view', 'loginDemo.html'));
});
//ruta test notificacion.
router.get("/notificacion", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../view', 'notificacionDemo.html'));
});
//ruta para el mapa de
router.get("/mapa", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../public', 'mapa.html'));
});
//ruta para el mapa de
router.get("/tableromensajes", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../view', 'tableroMensajeAdmin.html'));
});
//ruta test pagina listar usuarios
router.get("/listarusuarios", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../view', 'listarUsuarioDemo.html'));
});
exports.default = router;
//# sourceMappingURL=usuario.router.js.map