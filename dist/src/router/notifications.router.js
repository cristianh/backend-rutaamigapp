"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//path 
var path = require('path');
//Controllers
var notification_controller_1 = require("../controllers/notification.controller");
var router = (0, express_1.Router)();
//Inicializamos el controlador.
var notificationController = new notification_controller_1.NotificationController();
//Middleware
var middleware_1 = require("./../middleware");
//Inicialize validation.
var validation = new middleware_1.Validations();
var validationJWT = new middleware_1.ValidatiteJWT();
// Notification routes
//validationJWT.validate
router.get("/allnotification/:all?/:limit?/:skip?", notificationController.getAllNotification);
router.get("/:id", notificationController.getNotificationById);
router.get("/notificationuser/:id", notificationController.getNotificationByUserId);
router.get("/notificationroute/:id", notificationController.getNotificationByRouteId);
router.post("/createNotification", notificationController.saveNotification);
exports.default = router;
//# sourceMappingURL=notifications.router.js.map