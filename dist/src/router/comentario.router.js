"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var comentario_controller_1 = require("../controllers/comentario.controller");
var router = (0, express_1.Router)();
//Inicializamos controllador.
var comentarioController = new comentario_controller_1.ComentarioController();
// Comentarios
router.get("/comentario", comentarioController.getAllComentaries);
router.get("/comentario/usuario", comentarioController.getAllComentariesUsuario);
router.get("/comentario/:id", comentarioController.getComentariesById);
router.post("/comentario", comentarioController.saveComentaries);
router.put("/comentario/:id", comentarioController.updateComentaries);
router.delete("/comentario/:id", comentarioController.deleteComentaries);
exports.default = router;
//# sourceMappingURL=comentario.router.js.map