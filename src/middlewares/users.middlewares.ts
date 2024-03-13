import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }

  next()
}

export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    trim: true
  },
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true
  },
  password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    },
    isStrongPassword: {
      errorMessage:
        'Password must be at least 6 characters long and contains at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  },
  confirm_password: {
    // notEmpty: true,
    // isString: true,
    // isLength: {
    //   options: {
    //     min: 6,
    //     max: 50
    //   }
    // },
    // isStrongPassword: {
    //   errorMessage:
    //     'Confirm password must be at least 6 characters long and contains at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',
    //   options: {
    //     minLength: 6,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1
    //   }
    // },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
