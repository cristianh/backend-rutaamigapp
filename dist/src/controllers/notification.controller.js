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
exports.NotificationController = void 0;
var route_entity_1 = require("../entity/route.entity");
var notification_entity_1 = require("../entity/notification.entity");
var app_data_source_1 = require("../../app-data-source");
/**
 *
 */
/* The NotificationController class is being exported. */
var NotificationController = /** @class */ (function () {
    function NotificationController() {
        var _this = this;
        /**
         * Function return all notification users.
         * @param req
         * @param res
         */
        this.getAllNotification = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limit, skip, all, query, notification, data, notification, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        limit = req.query['limit'] || 10;
                        skip = req.query['skip'] || 0;
                        all = req.query['all'] || false;
                        query = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, app_data_source_1.default.getRepository(notification_entity_1.Notification).find({
                                relations: {
                                    user_notification: true,
                                    route_notification: true
                                },
                            })];
                    case 1:
                        notification = _a.sent();
                        data = { notification: notification, totalNotication: notification.length };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 2:
                        query = {
                            skip: req.query['skip'] == undefined ? 0 : parseInt(skip),
                            take: req.query['limit'] == undefined ? 10 : parseInt(limit)
                        };
                        return [4 /*yield*/, app_data_source_1.default.getRepository(notification_entity_1.Notification).find(query)];
                    case 3:
                        notification = _a.sent();
                        data = { notification: notification, totalNotification: notification.length, page: skip, limit: limit };
                        return [2 /*return*/, res.status(200).json(data)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(200).json({ error: error_1.message })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.saveNotification = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, notification_inverval, notification_message, route_id, user_id, route_notification, dbNotification, user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, notification_inverval = _a.notification_inverval, notification_message = _a.notification_message, route_id = _a.route_id, user_id = _a.user_id;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(route_entity_1.Route).findOneBy({
                                route_id: parseInt(req.params.id),
                            })];
                    case 1:
                        route_notification = _b.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(notification_entity_1.Notification).create({
                                notification_inverval: notification_inverval,
                                notification_message: notification_message
                            })
                            //Create the request body
                        ];
                    case 2:
                        dbNotification = _b.sent();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(notification_entity_1.Notification).save(dbNotification)];
                    case 3:
                        user = _b.sent();
                        return [2 /*return*/, res.status(201).send({ status: "Notificacion guardada con exito", user: user })];
                    case 4:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_2 })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return NotificationController;
}());
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map