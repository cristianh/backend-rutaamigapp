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
exports.ComentarioController = void 0;
var comentario_entity_1 = require("../entity/comentario.entity");
var app_data_source_1 = require("../../app-data-source");
var ComentarioController = /** @class */ (function () {
    function ComentarioController() {
        var _this = this;
        /**
     * This function gets all the comentaries from the database and returns them as a JSON object.
     * @param {Request} req - Request - The incoming request object.
     * @param {Response} res - Response - The response object that will be sent back to the client.
     */
        this.getAllComentaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var comentario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).find()];
                    case 1:
                        comentario = _a.sent();
                        res.json(comentario);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * It gets all the comentarios from the database and returns them as a JSON object.
         * @param {Request} req - Request - The incoming request object.
         * @param {Response} res - Response - the response object
         */
        this.getAllComentariesUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var comentario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).find({
                            relations: {
                                usuario: true,
                            },
                        })];
                    case 1:
                        comentario = _a.sent();
                        res.json(comentario);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * It gets a comentary by its id.
         * @param {Request} req - Request
         * @param {Response} res - Response =&gt; Express.Response
         * @returns An array of objects.
         */
        this.getComentariesById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).findOneBy({
                            idComentarios: parseInt(req.params.id),
                        })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        }); };
        /**
         * It takes a request, and a response, and returns a response
         * @param {Request} req - Request
         * @param {Response} res - Response
         * @returns {
         *     "id": 1,
         *     "comentario": "teste",
         *     "data": "2019-07-29T00:00:00.000Z",
         *     "usuario": {
         *         "id": 1,
         *         "nome": "teste",
         *         "email": "teste@teste.com
         */
        this.saveComentaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var comentario, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).create(req.body)];
                    case 1:
                        comentario = _a.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).save(comentario)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.status(200).send({ status: "Comentario guardado con exito", results: results })];
                    case 3:
                        error_1 = _a.sent();
                        res.json({ error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * It takes the id of a comentary, finds it in the database, merges the new data with the old data, and
         * saves it.
         * @param {Request} req - Request - The request object.
         * @param {Response} res - Response
         * @returns The updated object.
         */
        this.updateComentaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var comentario, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).findOneBy({
                            idComentarios: parseInt(req.params.id),
                        })];
                    case 1:
                        comentario = _a.sent();
                        app_data_source_1.default.getRepository(comentario_entity_1.Comentario).merge(comentario, req.body);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).save(comentario)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        }); };
        /**
         * It deletes a comment from the database
         * @param {Request} req - Request - The request object.
         * @param {Response} res - Response
         * @returns The result of the delete operation.
         */
        this.deleteComentaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(comentario_entity_1.Comentario).delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        }); };
    }
    return ComentarioController;
}());
exports.ComentarioController = ComentarioController;
//# sourceMappingURL=comentario.controller.js.map