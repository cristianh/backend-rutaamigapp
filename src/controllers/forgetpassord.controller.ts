import { Request, Response } from "express"
import { User } from "../entity/user.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';
import { generateTokenForgetPassword } from "../helpers/generateJWT";
import * as nodemailer from 'nodemailer';
import { bcrypGenerateEncript } from "../helpers/bcryptHelper";
export class ForgetPasswordController {

    /* The above code is sending an email to the user with a link to reset the password. */
    public sendEmail = async (req: Request, res: Response) => {

        try {
            //FIND USER BY ID IN DB 
            const user: User = await myDataSource.getRepository(User).findOne({
                where:
                    { user_email: req.body.user_email }
            })
            // We validate if the user exists.
            if (!user) {
                return res.status(200).json({ result: "Usuario no encontrado, por favor revise correo.", status: "not-find" })
            }

            //GENERATE JWT 1h RECOVERY TIME
            const token = await generateTokenForgetPassword(user.user_id, '1h');

            console.log(process.env.USER_GMAIL)
            console.log(process.env.PASSWORD_GMAIL)

            // We create the channel to link the mail where the mail and the password recovery link will be sent.
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: process.env.USER_GMAIL,
                    pass: process.env.PASSWORD_GMAIL
                }
            })

            // We specify the port from where the message is going to be sent
            const emailPort = process.env.URLDESARROLLOFRONT || process.env.URLDESARROLLOPRODUCTION

            // We configure the body of the mail.
            const mailOptions = {
                from: process.env.USER_GMAIL,
                to: `${user.user_email}`,
                subject: "Restablecer contraseña - RutaAmigapp",
                html: `
                <div style="color:black;padding-top:34px;background-color:#f5f4f4;text-align:center;gap:12px;font-size:1em;font-family:tahoma">                   
                    <div>
                    <h1 style="font-family:'cabin'">¡Hol@! ${user.user_name} ${user.user_lastname} </h1>
                    </div>
                    <div>
                    <img src="https://res.cloudinary.com/dl7oqoile/image/upload/v1682005302/restablecer-la-contrasena_ocbt3m.png"
                        width="150" alt="Recuperar contraseña">
                    </div>
                    <div>
                    <p>Hemos recibido su solicitud de recuperación de contraseña. Para restablecer su contraseña, haga clic en el
                        siguiente
                        enlace:</p>
                    <a style="margin:0px auto;background-color:#fba63e;width:203px;padding:12px 12px;display:grid;place-items:center;align-items:center;text-align:center;color:#ffffff;border-radius:12px 12px;justify-content: center;"
                        href="https://backrutaamigaapptestnotification-com.onrender.com/api/new-password/${user.user_id}/${token}">Recuperar contrase&ntilde;a</a>

                    <p>Tenga en cuenta que este enlace solo será válido durante los próximos
                    <p><b>30 minutos</b></p> Si intenta acceder al enlace
                    después
                    de ese tiempo, deberá volver a solicitar un restablecimiento de contraseña.</p>

                    <p>
                        Si no ha solicitado este cambio de contraseña, por favor ignore este mensaje.
                    </p>
                    </div>
                    <div style="padding-bottom:6px;background-color:#FBA63E;color:white;width:100%;height:100%;border-top: 3px solid #EF6C00;">
                    <p>Atentamente,<br>
                        El equipo de RutaAmigapp</p>

                    <p>¡Un Saludo!</p>
                    </div>
                </div>`
            }


            // Send the mail with the message options.
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    return res.status(500).json({ result: `Ha ocurrido un error al tratar de enviar el correo: ${error}`, status: "ok" })
                } else {
                    return res.status(200).json({ result: "El email de recuperacion ha sido enviado, por favor revisa tu bandeja de mensajes y sigue las instrucciones." })
                }
            })
        } catch (error) {

        }

    }

    /* The above code is updating the password of a user. */
    public updatePasswordUser = async (req: Request, res: Response) => {

        try {
            // We verify if there are error in the validated fields with Express-Validate
            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {
                // We encrypt the new user password.
                let password_user = bcrypGenerateEncript(req.body.password_usuario)
                // We update user with the new password.
                const results = await myDataSource.getRepository(User).update(req.body.id, { user_password: password_user });
                if (results) {
                    return res.status(200).json({ result: "Contraseña actualizada con exito.", results })
                } else {
                    return res.status(500).json({ error: "Error al actualizar el usuario." })
                }
            }
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

}