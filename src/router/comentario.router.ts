import {Router} from "express"

//Controllers
import { getAllComentaries, getAllComentariesUsuario,getComentariesById,saveComentaries,updateComentaries, deleteComentaries} from '../controllers/comentario.controller'

const router = Router()

// Comentarios
router.get("/comentarios", getAllComentaries)
router.get("/comentario/usuario", getAllComentariesUsuario)
router.get("/comentario/:id", getComentariesById)
router.post("/comentario",saveComentaries )
router.put("/comentario/:id", updateComentaries)
router.delete("/comentario/:id", deleteComentaries)

export default router