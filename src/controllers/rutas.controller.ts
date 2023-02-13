import { Router, Request, Response } from "express"
import { Ruta } from "../entity/ruta.entity"
import myDataSource from "../../app-data-source"

export class RutaController {

    public getAllRutas = async (req: Request, res: Response) => {
        try {
            const rutas = await myDataSource.getRepository(Ruta).find()
            res.json(rutas)
        } catch (error) {
            res.json({ error })
        }
    }


    public getAllRutaById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Ruta).findOneBy({
                idRutas: parseInt(req.params.id),
            })
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }

    public saveRuta = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const ruta = await myDataSource.getRepository(Ruta).create(req.body)
            const results = await myDataSource.getRepository(Ruta).save(ruta)
            return res.status(200).send({ status: "Ruta guardadad", results })
        } catch (error) {
            res.json({ error })
        }
    }

    public updateRuta = async (req: Request, res: Response) => {
        try {
            const usuario = await myDataSource.getRepository(Ruta).findOneBy({
                idRutas: parseInt(req.params.id),
            })
            myDataSource.getRepository(Ruta).merge(usuario, req.body)
            const results = await myDataSource.getRepository(Ruta).save(usuario)
            return res.send(200).json({ status: 'ok', results })
        } catch (error) {
            res.json({ error })
        }

    }

    public deleteRuta = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Ruta).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }

    }
}
