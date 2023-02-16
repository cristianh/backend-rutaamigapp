import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity"
import myDataSource from "../../app-data-source"
import { validationResult } from 'express-validator';
import { generateToken, generateTokenForgetPassword } from "../helpers/generateJWT";
//bycripts.js encrptacion contraseña
import * as bcryptjs from 'bcryptjs'
//nodemial for send email from node
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

export class ForgetPasswordController {

    public sendEmail = async (req: Request, res: Response) => {

        try {
            

            //FIND USER BY ID IN DB 
            const usuario: Usuario = await myDataSource.getRepository(Usuario).findOne({
                where:
                    { correo_usuario: req.body.correo_usuario }
            })

            //VALIDAMOS SI EL USUARIO EXISTE.
            if (!usuario) {
                return res.status(200).json({ result: "Usuario no encontrado, por favor revise correo.", status: "not-find" })
            }

            //GENERATE JWT 1h RECOVERY TIME
            const token = await generateTokenForgetPassword(usuario.idusuario);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_GMAIL,
                    pass: process.env.PASSWORD_GMAIL
                }
            })

            const emailPort = process.env.URLDESARROLLOFRONT || 3000

            console.log(usuario.correo_usuario)

            const mailOptions = {
                from: "rutaamigapp@gmial.com",
                to: `${usuario.correo_usuario}`,
                subject: "Restablecer contraseña - RutaAmigapp",
                text: `${emailPort}/new-password/${usuario.idusuario}/${token}`
            }

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

    public updatePasswordUser = async (req: Request, res: Response) => {

        try {

            let errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {
                let password_usuario = bcryptjs.hashSync(req.body.password_usuario, 10)

                const results = await myDataSource.getRepository(Usuario).update(req.body.id, { password_usuario: password_usuario });
                if(results){
                    return res.status(200).json({ result: "Contraseña actualizada con exito.", results })                    
                }else{
                    return res.status(500).json({ error: "Error al actualizar el usuario." })    
                }
            }





        } catch (error) {
            return res.status(500).json({ error })
        }
    }

}