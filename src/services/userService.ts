import { getErrorMessage } from '../utils/errorUtils'
import sendServerRequest from './service'

export const userService = {
  getUser,
}

async function getUser(userId: string) {
  try {
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/users/${userId}?site=stackoverflow`)
    
    return response
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
