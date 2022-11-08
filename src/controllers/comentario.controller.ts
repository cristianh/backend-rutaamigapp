import { Request, Response } from "express"
import { Comentario } from "../entity/comentario.entity"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"

/**
 * This function gets all the comentaries from the database and returns them as a JSON object.
 * @param {Request} req - Request - The incoming request object.
 * @param {Response} res - Response - The response object that will be sent back to the client.
 */
export const getAllComentaries = async (req: Request, res: Response) => {
    const comentario = await myDataSource.getRepository(Comentario).find()
    res.json(comentario)
}

/**
 * It gets all the comentarios from the database and returns them as a JSON object.
 * @param {Request} req - Request - The incoming request object.
 * @param {Response} res - Response - the response object
 */
export const getAllComentariesUsuario = async (req: Request, res: Response) => {
    const comentario = await myDataSource.getRepository(Comentario).find({
        relations: {
            usuario: true,
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
export const getComentariesById = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(Comentario).findOneBy({
        idComentarios: parseInt(req.params.id),
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
export const saveComentaries = async (req: Request, res: Response) => {
    try {
        const comentario = await myDataSource.getRepository(Comentario).create(req.body)
        const results = await myDataSource.getRepository(Comentario).save(comentario)
        return res.status(100).send({status:"Comentario guardado",results})
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
export const updateComentaries = async (req: Request, res: Response) => {
    const comentario = await myDataSource.getRepository(Comentario).findOneBy({
        idComentarios: parseInt(req.params.id),
    })
    myDataSource.getRepository(Comentario).merge(comentario, req.body)
    const results = await myDataSource.getRepository(Comentario).save(comentario)
    return res.send(results)
}

/**
 * It deletes a comment from the database
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response
 * @returns The result of the delete operation.
 */
export const deleteComentaries = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(Comentario).delete(req.params.id)
    return res.send(results)
}