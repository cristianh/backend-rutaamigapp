import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
})
export default myDataSource