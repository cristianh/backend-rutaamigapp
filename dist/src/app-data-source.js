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
    entities: [user_entity_1.User, file_entity_1.File, notification_entity_1.Notification, rol_entity_1.Rol, route_entity_1.Route],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
//# sourceMappingURL=app-data-source.js.map