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
router.get("/", comentarioController.getAllComentaries)
/* Listening to the path `/comentario/usuario` and when it is called it will execute the function
`comentarioController.getAllComentariesUsuario` */
router.get("/usuario", comentarioController.getAllComentariesUsuario)//Revisar
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.getComentariesById` */
router.get("/:id", comentarioController.getComentariesById)
/* Listening to the path `/comentario` and when it is called it will execute the function
`comentarioController.saveComentaries` */
router.post("/save",comentarioController.saveComentaries )
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.updateComentaries` */
router.put("/:id", comentarioController.updateComentaries)
/* Listening to the path `/comentario/:id` and when it is called it will execute the function
`comentarioController.deleteComentaries` */
router.delete("/:id", comentarioController.deleteComentaries)

export default router