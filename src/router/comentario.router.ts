import {Router} from "express"

//Controllers
import { ComentarioController} from '../controllers/comentario.controller'

const router = Router()
//Inicializamos controllador.
const comentarioController= new ComentarioController();

// Comentarios
/** 
 * A route that is listening to the path `/comentario` and when it is called it will execute the 
 * function `comentarioController.getAllComentaries` 
 **/
router.get("/comentario", comentarioController.getAllComentaries)
/* Listening to the path `/comentario/usuario` and when it is called it will execute the function
`comentarioController.getAllComentariesUsuario` */
router.get("/comentario/usuario", comentarioController.getAllComentariesUsuario)
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.getComentariesById` */
router.get("/comentario/:id", comentarioController.getComentariesById)
/* Listening to the path `/comentario` and when it is called it will execute the function
`comentarioController.saveComentaries` */
router.post("/comentario",comentarioController.saveComentaries )
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.updateComentaries` */
router.put("/comentario/:id", comentarioController.updateComentaries)
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.deleteComentaries` */
router.delete("/comentario/:id", comentarioController.deleteComentaries)

export default router