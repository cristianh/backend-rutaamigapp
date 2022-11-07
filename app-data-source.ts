import { DataSource } from "typeorm"

//MySQL
/* const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */
//postgres
/* const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "test",
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */

const myDataSource = new DataSource({
    type: "postgres",
    url: "postgres://regmlgkffxgeyn:e75becdcadf3c1129fd5fe71a8976509f24d6d975345810680c39b7d997db4dd@ec2-3-209-39-2.compute-1.amazonaws.com:5432/d9o8e0jee2gk9u",
   /*  port: 5432,
    username: "regmlgkffxgeyn",
    password: "e75becdcadf3c1129fd5fe71a8976509f24d6d975345810680c39b7d997db4dd",
    database: "d9o8e0jee2gk9u", */
    ssl: { rejectUnauthorized: false },
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
})

export default myDataSource