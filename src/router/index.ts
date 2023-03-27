//Import the dependence of express
import {Router} from 'express';

/*Import router routes*/
import routerUser from './user.router'
import routerForum from './forum.router'
import routerComentario from './comment.router'
import routerRuta from './route.router'
import routerAuth from './auth.router'
import routerUploadFile from './uploadFile.roter'

const ROUTER = Router()
/* DEFINIMOS EL PATH INICIAL DE CADA RUTA*/
ROUTER.use('/usuario',routerUser)
ROUTER.use('/foro',routerForum)
ROUTER.use('/comentario',routerComentario)
ROUTER.use('/ruta',routerRuta)
ROUTER.use('/uploadFile',routerUploadFile)
ROUTER.use('/auth',routerAuth)

export default ROUTER;