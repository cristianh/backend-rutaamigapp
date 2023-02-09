/*CONEXION DB */
import myDataSource from "./app-data-source"
import * as express from "express"
import { Response,Request} from "express";
/* CARGA DE ARCHIVOS*/
import * as fileUpload from 'express-fileupload'
/* INFORMACON SALIDA Y ENTRADA DE PETICIONES*/
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
/* POLITICAS DE SEGURIDAD DE HOTS */
import * as cors from "cors"
//Morgan - 
/* INFORMACON SALIDA Y ENTRADA DE PETICIONES*/
import * as morgan from 'morgan'
//IMPORTAMOS LAS RUTAS
import ROUTER from './src/router/index'

/* LIBRERIAS AUXILIARES */
const path = require('path');
let bodyParser = require('body-parser')

class ServerApp {

    private app;
    private PORT;
    private path;

    constructor() {
        // INICIAMOS E INICIAALIZAMOS EXPRESS
        this.app = express()

        //DEFINIMOS UN PATH DE RUTA INICIAL
        this.path = '/api'

        //PASAMOS LA CONEXION DEL SERVER A EXPRESS
        this.PORT = process.env.PORT || 3000;

        this.configuracion()
        this.conexionDB()
        this.middleware()
        this.routes()

    }

    conexionDB() {
        // ESTABLECER CONEXION A LA BASE DE DATOS
        myDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
    }

    configuracion() {
        /* CONFIGURACIO DE DOTENV */
        dotenv.config()
    }

    middleware() {
        // HABILITAR CONEXIONES LOCALES - cors
        this.app.options('*', cors())//EL '*' INDICA QUE SE ACEPTAN TODAS LAS CONEXIONES DE CUALQUIER SERVIDOR.

        this.app.use(cors());//INDICAMOS A EXPRESS QUE UTILICE LOS CORS.
        this.app.use(morgan('dev'))

        // CONFIGURAMOS EL BODY DE LA PETICION POST PARA QUE SEA RECIBIDO EN LA PETICION.
        this.app.use(bodyParser.urlencoded({ extended: true }))//INDICAMOS A EXPRESS QUE TULICE BODIBANSER.

        // PASAMOS LA DATA APP. application/json
        this.app.use(bodyParser.json())

        this.app.use(express.json())

        // Servimos los archivos que se encuentran en el directorio public
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use(express.static(path.join(__dirname, './uploads')));

        //Habilitando subida de archivos
        this.app.use(fileUpload({
            createParentPath: true,
            limits: {
                fileSize: 2 * 1024 * 1024 * 1024// Limitamos el  peso del archivo.
            }
        }))
    }

    routes() {
        //RUTAS DE LA APLICACION PASADAS A EXPRESS
        this.app.use(this.path, ROUTER)
        //RUTAs DE PRUEBA
        //!ELIINAR
        //ruta test pagina login
        this.app.get("/", (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../view', 'loginDemo.html'));
        });

        //ruta test notificacion.
        this.app.get("/notificacion", (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../view', 'notificacionDemo.html'));
        });

        //ruta para el mapa de
        this.app.get("/mapa", (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../public', 'mapa.html'));
        });

        //ruta para el mapa de
        this.app.get("/tableromensajes", (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../view', 'tableroMensajeAdmin.html'));
        });


        //ruta test pagina listar usuarios
        this.app.get("/listarusuarios", (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../view', 'listarUsuarioDemo.html'));
        });

    }

    listen() {
        this.app.listen(this.PORT)
        console.log(`Server corriendo en http://localhost:${this.PORT}`)
    }



}


export default ServerApp;