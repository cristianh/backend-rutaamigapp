import { Request, Response } from "express"
import { Foro } from "../entity/foro.entity"
import myDataSource from "../../app-data-source"

export class ForoController {

    /* A function that is going to get all the foros from the database. */
    public getAllForo = async (req: Request, res: Response) => {
        try {
            const foros = await myDataSource.getRepository(Foro).find()
            res.json(foros)
        } catch (error) {
            res.json({ error })
        }
    }


    /* Getting the foro by id. */
    public getForoById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Foro).findOneBy({
                idForo: parseInt(req.params.id),
            })
            return res.status(200).send(results)
        } catch (error) {
            res.json({ error })
        }
    }

    /* Saving the foro in the database. */
    public saveForo = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const foro = await myDataSource.getRepository(Foro).create(req.body)
            const results = await myDataSource.getRepository(Foro).save(foro)
            return res.status(202).send({ status: "Ruta guardadad", results })
        } catch (error) {
            res.json({ error })
        }
    }

    /* Updating the foro in the database. */
    public updateForo = async (req: Request, res: Response) => {
        try {
            const foro = await myDataSource.getRepository(Foro).findOneBy({
                idForo: parseInt(req.params.id),
            })
            myDataSource.getRepository(Foro).merge(foro, req.body)
            const results = await myDataSource.getRepository(Foro).save(foro)
            return res.status(200).send(200).json({ status: 'ok', results })
        } catch (error) {
            res.json({ error })
        }

    }

    /* Deleting the foro from the database. */
    public deleteForo = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Foro).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }
}
