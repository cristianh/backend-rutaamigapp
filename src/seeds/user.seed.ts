import { User } from "../entity/user.entity"

//Import require libraries
import { Request, Response } from "express"
import myDataSource from "../../app-data-source"

//Faker 
import { faker } from '@faker-js/faker';
import { bcrypGenerateEncript } from "../../src/helpers/bcryptHelper";



export class UserSeeder {

    public CreateUser = async (req: Request, res: Response) => {

        try {

            //Save in var the atributes of the request body

            let users = Array();

            let cantidad_usuarios = req.query['nusuarios'] ?? 3

            for (let step = 0; step < cantidad_usuarios; step++) {
                // Runs 5 times, with values of step 0 through 4.
                console.log("Walking east one step");
                users.push({
                    user_name: faker.name.firstName('male'),
                    user_lastname: faker.name.lastName('male'),
                    user_email: faker.internet.email(),
                    user_password: bcrypGenerateEncript("A123bb9%")
                })
              }


            console.log("cantidad de usuarios generados",users.length)

            const dbUser = await myDataSource.getRepository(User).create(users)

            //Create the request body
            const user = await myDataSource.getRepository(User).insert(dbUser)
            return res.status(201).send({ status: "Usuarios creados con exito", user })


        } catch (error) {
            return res.json({ error })
        }
    }
}