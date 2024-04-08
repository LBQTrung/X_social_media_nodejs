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
      ? `${process.env.HOST}/static/${newFilename}.jpeg` // Production media link
      : `http://localhost:4000/static/${newFilename}.jpeg` // Local media link
  }
}

const mediasService = new MediasService()

export default mediasService
