
import * as jwt from 'jsonwebtoken';

export const generateToken = (uid: number) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject("No se pudo generar el token")
            } else {
                resolve(token);
            }
        })
    })
}

export const generateTokenForgetPassword = (uid: number) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject("No se pudo generar el token")
            } else {
                resolve(token);
            }
        })
    })
}


