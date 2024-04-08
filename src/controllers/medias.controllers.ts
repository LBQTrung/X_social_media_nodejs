import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import mediasService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const url = await mediasService.handleUploadSingleImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD__IMAGE_SUCCESSFULLY,
    result: url
  })
}

export const serveStaticImageController = async (req: Request, res: Response) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: 'Not found'
      })
    }
  })
}
