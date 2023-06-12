"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
require("reflect-metadata");
//ENV
var dotenv = require("dotenv");
//ENTITYIES
require("reflect-metadata");
var user_entity_1 = require("./entity/user.entity");
var file_entity_1 = require("./entity/file.entity");
var notification_entity_1 = require("./entity/notification.entity");
var rol_entity_1 = require("./entity/rol.entity");
var route_entity_1 = require("./entity/route.entity");
dotenv.config();
var dbPort = process.env.DBPORT;
var port = typeof dbPort === 'string' ? parseInt(dbPort) : undefined;
/* postgres-conexion - REMOTE
*/
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DBURLREMOTE,
    port: parseInt(process.env.DBPORTREMOTE),
    database: process.env.DBNAMEREMOTE,
    ssl: { rejectUnauthorized: false },
    entities: [user_entity_1.User, file_entity_1.File, notification_entity_1.Notification, rol_entity_1.Rol, route_entity_1.Route],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map