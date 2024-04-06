import fs from 'fs'
import path from 'path'
export const initUploadFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, {
      recursive: true // For enabling to create nested folder
    })
  }
}
