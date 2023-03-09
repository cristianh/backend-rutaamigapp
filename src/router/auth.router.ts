import { Router, Response, Request } from "express";

//Controllers
import { AuthController } from '../controllers/auth.controller'
import { ForgetPasswordController } from '../controllers/forgetpassord.controller'
const path = require('path');


//Middleware
import { Validations, ValidatiteJWT } from './../middleware';

//Inicializamos Validacion.
const validation = new Validations()
const validationJWT = new ValidatiteJWT()

const router = Router()

//Inicializamos el controlador.
const authController = new AuthController();
const forgetPasswordController = new ForgetPasswordController();


router.post("/login", validation.validateFormUsuarioLogin(), authController.getUsuarioLogin);

router.get("/resetpassword/:id/:token", validationJWT.validateTimeToken, (req: Request, res: Response) => {
   res.sendFile(path.resolve(__dirname, '../../view', 'RecuperacionPassword.html'));
});

router.post("/forgetPassword", forgetPasswordController.sendEmail);
router.post("/updatePasswordUsuario",validationJWT.validateTimeToken,validation.validateFormNewPassword(), forgetPasswordController.updatePasswordUser);


export default router