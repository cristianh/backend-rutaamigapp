import { Router,Response,Request} from "express";
import {UserSeeder} from '../../src/seeds/user.seed'

//path 
const path = require('path');

//Controllers
import {UserController} from '../controllers/user.controller'

//Middleware
import { Validations, ValidatiteJWT } from '../middleware';


const validation= new Validations()
const validationJWT= new ValidatiteJWT()

const router = Router()
//Inicializamos el controlador.
const userController = new UserController();

const usersedders = new UserSeeder()


// Usuarios

router.get("/allusers/:all?/:limit?/:skip?",validationJWT.validate,userController.getAllUsers);
router.get("/:id/comentarios", userController.getComentariesUsersById);
router.get("/:usuarioId/comentarios/:comentarioId", userController.getUserByIdComentariesById);
router.get("/:id", userController.getUserById);
router.post("/registro", validation.validateFormUsuarioRegister(), userController.saveUser);
router.put("/:id", userController.updateUser);
router.delete("/:id",userController.deleteUser);
//Test
router.post("/createUsers",validationJWT.validate,usersedders.CreateUser);



export default router