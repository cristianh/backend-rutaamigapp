"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordController = void 0;
var user_entity_1 = require("../entity/user.entity");
var app_data_source_1 = require("../../src/app-data-source");
var express_validator_1 = require("express-validator");
var generateJWT_1 = require("../helpers/generateJWT");
var nodemailer = require("nodemailer");
var bcryptHelper_1 = require("../helpers/bcryptHelper");
var ForgetPasswordController = /** @class */ (function () {
    function ForgetPasswordController() {
        var _this = this;
        /* The above code is sending an email to the user with a link to reset the password. */
        this.sendEmail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, token, transporter, emailPort, mailOptions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: { user_email: req.body.user_email }
                            })
                            // We validate if the user exists.
                        ];
                    case 1:
                        user = _a.sent();
                        // We validate if the user exists.
                        if (!user) {
                            return [2 /*return*/, res.status(200).json({ result: "Usuario no encontrado, por favor revise correo.", status: "not-find" })];
                        }
                        return [4 /*yield*/, (0, generateJWT_1.generateTokenForgetPassword)(user.user_id, '1h')];
                    case 2:
                        token = _a.sent();
                        transporter = nodemailer.createTransport({
                            service: 'hotmail',
                            auth: {
                                user: process.env.USER_GMAIL,
                                pass: process.env.PASSWORD_GMAIL
                            }
                        });
                        emailPort = process.env.URLDESARROLLOFRONT || 3000;
                        mailOptions = {
                            from: process.env.USER_GMAIL,
                            to: "".concat(user.user_email),
                            subject: "Restablecer contraseña - RutaAmigapp",
                            html: "\n                <div style=\"color:black;padding-top:34px;background-color:#f5f4f4;text-align:center;gap:12px;font-size:1em;font-family:tahoma\">                   \n                    <div>\n                    <h1 style=\"font-family:'cabin'\">\u00A1Hol@! ".concat(user.user_name, " ").concat(user.user_lastname, " </h1>\n                    </div>\n                    <div>\n                    <img src=\"https://res.cloudinary.com/dl7oqoile/image/upload/v1682005302/restablecer-la-contrasena_ocbt3m.png\"\n                        width=\"150\" alt=\"Recuperar contrase\u00F1a\">\n                    </div>\n                    <div>\n                    <p>Hemos recibido su solicitud de recuperaci\u00F3n de contrase\u00F1a. Para restablecer su contrase\u00F1a, haga clic en el\n                        siguiente\n                        enlace:</p>\n                    <a style=\"margin:0px auto;background-color:#fba63e;width:203px;padding:12px 12px;display:grid;place-items:center;align-items:center;text-align:center;color:#ffffff;border-radius:12px 12px;justify-content: center;\"\n                        href=\"https://rutaamigapp.onrender.com/#/new-password/").concat(user.user_id, "/").concat(token, "\">Recuperar contrase&ntilde;a</a>\n\n                    <p>Tenga en cuenta que este enlace solo ser\u00E1 v\u00E1lido durante los pr\u00F3ximos\n                    <p><b>30 minutos</b></p> Si intenta acceder al enlace\n                    despu\u00E9s\n                    de ese tiempo, deber\u00E1 volver a solicitar un restablecimiento de contrase\u00F1a.</p>\n\n                    <p>\n                        Si no ha solicitado este cambio de contrase\u00F1a, por favor ignore este mensaje.\n                    </p>\n                    </div>\n                    <div style=\"padding-bottom:6px;background-color:#FBA63E;color:white;width:100%;height:100%;border-top: 3px solid #EF6C00;\">\n                    <p>Atentamente,<br>\n                        El equipo de RutaAmigapp</p>\n\n                    <p>\u00A1Un Saludo!</p>\n                    </div>\n                </div>")
                        };
                        // Send the mail with the message options.
                        transporter.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                return res.status(500).json({ result: "Ha ocurrido un error al tratar de enviar el correo: ".concat(error), status: "ok" });
                            }
                            else {
                                return res.status(200).json({ result: "El email de recuperacion ha sido enviado, por favor revisa tu bandeja de mensajes y sigue las instrucciones." });
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /* The above code is updating the password of a user. */
        this.updatePasswordUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, password_user, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!!errors.isEmpty()) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    case 1:
                        password_user = (0, bcryptHelper_1.bcrypGenerateEncript)(req.body.password_usuario);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).update(req.body.id, { user_password: password_user })];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, res.status(200).json({ result: "Contraseña actualizada con exito.", results: results })];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json({ error: "Error al actualizar el usuario." })];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2 })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /* The above code is updating the password of a user. */
        this.userActivateAccountUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var newStado, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newStado = true;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).update(req.body.id, { user_isactive: newStado })];
                    case 1:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, res.status(200).json({ result: "Usuario activado con exito", results: results })];
                        }
                        else {
                            return [2 /*return*/, res.status(500).json({ error: "Error al activar el usuario." })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_3 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ForgetPasswordController;
}());
exports.ForgetPasswordController = ForgetPasswordController;
//# sourceMappingURL=forgetpassord.controller.js.map