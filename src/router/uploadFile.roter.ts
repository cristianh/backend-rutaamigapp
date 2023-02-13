import { Router, Request, Response } from "express";

const router = Router()
const path = require('path');

router.post("/", async (req: Request, res: Response) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "Archivo no cargado."
            })
        } else {
            //Info file


            let imagenUpload: any = req.files.imagen;
            //Implementar el sanitizador para evitar archivos indeseados
            imagenUpload.mv( path.resolve(__dirname, '../../uploads',imagenUpload.name))
           

            res.send({
                status: 200,
                message: "Archivo Cargado",
                data: {
                    name:imagenUpload.name,
                    mimetype: imagenUpload.mimetype,
                    size:imagenUpload.size
                }
            })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
});

export default router