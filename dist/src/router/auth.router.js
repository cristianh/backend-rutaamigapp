"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//Controllers
var auth_controller_1 = require("../controllers/auth.controller");
var forgetpassord_controller_1 = require("../controllers/forgetpassord.controller");
var path = require('path');
//Middleware
var middleware_1 = require("./../middleware");
//Inicialize validation.
var validation = new middleware_1.Validations();
var validationJWT = new middleware_1.ValidatiteJWT();
var router = (0, express_1.Router)();
//Inicialize the controller.
var authController = new auth_controller_1.AuthController();
var forgetPasswordController = new forgetpassord_controller_1.ForgetPasswordController();
router.post("/login", validation.validateFormUsuarioLogin(), authController.getUserLogin);
router.get("/resetpassword/:id/:token", validationJWT.validateTimeToken, function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../view', 'RecuperacionPassword.html'));
});
router.post("/forgetPassword", forgetPasswordController.sendEmail);
router.post("/updatePasswordUsuario", validationJWT.validateTimeToken, validation.validateFormNewPassword(), forgetPasswordController.updatePasswordUser);
exports.default = router;
//# sourceMappingURL=auth.router.js.map