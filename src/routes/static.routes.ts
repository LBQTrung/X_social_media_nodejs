import { Router } from 'express'
import { serveStaticImageController, serveVideoStreamController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveStaticImageController)

staticRouter.get('/video-stream/:name', serveVideoStreamController)

export default staticRouter
