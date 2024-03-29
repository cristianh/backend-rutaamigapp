import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
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
            const user: Usuario = await myDataSource.getRepository(Usuario).findOne({
                where:
                    { correo_usuario: req.body.correo_usuario }
            })
            // We validate if the user exists.
            if (!user) {
                return res.status(200).json({ result: "Usuario no encontrado, por favor revise correo.", status: "not-find" })
            }

            //GENERATE JWT 1h RECOVERY TIME
            const token = await generateTokenForgetPassword(user.idusuario, '1h');

            // We create the channel to link the mail where the mail and the password recovery link will be sent.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_GMAIL,
                    pass: process.env.PASSWORD_GMAIL
                }
            })

            // We specify the port from where the message is going to be sent
            const emailPort = process.env.URLDESARROLLOFRONT || 3000

            // We configure the body of the mail.
            const mailOptions = {
                from: "rutaamigapp@gmial.com",
                to: `${user.correo_usuario}`,
                subject: "Restablecer contraseña - RutaAmigapp",
                text: `${emailPort}/new-password/${user.idusuario}/${token}`
            }

            // Send the mail with the message options.
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    return res.status(500).json({ result: `Ha ocurrido un error al tratar de enviar el correo: ${error}`, status: "ok" })
                } else {
                    return res.status(200).json({ result: "El email de recuperacion ha sido enviado, por favor revisa tu bandeja de mensajes." })
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
                let password_usuario = bcrypGenerateEncript(req.body.password_usuario)
                // We update user with the new password.
                const results = await myDataSource.getRepository(Usuario).update(req.body.id, { password_usuario: password_usuario });
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