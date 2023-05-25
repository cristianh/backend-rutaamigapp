"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
var user_entity_1 = require("../entity/user.entity");
var file_entity_1 = require("../entity/file.entity");
var app_data_source_1 = require("../../app-data-source");
//Faker 
var faker_1 = require("@faker-js/faker");
var bcryptHelper_1 = require("../../src/helpers/bcryptHelper");
var rol_entity_1 = require("../entity/rol.entity");
var UserSeeder = /** @class */ (function () {
    function UserSeeder() {
        var _this = this;
        this.CreateUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users, cantidad_usuarios, findRol, step, file, user, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        users = Array();
                        cantidad_usuarios = (_a = req.params.nusuarios) !== null && _a !== void 0 ? _a : 3;
                        if (!(cantidad_usuarios > 10)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(501).send({ status: "Solo se pueden generar 10 usuario." })];
                    case 1: return [4 /*yield*/, app_data_source_1.default.getRepository(rol_entity_1.Rol).findOneBy({
                            id_rol: 2,
                        })];
                    case 2:
                        findRol = _b.sent();
                        step = 0;
                        _b.label = 3;
                    case 3:
                        if (!(step < cantidad_usuarios)) return [3 /*break*/, 7];
                        file = new file_entity_1.File();
                        user = new user_entity_1.User();
                        file.file_name = "Filedummi",
                            file.cloudinary_url = faker_1.faker.image.avatar(),
                            file.file_create_date = new Date().toISOString();
                        return [4 /*yield*/, app_data_source_1.default.getRepository(file_entity_1.File).save(file)];
                    case 4:
                        _b.sent();
                        user.user_name = faker_1.faker.name.firstName('male'),
                            user.user_lastname = faker_1.faker.name.lastName('male'),
                            user.user_email = faker_1.faker.internet.email(),
                            user.user_password = (0, bcryptHelper_1.bcrypGenerateEncript)("A123bb9%");
                        user.file = file;
                        user.rol_user = findRol;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        step++;
                        return [3 /*break*/, 3];
                    case 7: 
                    /*  const dbUser = await myDataSource.getRepository(User).create(users)
         
                     //Create the request body
                     const user = await myDataSource.getRepository(User).insert(dbUser) */
                    //--------------------
                    /* const dbFile = await myDataSource.getRepository(File).create(files) */
                    //Create the request body
                    /* const file = await myDataSource.getRepository(File).insert(dbFile) */
                    return [2 /*return*/, res.status(201).send({ status: "Usuarios creados con exito", cantidad_usuarios_creados: cantidad_usuarios })];
                    case 8:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.json({ error: error_1 })];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserSeeder;
}());
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=user.seed.js.map