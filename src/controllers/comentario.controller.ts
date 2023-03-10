//Import dependences
import { Request, Response } from "express"
import myDataSource from "../../app-data-source"

//Import database entities
import { Comment } from "../entity/comment.entity"
import { User } from "../entity/user.entity"

export class ComentarioController {
    /**
 * This function gets all the comentaries from the database and returns them as a JSON object.
 * @param {Request} req - Request - The incoming request object.
 * @param {Response} res - Response - The response object that will be sent back to the client.
 */
    public getAllComentaries = async (req: Request, res: Response) => {
        const comentario = await myDataSource.getRepository(Comment).find()
        res.json(comentario)
    }

    /**
     * It gets all the comentarios from the database and returns them as a JSON object.
     * @param {Request} req - Request - The incoming request object.
     * @param {Response} res - Response - the response object
     */
    public getAllComentariesUsuario = async (req: Request, res: Response) => {
        const comentario = await myDataSource.getRepository(Comment).find({
            relations: {
                user: true,
            },
        })
        res.json(comentario)
    }

    /**
     * It gets a comentary by its id.
     * @param {Request} req - Request
     * @param {Response} res - Response =&gt; Express.Response
     * @returns An array of objects.
     */
    public getComentariesById = async (req: Request, res: Response) => {
        const results = await myDataSource.getRepository(Comment    ).findOneBy({
            comment_id: parseInt(req.params.id),
        })
        return res.send(results)
    }

    /**
     * It takes a request, and a response, and returns a response
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @returns {
     *     "id": 1,
     *     "comentario": "teste",
     *     "data": "2019-07-29T00:00:00.000Z",
     *     "usuario": {
     *         "id": 1,
     *         "nome": "teste",
     *         "email": "teste@teste.com
     */
    public saveComentaries = async (req: Request, res: Response) => {
        try {
            const comment = await myDataSource.getRepository(Comment).create(req.body)
            const results = await myDataSource.getRepository(Comment).save(comment)
            return res.status(200).send({ status: "Comentario guardado con exito", results })
        } catch (error) {
            res.json({ error })
        }

    }

    /**
     * It takes the id of a comentary, finds it in the database, merges the new data with the old data, and
     * saves it.
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response
     * @returns The updated object.
     */
    public updateComentaries = async (req: Request, res: Response) => {
        const comment = await myDataSource.getRepository(Comment).findOneBy({
            comment_id: parseInt(req.params.id),
        })
        myDataSource.getRepository(Comment).merge(comment, req.body)
        const results = await myDataSource.getRepository(Comment).update(comment.comment_id,comment)
        return res.status(201).send({ status: "Comentario actualizado con exito", results })
    }

    /**
     * It deletes a comment from the database
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response
     * @returns The result of the delete operation.
     */
    public deleteComentaries = async (req: Request, res: Response) => {
        const results = await myDataSource.getRepository(Comment).delete(req.params.id)
        return res.status(200).json({ status: "Comentario eliminado con exito", results})
    }
}

