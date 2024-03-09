import express from 'express'

import usersRouter from './routes/users.routes'

import databaseService from './services/database.services'

const app = express()
app.use(express.json())

databaseService.connect()

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
