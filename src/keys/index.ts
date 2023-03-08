import { Keys } from '../types'
const keys: Keys = {
    clientToken: process.env.CLIENT_TOKEN ?? 'nil'
}

if (Object.values(keys).includes('nil'))
    throw new Error('CLIENT_TOKEN is not defined in .env file.')

export default keys