//Import require libraries
import { Request, Response } from "express"
import { User } from "../entity/user.entity";
import { Route } from "../entity/route.entity";
import { Notification } from "../entity/notification.entity";
import myDataSource from "../../src/app-data-source"

/**
 * 
 */
/* The NotificationController class is being exported. */
export class NotificationController {

    /**
     * Function return all notification users.
     * @param req 
     * @param res 
     */
    public getAllNotification = async (req: Request, res: Response) => {
        try {

            let limit: any = req.query['limit'] || 10
            let skip: any = req.query['skip'] || 0
            let all: any = req.query['all'] || false

            let query;

            if (all) {
                const notification = await myDataSource.getRepository(Notification).find({
                    relations: {
                        user_notification: true,
                        route_notification: true
                    },
                })

                let data = { notification, totalNotication: notification.length }

                return res.status(200).json(data)
            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const notification = await myDataSource.getRepository(Notification).find(query)
                let data = { notification, totalNotification: notification.length, page: skip, limit: limit }

                return res.status(200).json(data)
            }

        } catch (error) {
            return res.status(200).json({ error: error.message })
        }
    }

    public saveNotification = async (req: Request, res: Response) => {

        try {

            //Save in var the atributes of the request body
            let { notification_inverval, notification_message, route_id, user_id } = req.body;

            //Create the request body
            const routefind = await myDataSource.getRepository(Route).findOneBy({
                route_id: parseInt(route_id),
            })

            if (!routefind) {
                return res.status(201).send({ status: `Ruta ${route_id} no encontrado.` })
            }

            //Find user
            const userfind = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(user_id),
            })

            if (!userfind) {
                return res.status(201).send({ status: `Usuario ${user_id} no encontrado.` })
            }


            const dbNotification = await myDataSource.getRepository(Notification).create({
                notification_inverval: notification_inverval,
                notification_message: notification_message,
                route_notification: routefind,
                user_notification: userfind
            })

            //Create the request body
            const user = await myDataSource.getRepository(Notification).save(dbNotification)
            return res.status(201).send({ status: "Notificacion guardada con exito", user })


        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    /**
    * It gets a notification by id from the database and returns it to the notification.
    * @param {Request} req - Request - The request object
    * @param {Response} res - Response =&gt; Express.Response
    * @returns An object with the user data.
    */
    public getNotificationById = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Notification).findOneBy({
                id_notification: parseInt(req.params.id),
            })

            if (!results) {
                return res.status(200).send({ status: `Notificacion con id: '${req.params.id}' no encontrado.` })
            }


            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    /**
    * It gets a notification by id from the database and returns it to the notification.
    * @param {Request} req - Request - The request object
    * @param {Response} res - Response =&gt; Express.Response
    * @returns An object with the user data.
    */
    public getNotificationByUserId = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Notification).find({
                relations: {
                    user_notification: true
                },
                where: {
                    user_notification: {
                        user_id: parseInt(req.params.id)
                    }
                }
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
    * It gets a notification by id from the database and returns it to the notification.
    * @param {Request} req - Request - The request object
    * @param {Response} res - Response =&gt; Express.Response
    * @returns An object with the user data.
    */
     public getNotificationByRouteId = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Notification).find({
                relations: {
                    route_notification: true
                },
                where: {
                    route_notification: {
                        route_id: parseInt(req.params.id)
                    }
                }
            })

            if (!results) {
                return res.status(200).send({ status: `Ruta con id: '${req.params.id}' no encontrado.` })
            }


            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}