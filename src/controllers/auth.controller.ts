import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';
import { generateToken } from "../helpers/generateJWT";
import { bcrypCheck } from "../helpers/bcryptHelper";


/* The above code is a function that is used to validate the user's login. */
export class AuthController {
   
   /* The above code is a function that is used to validate the user's login. */
    public getUsuarioLogin = async (req: Request, res: Response) => {
        try {
            // We verify if there are error in the validated fields with Express-Validate
            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            }

            // We look for the user in the database.
            const usuario: Usuario = await myDataSource.getRepository(Usuario).findOneBy({
                correo_usuario: req.body.correo_usuario
            })

            // We validate if the user exists.
            if (!usuario) {
                return res.status(400).json({ result: "Usuario no encontrado, por favor revise correo y contraseña" })
            }
            // We validate if the user is active.
            if (!usuario.estado_usuario) {
                return res.status(400).json({ result: "El usuario se encuentra inactivo, por favor contacte al administrador." })
            }


            // We validate the password with bcrypt: JS
            const validatePassword = bcrypCheck(req.body.password_usuario, usuario.password_usuario)

            // If the password is incorrect
            if (!validatePassword) {
                return res.status(404).json({ result: "Usuario / Password no son correctos - password" })
            }

            // We generate JWT
            const token = await generateToken(usuario.idusuario);

            if (token) {
            // If the user Exit we send the information.
                return res.status(200).json({ usuario: { 'nombre': usuario.nombre_usuario, 'apellido': usuario.apellido_usuario, 'estado': usuario.estado_usuario }, token })
            }

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }


}