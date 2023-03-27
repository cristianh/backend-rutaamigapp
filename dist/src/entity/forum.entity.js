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
exports.Forum = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
/*idForo int primary key auto_increment,
usuarios_idusuario int,
comentarios_idcomentarios int,
estado tinyint not null*/
var Forum = /** @class */ (function () {
    function Forum() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Forum.prototype, "forum_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 80, nullable: false }),
        __metadata("design:type", String)
    ], Forum.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "smallint", nullable: false }),
        __metadata("design:type", Boolean)
    ], Forum.prototype, "estado", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (usuario) { return usuario.forum; }),
        __metadata("design:type", user_entity_1.User
        /*  @ManyToOne(() => Comentario, (comentario) => comentario.foro)
         comentario!: Comentario */
        )
    ], Forum.prototype, "user", void 0);
    Forum = __decorate([
        (0, typeorm_1.Entity)()
    ], Forum);
    return Forum;
}());
exports.Forum = Forum;
//# sourceMappingURL=forum.entity.js.map