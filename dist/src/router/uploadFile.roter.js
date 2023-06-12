"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//WE IMPORT THE MULTER AND CLOUDINARY LIBRARIES.
var multer = require("multer");
//Controllers
var file_controller_1 = require("../controllers/file.controller");
/* import * as cloudinary from 'cloudinary'; */
var router = (0, express_1.Router)();
var path = require('path');
// We configure the folder where the images are uploaded
var upload = multer({ dest: __dirname + '../../uploads' });
//Inicializamos el controlador.
var fileUserController = new file_controller_1.FileController();
router.post("/upload", upload.single('file'), fileUserController.saveFile);
exports.default = router;
//# sourceMappingURL=uploadFile.roter.js.map