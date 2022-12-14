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
exports.Rol = void 0;
var typeorm_1 = require("typeorm");
var usuario_entity_1 = require("../entity/usuario.entity");
var Rol = /** @class */ (function () {
    function Rol() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Rol.prototype, "idrol", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Rol.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Rol.prototype, "nivel", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return usuario_entity_1.Usuario; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", usuario_entity_1.Usuario)
    ], Rol.prototype, "usuario", void 0);
    Rol = __decorate([
        (0, typeorm_1.Entity)()
    ], Rol);
    return Rol;
}());
exports.Rol = Rol;
//# sourceMappingURL=rol.entity.js.map