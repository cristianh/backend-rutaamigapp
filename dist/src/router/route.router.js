"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the dependence of express
var express_1 = require("express");
//Controllers
var route_controller_1 = require("../controllers/route.controller");
var router = (0, express_1.Router)();
//Initial instance Route controller
var routeController = new route_controller_1.RouteController();
// Route
router.get("/allroute/:all?/:limit?/:skip?", routeController.getAllRoute);
router.get("/:id", routeController.getRouteById);
router.post("/createRoute", routeController.saveRoute);
router.put("/:id", routeController.updateRoute);
router.delete("/:id", routeController.deleteRoute);
exports.default = router;
//# sourceMappingURL=route.router.js.map