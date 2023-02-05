import { Router,Response,Request} from "express";

//path 
const path = require('path');

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
router.get("/:limit?/:skip?", usuarioController.getAllUsers);
router.get("/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id",usuarioController.deleteUser);
router.post("/login", validation.validateFormUsuarioLogin(), usuarioController.getUsuarioLogin);

//RUTAs DE PRUEBA
//!ELIINAR
//ruta test pagina login
router.get("/", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../view','loginDemo.html'));
});

//ruta test notificacion.
router.get("/notificacion", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../view','notificacionDemo.html'));
});

//ruta para el mapa de
router.get("/mapa", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../public','mapa.html'));
});

//ruta para el mapa de
router.get("/tableromensajes", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../view','tableroMensajeAdmin.html'));
});


//ruta test pagina listar usuarios
router.get("/listarusuarios", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname, '../../view','listarUsuarioDemo.html'));
});

export default router