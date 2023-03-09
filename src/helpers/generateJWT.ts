
import * as jwt from 'jsonwebtoken';

/**
 * It takes a user id, creates a payload with that id, signs the payload with a secret key, and returns
 * a promise that resolves to a token.
 * @param {number} uid - The user id of the user that is being authenticated.
 * @returns A promise that will return a token or an error message.
 */
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

/**
 * It takes a user id and a time string and returns a promise that resolves to a token.
 * @param {number} uid - user id
 * @param {string} time - "1h"
 * @returns A promise that resolves to a token.
 */
export const generateTokenForgetPassword = (uid: number,time: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: time
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


