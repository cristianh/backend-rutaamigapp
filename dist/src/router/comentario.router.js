"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var comentario_controlles_1 = require("../controllers/comentario.controlles");
var router = (0, express_1.Router)();
// Comentarios
router.get("/comentarios", comentario_controlles_1.getAllComentaries);
router.get("/comentario/usuario", comentario_controlles_1.getAllComentariesUsuario);
router.get("/comentario/:id", comentario_controlles_1.getComentariesById);
router.post("/comentario", comentario_controlles_1.saveComentaries);
router.put("/comentario/:id", comentario_controlles_1.updateComentaries);
router.delete("/comentario/:id", comentario_controlles_1.deleteComentaries);
exports.default = router;
//# sourceMappingURL=comentario.router.js.map