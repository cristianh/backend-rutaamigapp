import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';


/**
 * This function gets all the users from the database and returns them in a JSON format.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 */
export const getAllUsers = async (req: Request, res: Response) => {
    const usuario = await myDataSource.getRepository(Usuario).find()
    res.json(usuario)
}


/**
 * It gets all the users and their comments.
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 */
export const getComentariesUsers = async (req: Request, res: Response) => {
    const usuario = await myDataSource.getRepository(Usuario).find({
        relations: {
            comentario: true,
        },
    })
    res.json(usuario)
}


/**
 * "I want to get a user by id and a comment by id, and I want to get the user's comments"
 * </code>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
export const getUserByIdComentariesById = async (req: Request, res: Response) => {
    const usuario = await myDataSource.getRepository(Usuario).find({
        relations: {
            comentario: true,
        },
        where: {
            idusuario: parseInt(req.params.usuarioId),
            comentario: {
                idComentarios: parseInt(req.params.comentarioId)
            }
        },
    })
    res.json(usuario)
}


/**
 * It gets a user by id from the database and returns it to the user.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response =&gt; Express.Response
 * @returns An object with the user data.
 */
export const getUserById = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(Usuario).findOneBy({
        idusuario: parseInt(req.params.id),
    })
    return res.send(results)
}


/**
 * It takes a request, validates it, and then saves it to the database.
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response
 * @returns {
 *     "errors": [
 *         {
 *             "value": "",
 *             "msg": "A value is required",
 *             "param": "nome",
 *             "location": "body"
 *         },
 *         {
 *             "value": "",
 *             "msg": "A value is required",
 *             "param": "email",
 */
export const saveUser = async (req: Request, res: Response) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.json({ errors: errors.array() });
    }

    const usuario = await myDataSource.getRepository(Usuario).create(req.body)
    const results = await myDataSource.getRepository(Usuario).save(usuario)
    return res.send(results)
}

/**
 * It takes a request, finds a user by id, merges the request body with the user, and saves the user.
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @returns The updated user.
 */
export const updateUser = async (req: Request, res: Response) => {
    const usuario = await myDataSource.getRepository(Usuario).findOneBy({
        idusuario: parseInt(req.params.id),
    })
    myDataSource.getRepository(Usuario).merge(usuario, req.body)
    const results = await myDataSource.getRepository(Usuario).save(usuario)
    return res.send(results)
}

/**
 * It deletes a user from the database
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response =&gt; The response object
 * @returns The number of rows affected by the delete operation.
 */
export const deleteUser = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(Usuario).delete(req.params.id)
    return res.send(results)
}