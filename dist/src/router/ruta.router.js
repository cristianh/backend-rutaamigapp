"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var rutas_controller_1 = require("../controllers/rutas.controller");
var router = (0, express_1.Router)();
// register Rutas
router.get("/rutas", rutas_controller_1.getAllRutas);
/* router.get("/usuario/comentarios", async function (req: Request, res: Response) {
    const ruta = await myDataSource.getRepository(Ruta).find()
    res.json(ruta)
}) */
router.get("/ruta/:id", rutas_controller_1.getAllRutaById);
router.post("/ruta", rutas_controller_1.saveRuta);
router.put("/ruta/:id", rutas_controller_1.updateRuta);
router.delete("/ruta/:id", rutas_controller_1.deleteRuta);
exports.default = router;
//# sourceMappingURL=ruta.router.js.map