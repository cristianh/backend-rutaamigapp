"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var comentario_controller_1 = require("../controllers/comentario.controller");
var router = (0, express_1.Router)();
//Inicializamos controllador.
var comentarioController = new comentario_controller_1.ComentarioController();
// Comentarios
/**
 * A route that is listening to the path `/comentario` and when it is called it will execute the
 * function `comentarioController.getAllComentaries`
 **/
router.get("/comentario", comentarioController.getAllComentaries);
/* Listening to the path `/comentario/usuario` and when it is called it will execute the function
`comentarioController.getAllComentariesUsuario` */
router.get("/comentario/usuario", comentarioController.getAllComentariesUsuario);
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.getComentariesById` */
router.get("/comentario/:id", comentarioController.getComentariesById);
/* Listening to the path `/comentario` and when it is called it will execute the function
`comentarioController.saveComentaries` */
router.post("/comentario", comentarioController.saveComentaries);
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.updateComentaries` */
router.put("/comentario/:id", comentarioController.updateComentaries);
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.deleteComentaries` */
router.delete("/comentario/:id", comentarioController.deleteComentaries);
exports.default = router;
//# sourceMappingURL=comentario.router.js.map