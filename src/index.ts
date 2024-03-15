import express, { Request, Response, NextFunction } from 'express'

import usersRouter from './routes/users.routes'

import databaseService from './services/database.services'

const app = express()
const port = 3000
app.use(express.json())

databaseService.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error:', err.message)
  res.status(400).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
