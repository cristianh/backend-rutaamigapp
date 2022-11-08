"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var rutas_controller_1 = require("../controllers/rutas.controller");
var router = (0, express_1.Router)();
//Iniciamos ruta controller
var rutaController = new rutas_controller_1.RutaController();
// register Rutas
router.get("/ruta", rutaController.getAllRutas);
router.get("/ruta/:id", rutaController.getAllRutas);
router.get("/ruta/:id", rutaController.getAllRutaById);
router.post("/ruta", rutaController.saveRuta);
router.put("/ruta/:id", rutaController.updateRuta);
router.delete("/ruta/:id", rutaController.deleteRuta);
exports.default = router;
//# sourceMappingURL=ruta.router.js.map