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
exports.deleteUser = exports.updateUser = exports.saveUser = exports.getUserById = exports.getUserByIdComentariesById = exports.getComentariesUsers = exports.getAllUsers = void 0;
var usuario_entity_1 = require("../entity/usuario.entity");
var app_data_source_1 = require("../../app-data-source");
var express_validator_1 = require("express-validator");
/**
 * This function gets all the users from the database and returns them in a JSON format.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 */
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find()];
            case 1:
                usuario = _a.sent();
                res.json(usuario);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
/**
 * It gets all the users and their comments.
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 */
var getComentariesUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
                    relations: {
                        comentario: true,
                    },
                })];
            case 1:
                usuario = _a.sent();
                res.json(usuario);
                return [2 /*return*/];
        }
    });
}); };
exports.getComentariesUsers = getComentariesUsers;
/**
 * "I want to get a user by id and a comment by id, and I want to get the user's comments"
 * </code>
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
var getUserByIdComentariesById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
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
                return [2 /*return*/];
        }
    });
}); };
exports.getUserByIdComentariesById = getUserByIdComentariesById;
/**
 * It gets a user by id from the database and returns it to the user.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response =&gt; Express.Response
 * @returns An object with the user data.
 */
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).findOneBy({
                    idusuario: parseInt(req.params.id),
                })];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.getUserById = getUserById;
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
var saveUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, usuario, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                return [2 /*return*/, res.status(200).send(results)];
        }
    });
}); };
exports.saveUser = saveUser;
/**
 * It takes a request, finds a user by id, merges the request body with the user, and saves the user.
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @returns The updated user.
 */
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).findOneBy({
                    idusuario: parseInt(req.params.id),
                })];
            case 1:
                usuario = _a.sent();
                app_data_source_1.default.getRepository(usuario_entity_1.Usuario).merge(usuario, req.body);
                return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).save(usuario)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.updateUser = updateUser;
/**
 * It deletes a user from the database
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response =&gt; The response object
 * @returns The number of rows affected by the delete operation.
 */
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(usuario_entity_1.Usuario).delete(req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteUser = deleteUser;
//# sourceMappingURL=usuario.controller.js.map