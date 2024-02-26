//ACZ - DEPRECATED, use ONLY during the transition

import { config } from 'config'
import { ACCESS_TOKEN } from 'constants/index'
import { getLocalStorage } from 'utils/localStorage'

/**
 * ACZ - The use of this function is restricted only when you can't use the useUser('wallet') hook
 * */
export const getAuthToken__DEPRECATED = (address) => {
  const accessTokensCache = getLocalStorage(ACCESS_TOKEN)
  return accessTokensCache?.[config.NODE_ENV]?.[address?.toLowerCase()] || ''
}
