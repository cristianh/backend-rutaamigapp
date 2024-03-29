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
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var comentario_entity_1 = require("../entity/comentario.entity");
/*idusuario           INT PRIMARY KEY auto_increment,
nombre_usuario      VARCHAR(45) NOT NULL,
apellido_usuario    VARCHAR(45) NOT NULL,
correo_usuario      VARCHAR(45) NOT NULL UNIQUE,
password_usuario    VARCHAR(45) NOT NULL,
estado_usuario      BOOLEAN DEFAULT 1,
fecha_creacion      DATETIME DEFAULT Now(),
fecha_actualizacion DATETIME,
fecha_eliminacion   DATETIME,
*/
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "idusuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre_usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], Usuario.prototype, "apellido_usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], Usuario.prototype, "correo_usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: false }),
        __metadata("design:type", String)
    ], Usuario.prototype, "password_usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: false, default: true }),
        __metadata("design:type", String)
    ], Usuario.prototype, "estado_usuario", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comentario_entity_1.Comentario; }, function (comentario) { return comentario.usuario; }),
        __metadata("design:type", comentario_entity_1.Comentario)
    ], Usuario.prototype, "comentario", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Usuario.prototype, "fecha_creacion", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Usuario.prototype, "fecha_actualizacion", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", String)
    ], Usuario.prototype, "fecha_eliminacion", void 0);
    Usuario = __decorate([
        (0, typeorm_1.Entity)()
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.entity.js.map