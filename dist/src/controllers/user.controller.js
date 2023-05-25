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
exports.UserController = void 0;
var app_data_source_1 = require("../../app-data-source");
//Import express valitador this is like a regex code
var express_validator_1 = require("express-validator");
//Import the library to encrypt password
var bcryptHelper_1 = require("../helpers/bcryptHelper");
//Import database of user entity 
var user_entity_1 = require("../entity/user.entity");
var rol_entity_1 = require("../entity/rol.entity");
//Take ORM methods
var userRepository = app_data_source_1.default.getRepository(user_entity_1.User);
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        /**
     * This function gets all the users from the database and returns them in a JSON format.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     */
        this.getAllUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limit, skip, all, query, user, data, usuario, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        limit = req.query['limit'] || 10;
                        skip = req.query['skip'] || 0;
                        all = req.query['all'] || false;
                        query = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).find({
                                relations: {
                                    file: true,
                                    notification: true,
                                    rol_user: true
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        data = { user: user, totalUsers: user.length };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 2:
                        query = {
                            skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                            take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                        };
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).find(query)];
                    case 3:
                        usuario = _a.sent();
                        data = { usuario: usuario, totalUsers: usuario.length, page: skip, limit: limit };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.json({ error: error_1.message })];
                    case 6: return [2 /*return*/];
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
            var results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOneBy({
                                user_id: parseInt(req.params.id),
                            })];
                    case 1:
                        results = _a.sent();
                        if (!results) {
                            return [2 /*return*/, res.status(200).send({ status: "Usuario con id: '".concat(req.params.id, "' no encontrado.") })];
                        }
                        return [2 /*return*/, res.status(200).send(results)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserByRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).find({
                                relations: {
                                    rol_user: true
                                },
                                where: {
                                    rol_user: {
                                        id_rol: parseInt(req.params.id)
                                    }
                                }
                            })];
                    case 1:
                        results = _a.sent();
                        if (!results) {
                            return [2 /*return*/, res.status(200).send({ status: "No se encuentran datos" })];
                        }
                        return [2 /*return*/, res.status(200).send({ results: results })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_3 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It takes a request, validates it, and then saves it to the database.
         * @param {Request} req - Request - The request object.
         * @param {Response} res - Response
         * @returns  An Usuario object
         */
        this.saveUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, _a, user_name, user_lastname, user_email, user_password, findRol, dbUser, user, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!!errors.isEmpty()) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    case 1:
                        _a = req.body, user_name = _a.user_name, user_lastname = _a.user_lastname, user_email = _a.user_email, user_password = _a.user_password;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).findOneBy({
                                id_rol: 2
                            })
                            //FIND ROLL FOR ID
                        ];
                    case 2:
                        findRol = _b.sent();
                        //FIND ROLL FOR ID
                        if (!findRol) {
                            return [2 /*return*/, res.status(201).send({ status: "Rol de usuario  no encontrado" })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).create({
                                user_name: user_name,
                                user_lastname: user_lastname,
                                user_email: user_email,
                                user_password: (0, bcryptHelper_1.bcrypGenerateEncript)(user_password),
                                rol_user: findRol
                            })
                            //Create the request body
                        ];
                    case 3:
                        dbUser = _b.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).save(dbUser)];
                    case 4:
                        user = _b.sent();
                        return [2 /*return*/, res.status(201).send({ status: "Usuario guardado con exito." })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.json({ error: error_4 })];
                    case 7: return [2 /*return*/];
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
            var errors, searchUser, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOneBy({
                                user_id: parseInt(req.params.id),
                            })];
                    case 1:
                        searchUser = _a.sent();
                        if (!searchUser) {
                            return [2 /*return*/, res.status(200).send({ status: "Usuario con id: '".concat(req.params.id, "' no encontrado.") })];
                        }
                        app_data_source_1.default.getRepository(user_entity_1.User).merge(searchUser, req.body);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).update(searchUser.user_id, searchUser)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, res.status(201).send({ status: "Usuario actualizado con exito", user: user })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_5 })];
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
            var searchUser, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOneBy({
                                user_id: parseInt(req.params.id),
                            })];
                    case 1:
                        searchUser = _a.sent();
                        if (!searchUser) {
                            return [2 /*return*/, res.status(200).send({ status: "Usuario con id: '".concat(req.params.id, "' no encontrado.") })];
                        }
                        searchUser.user_status = Boolean(0);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).update(searchUser.user_id, searchUser)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).json({ status: "Usuario eliminado con exito", result: result })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_6 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map