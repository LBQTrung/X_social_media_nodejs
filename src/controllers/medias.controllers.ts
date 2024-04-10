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

// export const serveVideoStreamController = async (req: Request, res: Response) => {
//   const { name } = req.params

//   try {
//     await fs.promises.access(path.resolve(UPLOAD_VIDEO_DIR, name))
//     return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name))
//   } catch (err) {
//     res.status(404).json({ message: 'Not found' })
//   }
// }

export const serveVideoStreamController = async (req: Request, res: Response) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Requires range header'
    })
  }

  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)

  // 1MB = 10^6 bytes (calculate according to decimal)
  const videoStats = await fs.promises.stat(videoPath)
  const videoSize = videoStats.size

  // Part video of video
  const chunkSize = 10 ** 6 // 1MB
  // Get start byte value from range header
  const start = Number(range.replace(/\D/g, ''))
  // // Get end byte value from range header
  const end = Math.min(start + chunkSize, videoSize - 1)

  // Dung lượng thực tế cho mỗi đoạn video stream
  // Thông thường đây sẽ là chunkSize ngoại trừ đoạn cuối cùng
  const contentLength = end - start + 1

  // Dynamic import
  const mime = (await import('mime')).default
  const contentType = mime.getType(videoPath) || 'video/*'

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  const videoStreams = fs.createReadStream(videoPath, { start, end })
  videoStreams.pipe(res)
}
