import { useCallback, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useLiquidityContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useToken } from 'utils/hooks/useToken'
import { useUser } from 'hooks/user/useUser'

export const useYlpWithdraw = () => {
  const { tokenId } = useToken('YLP')
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const liquidityContract = useLiquidityContract()
  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.YLP_WITHDRAW)

  const ylpWithdraw = useCallback(
    (ylpUnitAmountBN) => {
      setStatus(ASYNC_STATUS.PENDING)

      liquidityContract
        .burnLpShares(ylpUnitAmountBN)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { tokenId, amountInUnit: ylpUnitAmountBN.toString() },
            txType: TX_TYPE.YLP_WITHDRAW
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, liquidityContract, txRegister, tokenId]
  )

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('liquidity_dashboard_withdraw', {
      pathId: 'dashboard.liquidity.withdraw',
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
    //console.log('ACZ onWithdraw hash (txInfo) -->', txInfo)
  })
  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    emitCustomEvent(EVENTS.YLP_TOKEN_WITHDRAW)
    sendExternalEvent(txInfo, true)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { ylpWithdraw, status, hasStatus }
}
