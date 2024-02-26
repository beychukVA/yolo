import { useCallback, useMemo, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useLiquidityContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, ASYNC_STATUS_ID, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'

import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useToken } from 'utils/hooks/useToken'
import { useUser } from './user/useUser'

export const useTokenDeposit = (optionObj) => {
  const { silentUpdate } = { silentUpdate: false, ...optionObj }
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const { tokenId, parseToken } = useToken()
  const liquidityContract = useLiquidityContract()
  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.YOLO_DEPOSIT)

  const tokenDeposit = useCallback(
    (tokenUnitAmountBN) => {
      setStatus(ASYNC_STATUS.PENDING)

      liquidityContract
        .mintLpShares(tokenUnitAmountBN)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { tokenId, amountInUnit: tokenUnitAmountBN.toString() },
            txType: TX_TYPE.YOLO_DEPOSIT
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, tokenId, liquidityContract, txRegister]
  )

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('liquidity_dashboard_deposit', {
      pathId: 'dashboard.liquidity.deposit',
      hash,
      tokenId: txParams.tokenId,
      amountInUnit: txParams.amountInUnit,
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
    emitCustomEvent(EVENTS.YLP_TOKEN_DEPOSIT)
    sendExternalEvent(txInfo, true)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(
    () => (silentUpdate ? false : hasStatus(ASYNC_STATUS_ID.PENDING)),
    [silentUpdate, hasStatus]
  )

  return { tokenDeposit, status, hasStatus, isLoading }
}
