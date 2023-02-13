import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';
//bycripts.js
import * as bcryptjs from 'bcryptjs'

//Trae los metodos del ORM
const userRepository = myDataSource.getRepository(Usuario);



export class UsuarioController {

    /**
 * This function gets all the users from the database and returns them in a JSON format.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 */
    public getAllUsers = async (req: Request, res: Response) => {
        try {

            let limit: any = req.query['limit'] || 10
            let skip: any = req.query['skip'] || 0
            let all: any = req.query['all'] || false

            let query;

            if (all) {
                const usuario = await myDataSource.getRepository(Usuario).find()
                let data = { usuario, totalUsers: usuario.length }

                res.status(200).json(data)
            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const usuario = await myDataSource.getRepository(Usuario).find(query)
                let data = { usuario, totalUsers: usuario.length, page: skip, limit: limit }

                res.status(200).json(data)
            }

        } catch (error) {
            res.json({ error })
        }
    }

    /**
     * It gets all the users and their comments.
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response - The response object.
     */
    public getComentariesUsers = async (req: Request, res: Response) => {

        try {
            const usuario = await myDataSource.getRepository(Usuario).find({
                relations: {
                    comentario: true,
                },
                where: {
                    idusuario: parseInt(req.params.usuarioId)
                }
            })
            res.json(usuario)
        } catch (error) {
            res.json({ error })
        }


    }


    /**
     * "I want to get a user by id and a comment by id, and I want to get the user's comments"
     * </code>
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getUserByIdComentariesById = async (req: Request, res: Response) => {
        try {
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
        } catch (error) {
            res.json({ error })
        }
    }

    /* Getting all the comments of a user by id. */
    public getComentariesUsersById = async (req: Request, res: Response) => {
        try {
            const usuario = await myDataSource.getRepository(Usuario).find({
                relations: {
                    comentario: true,
                },
                where: {
                    idusuario: parseInt(req.params.id),
                },
            })
            res.json(usuario)
        } catch (error) {
            res.json({ error })
        }
    }


    /**
     * It gets a user by id from the database and returns it to the user.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express.Response
     * @returns An object with the user data.
     */
    public getUserById = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Usuario).findOneBy({
                idusuario: parseInt(req.params.id),
            })
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
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

    public saveUser = async (req: Request, res: Response) => {

        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            }

            //Se guarda el usuario
            //Save in a var the atributes of the request body
            let { nombre_usuario, apellido_usuario, correo_usuario, password_usuario } = req.body;

            const dbUser = await myDataSource.getRepository(Usuario).create({
                nombre_usuario: nombre_usuario,
                apellido_usuario: apellido_usuario,
                correo_usuario: correo_usuario,
                password_usuario: bcryptjs.hashSync(password_usuario, 10)
            })
            //Se crea la solicitud del cuerpo
            const usuario = await myDataSource.getRepository(Usuario).save(dbUser)
            return res.status(201).send({ status: "Usuario guardado con exito", usuario})

        } catch (error) {
            res.json({ error })
        }
    }

    /**
     * It takes a request, finds a user by id, merges the request body with the user, and saves the user.
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @returns The updated user.
     */
    public updateUser = async (req: Request, res: Response) => {
        try {
            const usuario = await myDataSource.getRepository(Usuario).findOneBy({
                idusuario: parseInt(req.params.id),
            })
            myDataSource.getRepository(Usuario).merge(usuario, req.body)
            const results = await myDataSource.getRepository(Usuario).save(usuario)
            return res.send(200).json({ res: "Usuario actualizado con exito", results })
        } catch (error) {
            res.json({ error })
        }

    }

    /**
     * It deletes a user from the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; The response object
     * @returns The number of rows affected by the delete operation.
     */
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const result = await myDataSource.getRepository(Usuario).delete(req.params.id)
            console.log(result)
            return res.status(200).json({ result, mensaje: "ok" })
        } catch (error) {
            res.json({ error })
        }
    }
}

