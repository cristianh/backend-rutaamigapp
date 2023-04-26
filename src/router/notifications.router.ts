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
//validationJWT.validate
router.get("/allnotification/:all?/:limit?/:skip?",notificationController.getAllNotification);
router.get("/:id", notificationController.getNotificationById);
router.get("/notificationuser/:id", notificationController.getNotificationByUserId);
router.get("/notificationroute/:id", notificationController.getNotificationByRouteId);
router.post("/createNotification", notificationController.saveNotification);


export default router