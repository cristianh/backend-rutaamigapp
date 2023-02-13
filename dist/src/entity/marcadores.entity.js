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
exports.Marcador = void 0;
var typeorm_1 = require("typeorm");
/*idMarcadores Int primary key auto_increment,
longitud float not null,
latitud float not null,
estado tinyint,
tiempo_recorrido time*/
var Marcador = /** @class */ (function () {
    function Marcador() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Marcador.prototype, "idMarcadores", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], Marcador.prototype, "longitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float", nullable: false }),
        __metadata("design:type", Number)
    ], Marcador.prototype, "latitud", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "smallint", nullable: false }),
        __metadata("design:type", Boolean)
    ], Marcador.prototype, "estado", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "time", nullable: false }),
        __metadata("design:type", String)
    ], Marcador.prototype, "tiempo_recorrido", void 0);
    Marcador = __decorate([
        (0, typeorm_1.Entity)()
    ], Marcador);
    return Marcador;
}());
exports.Marcador = Marcador;
//# sourceMappingURL=marcadores.entity.js.map