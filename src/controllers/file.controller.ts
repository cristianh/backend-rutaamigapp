//Import require libraries
import { Request, Response } from "express"
import { User } from "../entity/user.entity";
import myDataSource from "../../src/app-data-source"
const cloudinary = require("cloudinary").v2;

//Set the image server. 
cloudinary.config({
    cloud_name: "dl7oqoile",
    api_key: "511562285567879",
    api_secret: "d802VmOJ78uIQoBlo2cq8sCEuiE"
});

//Import database of user entity 
import { File } from "../entity/file.entity"

export class FileController {

    /**
     * The above code is a function to save file.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns Status string.
     */
    /*  */
    public saveFile = async (req: Request, res: Response) => {
        try {
                console.log(req.file)
            cloudinary.image(req.file.originalname, { width: 150, height: 150, gravity: "face", radius: "max", crop: "fill" })

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'uploads/',
                transformation: [
                    { gravity: "face", height: 400, width: 400, crop: "crop" },
                    { radius: "max" },
                    { width: 200, crop: "scale" }
                ]
            });

            // We keep the name and URL generated in Cloudinary.
            const filename = req.file.originalname;
            const cloudinary_url = result.secure_url;

            const user = await myDataSource.getRepository(User).findOne({
                where: {
                    user_id: 1
                }
            })

            /* const dbUserFile = await myDataSource.getRepository(File).create({
                file_name: filename,
                cloudinary_url: cloudinary_url
                user:user
            }) */

            const dbUserFile = new File();
            dbUserFile.file_name = filename,
            dbUserFile.cloudinary_url = cloudinary_url
            dbUserFile.user = user
            const fileuser = await myDataSource.getRepository(File).save(dbUserFile)
            return res.status(201).send({ status: "¡Archivo cargado correctamente!", File })
        } catch (error) {
            return res.status(500).send({ msg: 'Se ha producido un error al cargar el archivo', error })
        }
    }

    public saveFileNotificacion = async (req: Request, res: Response) => {
        try {       
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'uploads/',
                transformation: [
                    { width: 800, height: 600}
                ]
            });

            // We keep the name and URL generated in Cloudinary.
            const filename = req.file.originalname;
            const cloudinary_url = result.secure_url;

           
            return res.status(201).send({ status: "¡Archivo cargado correctamente!", url:cloudinary_url })
        } catch (error) {
            return res.status(500).send({ msg: 'Se ha producido un error al cargar el archivo', error })
        }
    }
}