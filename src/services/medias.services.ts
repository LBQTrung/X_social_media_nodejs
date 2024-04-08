import { Request } from 'express'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import sharp from 'sharp'
import { File } from 'formidable'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/utils/config'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = (await handleUploadSingleImage(req)) as File
    const newFilename = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newFilename}.jpeg`)
    const info = await sharp(file.filepath).jpeg().toFile(newPath)

    // Delete temp image file
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/medias/${newFilename}` // Production media link
      : `http://localhost:3000/uploads/${newFilename}.jpg` // Local media link
  }
}

const mediasService = new MediasService()

export default mediasService
