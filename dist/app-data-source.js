"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: ["dist/src/entity/*.js"],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map