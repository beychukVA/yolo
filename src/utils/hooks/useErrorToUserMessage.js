import { useCallback } from 'react'

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
export const providerErrorToUserReadableMessage = (error) => {
  const err = JSON.parse(JSON.stringify(error))
  const errorData = err.error?.data || err
  const rawReason = errorData?.message || errorData.reason
  const errCode = errorData?.code

  let reason = rawReason
  if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substr('execution reverted: '.length)

  switch (errCode) {
    case 3: //execution reverted
      let userMessage = 'Unregistered error, please contact us'
      if (reason.includes('transfer amount exceeds balance')) userMessage = `You need {{amount}} {{tokenId}} to claim`
      return userMessage
    default:
      return reason
  }
}

// const INITIAL_OPTIONS = {
//   register: true, // if you need to register the error
//   callPoint: '' // specific info of the method that produce the error, i.e.: 'WhitelistSFTClaimsContract.claimNft'
// }

export const useErrorToUserMessage = () => {
  const errorToUserMessage = useCallback((error, options) => {
    // const { register, callPoint } = { ...INITIAL_OPTIONS, ...options }
    const message = providerErrorToUserReadableMessage(error)
    // console.log(message, { rawError: error })
    // register && log.error(message, { callPoint, rawError: error })
    return message
  }, [])

  return errorToUserMessage
}
