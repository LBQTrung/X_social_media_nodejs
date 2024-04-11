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

  // Get video size efficiently
  const videoStats = await fs.promises.stat(videoPath)
  const videoSize = videoStats.size

  // Set appropriate chunk size (consider network conditions)
  const chunkSize = Math.min(1024 * 1024, videoSize) // Adjust based on network conditions

  // Parse range header (handle malformed headers gracefully)
  const rangeParts = (req.headers.range as string).split('=')
  if (rangeParts.length !== 2 || rangeParts[0] !== 'bytes') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid Range header format (bytes=start-end)'
    })
  }

  const rangeValues = rangeParts[1].split('-')
  const start = parseInt(rangeValues[0], 10)
  const end = parseInt(rangeValues[1], 10) || videoSize - 1 // Default to last byte

  // Validate requested byte range
  if (isNaN(start) || isNaN(end) || start < 0 || end < start || end >= videoSize) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Requested range is not satisfiable'
    })
  }

  // Calculate actual content length for the stream
  const contentLength = Math.min(end - start + 1, videoSize - start) // +1 for inclusive end byte

  // Efficiently determine MIME type using pre-loaded database
  const mime = (await import('mime')).default
  const mimeType = mime.getType(videoPath) || 'video/*' // Default to generic video type

  // Set response headers
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': mimeType
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)

  // Stream video efficiently using createReadStream with options
  const videoStream = fs.createReadStream(videoPath, { start, end: end + 1 }) // +1 for inclusive end

  // Handle potential errors during streaming
  videoStream.on('error', (error) => {
    console.error('Error streaming video:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).end()
  })

  videoStream.pipe(res) // Stream video data to the response
}
