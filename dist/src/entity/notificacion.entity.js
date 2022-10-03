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
exports.Notificacion = void 0;
var typeorm_1 = require("typeorm");
var ruta_entity_1 = require("../entity/ruta.entity");
/*idNotificaciones INT primary key auto_increment,
intervalo INT  not null,
fecha_hora DATETIME not null,
ruta_idruta int*/
var Notificacion = /** @class */ (function () {
    function Notificacion() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Notificacion.prototype, "idNotificaciones", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Notificacion.prototype, "intervalo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "datetime", nullable: false }),
        __metadata("design:type", String)
    ], Notificacion.prototype, "fecha_hora", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return ruta_entity_1.Ruta; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", ruta_entity_1.Ruta)
    ], Notificacion.prototype, "ruta", void 0);
    Notificacion = __decorate([
        (0, typeorm_1.Entity)()
    ], Notificacion);
    return Notificacion;
}());
exports.Notificacion = Notificacion;
//# sourceMappingURL=notificacion.entity.js.map