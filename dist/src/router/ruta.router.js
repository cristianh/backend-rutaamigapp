"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var rutas_controller_1 = require("../controllers/rutas.controller");
var router = (0, express_1.Router)();
//Iniciamos ruta controller
var rutaController = new rutas_controller_1.RutaController();
// register Rutas
router.get("/", rutaController.getAllRutas);
router.get("/:id", rutaController.getAllRutas);
router.get("/:id", rutaController.getAllRutaById);
router.post("/", rutaController.saveRuta);
router.put("/:id", rutaController.updateRuta);
router.delete("/:id", rutaController.deleteRuta);
exports.default = router;
//# sourceMappingURL=ruta.router.js.map