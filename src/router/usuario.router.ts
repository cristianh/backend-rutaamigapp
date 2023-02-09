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
router.get("/:all?/:limit?/:skip?", usuarioController.getAllUsers);
router.get("/:id/comentarios", usuarioController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", usuarioController.getUserByIdComentariesById);
router.get("/:id", usuarioController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), usuarioController.saveUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id",usuarioController.deleteUser);
router.post("/login", validation.validateFormUsuarioLogin(), usuarioController.getUsuarioLogin);

export default router