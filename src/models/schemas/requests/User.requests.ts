import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'
import { extend } from 'lodash'

// Định nghĩa các interface user gửi lên
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface EmailReqBody {
  email_verify_token: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
}

export interface LogoutRequestBody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
}

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}
