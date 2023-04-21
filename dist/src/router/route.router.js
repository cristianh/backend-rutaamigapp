"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the dependence of express
var express_1 = require("express");
//Controllers
var route_controller_1 = require("../controllers/route.controller");
var router = (0, express_1.Router)();
//Iniciamos ruta controller
var routeController = new route_controller_1.RouteController();
// register Rutas
router.get("/", routeController.getAllRutas);
router.get("/:id", routeController.getAllRutas);
router.get("/:id", routeController.getAllRutaById);
router.post("/", routeController.saveRuta);
router.put("/:id", routeController.updateRuta);
router.delete("/:id", routeController.deleteRuta);
exports.default = router;
//# sourceMappingURL=route.router.js.map