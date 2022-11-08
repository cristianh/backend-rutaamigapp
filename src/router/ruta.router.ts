import { Router } from "express"

//Controllers
import { RutaController } from '../controllers/rutas.controller'

const router = Router()
//Iniciamos ruta controller
const rutaController = new RutaController()

// register Rutas
router.get("/ruta", rutaController.getAllRutas)
router.get("/ruta/:id", rutaController.getAllRutas)
router.get("/ruta/:id", rutaController.getAllRutaById)
router.post("/ruta", rutaController.saveRuta)
router.put("/ruta/:id", rutaController.updateRuta)
router.delete("/ruta/:id", rutaController.deleteRuta)

export default router