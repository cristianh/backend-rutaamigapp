"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
//mysql-conexion - local
/* const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */
//mysql-conexion - remota
/* const myDataSource = new DataSource({
    type: "mysql",
    host: "mysql-112287-0.cloudclusters.net",
    port: 19674,
    username: "admin",
    password: "gRtzTZxC",
    database: "test",
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */
//postgres - remote
/* const myDataSource = new DataSource({
    type: "postgres",
    url: "postgres://ekepjnzu:kZycIuuDLBKaeUQ5q-JexMg2Zdh07fEm@kashin.db.elephantsql.com/ekepjnzu",//Url pool conexion
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
})
 */
//Conexion remota a base postgress render.
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://rootadmin:P5ADBol1DUa9EABHn6nUAQGipZ6ZgEjE@dpg-cge7qgceoognlfmioigg-a.oregon-postgres.render.com/test_n67h",
    port: 5432,
    /*  username: "root",
      password: "P5ADBol1DUa9EABHn6nUAQGipZ6ZgEjE",
      database: "test", */
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map