import { Request, Response, NextFunction } from 'express'
import mediasService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    message: 'Upload image successfully',
    result: result
  })
}
