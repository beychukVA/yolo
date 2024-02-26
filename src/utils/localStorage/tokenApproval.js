import { getLocalStorage, setLocalStorage } from './baseFunction'

import { YOLO_TOKEN_APPROVAL } from 'constants/index'
import { soliditySha3 } from 'utils'

const getLocalAllTokenApproved = () => getLocalStorage(YOLO_TOKEN_APPROVAL) || {}
const setLocalAllTokenApproved = (localItems) => setLocalStorage(YOLO_TOKEN_APPROVAL, localItems)

export const composeTokenLocalKey = (account = '0', tokenAddress = '0', gameAddress = '0') =>
  soliditySha3(account.toLowerCase(), tokenAddress.toLowerCase(), gameAddress.toLowerCase())

export const setLocalTokenApprove = (account, tokenAddress, spenderAddress, isAllowed) => {
  const localItems = getLocalAllTokenApproved()
  const YTKNLocalKey = composeTokenLocalKey(account, tokenAddress, spenderAddress)
  Object.assign(localItems, {
    [YTKNLocalKey]: isAllowed
  })
  setLocalAllTokenApproved(localItems)
}

export const getLocalTokenApprovalStatus = (account, tokenAddress, spenderAddress) => {
  const localItems = getLocalAllTokenApproved()
  const YTKNLocalKey = composeTokenLocalKey(account, tokenAddress, spenderAddress)
  return localItems[YTKNLocalKey] || false
}
