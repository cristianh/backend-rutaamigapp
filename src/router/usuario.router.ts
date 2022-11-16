import { Router,Response,Request} from "express";


//Controllers
import {UsuarioController} from '../controllers/usuario.controller'

//Middleware
import { Validations } from '../middleware/validations'

const router = Router()
//Inicializamos el controlador.
const usuarioController = new UsuarioController();

//Inicializamos Validacion.
const validation= new Validations()

// Usuarios
router.get("/usuario", usuarioController.getAllUsers);
router.get("/usuario/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/usuario/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/usuario/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/usuario/:id", usuarioController.updateUser);
router.delete("/usuario/:id",usuarioController.deleteUser);
router.post("/login", validation.validateFormUsuarioLogin(), usuarioController.getUsuarioLogin);
//ruta test pagina
router.get("/testPrueba", (req:Request,res:Response)=>{
    res.send("hola mundo")
});

export default router