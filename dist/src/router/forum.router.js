"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var forum_controller_1 = require("../controllers/forum.controller");
var router = (0, express_1.Router)();
//Iniciamos ruta controller
var foroController = new forum_controller_1.ForumController();
// register Rutas
router.get("/", foroController.getAllForo);
router.get("/:id", foroController.getForoById);
router.post("/", foroController.saveForo);
router.put("/:id", foroController.updateForo);
router.delete("/:id", foroController.deleteForo);
exports.default = router;
//# sourceMappingURL=forum.router.js.map