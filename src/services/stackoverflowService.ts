import { getErrorMessage } from '../utils/errorUtils'
import sendServerRequest from './service'

export const stackoverflowService = {
  search,
}

async function search(search: string) {
  try {
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${search}t&site=stackoverflow&filter=withbody`)
    //const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=${search}&site=stackoverflow`)

    return response
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
