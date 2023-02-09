import { Router,Response,Request} from "express";

//Controllers
import {AuthController} from '../controllers/auth.controller'


//Middleware
import { Validations } from '../middleware/validations'

//Inicializamos Validacion.
const validation= new Validations()

const router = Router()

//Inicializamos el controlador.
const authController = new AuthController();


router.post("/login", validation.validateFormUsuarioLogin(), authController.getUsuarioLogin);
router.get("/testauth",async (req: Request, res: Response) => {
   return await res.status(200).json({result:'ok'})
} );


export default router