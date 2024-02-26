import { useCallback, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useWhitelistSFTClaimsContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { useCustomEventListener } from 'react-custom-events'
import { useErrorToUserMessage } from 'utils/hooks/useErrorToUserMessage'
import { useUser } from 'hooks/user/useUser'

export const useXftClaim = () => {
  const errorToUserMessage = useErrorToUserMessage()
  const { account } = useUser('wallet')

  const WhitelistSFTClaimsContract = useWhitelistSFTClaimsContract()
  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.XFT_CLAIM)

  const claimXFT = useCallback(() => {
    setStatus(ASYNC_STATUS.PENDING)
    WhitelistSFTClaimsContract.claimNft()
      .then(async (txResponse) => {
        txRegister({
          from: account,
          hash: txResponse.hash,
          txParams: {},
          txType: TX_TYPE.XFT_CLAIM
        })
      })
      .catch((error) => {
        // console.log('txResponse (error) -->', error)
        const message = errorToUserMessage(error, { callPoint: 'WhitelistSFTClaimsContract.claimNft' })
          .replace('{{amount}}', '10')
          .replace('{{tokenId}}', 'USDC')
        setStatus({ ...ASYNC_STATUS.ERROR, message: message })
      })
  }, [account, WhitelistSFTClaimsContract, txRegister])

  /**
   * CUSTOM EVENTS LISTENER
   */
  //OnHash
  useCustomEventListener(txEvents.hash, (txInfo) => {
    //console.log('ACZ onDeposit hash (txInfo) -->', txInfo)
  })
  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { claimXFT, status, hasStatus }
}
