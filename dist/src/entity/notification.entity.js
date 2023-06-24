"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var typeorm_1 = require("typeorm");
var route_entity_1 = require("./route.entity");
var user_entity_1 = require("./user.entity");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Notification.prototype, "id_notification", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Notification.prototype, "notification_inverval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: false }),
        __metadata("design:type", String)
    ], Notification.prototype, "notification_message", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Notification.prototype, "notification_create_date", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return route_entity_1.Route; }, function (route) { return route.route_id; }, {}),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", route_entity_1.Route)
    ], Notification.prototype, "route_notification", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.notification; }),
        __metadata("design:type", user_entity_1.User)
    ], Notification.prototype, "user_notification", void 0);
    Notification = __decorate([
        (0, typeorm_1.Entity)()
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map