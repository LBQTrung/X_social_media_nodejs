import { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'
import path from 'path'
import { handleUploadSingleImage } from '~/file'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const data = await handleUploadSingleImage(req)

  return res.json({
    message: 'Upload image successfully',
    result: data
  })
}
