import { Router, Request, Response } from "express"
import { Ruta } from "../entity/ruta.entity"
import myDataSource from "../../app-data-source"

export const getAllRutas = async (req: Request, res: Response) => {
    try {
        const rutas = await myDataSource.getRepository(Ruta).find()
        res.json(rutas)
    } catch (error) {
        res.json({ error })
    }
}


export const getAllRutaById = async (req: Request, res: Response) => {

    try {
        const results = await myDataSource.getRepository(Ruta).findOneBy({
            idRutas: parseInt(req.params.id),
        })
        return res.send(results)
    } catch (error) {
        res.json({ error })
    }
}

export const saveRuta = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const ruta = await myDataSource.getRepository(Ruta).create(req.body)
        const results = await myDataSource.getRepository(Ruta).save(ruta)
        return res.send(results)
    } catch (error) {
        res.json({ error })
    }
}

export const updateRuta = async (req: Request, res: Response) => {
    try {
        const usuario = await myDataSource.getRepository(Ruta).findOneBy({
            idRutas: parseInt(req.params.id),
        })
        myDataSource.getRepository(Ruta).merge(usuario, req.body)
        const results = await myDataSource.getRepository(Ruta).save(usuario)
        return res.send(200).json({ res: 'ok', results })
    } catch (error) {
        res.json({ error })
    }

}

export const deleteRuta = async (req: Request, res: Response) => {
    try {
        const results = await myDataSource.getRepository(Ruta).delete(req.params.id)
        return res.send(results)
    } catch (error) {
        res.json({ error })
    }

}