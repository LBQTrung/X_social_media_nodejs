import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { LogoutRequestBody, RegisterReqBody } from '~/models/schemas/requests/User.requests'

import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/schemas/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
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

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutRequestBody>, res: Response) => {
  const { refresh_token } = req.body
  if (req.decoded_authorization?.user_id !== req.decoded_refresh_token?.user_id) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_ID_OF_REFRESH_TOKEN_AND_ACCESS_TOKEN_NOT_MATCH,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  await userService.logout(refresh_token)
  res.json({
    message: 'Logout success'
  })
}
