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
exports.RutaUsuario = void 0;
var typeorm_1 = require("typeorm");
/* idrutausuario       INT PRIMARY KEY auto_increment,
     estado              BOOLEAN DEFAULT 0,
     latitud             INT NOT NULL,
     longitud            INT NOT NULL,
     idruta_fk           INT,
     fecha_creacion      DATETIME DEFAULT Now(),
     fecha_actualizacion DATETIME,
     fecha_eliminacion   DATETIME */
var RutaUsuario = /** @class */ (function () {
    function RutaUsuario() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], RutaUsuario.prototype, "idrutausuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], RutaUsuario.prototype, "latitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], RutaUsuario.prototype, "longitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
        __metadata("design:type", Boolean)
    ], RutaUsuario.prototype, "estado", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], RutaUsuario.prototype, "fecha_creacion", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], RutaUsuario.prototype, "fecha_actualizacion", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", String)
    ], RutaUsuario.prototype, "fecha_eliminacion", void 0);
    RutaUsuario = __decorate([
        (0, typeorm_1.Entity)()
    ], RutaUsuario);
    return RutaUsuario;
}());
exports.RutaUsuario = RutaUsuario;
//# sourceMappingURL=rutausuario.entity.js.map