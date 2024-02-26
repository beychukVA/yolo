import { getLocalStorage, setLocalStorage } from './baseFunction'
import { USERNAMES } from 'constants/index'

const getLocalAllUsernames = () => getLocalStorage(USERNAMES) || {}
const setLocalAllUsernames = (localItems) => setLocalStorage(USERNAMES, localItems)

export const setLocalUsername = (address, username) => {
  const localItems = getLocalAllUsernames()
  Object.assign(localItems, {
    [address]: username
  })
  setLocalAllUsernames(localItems)
}

export const getLocalUsername = (address) => {
  const localItems = getLocalAllUsernames()
  return localItems[address]
}
