import { DataSource } from "typeorm"


//mysql-conexion
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


//postgres - remote
const myDataSource = new DataSource({
    type: "postgres",
    url: "postgres://ekepjnzu:kZycIuuDLBKaeUQ5q-JexMg2Zdh07fEm@kashin.db.elephantsql.com/ekepjnzu",//Url pool conexion
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
})


//Conexion remota.
/*const myDataSource = new DataSource({
    type: "postgres",
    url: "postgres://root:6lEuAC2VJErRMWCwRxHzCiwrGJGPAEQg@dpg-cdkod8cgqg43pc4c83ig-a.oregon-postgres.render.com/test_37ws",
    port: 5432,
   username: "root",
    password: "crusto2009",
    database: "test",
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
})*/

export default myDataSource