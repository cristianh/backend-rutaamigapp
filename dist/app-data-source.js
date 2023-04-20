"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
//ENV
var dotenv = require("dotenv");
dotenv.config();
/* mysql-conexion - local
    CONFIGURANDO LAS VARIABLES DE CONEXION.
    NOTA: REVISAR EL ARCHIVO .env SI DEBEN REALIZAR ALGUN CAMBIO
    OJO!: REVISEN QUE EL ARCHIVO CON SU CONFIGURACION NO SE SUBA AL REPO.(YA ESTA EN EL ARCHIVO GIFIGNORE)
*/
var myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
});
/* postgres-conexion - REMOTE
*/
/* const myDataSource = new DataSource({
    type: "postgres",
    url:process.env.DBURLREMOTE,
    port: parseInt(process.env.DBPORTREMOTE),
    username: process.env.DBUSERREMOTE,
    password: process.env.DBPASSWORDREMOTE,
    database: process.env.DBNAMEREMOTE,
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
<<<<<<< HEAD
}) */
=======
})
 */
>>>>>>> b69a122d72aa2813e10d1d845c67bd4250e59f23
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map