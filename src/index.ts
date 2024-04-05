import express, { Request, Response, NextFunction } from 'express'

import usersRouter from './routes/users.routes'

import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const port = 4000
databaseService.connect()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
