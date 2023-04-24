import { Router,Response,Request} from "express";

//path 
const path = require('path');

//Controllers
import {NotificationController} from '../controllers/notification.controller';
const router = Router()
//Inicializamos el controlador.
const notificationController = new NotificationController();

//Middleware
import { Validations, ValidatiteJWT } from './../middleware';

//Inicialize validation.
const validation = new Validations()
const validationJWT = new ValidatiteJWT()


// Notification routes

router.get("/allnotification/:all?/:limit?/:skip?",validationJWT.validate,notificationController.getAllNotification);
/* router.get("/:id", userController.getUserById); */
/* router.post("/registro", validation.validateFormUsuarioRegister(), userController.saveUser);
router.put("/:id", userController.updateUser);
router.delete("/:id",userController.deleteUser); */

export default router