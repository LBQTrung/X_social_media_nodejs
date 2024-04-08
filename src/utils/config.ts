import minimist from 'minimist'
import { config } from 'dotenv'
config()

const args = minimist(process.argv.slice(2))

export const isProduction = Boolean(args.production)
