import { Router } from 'express'
import { serveStaticImageController, serveStaticVideoController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveStaticImageController)

staticRouter.get('/video/:name', serveStaticVideoController)

export default staticRouter
