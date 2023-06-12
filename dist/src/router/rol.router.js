"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the dependence of express
var express_1 = require("express");
//Controllers
var rol_controller_1 = require("../controllers/rol.controller");
var router = (0, express_1.Router)();
//Initial instance Route controller
var rolController = new rol_controller_1.RolController();
// Route
router.get("/allrols/:all?/:limit?/:skip?", rolController.getAllRol);
router.post("/createRol", rolController.saveRol);
router.get("/:id", rolController.getRolById);
/* router.put("/:id", rolController.updateRoute)
router.delete("/:id", rolController.deleteRoute) */
exports.default = router;
//# sourceMappingURL=rol.router.js.map