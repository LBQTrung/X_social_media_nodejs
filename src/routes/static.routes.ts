import { Router } from 'express'
import { serveStaticImageController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:name', wrapRequestHandler(serveStaticImageController))

export default staticRouter
