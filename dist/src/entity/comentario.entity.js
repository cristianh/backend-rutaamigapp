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
exports.Comentario = void 0;
var typeorm_1 = require("typeorm");
var usuario_entity_1 = require("../entity/usuario.entity");
/*idComentarios INT PRIMARY KEY auto_increment,
fecha DATE not null,
hora TIME not null,
comentario VARCHAR (45) not null,
usuario_idusuario int*/
var Comentario = /** @class */ (function () {
    function Comentario() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Comentario.prototype, "idComentarios", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: false }),
        __metadata("design:type", String)
    ], Comentario.prototype, "fecha", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "time", nullable: false }),
        __metadata("design:type", String)
    ], Comentario.prototype, "hora", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Comentario.prototype, "comentario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return usuario_entity_1.Usuario; }, function (usuario) { return usuario.comentario; }),
        __metadata("design:type", Array)
    ], Comentario.prototype, "usuario", void 0);
    Comentario = __decorate([
        (0, typeorm_1.Entity)()
    ], Comentario);
    return Comentario;
}());
exports.Comentario = Comentario;
//# sourceMappingURL=comentario.entity.js.map