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
exports.User = void 0;
var typeorm_1 = require("typeorm");
//Import needed entyties
var comment_entity_1 = require("./comment.entity");
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
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "user_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "user_lastname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 45, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "user_email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "user_password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: false, default: true }),
        __metadata("design:type", String)
    ], User.prototype, "user_status", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; }),
        __metadata("design:type", comment_entity_1.Comment)
    ], User.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "create_date", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "update_date", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "removal_date", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.entity.js.map