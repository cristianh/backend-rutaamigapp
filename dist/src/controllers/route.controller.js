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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.RouteController = void 0;
var app_data_source_1 = require("../../src/app-data-source");
//Import database route entity
var route_entity_1 = require("../entity/route.entity");
//Import the library to encrypt password
var express_validator_1 = require("express-validator");
//Take ORM methods
var routeRepository = app_data_source_1.default.getRepository(route_entity_1.Route);
/* The RouteController class contains methods for retrieving, saving, updating, and deleting routes
from a database. */
var RouteController = /** @class */ (function () {
    function RouteController() {
        var _this = this;
        /**
         * A function that is going to get all the rutas from the database.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response - The response object
         * @returns
         */
        this.getAllRoute = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limit, skip, all, query, routes, data, route, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        limit = req.query['limit'] || 10;
                        skip = req.query['skip'] || 0;
                        all = req.query['all'] || false;
                        query = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).find()];
                    case 1:
                        routes = _a.sent();
                        data = { routes: routes, totalRoutes: routes.length };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 2:
                        query = {
                            skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                            take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                        };
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).find(query)];
                    case 3:
                        route = _a.sent();
                        data = { route: route, totalRoutes: route.length, page: skip, limit: limit };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.json({ error: error_1 })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Getting the id of the ruta and returning the results.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response - The response object
         * @returns string
         */
        this.getRouteById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).findOneBy({
                                route_id: parseInt(req.params.id),
                            })];
                    case 1:
                        results = _a.sent();
                        if (!results) {
                            return [2 /*return*/, res.status(200).send({ status: "Ruta con id: '".concat(req.params.id, "' no encontrada") })];
                        }
                        return [2 /*return*/, res.status(200).send(results)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Saving the Route in the database.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response - The response object
         * @returns
         */
        this.saveRoute = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, ruta, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!!errors.isEmpty()) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    case 1: return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).create(req.body)];
                    case 2:
                        ruta = _a.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).save(ruta)];
                    case 3:
                        results = _a.sent();
                        return [2 /*return*/, res.status(200).send({ status: "Ruta guardada de manera exitosa", results: results })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_3 })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
        * Set route in database.
        * @param {Request} req - Request - The request object
        * @param {Response} res - Response - The response object
        * @returns string
        */
        this.updateRoute = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, searchRoute, router, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!!errors.isEmpty()) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    case 1: return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).findOneBy({
                            route_id: parseInt(req.params.id),
                        })];
                    case 2:
                        searchRoute = _a.sent();
                        if (!searchRoute) {
                            return [2 /*return*/, res.status(201).send({ status: "Ruta id: '".concat(req.params.id, "' no encontrada") })];
                        }
                        //JOIN DATA DB AND REQUEST BODY
                        app_data_source_1.default.getRepository(route_entity_1.Route).merge(searchRoute, req.body);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).update(searchRoute.route_id, searchRoute)];
                    case 3:
                        router = _a.sent();
                        if (router) {
                            return [2 /*return*/, res.status(201).send({ status: "Ruta actualizada con exito", router: router })];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.send(500).json({ error: error_4 })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Delete route in database.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response - The response object
         * @returns string
         */
        this.deleteRoute = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var searchRoute, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).findOneBy({
                                route_id: parseInt(req.params.id),
                            })];
                    case 1:
                        searchRoute = _a.sent();
                        if (!searchRoute) {
                            return [2 /*return*/, res.status(201).send({ status: "Ruta id: '".concat(req.params.id, "' no encontrada") })];
                        }
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).delete(req.params.id)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: "Ruta  '".concat(req.params.id, "' Eliminada"), results: results })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_5 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return RouteController;
}());
exports.RouteController = RouteController;
//# sourceMappingURL=route.controller.js.map