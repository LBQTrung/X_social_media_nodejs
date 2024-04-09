import { Request } from 'express'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { File } from 'formidable'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/utils/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'

class MediasService {
  async handleUploadImage(req: Request) {
    const files = (await handleUploadImage(req)) as File[]
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        {
          const newFilename = getNameFromFullname(file.newFilename)
          const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newFilename}.jpeg`)
          const info = await sharp(file.filepath).jpeg().toFile(newPath)

          // Delete temp image file
          fs.unlinkSync(file.filepath)
          return {
            url: isProduction
              ? `${process.env.HOST}/static/image/${newFilename}.jpeg` // Production media link
              : `http://localhost:${process.env.PORT}/static/image/${newFilename}.jpeg`, // Local media link
            type: MediaType.Image
          }
        }
      })
    )

    return result
  }

  async handleUploadVideo(req: Request) {
    const files = (await handleUploadVideo(req)) as File[]
    const file = files[0]
    // fs.unlinkSync(file.filepath)
    return {
      url: isProduction
        ? `${process.env.HOST}/static/video/${file.newFilename}` // Production media link
        : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`, // Local media link
      type: MediaType.Video
    }
  }
}

const mediasService = new MediasService()

export default mediasService
