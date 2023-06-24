//Import the dependence of express
import { Router } from "express"

//Controllers
import { RolController } from '../controllers/rol.controller'

const router = Router()
//Initial instance Route controller
const rolController = new RolController()

// Route
router.get("/allrols/:all?/:limit?/:skip?", rolController.getAllRol)
router.post("/createRol", rolController.saveRol)
router.get("/:id", rolController.getRolById)
/* router.put("/:id", rolController.updateRoute)
router.delete("/:id", rolController.deleteRoute) */

export default router