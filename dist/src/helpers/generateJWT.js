"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenForgetPassword = exports.generateToken = void 0;
//Import token library
var jwt = require("jsonwebtoken");
/**
 * It takes a user id, creates a payload with that id, signs the payload with a secret key, and returns
 * a promise that resolves to a token.
 * @param {number} uid - The user id of the user that is being authenticated.
 * @returns A promise that will return a token or an error message.
 */
var generateToken = function (uid) {
    return new Promise(function (resolve, reject) {
        var payload = { uid: uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, function (error, token) {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateToken = generateToken;
/**
 * It takes a user id and a time string and returns a promise that resolves to a token.
 * @param {number} uid - user id
 * @param {string} time - "1h"
 * @returns A promise that resolves to a token.
 */
var generateTokenForgetPassword = function (uid, time) {
    return new Promise(function (resolve, reject) {
        var payload = { uid: uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: time
        }, function (error, token) {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateTokenForgetPassword = generateTokenForgetPassword;
//# sourceMappingURL=generateJWT.js.map