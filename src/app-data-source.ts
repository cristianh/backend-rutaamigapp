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

/* postgres-conexion - REMOTE 
*/
const myDataSource = new DataSource({
    type: "postgres",
    url:process.env.DBURLREMOTE,
    port: parseInt(process.env.DBPORTREMOTE),
    database: process.env.DBNAMEREMOTE,
    ssl: { rejectUnauthorized: false },
    entities: [User,File,Notification,Rol,Route],
    logging: false,
    synchronize: true,
})


export default myDataSource