//Import require libraries
import { Request, Response } from "express"
import myDataSource from "../../app-data-source"

//Import express valitador this is like a regex code
import { validationResult } from 'express-validator';

//Import database of user entity 
import { User } from "../entity/user.entity"

//Import the library to encrypt password
import { bcrypGenerateEncript } from "../helpers/bcryptHelper";

//Take ORM methods
const userRepository = myDataSource.getRepository(User);



export class UserController {

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
                const user = await myDataSource.getRepository(User).find()
                let data = { user, totalUsers: user.length }

                res.status(200).json(data)
            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const usuario = await myDataSource.getRepository(User).find(query)
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
            const user = await myDataSource.getRepository(User).find({
                relations: {
                    comment: true,
                },
                where: {
                    user_id: parseInt(req.params.user_id)
                }
            })
            res.json(user)
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
            const user = await myDataSource.getRepository(User).find({
                relations: {
                    comment: true,
                },
                where: {
                    user_id: parseInt(req.params.user_id),
                    comment: {
                        comment_id: parseInt(req.params.comment_id)
                    }
                },
            })
            res.json(user)
        } catch (error) {
            res.json({ error })
        }
    }

    /* Getting all the comments of a user by id. */
    public getComentariesUsersById = async (req: Request, res: Response) => {
        try {
            const user = await myDataSource.getRepository(User).find({
                relations: {
                    comment: true,
                },
                where: {
                    user_id: parseInt(req.params.id),
                },
            })
            res.json(user)
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
            const results = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(req.params.id),
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
     * @returns  An Usuario object
     */

    public saveUser = async (req: Request, res: Response) => {

        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {
                //Save in var the atributes of the request body
                let { user_name, user_lastname, user_email, user_password } = req.body;

                const dbUser = await myDataSource.getRepository(User).create({
                    user_name: user_name,
                    user_lastname: user_lastname,
                    user_email: user_email,
                    user_password: bcrypGenerateEncript(user_password)
                })
                //Create the request body
                const user = await myDataSource.getRepository(User).save(dbUser)
                return res.status(201).send({ status: "Usuario guardado con exito", user })
            }

        } catch (error) {
            return res.json({ error })
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
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const searchUser = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(req.params.id),
            })

            //Save in var the atributes of the request body
            //let { user_name, user_lastname, user_email, user_password } = req.body;

            /* const dbUser = await myDataSource.getRepository(User).create({
                user_name: user_name,
                user_lastname: user_lastname,
                user_email: user_email,
                user_password: bcrypGenerateEncript(user_password)
            }) */
            //Create the request body
            myDataSource.getRepository(User).merge(searchUser, req.body)
            const user = await myDataSource.getRepository(User).update(searchUser.user_id,searchUser)
            return res.status(201).send({ status: "Usuario actualizado con exito", user })
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
            const result = await myDataSource.getRepository(User).delete(req.params.id)
            console.log(result)
            return res.status(200).json({ status: "Usuario eliminado con exito", result})
        } catch (error) {
            res.json({ error })
        }
    }
}