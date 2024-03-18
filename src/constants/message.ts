export const USERS_MESSAGES = {
  // General Error
  VALIDATION_ERROR: 'Validation error',

  // Validation Error: Name field
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',

  // Validation Error: Email field
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',

  // Validation Error: Password field
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contains at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',

  // Validation Error: Confirm password field
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm Password must be at least 6 characters long and contains at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',

  // Validation Error: Date of birth field
  DATE_OF_BIRTH_MUST_BE_IOS8601: 'Date of birth must be ISO8601',

  // Login Validation Error
  USER_NOT_FOUND: 'User not found',

  // User constroller
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success'
} as const
