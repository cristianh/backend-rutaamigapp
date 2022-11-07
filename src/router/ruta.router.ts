import { Router } from "express"

//Controllers
import { getAllRutas, getAllRutaById, saveRuta, updateRuta, deleteRuta } from '../controllers/rutas.controller'

const router = Router()

// register Rutas
router.get("/rutas", getAllRutas)

/* router.get("/usuario/comentarios", async function (req: Request, res: Response) {
    const ruta = await myDataSource.getRepository(Ruta).find()
    res.json(ruta)
}) */



router.get("/ruta/:id", getAllRutaById)

router.post("/ruta", saveRuta)

router.put("/ruta/:id", updateRuta)

router.delete("/ruta/:id", deleteRuta)

export default router