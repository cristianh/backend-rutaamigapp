//Import the dependence of express
import { Router } from "express"

//Controllers
import { RouteController } from '../controllers/route.controller'

const router = Router()
//Iniciamos ruta controller
const routeController = new RouteController()

// register Rutas
router.get("/", routeController.getAllRutas)
router.get("/:id", routeController.getAllRutas)
router.get("/:id", routeController.getAllRutaById)
router.post("/", routeController.saveRuta)
router.put("/:id", routeController.updateRuta)
router.delete("/:id", routeController.deleteRuta)

export default router