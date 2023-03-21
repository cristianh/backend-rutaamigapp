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
exports.File = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
/* CREATE TABLE files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    cloudinary_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ); */
var File = /** @class */ (function () {
    function File() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], File.prototype, "file_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 100, nullable: false }),
        __metadata("design:type", String)
    ], File.prototype, "file_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, length: 100, nullable: false }),
        __metadata("design:type", String)
    ], File.prototype, "cloudinary_url", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user.user_file; }, {
            cascade: true
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.User)
    ], File.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], File.prototype, "create_date", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], File.prototype, "update_date", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", String)
    ], File.prototype, "removal_date", void 0);
    File = __decorate([
        (0, typeorm_1.Entity)()
    ], File);
    return File;
}());
exports.File = File;
//# sourceMappingURL=file.entity.js.map