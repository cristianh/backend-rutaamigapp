"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var foro_controller_1 = require("../controllers/foro.controller");
var router = (0, express_1.Router)();
//Iniciamos ruta controller
var foroController = new foro_controller_1.ForoController();
// register Rutas
router.get("/foro", foroController.getAllForo);
router.get("/foro/:id", foroController.getForoById);
router.post("/foro", foroController.saveForo);
router.put("/foro/:id", foroController.updateForo);
router.delete("/foro/:id", foroController.deleteForo);
exports.default = router;
//# sourceMappingURL=foro.router.js.map