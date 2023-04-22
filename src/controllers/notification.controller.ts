//Import require libraries
import { Request, Response } from "express"
import { User } from "../entity/user.entity";
import { Route } from "../entity/route.entity";
import { Notification } from "../entity/notification.entity";
import myDataSource from "../../app-data-source"

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
            const route_notification = await myDataSource.getRepository(Route).findOneBy({
                route_id: parseInt(req.params.id),
            })

            const user_notification = await myDataSource.getRepository(User).findOneBy({
                user_id: parseInt(req.params.id),
            })

            const dbNotification = await myDataSource.getRepository(Notification).create({
                notification_inverval: notification_inverval,
                notification_message: notification_message
            })

            //Create the request body
            const user = await myDataSource.getRepository(Notification).save(dbNotification)
            return res.status(201).send({ status: "Notificacion guardada con exito", user })


        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}