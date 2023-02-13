import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';
import generateToken from "../helpers/generateJWT";

//Importar la libreria para encriptar la contraseña en express (npm install bcript)
const bcrypt = require('bcrypt');

export class AuthController {
    /* Getting all the comments of a user by id. */
    public getUsuarioLogin = async (req: Request, res: Response) => {
        try {

            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            }

            const usuario:Usuario = await myDataSource.getRepository(Usuario).findOneBy({
                password_usuario: req.body.password_usuario,
                correo_usuario: req.body.correo_usuario
            })
            
            //VALIDAMOS SI EL USUARIO EXISTE.
            if(!usuario){
                return res.status(400).json({result:"Usuario no encontrado, por favor revise correo y contraseña"}) 
            }
            //VALIDAMOS SI EL USUARIO SE ENCUENTRA ACTIVO.
            if(!usuario.estado_usuario){
                res.status(400).json({result:"El usuario se encuentra inactivo, por favor contacte al administrador."})
            }

            // SECCION PARA VALIDAR LA CONTRASEÑA CON BYCRIPT:JS
            

            //GENERAMOS JWT
            const token = await generateToken(usuario.idusuario);

            if(token){
                /* res.json({
                    usuario,
                    token
                }) */
                //SI EL USUARIO EXITE ENVIAMOS LA INFORMACION.
                res.status(200).json({usuario:{ 'nombre': usuario.nombre_usuario, 'apellido': usuario.apellido_usuario, 'estado': usuario.estado_usuario },token})
            }
            

            
            
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}