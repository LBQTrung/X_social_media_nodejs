import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import User from '~/models/schemas/User.schema'
import dotenv from 'dotenv'
dotenv.config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const uri = `mongodb+srv://${username}:${password}@twitter.fgfdwp5.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = new Db(this.client, dbName as string)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      this.db = this.client.db('twitter-dev')
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }

  get users(): Collection<User> {
    // Để note được kiểu dữ liệu thì ta hover vào cái return thì vscode sẽ gợi ý
    // Vì ta đã tạo schema User -> Collection<User> rõ ràng hơn Collection<Document>

    try {
      return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService
