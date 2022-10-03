import {Router,Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import  myDataSource  from "../../app-data-source"

const router = Router()

// register Usuarios
router.get("/usuario", async function (req: Request, res: Response) {
    const usuario = await myDataSource.getRepository(Usuario).find()
    res.json(usuario)
})

router.get("/usuario/comentarios", async function (req: Request, res: Response) {
    const usuario = await myDataSource.getRepository(Usuario).find({
        relations: {
            comentario: true,
        },
    })
    res.json(usuario)
})

router.get("/usuario/:usuarioId/comentarios/:comentarioId", async function (req: Request, res: Response) {
    const usuario = await myDataSource.getRepository(Usuario).find({
        relations: {
            comentario: true,
        },
    })
    res.json(usuario)
})

router.get("/usuario/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Usuario).findOneBy({
        idusuario: parseInt(req.params.id),
    })
    return res.send(results)
})

router.post("/usuario", async function (req: Request, res: Response) {
    console.log(req.body)
    const usuario = await myDataSource.getRepository(Usuario).create(req.body)
    const results = await myDataSource.getRepository(Usuario).save(usuario)
    return res.send(results)
})

router.put("/usuario/:id", async function (req: Request, res: Response) {
    const usuario = await myDataSource.getRepository(Usuario).findOneBy({
        idusuario: parseInt(req.params.id),
    })
    myDataSource.getRepository(Usuario).merge(usuario, req.body)
    const results = await myDataSource.getRepository(Usuario).save(usuario)
    return res.send(results)
})

router.delete("/usuario/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Usuario).delete(req.params.id)
    return res.send(results)
})

export default router