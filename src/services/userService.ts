import { getErrorMessage } from '../utils/errorUtils'
import sendServerRequest from './service'

export const userService = {
  getUser,
  getUserBadges,
  getUserTags,
  getUserPosts,
}

const apiKey = import.meta.env.VITE_STACKOVERFLOW_KEY

async function getUser(userId: string) {
  try {
    if (!apiKey) return {
      error_message: 'You need api key for stackoverflow'
    }
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/users/${userId}?order=desc&key=${apiKey}&sort=reputation&site=stackoverflow&filter=!56AlEmxsjzRDQC7T76Wa60Q)_ScJG(._DE*AoY`)

    return response?.items[0] ?? {}
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

async function getUserBadges(userId: string) {
  try {
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/users/${userId}/badges?order=asc&key=${apiKey}&sort=rank&site=stackoverflow&filter=!9Z(-wpRe0`)

    return response?.items ?? []
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

async function getUserTags(userId: string) {
  try {
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/users/${userId}/tags?order=desc&key=${apiKey}&sort=popular&site=stackoverflow&filter=!9W4AANjx4`)

    return response?.items ?? []
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

async function getUserPosts(userId: string) {
  try {
    const response = await sendServerRequest('GET', `https://api.stackexchange.com/2.3/users/${userId}/posts?order=desc&key=${apiKey}&sort=votes&site=stackoverflow&filter=!LRKj_WFPXRajDAANkxPcKv`)

    return response?.items ?? []
  } catch(error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
