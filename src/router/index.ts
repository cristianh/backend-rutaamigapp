//Import the dependence of express
import {Router} from 'express';

/*Import router routes*/
import routerUser from './user.router'
import routerRol from './rol.router'
import routerNotificacion from './notifications.router'
import routerRuta from './route.router'
import routerAuth from './auth.router'
import routerUploadFile from './uploadFile.roter'

const ROUTER = Router()

/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/user',routerUser)
ROUTER.use('/route',routerRuta)
ROUTER.use('/rol',routerRol)
ROUTER.use('/notificacion',routerNotificacion)
ROUTER.use('/uploadFile',routerUploadFile)
ROUTER.use('/auth',routerAuth)

export default ROUTER;