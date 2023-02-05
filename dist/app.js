"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var server = new server_1.default();
server.listen();
//!Ojo esto es opcional se utilizara en el mapa.
// Indicamos que serviremos el archivo index.html cuando accedamos a esta ruta
/* app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
}); */
//# sourceMappingURL=app.js.map