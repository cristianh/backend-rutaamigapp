import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"

export class ValidatiteJWT {
    public validate = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('api-token')
        console.log("token", req.header('api-token'))
        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }

        try {
            console.log(token)
            const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            /* if(payload){
                req.payload = payload
            } */

            next()
        } catch (error) {
            return res.status(401).json({
                msg: "Token no valido."
            })
        }



    }
}