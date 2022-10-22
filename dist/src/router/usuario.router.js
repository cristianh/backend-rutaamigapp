"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var usuario_controller_1 = require("../controllers/usuario.controller");
//Middleware
var validateFormLogin_1 = require("../middleware/validateFormLogin");
var router = (0, express_1.Router)();
// Usuarios
router.get("/usuario", usuario_controller_1.getAllUsers);
router.get("/usuario/comentarios", usuario_controller_1.getComentariesUsers);
router.get("/usuario/:usuarioId/comentarios/:comentarioId", usuario_controller_1.getUserByIdComentariesById);
router.get("/usuario/:id", usuario_controller_1.getUserById);
router.post("/usuario", (0, validateFormLogin_1.default)(), usuario_controller_1.saveUser);
router.put("/usuario/:id", usuario_controller_1.updateUser);
router.delete("/usuario/:id", usuario_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map