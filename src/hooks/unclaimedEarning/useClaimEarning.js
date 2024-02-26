import { useCallback, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useContractArray } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { REGISTERED_GAME_LIST } from 'constants/games'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUnclaimedBalance } from './useUnclaimedBalance'
import { useUser } from 'hooks/user/useUser'

export const useClaimEarning = () => {
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const { getGameUnclaimed } = useUnclaimedBalance()
  const gamesContractArray = useContractArray(REGISTERED_GAME_LIST)

  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.CLAIM_EARNINGS)

  const claimEarning = useCallback(
    (gameId) => {
      setStatus(ASYNC_STATUS.PENDING)
      const gameContract = gamesContractArray[REGISTERED_GAME_LIST.indexOf(gameId)]
      gameContract
        .claimReturns()
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { gameId, account },
            txType: TX_TYPE.CLAIM_EARNINGS
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, gamesContractArray, txRegister]
  )

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    const { totalUnclaimedAmount } = getGameUnclaimed(txParams.gameId)
    gaEvent('wallet_claim', {
      pathId: 'wallet.claim',
      hash,
      gameId: txParams.gameId,
      tokenId: txParams.tokenId,
      amountsInUnits: totalUnclaimedAmount,
      confirmed
    })
  }

  /**
   * CUSTOM EVENTS LISTENER
   */
  //OnHash
  useCustomEventListener(txEvents.hash, (txInfo) => {
    //console.log('ACZ onDeposit hash (txInfo) -->', txInfo)
  })
  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    emitCustomEvent(EVENTS.CLAIM_EARNINGS) // TODO: ACZ - Check if this is necessary
    sendExternalEvent(txInfo, true)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const resetStatus = useCallback(() => setStatus(ASYNC_STATUS.IDLE), [])

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { claimEarning, status, hasStatus, resetStatus }
}
