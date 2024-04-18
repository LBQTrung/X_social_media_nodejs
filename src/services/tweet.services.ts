import { TweetRequestBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'
import Hashtag from '~/models/schemas/Hashtags.schema'

class TweetsService {
  async checkAndCreateHashtags(hashtags: string[]) {
    // Find hashtag in database
    // If find fail -> create new hashtag
    const hashtagDocuments = await Promise.all(
      hashtags.map((hashtag) => {
        console.log(hashtag)
        return databaseService.hashtags.findOneAndUpdate(
          {
            name: hashtag
          },
          {
            $setOnInsert: new Hashtag({ name: hashtag })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )

    return hashtagDocuments.map((hashtagDocument) => hashtagDocument?._id as ObjectId)
  }

  async createTweet(body: TweetRequestBody, user_id: string) {
    const hashtags = await this.checkAndCreateHashtags(body.hashtags)
    console.log(hashtags)
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags: hashtags, // Update soon
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )

    return result
  }
}

const tweetsService = new TweetsService()
export default tweetsService
