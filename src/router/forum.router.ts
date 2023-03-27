import { Router } from "express"

//Controllers
import { ForumController } from '../controllers/forum.controller'

const router = Router()
//Iniciamos ruta controller
const foroController = new ForumController()

// register Rutas
router.get("/", foroController.getAllForo)
router.get("/:id", foroController.getForoById)
router.post("/", foroController.saveForo)
router.put("/:id", foroController.updateForo)
router.delete("/:id", foroController.deleteForo)

export default router