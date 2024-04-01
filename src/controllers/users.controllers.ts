import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import {
  EmailReqBody,
  FollowReqBody,
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutRequestBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayLoad,
  UnfollowReqParams,
  UpdateMeReqBody
} from '~/models/schemas/requests/User.requests'
import { pick } from 'lodash'

import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/schemas/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { MongoUnexpectedServerResponseError, ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'
import User from '~/models/schemas/User.schema'

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user
  const user_id = user._id
  const verify = user.verify as UserVerifyStatus
  const result = await userService.login({ user_id, verify: verify })
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

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, EmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })

  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await userService.verifyEmail(user_id)
  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS
  })
}

export const resendEmailVerifyController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  await userService.resendVerifyEmail(user_id)
  return res.json({
    message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, verify } = req.user as User
  await userService.forgotPassword({ user_id: (_id as ObjectId).toString(), verify: verify })

  return res.json({
    message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
  })
}

export const verifyForgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  const { password } = req.body
  await userService.resetPassword(user_id, password)

  return res.json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await userService.getMe(user_id)

  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: user
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const body = req.body
  const user = await userService.updateMe(user_id, body)
  return res.json({
    message: 'Update profile success',
    result: user
  })
}

export const followController = async (
  req: Request<ParamsDictionary, any, FollowReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const { followed_user_id } = req.body

  const user = await userService.follow(user_id, followed_user_id)

  return res.json({
    message: USERS_MESSAGES.FOLLOW_SUCCESS,
    result: user
  })
}

export const unfollowController = async (req: Request<UnfollowReqParams>, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const { user_id: followed_user_id } = req.params

  await userService.unfollow(user_id, followed_user_id)

  return res.json({
    message: USERS_MESSAGES.UNFOLLOW_SUCCESS
  })
}
