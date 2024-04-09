import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import mediasService from '~/services/medias.services'
import fs from 'fs'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediasService.handleUploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD__IMAGE_SUCCESSFULLY,
    result: url
  })
}

export const serveStaticImageController = (req: Request, res: Response) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: 'Not found'
      })
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  const url = await mediasService.handleUploadVideo(req)
  return res.json({
    message: 'Upload video successfully',
    result: url
  })
}

export const serveStaticVideoController = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    await fs.promises.access(path.resolve(UPLOAD_VIDEO_DIR, name))
    return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name))
  } catch (err) {
    res.status(404).json({ message: 'Not found' })
  }
}
