import { event } from '../utils'

export default event('ready', ({ log }, client) => {
    log(`logged in as ${client.user.tag}`)
})