import { Router } from "express"

//Controllers
import { RutaController } from '../controllers/rutas.controller'

const router = Router()
//Iniciamos ruta controller
const rutaController = new RutaController()

// register Rutas
router.get("/", rutaController.getAllRutas)
router.get("/:id", rutaController.getAllRutas)
router.get("/:id", rutaController.getAllRutaById)
router.post("/", rutaController.saveRuta)
router.put("/:id", rutaController.updateRuta)
router.delete("/:id", rutaController.deleteRuta)

export default router