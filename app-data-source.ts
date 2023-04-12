import { DataSource } from "typeorm"
//ENV
import * as dotenv from 'dotenv';
dotenv.config();


//mysql-conexion - local
const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
})

export default myDataSource
