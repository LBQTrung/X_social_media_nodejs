import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayLoad, TweetRequestBody } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweet.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad

  const result = await tweetsService.createTweet(req.body, user_id)

  return res.json({
    message: 'Create tweet successfully',
    result
  })
}
