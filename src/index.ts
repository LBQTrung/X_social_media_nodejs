import express, { Request, Response, NextFunction } from 'express'

import usersRouter from './routes/users.routes'

import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initUploadFolder } from './utils/file'
import staticRouter from './routes/static.routes'

const app = express()
const port = process.env.PORT || 4000
// Create folder for upload files
initUploadFolder()

databaseService.connect()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/static', staticRouter)
app.use('/user', usersRouter)
app.use('/media', mediasRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
