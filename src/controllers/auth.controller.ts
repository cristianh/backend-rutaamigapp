
import { Request, Response } from "express"
import { User } from "../entity/user.entity"
import myDataSource from "../app-data-source";
import { validationResult } from 'express-validator';
import { generateToken } from "../helpers/generateJWT";
import { bcrypCheck } from "../helpers/bcryptHelper";



/* The above code is a function that is used to validate the user's login. */
export class AuthController {

    /**
     * The above code is a function that is used to validate the user's login.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @returns Get users login.
     */
    /*  */
    public getUserLogin = async (req: Request, res: Response) => {
        try {
            // We verify if there are error in the validated fields with Express-Validate
            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            }

            // We look for the user in the database.
            const user: User = await myDataSource.getRepository(User).findOne({
                
                where: {
                    user_email: req.body.user_email
                },
                relations: {
                    file: true,
                    rol_user: true
                },
            })

                    

            // We validate if the user exists.
            if (!user) {
                return res.status(400).json({ result: "Usuario no encontrado, por favor revise correo y contraseña" })
            }
            // We validate if the user is active.
            if (user.user_isactive==Boolean(0)) {
                return res.status(400).json({ result: "El usuario se encuentra inactivo, por favor contacte al administrador." })
            }


            // We validate the password with bcrypt: JS
            const validatePassword = bcrypCheck(req.body.user_password, user.user_password)

            // If the password is incorrect
            if (!validatePassword) {
                return res.status(404).json({ result: "Usuario / Password no son correctos - password" })
            }

            // We generate JWT
            const token = await generateToken(user);
            

            
            if (token) {
                // If the user Exit we send the information.
                return res.status(200).json({ usuario: { 'id':user.user_id,'nombre': user.user_name, 'apellido': user.user_lastname, 'estado': user.user_status, 'img':user.file?.cloudinary_url,'rol':user.rol_user.id_rol??"" ,result:token}})
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}