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
exports.FileController = void 0;
var user_entity_1 = require("../entity/user.entity");
var app_data_source_1 = require("../../app-data-source");
var cloudinary = require("cloudinary").v2;
//Set the image server. 
cloudinary.config({
    cloud_name: "dl7oqoile",
    api_key: "511562285567879",
    api_secret: "d802VmOJ78uIQoBlo2cq8sCEuiE"
});
//Import database of user entity 
var file_entity_1 = require("../entity/file.entity");
var FileController = /** @class */ (function () {
    function FileController() {
        var _this = this;
        /**
         * The above code is a function to save file.
         * @param {Request} req - Request - The request object
         * @param {Response} res - Response - The response object
         * @returns Status string.
         */
        /*  */
        this.saveFile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, filename, cloudinary_url, user, dbUserFile, fileuser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        cloudinary.image(req.file.originalname, { width: 150, height: 150, gravity: "face", radius: "max", crop: "fill" });
                        return [4 /*yield*/, cloudinary.uploader.upload(req.file.path, {
                                resource_type: 'auto',
                                folder: 'uploads/',
                                transformation: [
                                    { gravity: "face", height: 400, width: 400, crop: "crop" },
                                    { radius: "max" },
                                    { width: 200, crop: "scale" }
                                ]
                            })];
                    case 1:
                        result = _a.sent();
                        filename = req.file.originalname;
                        cloudinary_url = result.secure_url;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    user_id: 1
                                }
                            })
                            /* const dbUserFile = await myDataSource.getRepository(File).create({
                                file_name: filename,
                                cloudinary_url: cloudinary_url
                                user:user
                            }) */
                        ];
                    case 2:
                        user = _a.sent();
                        dbUserFile = new file_entity_1.File();
                        dbUserFile.file_name = filename,
                            dbUserFile.cloudinary_url = cloudinary_url;
                        dbUserFile.user = user;
                        return [4 /*yield*/, app_data_source_1.default.getRepository(file_entity_1.File).save(dbUserFile)];
                    case 3:
                        fileuser = _a.sent();
                        return [2 /*return*/, res.status(201).send({ status: "¡Archivo cargado correctamente!", File: file_entity_1.File })
                            /* Version 1
                            if (!req.files) {
                                res.send({
                                    status: false,
                                    message: "Archivo no cargado."
                                })
                            } else {
                                //Info file
                    
                    
                                let imagenUpload: any = req.files.imagen;
                                //Implementar el sanitizador para evitar archivos indeseados
                                imagenUpload.mv(path.resolve(__dirname, '../../uploads', imagenUpload.name))
                    
                    
                                res.send({
                                    status: 200,
                                    message: "Archivo Cargado",
                                    data: {
                                        name: imagenUpload.name,
                                        mimetype: imagenUpload.mimetype,
                                        size: imagenUpload.size
                                    }
                                })
                            }
                            */
                        ];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send({ msg: 'Se ha producido un error al cargar el archivo', error: error_1 })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return FileController;
}());
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map