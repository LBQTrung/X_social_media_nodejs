import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

// Định nghĩa các interface user gửi lên
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface LogoutRequestBody {
  refresh_token: string
}
