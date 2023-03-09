import { Router, Request, Response } from "express"
import { RutaUsuario } from "../entity/rutausuario.entity"
import myDataSource from "../../app-data-source"

export class RutaController {

    /* A function that is going to get all the rutas from the database. */
    public getAllRutas = async (req: Request, res: Response) => {
        try {
            const rutas = await myDataSource.getRepository(RutaUsuario).find()
            res.json(rutas)
        } catch (error) {
            res.json({ error })
        }
    }


   /* Getting the id of the ruta and returning the results. */
    public getAllRutaById = async (req: Request, res: Response) => {

        try {
            const results = await myDataSource.getRepository(RutaUsuario).findOneBy({
                idrutausuario: parseInt(req.params.id),
            })
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }

   /* Saving the ruta in the database. */
    public saveRuta = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const ruta = await myDataSource.getRepository(RutaUsuario).create(req.body)
            const results = await myDataSource.getRepository(RutaUsuario).save(ruta)
            return res.status(200).send({ status: "Ruta guardada", results })
        } catch (error) {
            res.json({ error })
        }
    }

   /* Updating the ruta in the database. */
    public updateRuta = async (req: Request, res: Response) => {
        try {
            const usuario = await myDataSource.getRepository(RutaUsuario).findOneBy({
                idrutausuario: parseInt(req.params.id),
            })
            myDataSource.getRepository(RutaUsuario).merge(usuario, req.body)
            const results = await myDataSource.getRepository(RutaUsuario).save(usuario)
            return res.send(200).json({ status: 'ok', results })
        } catch (error) {
            res.json({ error })
        }
    }

    /* Deleting the ruta from the database. */
    public deleteRuta = async (req: Request, res: Response) => {
        try {
            const results = await myDataSource.getRepository(RutaUsuario).delete(req.params.id)
            return res.send(results)
        } catch (error) {
            res.json({ error })
        }
    }
}
