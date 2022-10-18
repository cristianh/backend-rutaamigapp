import { Router} from "express";


//Controllers
import { getAllUsers, getComentariesUsers, getUserByIdComentariesById, getUserById, saveUser, updateUser,deleteUser } from '../controllers/usuario.controller'

//Middleware
import validateFormUsuarioRegister from '../middleware/validateFormLogin'

const router = Router()

// Usuarios
router.get("/usuarios", getAllUsers)
router.get("/usuario/comentarios", getComentariesUsers)
router.get("/usuario/:usuarioId/comentarios/:comentarioId", getUserByIdComentariesById)
router.get("/usuario/:id", getUserById)
router.post("/usuario", validateFormUsuarioRegister(), saveUser)
router.put("/usuario/:id", updateUser)
router.delete("/usuario/:id",deleteUser)

export default router