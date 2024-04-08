import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { ErrorWithStatus } from '../models/schemas/Errors'
import HTTP_STATUS from '../constants/httpStatus'
import { UPLOAD_TEMP_DIR } from '../constants/dir'

export const initUploadFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // For enabling to create nested folder
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB,
    filter: ({ name, originalFilename, mimetype }) => {
      console.log({ name, originalFilename, mimetype })
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))
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
      resolve((files.image as File[])[0])
    })
  })
}

// Utils

/**
 * Input: test.txt
 * @param fullname : string
 * Output: test
 */
export const getNameFromFullname = (fullname: string) => {
  const name = fullname.split('.')[0]
  return name
}
