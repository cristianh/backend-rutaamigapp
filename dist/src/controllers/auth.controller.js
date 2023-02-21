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
exports.AuthController = void 0;
var user_entity_1 = require("../entity/user.entity");
var app_data_source_1 = require("../../app-data-source");
var express_validator_1 = require("express-validator");
var generateJWT_1 = require("../helpers/generateJWT");
var bcryptHelper_1 = require("../helpers/bcryptHelper");
/* The above code is a function that is used to validate the user's login. */
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        /* The above code is a function that is used to validate the user's login. */
        this.getUsuarioLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, user, validatePassword, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOneBy({
                                user_email: req.body.user_email
                            })
                            // We validate if the user exists.
                        ];
                    case 1:
                        user = _a.sent();
                        // We validate if the user exists.
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ result: "Usuario no encontrado, por favor revise correo y contraseña" })];
                        }
                        // We validate if the user is active.
                        if (!user.user_status) {
                            return [2 /*return*/, res.status(400).json({ result: "El usuario se encuentra inactivo, por favor contacte al administrador." })];
                        }
                        validatePassword = (0, bcryptHelper_1.bcrypCheck)(req.body.password_usuario, user.user_password);
                        // If the password is incorrect
                        if (!validatePassword) {
                            return [2 /*return*/, res.status(404).json({ result: "Usuario / Password no son correctos - password" })];
                        }
                        return [4 /*yield*/, (0, generateJWT_1.generateToken)(user.user_id)];
                    case 2:
                        token = _a.sent();
                        if (token) {
                            // If the user Exit we send the information.
                            return [2 /*return*/, res.status(200).json({ usuario: { 'nombre': user.user_name, 'apellido': user.user_lastname, 'estado': user.user_status }, token: token })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(500).json({ error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map