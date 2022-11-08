"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
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
/* const myDataSource = new DataSource({
    type: "postgres",
    url: "postgres://regmlgkffxgeyn:e75becdcadf3c1129fd5fe71a8976509f24d6d975345810680c39b7d997db4dd@ec2-3-209-39-2.compute-1.amazonaws.com:5432/d9o8e0jee2gk9u",
    port: 5432,
    username: "regmlgkffxgeyn",
    password: "e75becdcadf3c1129fd5fe71a8976509f24d6d975345810680c39b7d997db4dd",
    database: "d9o8e0jee2gk9u",
    ssl: { rejectUnauthorized: false },
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */
/* const myDataSource = new DataSource({
    type: "postgres",
    host: "postgresql-95002-0.cloudclusters.net",
    port: 19264,
    username: "root",
    password: "crusto2009",
    database: "test",
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
}) */
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://root:6lEuAC2VJErRMWCwRxHzCiwrGJGPAEQg@dpg-cdkod8cgqg43pc4c83ig-a.oregon-postgres.render.com/test_37ws",
    port: 5432,
    /*  username: "root",
     password: "crusto2009",
     database: "test", */
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "./src/entity/*.js"],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map