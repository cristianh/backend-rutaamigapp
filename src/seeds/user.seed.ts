import { User } from "../entity/user.entity"
import { File } from "../entity/file.entity"

//Import require libraries
import { Request, Response } from "express"
import myDataSource from "../../src/app-data-source"

//Faker 
import { faker } from '@faker-js/faker';
import { bcrypGenerateEncript } from "../../src/helpers/bcryptHelper";
import { Rol } from "../entity/rol.entity";



export class UserSeeder {

    public CreateUser = async (req: Request, res: Response) => {

        try {




            //Save in var the atributes of the request body

            let users = Array();
            /* let files = Array(); */

            let cantidad_usuarios: any = req.params.nusuarios ?? 3
            /*  cantidad_usuarios = parseInt('cantidad_usuarios', 10)
             console.log(cantidad_usuarios) */
            // Validate if users are greater than 10.
            if (cantidad_usuarios > 10) {
                return res.status(501).send({ status: "Solo se pueden generar 10 usuario." })
            }
            else {

                 //FIND ROL IN DB
                 const findRol = await myDataSource.getRepository(Rol).findOneBy({
                    id_rol: 2,
                })


                for (let step = 0; step < cantidad_usuarios; step++) {
                    // Runs 5 times, with values of step 0 through 4.                    
                    let file = new File()
                    let user = new User()

                    file.file_name = "Filedummi",
                    file.cloudinary_url = faker.image.avatar(),
                    file.file_create_date = new Date().toISOString()

                    await myDataSource.getRepository(File).save(file)

                    user.user_name = faker.name.firstName('male'),
                    user.user_lastname = faker.name.lastName('male'),
                    user.user_email = faker.internet.email(),
                    user.user_password = bcrypGenerateEncript("A123bb9%")
                    user.file = file
                    user.rol_user = findRol

                    await myDataSource.getRepository(User).save(user)

                }
            }





            /*  const dbUser = await myDataSource.getRepository(User).create(users)
 
             //Create the request body
             const user = await myDataSource.getRepository(User).insert(dbUser) */

            //--------------------
            /* const dbFile = await myDataSource.getRepository(File).create(files) */

            //Create the request body
            /* const file = await myDataSource.getRepository(File).insert(dbFile) */


            return res.status(201).send({ status: "Usuarios creados con exito", cantidad_usuarios_creados: cantidad_usuarios })


        } catch (error) {
            return res.json({ error })
        }
    }
}