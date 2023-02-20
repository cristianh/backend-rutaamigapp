"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatiteJWT = void 0;
var jwt = require("jsonwebtoken");
var ValidatiteJWT = /** @class */ (function () {
    function ValidatiteJWT() {
        this.validate = function (req, res, next) {
            var token = req.header('api-token');
            console.log("token", req.header('api-token'));
            if (!token) {
                return res.status(401).json({
                    msg: "No hay token en la peticion"
                });
            }
            try {
                console.log(token);
                var payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
                if (payload) {
                    next();
                }
            }
            catch (error) {
                return res.status(401).json({
                    msg: "Token no valido."
                });
            }
        };
        this.validateTimeToken = function (req, res, next) {
            try {
                console.log("token", req.body.token);
                var payload = jwt.verify(req.body.token, process.env.SECRETORPRIVATEKEY);
                if (payload) {
                    next();
                }
                else {
                    return res.status(401).json({
                        msg: "Lo sentimos el token ya no es valido"
                    });
                }
            }
            catch (error) {
                return res.status(401).json({
                    msg: "Token no valido."
                });
            }
        };
    }
    return ValidatiteJWT;
}());
exports.ValidatiteJWT = ValidatiteJWT;
//# sourceMappingURL=validateJWT.js.map