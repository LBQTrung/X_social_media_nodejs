import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { RegisterReqBody } from '~/models/schemas/requests/User.requests'

import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/message'
export const loginController = async (req: Request, res: Response) => {
  const user = req.user
  const user_id = user._id
  const result = await userService.login(user_id)
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await userService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
