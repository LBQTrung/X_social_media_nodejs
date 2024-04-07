import { Request } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { ErrorWithStatus } from './models/schemas/Errors'
import HTTP_STATUS from './constants/httpStatus'
export const initUploadFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, {
      recursive: true // For enabling to create nested folder
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 3000 * 1024, // 300KB,
    filter: ({ name, originalFilename, mimetype }) => {
      console.log({ name, originalFilename, mimetype })
      const valid = name === 'image' && Boolean(mimetype?.includes('/image'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image))
        return reject(
          new ErrorWithStatus({
            message: 'File is empty',
            status: HTTP_STATUS.BAD_REQUEST
          })
        )
      resolve(files)
    })
  })
}
