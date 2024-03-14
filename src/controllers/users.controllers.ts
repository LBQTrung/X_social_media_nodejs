import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { RegisterReqBody } from '~/models/schemas/requests/User.requests'

import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'trung@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success'
    })
  }
  res.status(400).json({
    message: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'Login failed'
    })
  }
}
