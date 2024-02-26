import { useCallback, useState } from 'react'

import { ASYNC_STATUS } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useNftPackContract } from 'hooks/contracts/useContract'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useTxsCache } from 'hooks/useTxsCache'
import { useXftInfo } from 'hooks/xftCampaign/useXftProgress'
import { useUser } from 'hooks/user/useUser'

export const useXftUpgrade = () => {
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const { username } = useUser('profile')
  const nftPackContract = useNftPackContract()
  const txRegister = useTxsCache()
  const { xftId, xftLevel, roundCount, cumulativeBidAmount, nextLevel } = useXftInfo()

  const [, sendApiUpdate] = useAPI(API.ACCOUNTS_UPDATE, {
    controlled: true,
    withJwt: true
  })

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(EVENTS.NFT_UPDATE)

  const upgradeNFT = useCallback(() => {
    setStatus(ASYNC_STATUS.PENDING)
    nftPackContract
      .upgradeToken(xftId)
      .then(async (txResponse) => {
        txRegister({
          from: account,
          hash: txResponse.hash,
          txParams: { xftId, fromXftLevel: xftLevel.dec, toXftLevel: nextLevel.dec, roundCount, cumulativeBidAmount },
          txType: EVENTS.NFT_UPDATE
        })
      })
      .catch((error) => {
        console.log('txResponse (error) -->', error)
        setStatus({ ...ASYNC_STATUS.ERROR, message: error })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, xftId, nftPackContract, txRegister])

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('nft_upgrade', {
      pathId: 'nft.upgrade',
      hash,
      xftId: txParams.xftId,
      fromXftLevel: txParams.fromXftLevel,
      toXftLevel: txParams.toXftLevel,
      roundCount: txParams.roundCount,
      cumulativeBidAmount: txParams.cumulativeBidAmount
    })
  }

  const updateDbAccount = (txInfo) => {
    const { txParams } = txInfo
    sendApiUpdate({ params: { address: account, username, xftLevel: txParams.toXftLevel } })
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
    emitCustomEvent(EVENTS.NFT_UPDATE)
    sendExternalEvent(txInfo, true)
    updateDbAccount(txInfo)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { upgradeNFT, status, hasStatus }
}
