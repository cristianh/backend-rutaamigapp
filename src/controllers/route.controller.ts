//Import dependences
import { Router, Request, Response } from "express"
import myDataSource from "../../src/app-data-source"

//Import database route entity
import { Route } from "../entity/route.entity"

//Import the library to encrypt password

import { validationResult } from "express-validator";

//Take ORM methods
const routeRepository = myDataSource.getRepository(Route);

/* The RouteController class contains methods for retrieving, saving, updating, and deleting routes
from a database. */
export class RouteController {

    
    /**
     * A function that is going to get all the rutas from the database.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns 
     */
    public getAllRoute = async (req: Request, res: Response) => {
        try {

            let limit: any = req.query['limit'] || 10
            let skip: any = req.query['skip'] || 0
            let all: any = req.query['all'] || false

            let query;

            if (all) {
                const routes = await myDataSource.getRepository(Route).find()
                let data = { routes, totalRoutes: routes.length }

                return res.status(200).json(data)

            } else {
                query = {
                    skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                    take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                }
                const route = await myDataSource.getRepository(Route).find(query)
                let data = { route, totalRoutes: route.length, page: skip, limit: limit }

                return res.status(200).json(data)
            }
        } catch (error) {
            return res.json({ error })
        }
    }



    /**
     * Getting the id of the ruta and returning the results.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns string
     */
    public getRouteById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(Route).findOneBy({
                route_id: parseInt(req.params.id),
            });

            if (!results) {
                return res.status(200).send({ status: `Ruta con id: '${req.params.id}' no encontrada` })
                
            } 

            return res.status(200).send(results)


        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    
    /**
     * Saving the Route in the database.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns 
     */
    public saveRoute = async (req: Request, res: Response) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {

                const ruta = await myDataSource.getRepository(Route).create(req.body)
                const results = await myDataSource.getRepository(Route).save(ruta)
                return res.status(200).send({ status: "Ruta guardada de manera exitosa", results })
            }
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    /**
    * Set route in database.
    * @param {Request} req - Request - The request object
    * @param {Response} res - Response - The response object
    * @returns string
    */
    public updateRoute = async (req: Request, res: Response) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                const searchRoute = await myDataSource.getRepository(Route).findOneBy({
                    route_id: parseInt(req.params.id),
                })

                if(!searchRoute){
                    return res.status(201).send({ status: `Ruta id: '${req.params.id}' no encontrada`  })
                }


                //JOIN DATA DB AND REQUEST BODY
                myDataSource.getRepository(Route).merge(searchRoute, req.body)
                //UPDATE DATA
                const router = await myDataSource.getRepository(Route).update(searchRoute.route_id, searchRoute)
                if (router) {
                    return res.status(201).send({ status: "Ruta actualizada con exito", router })
                }
            }
        } catch (error) {
            return res.send(500).json({ error })
        }
    }

    /**
     * Delete route in database.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns string
     */

    public deleteRoute = async (req: Request, res: Response) => {
        try {

            const searchRoute = await myDataSource.getRepository(Route).findOneBy({
                route_id: parseInt(req.params.id),
            })

            
            if(!searchRoute){
                return res.status(201).send({ status: `Ruta id: '${req.params.id}' no encontrada`  })
            }

            const results = await myDataSource.getRepository(Route).delete(req.params.id)

            return res.status(200).send({result:`Ruta  '${req.params.id}' Eliminada`,results})
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}
