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
exports.Foro = void 0;
var typeorm_1 = require("typeorm");
var usuario_entity_1 = require("../entity/usuario.entity");
var comentario_entity_1 = require("../entity/comentario.entity");
/*idForo int primary key auto_increment,
usuarios_idusuario int,
comentarios_idcomentarios int,
estado tinyint not null*/
//TODO: ojo aca, porque necesitamos  latitud y longitud, y tiempo recorrido. foro es una vista!!!
var Foro = /** @class */ (function () {
    function Foro() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Foro.prototype, "idForo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], Foro.prototype, "longitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], Foro.prototype, "latitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "tinyint", nullable: false }),
        __metadata("design:type", Boolean)
    ], Foro.prototype, "estado", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "time", nullable: false }),
        __metadata("design:type", String)
    ], Foro.prototype, "tiempo_recorrido", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return usuario_entity_1.Usuario; }, function (usuario) { return usuario.foro; }),
        __metadata("design:type", usuario_entity_1.Usuario)
    ], Foro.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return comentario_entity_1.Comentario; }, function (comentario) { return comentario.foro; }),
        __metadata("design:type", comentario_entity_1.Comentario)
    ], Foro.prototype, "comentario", void 0);
    Foro = __decorate([
        (0, typeorm_1.Entity)()
    ], Foro);
    return Foro;
}());
exports.Foro = Foro;
//# sourceMappingURL=foro.entity.js.map