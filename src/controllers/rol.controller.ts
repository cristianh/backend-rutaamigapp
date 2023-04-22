//Import dependences
import { Router, Request, Response } from "express"
import myDataSource from "../../app-data-source"
import { User } from "src/entity/user.entity"
import { Rol } from "src/entity/rol.entity"
import { validationResult } from 'express-validator';

export class RolController {
    /**
     * This function return all rols from the database
     * @param req Request - The request object
     * @param res Response - The response object
     */
    public getAllRol = async (req: Request, res: Response) => {
        try {

            let limit: any = req.query['limit'] || 10
            let skip: any = req.query['skip'] || 0
            let all: any = req.query['all'] || false

            let query;

            if (all) {
                const rol = await myDataSource.getRepository(Rol).find({
                    relations: {
                        rol_user: true,
                    },
                })
                let data = { rol, totalRol: rol.length }

                res.status(200).json(data)
            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const rol = await myDataSource.getRepository(Rol).find(query)
                let data = { rol, totalRol: rol.length, page: skip, limit: limit }

                res.status(200).json(data)
            }

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    /**
     * It gets a rol by id from the database and returns it to the user.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response  Express.Response
     * @returns An object with the user data.
     */
    public getRolById = async (req: Request, res: Response) => {
        try {
            const rols = await myDataSource.getRepository(Rol).findOneBy({
                id_rol: parseInt(req.params.id),
            })
            return res.send(rols)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    /**
     * This function return all users by rol from the database
     * @param req Request - The request object
     * @param res Response - The response object
     */
    public getUserByIdRol = async (req: Request, res: Response) => {
        try {
            const user_rol = await myDataSource.getRepository(Rol).find({
                relations: {
                    rol_user: true,
                },
                where: {
                    id_rol: parseInt(req.params.id)
                }
            });

            res.json(user_rol)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    /**
     * This function return save rol in the database
     * @param req Request - The request object
     * @param res Response - The response object
     */
    public saveUser = async (req: Request, res: Response) => {

        try {
            //Save in var the atributes of the request body
            let { nombre_rol } = req.body;

            const dbRol = await myDataSource.getRepository(Rol).create({
                nombre_rol: nombre_rol
            })

            //Create the request body
            const rol = await myDataSource.getRepository(Rol).save(dbRol)
            return res.status(201).send({ status: "Rol guardado con exito", rol })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    /**
     * It takes a request, finds a rol by id, merges the request body with the rol, and update it.
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @returns The updated rol.
     */
    public updateRol = async (req: Request, res: Response) => {
        try {
            const searchRol = await myDataSource.getRepository(Rol).findOneBy({
                id_rol: parseInt(req.params.id),
            })

            myDataSource.getRepository(Rol).merge(searchRol, req.body)
            const user = await myDataSource.getRepository(Rol).update(searchRol.id_rol, searchRol)
            return res.status(201).send({ status: "Rol actualizado con exito", user })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    /**
     * It deletes a rol from the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; The response object
     * @returns The number of rows affected by the delete operation.
     */
    public deleteRol = async (req: Request, res: Response) => {
        try {
            const searchRol = await myDataSource.getRepository(Rol).findOneBy({
                id_rol: parseInt(req.params.id),
            })

            const result = await myDataSource.getRepository(Rol).update(searchRol.id_rol, searchRol)
            console.log(result)
            return res.status(200).json({ status: "Rol eliminado con exito", result })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

}