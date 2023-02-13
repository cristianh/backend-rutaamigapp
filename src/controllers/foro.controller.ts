import { Request, Response } from "express"
import { Foro } from "../entity/foro.entity"
import myDataSource from "../../app-data-source"

export class ForoController {

    public getAllForo = async (req: Request, res: Response) => {
        try {
            const foros = await myDataSource.getRepository(Foro).find()
            res.json(foros)
        } catch (error) {
            res.json({ error })
        }
    }


    public getForoById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Foro).findOneBy({
                idForo: parseInt(req.params.id),
            })
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }

    public saveForo = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const foro = await myDataSource.getRepository(Foro).create(req.body)
            const results = await myDataSource.getRepository(Foro).save(foro)
            return res.status(200).send({ status: "Ruta guardadad", results })
        } catch (error) {
            res.json({ error })
        }
    }

    public updateForo = async (req: Request, res: Response) => {
        try {
            const foro = await myDataSource.getRepository(Foro).findOneBy({
                idForo: parseInt(req.params.id),
            })
            myDataSource.getRepository(Foro).merge(foro, req.body)
            const results = await myDataSource.getRepository(Foro).save(foro)
            return res.send(200).json({ status: 'ok', results })
        } catch (error) {
            res.json({ error })
        }

    }

    public deleteForo = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Foro).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }
}
