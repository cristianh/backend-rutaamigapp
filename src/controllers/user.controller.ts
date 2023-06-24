//Import require libraries
import { Request, Response } from "express"
import myDataSource from "../../src/app-data-source"

//Import express valitador this is like a regex code
import { validationResult } from 'express-validator';

//Import the library to encrypt password
import { bcrypGenerateEncript } from "../helpers/bcryptHelper";

//Import database of user entity 
import { User } from "../entity/user.entity"
import { Rol } from "../entity/rol.entity"


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
                const user = await myDataSource.getRepository(User).find({
                    relations: {
                        file: true,
                        notification: true,
                        rol_user: true
                    },
                    where: {
                        user_status:true
                    }
                })
                let data = { user, totalUsers: user.length }

                return res.status(200).json(data)
            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit),
                    where: {
                        user_status:true
                    }   
                }
                const usuario = await myDataSource.getRepository(User).find(query)

                const user = await myDataSource.getRepository(User).find({
                    relations: {
                        file: true,
                        notification: true,
                        rol_user: true
                    },
                    where: {
                        user_status:true
                    }
                })

                let data = { usuario, totalUsers: user.length,totalUsersPage: usuario.length, page: skip, limit: limit }

                return res.status(200).json(data)
            }

        } catch (error) {
            return res.json({ error: error.message })
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

            if (!results) {
                return res.status(200).send({ status: `Usuario con id: '${req.params.id}' no encontrado.` })
            }


            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    /**
     * It gets a user by id from the database and returns it to the user.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express.Response
     * @returns An object with the user data.
     */
     public getUserByEmail = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(User).find({
                where: {
                    user_email:req.params.email,
                    user_status:true
                }
                
            })

            if (!results) {
                return res.status(200).send({ status: `Usuario con correo: '${req.params.email}' no encontrado.` })
            }


            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    public getUserByRol = async (req: Request, res: Response) => {
        try {
            //Find rol user login.
            const results: User[] = await myDataSource.getRepository(User).find({
                relations: {
                    rol_user: true
                },
                where: {
                    rol_user: {
                        id_rol: parseInt(req.params.id)
                    }
                }
            })

            if (!results) {
                return res.status(200).send({ status: `No se encuentran datos` })
            }


            return res.status(200).send({ results: results })
        } catch (error) {
            return res.status(500).json({ error })
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

                //FIND ROL IN DB
                const findRol = await myDataSource.getRepository(Rol).findOneBy({
                    id_rol: 2
                })

                //FIND ROLL FOR ID
                if (!findRol) {
                    return res.status(201).send({ status: `Rol de usuario  no encontrado` })
                }


               


                const dbUser = await myDataSource.getRepository(User).create({
                    user_name: user_name,
                    user_lastname: user_lastname,
                    user_email: user_email,
                    user_password: bcrypGenerateEncript(user_password),
                    rol_user: findRol
                })



                //Create the request body
                const user = await myDataSource.getRepository(User).save(dbUser)

                return res.status(201).send({ status: "Usuario guardado con exito." })
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

            if (!searchUser) {
                return res.status(200).send({ status: `Usuario con id: '${req.params.id}' no encontrado.` })
            }


            myDataSource.getRepository(User).merge(searchUser, req.body)
            const user = await myDataSource.getRepository(User).update(searchUser.user_id, searchUser)
            return res.status(201).send({ status: "Usuario actualizado con exito", user })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    /**
     * It deletes a user from the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; The response object
     * @returns The number of rows affected by the delete operation.
     */
    public deleteUser = async (req: Request, res: Response) => {
        //LOGIC DELETE USER ACOUNT.
        try {
            const searchUser = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(req.params.id),
            })

            if (!searchUser) {
                return res.status(200).send({ status: `Usuario con id: '${req.params.id}' no encontrado.` })
            }

            searchUser.user_status = Boolean(0)
            const result = await myDataSource.getRepository(User).update(searchUser.user_id, searchUser)

            return res.status(200).json({ status: "Usuario eliminado con exito", result })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

}