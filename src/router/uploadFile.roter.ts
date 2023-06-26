import { Router, Request, Response } from "express";
//WE IMPORT THE MULTER AND CLOUDINARY LIBRARIES.
import * as multer from 'multer';

//Controllers
import {FileController} from '../controllers/file.controller'

/* import * as cloudinary from 'cloudinary'; */


const router = Router()
const path = require('path');

// We configure the folder where the images are uploaded
const upload = multer({ dest: __dirname + '../../uploads' })


//Inicializamos el controlador.
const fileUserController = new FileController();

router.post("/upload", upload.single('file'),fileUserController.saveFile);
router.post("/uploadNotificacionImagen", upload.single('file'),fileUserController.saveFileNotificacion);

export default router