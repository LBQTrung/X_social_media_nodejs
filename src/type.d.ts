import { Request } from 'express'
import { TokenPayLoad } from './models/schemas/requests/User.requests'

declare module 'express' {
  interface Request {
    user?: User
    decoded_refresh_token?: TokenPayLoad
    decoded_authorization?: TokenPayLoad
    decoded_email_verify_token?: TokenPayLoad
  }
}
