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
exports.Route = void 0;
var typeorm_1 = require("typeorm");
var notification_entity_1 = require("./notification.entity");
/*idRutas INT PRIMARY KEY auto_increment,
numero INT not null,
descripcion VARCHAR(45),
sentido VARCHAR(45) not null*/
var Route = exports.Route = /** @class */ (function () {
    function Route() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Route.prototype, "route_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Route.prototype, "route_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Route.prototype, "route_content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Route.prototype, "route_orientation", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Route.prototype, "route_create_date", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Route.prototype, "route_update_date", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", String)
    ], Route.prototype, "route_removal_date", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return notification_entity_1.Notification; }, function (notification) { return notification.user_notification; }) // specify inverse side as a second parameter
        ,
        __metadata("design:type", notification_entity_1.Notification)
    ], Route.prototype, "route_notification", void 0);
    Route = __decorate([
        (0, typeorm_1.Entity)()
    ], Route);
    return Route;
}());
//# sourceMappingURL=route.entity.js.map