import { Router } from "express"

//Controllers
import { ForoController } from '../controllers/foro.controller'

const router = Router()
//Iniciamos ruta controller
const foroController = new ForoController()

// register Rutas
router.get("/foro", foroController.getAllForo)
router.get("/foro/:id", foroController.getForoById)
router.post("/foro", foroController.saveForo)
router.put("/foro/:id", foroController.updateForo)
router.delete("/foro/:id", foroController.deleteForo)

export default router