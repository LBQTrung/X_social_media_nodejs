import { ObjectId } from 'mongodb'
import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Other'

interface TweetContructor {
  _id?: ObjectId
  user_id: ObjectId
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string // Chi null khi la tweet goc
  hashtags: ObjectId[] // Chua cac hashtags id -> ket hop giua ref va embed
  mentions: string[]
  medias: Media[]
  guest_views?: number
  user_views?: number
  create_at?: Date
  update_at?: Date
}

export default class Tweet {
  _id?: ObjectId
  user_id: ObjectId
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | ObjectId // Chi null khi la tweet goc
  hashtags: ObjectId[] // Chua cac hashtags id -> ket hop giua ref va embed
  mentions: ObjectId[]
  medias: Media[]
  guest_views: number
  user_views: number
  create_at: Date
  update_at: Date
  constructor({
    _id,
    user_id,
    type,
    audience,
    content,
    parent_id,
    hashtags,
    mentions,
    medias,
    guest_views,
    user_views,
    create_at,
    update_at
  }: TweetContructor) {
    const date = new Date()
    this._id = _id
    this.user_id = user_id
    this.type = type
    this.audience = audience
    this.content = content
    this.parent_id = parent_id ? new ObjectId(parent_id) : null
    this.hashtags = hashtags
    this.mentions = mentions.map((item) => new ObjectId(item))
    this.medias = medias
    this.guest_views = guest_views || 0
    this.user_views = user_views || 0
    this.create_at = create_at || date
    this.update_at = update_at || date
  }
}
