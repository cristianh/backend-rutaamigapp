import * as express from "express"
import routerUsusario from './src/router/usuario.router'
import routerComentario from './src/router/comentario.router'
import routerRuta from './src/router/ruta.router'
import  myDataSource  from "./app-data-source"

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



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())

//Rutas
app.use('/app',routerUsusario)
app.use('/app',routerComentario)
app.use('/app',routerRuta)

// start express server
app.listen(3000)