import {Router,Request, Response } from "express"
import { Comentario } from "../entity/comentario.entity"
import { Usuario } from "../entity/usuario.entity"
import  myDataSource  from "../../app-data-source"

const router = Router()

// register Comentarios
router.get("/comentarios", async function (req: Request, res: Response) {
    const comentario = await myDataSource.getRepository(Comentario).find()
    res.json(comentario)
})

router.get("/comentario/usuario", async function (req: Request, res: Response) {
    const comentario = await myDataSource.getRepository(Comentario).find({
        relations: {
            usuario: true,
        },
    })
    res.json(comentario)
})

router.get("/comentario/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Comentario).findOneBy({
        idComentarios: parseInt(req.params.id),
    })
    return res.send(results)
})

router.post("/comentario", async function (req: Request, res: Response) {
    console.log(req.body)
    const comentario = await myDataSource.getRepository(Comentario).create(req.body)
    const results = await myDataSource.getRepository(Comentario).save(comentario)
    return res.send(results)
})

router.put("/comentario/:id", async function (req: Request, res: Response) {
    const comentario = await myDataSource.getRepository(Comentario).findOneBy({
        idComentarios: parseInt(req.params.id),
    })
    myDataSource.getRepository(Comentario).merge(comentario, req.body)
    const results = await myDataSource.getRepository(Comentario).save(comentario)
    return res.send(results)
})

router.delete("/comentario/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Comentario).delete(req.params.id)
    return res.send(results)
})

export default router