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
exports.RolController = void 0;
var app_data_source_1 = require("../../src/app-data-source");
var user_entity_1 = require("../entity/user.entity");
var rol_entity_1 = require("../entity/rol.entity");
var RolController = /** @class */ (function () {
    function RolController() {
        var _this = this;
        /**
         * This function return all rols from the database
         * @param req Request - The request object
         * @param res Response - The response object
         */
        this.getAllRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limit, skip, all, query, rol, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        limit = req.query['limit'] || 10;
                        skip = req.query['skip'] || 0;
                        all = req.query['all'] || false;
                        query = void 0;
                        if (!all) return [3 /*break*/, 1];
                        /* const rol = await myDataSource.getRepository(Rol).find({
                            relations: {
                                rol_user: true,
                            },
                        })
                        let data = { rol, totalRol: rol.length } */
                        return [2 /*return*/, res.status(200).json("data")];
                    case 1:
                        query = {
                            skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                            take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                        };
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).find(query)];
                    case 2:
                        rol = _a.sent();
                        data = { rol: rol, totalRol: rol.length, page: skip, limit: limit };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_1.message })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It gets a rol by id from the database and returns it to the user.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response  Express.Response
         * @returns An object with the user data.
         */
        this.getRolById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rols, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).findOneBy({
                                id_rol: parseInt(req.params.id),
                            })];
                    case 1:
                        rols = _a.sent();
                        return [2 /*return*/, res.send(rols)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * This function return all users by rol from the database
         * @param req Request - The request object
         * @param res Response - The response object
         */
        this.getUserByIdRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_rol, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).find({
                                relations: {
                                    rol_user: true,
                                },
                                where: {
                                    rol_user: {
                                        id_rol: parseInt(req.params.id)
                                    }
                                }
                            })];
                    case 1:
                        user_rol = _a.sent();
                        return [2 /*return*/, res.status(200).json({ result: user_rol })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * This function return save rol in the database
         * @param req Request - The request object
         * @param res Response - The response object
         */
        this.saveRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var nombre_rol, dbRol, rol, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        nombre_rol = req.body.nombre_rol;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).create({
                                nombre_rol: nombre_rol
                            })
                            //Create the request body
                        ];
                    case 1:
                        dbRol = _a.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).save(dbRol)];
                    case 2:
                        rol = _a.sent();
                        return [2 /*return*/, res.status(201).send({ status: "Rol guardado con exito", rol: rol })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It takes a request, finds a rol by id, merges the request body with the rol, and update it.
         * @param {Request} req - Request
         * @param {Response} res - Response
         * @returns The updated rol.
         */
        this.updateRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var searchRol, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).findOneBy({
                                id_rol: parseInt(req.params.id),
                            })];
                    case 1:
                        searchRol = _a.sent();
                        app_data_source_1.default.getRepository(rol_entity_1.Rol).merge(searchRol, req.body);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).update(searchRol.id_rol, searchRol)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, res.status(201).send({ status: "Rol actualizado con exito", user: user })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It deletes a rol from the database
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response =&gt; The response object
         * @returns The number of rows affected by the delete operation.
         */
        this.deleteRol = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var searchRol, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).findOneBy({
                                id_rol: parseInt(req.params.id),
                            })];
                    case 1:
                        searchRol = _a.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).update(searchRol.id_rol, searchRol)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, res.status(200).json({ status: "Rol eliminado con exito", result: result })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return RolController;
}());
exports.RolController = RolController;
//# sourceMappingURL=rol.controller.js.map