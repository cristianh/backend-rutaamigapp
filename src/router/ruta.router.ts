import {Router,Request, Response } from "express"
import { Ruta } from "../entity/ruta.entity"
import  myDataSource  from "../../app-data-source"

const router = Router()

// register Rutas
router.get("/rutas", async function (req: Request, res: Response) {
    const rutas = await myDataSource.getRepository(Ruta).find()
    res.json(rutas)
})

/* router.get("/usuario/comentarios", async function (req: Request, res: Response) {
    const ruta = await myDataSource.getRepository(Ruta).find()
    res.json(ruta)
}) */



router.get("/ruta/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Ruta).findOneBy({
        idRutas: parseInt(req.params.id),
    })
    return res.send(results)
})

router.post("/ruta", async function (req: Request, res: Response) {
    console.log(req.body)
    const ruta = await myDataSource.getRepository(Ruta).create(req.body)
    const results = await myDataSource.getRepository(Ruta).save(ruta)
    return res.send(results)
})

router.put("/ruta/:id", async function (req: Request, res: Response) {
    const usuario = await myDataSource.getRepository(Ruta).findOneBy({
        idRutas: parseInt(req.params.id),
    })
    myDataSource.getRepository(Ruta).merge(usuario, req.body)
    const results = await myDataSource.getRepository(Ruta).save(usuario)
    return res.send(results)
})

router.delete("/ruta/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Ruta).delete(req.params.id)
    return res.send(results)
})

export default router