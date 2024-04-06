import { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'
import path from 'path'

console.log(path.resolve())
export const uploadSingleImageController = async (req: Request, res: Response) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300KB
  })

  form.parse(req, (err, fields, files) => {
    if (err) throw err
    return res.json({
      message: 'Upload image successfully',
      fields,
      files
    })
  })
}
