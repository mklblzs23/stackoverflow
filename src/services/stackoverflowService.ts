import { getErrorMessage } from '../utils/errorUtils'
import sendServerRequest from './service'

export const stackoverflowService = {
  search,
}

const apiKey = import.meta.env.VITE_STACKOVERFLOW_KEY

async function search(search: string) {
  try {
    if (!apiKey) return {
      error_message: 'You need api key for stackoverflow'
    }
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${search}t&site=stackoverflow&filter=withbody&key=${apiKey}`)
 
    return response
  } catch(error) {
    return {
      error_message: getErrorMessage(error),
    }
  }
}
