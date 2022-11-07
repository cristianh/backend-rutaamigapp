import * as express from "express"
import routerUsuario from './src/router/usuario.router'
import routerComentario from './src/router/comentario.router'
import routerRuta from './src/router/ruta.router'
import routerUploadFile from './src/router/uploadFile.roter'
import  myDataSource  from "./app-data-source"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as fileUpload from 'express-fileupload'
dotenv.config()
import * as cors from "cors"
//Morgan
import * as morgan from 'morgan'

const path = require('path');


let bodyParser = require('body-parser')
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


    
// create and setup express app
const app = express()

const PORT = process.env.PORT || 3000;

//cors
app.options('*', cors())
app.use(cors());
app.use(morgan('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())

// Servimos los archivos que se encuentran en el directorio public
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './uploads')));

//Habilitando subida de archivos
app.use(fileUpload({
    createParentPath:true
}))



//!Ojo esto es opcional se utilizara en el mapa.
// Indicamos que serviremos el archivo index.html cuando accedamos a esta ruta
/* app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
}); */

//Rutas
app.use('/app',routerUsuario)
app.use('/app',routerComentario)
app.use('/app',routerRuta)
app.use('/app',routerUploadFile)

// start express server
app.listen(PORT)


console.log(`Server corriendo en http://localhost:${PORT}`)