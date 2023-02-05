"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
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
//Conexion remota.
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://root:6lEuAC2VJErRMWCwRxHzCiwrGJGPAEQg@dpg-cdkod8cgqg43pc4c83ig-a.oregon-postgres.render.com/test_37ws",
    port: 5432,
    /*  username: "root",
     password: "crusto2009",
     database: "test", */
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "/src/entity/*.js"],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map