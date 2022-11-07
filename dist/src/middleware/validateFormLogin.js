"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("express-validator");
var usuario_entity_1 = require("../entity/usuario.entity");
var app_data_source_1 = require("../../app-data-source");
var validateFormUsuarioRegister = function () {
    return [
        //Verifica que el campo password_usuario no sea vacio , elimina espacios y caracteres innecesarios.
        validator.body('password_usuario').not().isEmpty().trim().escape().withMessage('El campo password es requerido'),
        //Verifica que el campo correo_usuario no sea vacio , elimina espacios y caracteres innecesarios.
        validator.body('correo_usuario').not().isEmpty().trim().escape().withMessage('El campo correo es requerido'),
        //Verifica que el campo password_usuario tenga como minimo 8 caracteres y que tenga al menos una letra, un número y un carácter especial.
        validator.body('password_usuario').isLength({ min: 8 }).withMessage('La contraseña debe tener como minimo 8 caracteres.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)
            .withMessage('La contraseña debe contener al menos una letra, un número y un carácter especial (.$@$!%*?&).'),
        //varifica que el correo tenga un formato valido.
        validator.body('correo_usuario').isEmail().withMessage('El correo no es valido.'),
        //validamos que el correo del usuario no es encuentre ya resgistrado.
        validator.body('correo_usuario').custom(function (value) {
            return app_data_source_1.default.getRepository(usuario_entity_1.Usuario).find({
                where: {
                    correo_usuario: value
                }
            }).then(function (user) {
                if (user.length >= 1) {
                    return Promise.reject('Este correo ya se encuentra registrado');
                }
            });
        })
    ];
};
exports.default = validateFormUsuarioRegister;
//# sourceMappingURL=validateFormLogin.js.map