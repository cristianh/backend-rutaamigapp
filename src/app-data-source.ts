import { DataSource } from "typeorm"
import "reflect-metadata"

//ENV

import * as dotenv from 'dotenv';

//ENTITYIES
import "reflect-metadata"
import { User } from "./entity/user.entity";
import { File } from "./entity/file.entity";
import { Notification } from "./entity/notification.entity";
import { Rol } from "./entity/rol.entity";
import { Route } from "./entity/route.entity";


dotenv.config();


const dbPort = process.env.DBPORT;
const port = typeof dbPort === 'string' ? parseInt(dbPort) : undefined;

/* mysql-conexion - local 
    CONFIGURANDO LAS VARIABLES DE CONEXION.
    NOTA: REVISAR EL ARCHIVO .env SI DEBEN REALIZAR ALGUN CAMBIO
    OJO!: REVISEN QUE EL ARCHIVO CON SU CONFIGURACION NO SE SUBA AL REPO.(YA ESTA EN EL ARCHIVO GIFIGNORE)
*/
const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    entities: [User,File,Notification,Rol,Route],
    logging: false,
    synchronize: true,
})


export default myDataSource