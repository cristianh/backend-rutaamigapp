//Import the dependence of express
import { Router } from "express"

//Controllers
import { RouteController } from '../controllers/route.controller'

const router = Router()
//Initial instance Route controller
const routeController = new RouteController()

// Route
router.get("/allroute/:all?/:limit?/:skip?", routeController.getAllRoute)
router.get("/:id", routeController.getRouteById)
router.post("/createRoute", routeController.saveRoute)
router.put("/:id", routeController.updateRoute)
router.delete("/:id", routeController.deleteRoute)

export default router