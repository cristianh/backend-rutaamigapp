import {Router} from "express"

//Controllers
import { ComentarioController} from '../controllers/comentario.controller'

const router = Router()
//Inicializamos controllador.
const comentarioController= new ComentarioController();

// Comentarios
router.get("/comentario", comentarioController.getAllComentaries)
router.get("/comentario/usuario", comentarioController.getAllComentariesUsuario)
router.get("/comentario/:id", comentarioController.getComentariesById)
router.post("/comentario",comentarioController.saveComentaries )
router.put("/comentario/:id", comentarioController.updateComentaries)
router.delete("/comentario/:id", comentarioController.deleteComentaries)

export default router