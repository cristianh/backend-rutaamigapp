
import {Router} from 'express';

/*RUTAS*/
import routerUsuario from './usuario.router'
import routerComentario from './comentario.router'
import routerRuta from './ruta.router'
import routerAuth from './auth.router'
import routerUploadFile from './uploadFile.roter'

const ROUTER = Router()
/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/usuario',routerUsuario)
ROUTER.use('/comentario',routerComentario)
ROUTER.use('/ruta',routerRuta)
ROUTER.use('/uploadFile',routerUploadFile)
ROUTER.use('/auth',routerAuth)

export default ROUTER;