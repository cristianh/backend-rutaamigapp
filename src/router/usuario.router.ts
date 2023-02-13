import { Router,Response,Request} from "express";

//path 
const path = require('path');

//Controllers
import {UsuarioController} from '../controllers/usuario.controller'

//Middleware
import { Validations,ValidatiteJWT } from '../middleware'

//Inicializamos Validacion.
const validation= new Validations()
const validationJWT= new ValidatiteJWT()

const router = Router()
//Inicializamos el controlador.
const usuarioController = new UsuarioController();


// Usuarios
router.get("/:all?/:limit?/:skip?",validationJWT.validate,usuarioController.getAllUsers);
router.get("/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id",usuarioController.deleteUser);


export default router