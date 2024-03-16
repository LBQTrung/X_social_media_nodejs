import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import { pick } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(pick(err, ['message']))
}
