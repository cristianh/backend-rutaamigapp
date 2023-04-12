import { Request, Response } from "express"
import { Forum } from "../entity/forum.entity"
import myDataSource from "../../app-data-source"
import { User } from "../entity/user.entity"

export class ForumController {

    /* A function that is going to get all the foros from the database. */
    public getAllForo = async (req: Request, res: Response) => {
        try {
            const foros = await myDataSource.getRepository(Forum).find()
            res.json(foros)
        } catch (error) {
            res.json({ error })
        }
    }


    /* Getting the foro by id. */
    public getForoById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Forum).findOneBy({
                forum_id: parseInt(req.params.id),
            })
            return res.status(200).send(results)
        } catch (error) {
            res.json({ error })
        }
    }



    /* Saving the foro in the database. */
    public saveForo = async (req: Request, res: Response) => {
        try {


            //Save in var the atributes of the request body
            let { estado, message, user_id } = req.body;

            const searchUser = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(user_id),
            })



            /* const dbForo = await myDataSource.getRepository(Forum).create({
                estado:estado,
                message: message,
                user: searchUser
            }) */


            //const forum = await myDataSource.getRepository(Forum).create(req.body)
            /* const results = await myDataSource.getRepository(Forum).save(dbForo)
             */return res.status(202).send({ status: "Foro guardado", msg:"" })
        } catch (error) {
            res.json({ error })
        }
    }

    /* Updating the foro in the database. */
    public updateForo = async (req: Request, res: Response) => {
        try {
            const foro = await myDataSource.getRepository(Forum).findOneBy({
                forum_id: parseInt(req.params.id),
            })
            myDataSource.getRepository(Forum).merge(foro, req.body)
            const results = await myDataSource.getRepository(Forum).save(foro)
            return res.status(200).send(200).json({ status: 'ok', results })
        } catch (error) {
            res.json({ error })
        }

    }

    /* Deleting the foro from the database. */
    public deleteForo = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Forum).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }
}
