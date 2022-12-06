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
exports.UsuarioController = void 0;
var usuario_entity_1 = require("../entity/usuario.entity");
var app_data_source_1 = require("../../app-data-source");
var express_validator_1 = require("express-validator");
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
        var _this = this;
        /**
     * This function gets all the users from the database and returns them in a JSON format.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     */
        this.getAllUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limit, skip, query, usuario, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        limit = req.query['limit'];
                        skip = req.query['skip'];
                        console.log(typeof (limit));
                        console.log(typeof (skip));
                        query = {
                            skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                            take: req.query['limit'] == undefined ? 100 : parseInt(limit)
                        };
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find(query)];
                    case 1:
                        usuario = _a.sent();
                        res.json(usuario);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.json({ error: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It gets all the users and their comments.
         * @param {Request} req - Request - The request object.
         * @param {Response} res - Response - The response object.
         */
        this.getComentariesUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var usuario, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
                                relations: {
                                    comentario: true,
                                },
                                where: {
                                    idusuario: parseInt(req.params.usuarioId)
                                }
                            })];
                    case 1:
                        usuario = _a.sent();
                        res.json(usuario);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.json({ error: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * "I want to get a user by id and a comment by id, and I want to get the user's comments"
         * </code>
         * @param {Request} req - Request
         * @param {Response} res - Response
         */
        this.getUserByIdComentariesById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var usuario, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
                                relations: {
                                    comentario: true,
                                },
                                where: {
                                    idusuario: parseInt(req.params.usuarioId),
                                    comentario: {
                                        idComentarios: parseInt(req.params.comentarioId)
                                    }
                                },
                            })];
                    case 1:
                        usuario = _a.sent();
                        res.json(usuario);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.json({ error: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /* Getting all the comments of a user by id. */
        this.getComentariesUsersById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var usuario, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
                                relations: {
                                    comentario: true,
                                },
                                where: {
                                    idusuario: parseInt(req.params.id),
                                },
                            })];
                    case 1:
                        usuario = _a.sent();
                        res.json(usuario);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.json({ error: error_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It gets a user by id from the database and returns it to the user.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response =&gt; Express.Response
         * @returns An object with the user data.
         */
        this.getUserById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).findOneBy({
                                idusuario: parseInt(req.params.id),
                            })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                    case 2:
                        error_5 = _a.sent();
                        res.json({ error: error_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It takes a request, validates it, and then saves it to the database.
         * @param {Request} req - Request - The request object.
         * @param {Response} res - Response
         * @returns {
         *     "errors": [
         *         {
         *             "value": "",
         *             "msg": "A value is required",
         *             "param": "nome",
         *             "location": "body"
         *         },
         *         {
         *             "value": "",
         *             "msg": "A value is required",
         *             "param": "email",
         */
        this.saveUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, usuario, results, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            console.log(errors.array());
                            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).create(req.body)];
                    case 1:
                        usuario = _a.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).save(usuario)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.status(200).send({ status: "Usuario guardado con exito", results: results })];
                    case 3:
                        error_6 = _a.sent();
                        res.json({ error: error_6 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It takes a request, finds a user by id, merges the request body with the user, and saves the user.
         * @param {Request} req - Request
         * @param {Response} res - Response
         * @returns The updated user.
         */
        this.updateUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var usuario, results, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).findOneBy({
                                idusuario: parseInt(req.params.id),
                            })];
                    case 1:
                        usuario = _a.sent();
                        app_data_source_1.default.getRepository(usuario_entity_1.Usuario).merge(usuario, req.body);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).save(usuario)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(200).json({ res: "Usuario actualizado con exito", results: results })];
                    case 3:
                        error_7 = _a.sent();
                        res.json({ error: error_7 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It deletes a user from the database
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response =&gt; The response object
         * @returns The number of rows affected by the delete operation.
         */
        this.deleteUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                    case 2:
                        error_8 = _a.sent();
                        res.json({ error: error_8 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /* Getting all the comments of a user by id. */
        this.getUsuarioLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, usuario, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            console.log(errors.array());
                            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).findOneBy({
                                password_usuario: req.body.password_usuario,
                                correo_usuario: req.body.correo_usuario
                            })];
                    case 1:
                        usuario = _a.sent();
                        res.status(200).json({ 'nombre': usuario.nombre_usuario, 'apellido': usuario.apellido_usuario, 'estado': usuario.estado_usuario });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.json({ error: 'Usuario no encontrado' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UsuarioController;
}());
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map