//Import dependences
import { Router, Request, Response } from "express"
import myDataSource from "../../app-data-source"

//Import database route entity
import { Route } from "../entity/route.entity"

//Import the library to encrypt password
import { bcrypGenerateEncript } from "src/helpers/bcryptHelper";
import router from "src/router/user.router";
import { validationResult } from "express-validator";

//Take ORM methods
const routeRepository = myDataSource.getRepository(Route);

export class RouteController {

    /* A function that is going to get all the rutas from the database. */
    public getAllRutas = async (req: Request, res: Response) => {
        try {

            let limit: any = req.query['limit'] || 10
            let skip: any = req.query['skip'] || 0
            let all: any = req.query['all'] || false

            let query;

            if (all) {
                const routes = await myDataSource.getRepository(Route).find()
                let data = { routes, totalRoutes: routes.length }

                res.status(200).json(data)

            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const usuario = await myDataSource.getRepository(Route).find(query)
                let data = { Route, totalRoutes: Route.length, page: skip, limit: limit }

                res.status(200).json(data)
            }
        } catch (error) {
            res.json({ error })
        }
    }


    /* Getting the id of the ruta and returning the results. */
    public getAllRutaById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Route).findOneBy({
                route_id: parseInt(req.params.id),
            })
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }

    /* Saving the ruta in the database. */
    public saveRuta = async (req: Request, res: Response) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                console.log(req.body)
                const ruta = await myDataSource.getRepository(Route).create(req.body)
                const results = await myDataSource.getRepository(Route).save(ruta)
                return res.status(200).send({ status: "Ruta guardada de manera exitosa", results })
            }
        } catch (error) {
            res.json({ error })
        }
    }

    /* Updating the ruta in the database. */
    public updateRuta = async (req: Request, res: Response) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                const searchUser = await myDataSource.getRepository(Route).findOneBy({
                    route_id: parseInt(req.params.id),
                })

                const usuario = await myDataSource.getRepository(Route).findOneBy({
                    route_id: parseInt(req.params.id),
                })
                myDataSource.getRepository(Route).merge(usuario, req.body)
                const results = await myDataSource.getRepository(Route).save(usuario)
                return res.send(200).json({ status: 'ok', results })

            }
        } catch (error) {
            res.json({ error })
        }
    }

    /* Deleting the ruta from the database. */
    public deleteRuta = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(Route).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }
}
