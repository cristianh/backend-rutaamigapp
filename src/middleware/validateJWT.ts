import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"

export class ValidatiteJWT {
    public validate = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('api-token')
        
        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }

        try {
            
            const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            if (payload) {
                next()
            }


        } catch (error) {
            return res.status(401).json({
                msg: "Token no valido."
            })
        }



    }

    public validateTimeToken = (req: Request, res: Response, next: NextFunction) => {

        try {
            console.log("token",req.body.token)
            const payload = jwt.verify(req.body.token, process.env.SECRETORPRIVATEKEY)
            if (payload) {
                next()
            }else{
                return res.status(401).json({
                    msg: "Lo sentimos el token ya no es valido"
                })
            }

           
        } catch (error) {
            return res.status(401).json({
                msg: "Token no valido."
            })
        }



    }
}