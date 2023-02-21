import * as validator from 'express-validator';
import { validationResult } from 'express-validator';
import myDataSource from "../../app-data-source"

//Import database user entity
import { User} from "../entity/user.entity"

export class Validations {

    public validateFormUsuarioRegister = () => {
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
            validator.body('correo_usuario').custom(value => {
                return myDataSource.getRepository(User).find({
                    where: {
                        user_email: value
                    }

                }).then(user => {

                    if (user.length >= 1) {
                        console.log("El correo ya existe")
                        return Promise.reject('Este correo ya se encuentra registrado');
                    }
                })

            })
        ]
    }


    public validateFormUsuarioLogin = () => {
        return [
            //Verifica que el campo password_usuario no sea vacio , elimina espacios y caracteres innecesarios.
            validator.body('password_usuario').not().isEmpty().trim().escape().withMessage('El campo password es requerido'),
            //Verifica que el campo correo_usuario no sea vacio , elimina espacios y caracteres innecesarios.
            validator.body('correo_usuario').not().isEmpty().trim().escape().withMessage('El campo correo es requerido'),
            //varifica que el correo tenga un formato valido.
            validator.body('correo_usuario').isEmail().withMessage('El correo no es valido.')
        ]
    }

    public validateFormNewPassword = () => {
        //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)
        return [
            //Verifica que el campo password_usuario tenga como minimo 8 caracteres y que tenga al menos una letra, un número y un carácter especial.
            validator.body('password_usuario').isLength({ min: 8 }).withMessage('La contraseña debe tener como minimo 8 caracteres.')                
                .withMessage('La contraseña debe contener al menos una letra, un número y un carácter especial (.$@$!%*?&).')
        ]
    }
}



export default Validations;

