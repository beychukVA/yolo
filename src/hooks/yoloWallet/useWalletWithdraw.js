import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useYoloWalletContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, ASYNC_STATUS_ID, TX_TYPE } from 'constants/index'
import { useCustomEventListener } from 'react-custom-events'
import { useToken } from 'utils/hooks/useToken'
import { API } from 'constants/apiEndPoints'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useAPI } from 'utils/hooks/useAPI'
import { Zero } from '@ethersproject/constants'
import { useUser } from 'hooks/user/useUser'

const useContractWalletWithdraw = () => {
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const { tokenId, parseToken } = useToken()
  const yoloWalletContract = useYoloWalletContract()
  const txRegister = useTxsCache()

  const [, sendWithdrawAddQuery, ,] = useAPI(API.WITHDRAW_ADD, {
    controlled: true,
    withJwt: true
  })

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.WALLET_WITHDRAW)

  const walletWithdraw = useCallback(
    ({ address, amount }) => {
      setStatus(ASYNC_STATUS.PENDING)
      const amountBN = amount?.valueBN || Zero
      yoloWalletContract
        .withdraw(amountBN)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { address, amount, tokenId },
            txType: TX_TYPE.WALLET_WITHDRAW
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, yoloWalletContract, txRegister, parseToken]
  )

  const resetStatus = useCallback(() => {
    setStatus(ASYNC_STATUS.IDLE)
  }, [])

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('wallet_withdraw', {
      pathId: 'wallet.withdraw',
      hash,
      tokenId: txParams.tokenId,
      amountInUnit: txParams.amount,
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
    const { hash, from, txParams } = txInfo

    //ACZ useAPI Hook for better code
    sendWithdrawAddQuery({
      params: { xHash: hash, address: from, amountInUnit: txParams.amount, tokenId: txParams.tokenId }
    })
    // axios.post(API.WITHDRAW_ADD, {
    //   txHash: hash,
    //   address: from,
    //   amountInUnit: txParams.amount,
    //   tokenId: txParams.tokenId
    // })
    sendExternalEvent(txInfo, true)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(() => hasStatus(ASYNC_STATUS_ID.PENDING), [hasStatus])

  return { walletWithdraw, status, hasStatus, isLoading, resetStatus }
}
const useProxyWalletWithdraw = () => {
  const { gaEvent } = useReactGA4()
  const { account } = useUser('wallet')
  const { tokenId, parseToken } = useToken()
  const yoloWalletContract = useYoloWalletContract()
  const txRegister = useTxsCache()
  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const [, sendWithdrawAddQuery, ,] = useAPI(API.WITHDRAW_ADD, {
    controlled: true,
    withJwt: true
  })

  const [proxyState, sendProxyQuery, hasProxyStatus, resetProxyStatus] = useAPI(API.PROXY_WALLET_WITHDRAW, {
    controlled: true,
    withJwt: true
  })

  const txEvents = getTxEvents(TX_TYPE.WALLET_WITHDRAW)

  useEffect(() => {
    if (hasProxyStatus(ASYNC_STATUS_ID.ERROR)) {
      setStatus(proxyState?.status || ASYNC_STATUS.ERROR)
      resetProxyStatus()
    }
    if (hasProxyStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const receipt = proxyState?.data?.transaction
      if (!receipt) {
        setStatus(ASYNC_STATUS.ERROR)
        return
      }
      const { address, amount } = proxyState?.data?.tunnel
      txRegister({
        from: receipt.from,
        hash: receipt.hash,
        chainId: receipt.chainId,
        txParams: { address, amount, tokenId },
        txType: TX_TYPE.WALLET_WITHDRAW
      })
      setStatus(ASYNC_STATUS.CONFIRMED)
    }
  }, [proxyState])

  const walletWithdraw = useCallback(
    ({ address, amount, code }) => {
      setStatus(ASYNC_STATUS.PENDING)

      const withdrawPayload = {
        address,
        amount: amount.valueBN.toString(),
        code: +code
      }
      sendProxyQuery({ params: withdrawPayload, tunnel: { address, amount } })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, yoloWalletContract, txRegister, parseToken]
  )

  const resetStatus = useCallback(() => {
    setStatus(ASYNC_STATUS.IDLE)
  }, [])

  /**
   * External Event Logger
   */
  const sendExternalEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('wallet_withdraw', {
      pathId: 'wallet.withdraw',
      hash,
      tokenId: txParams.tokenId,
      amountInUnit: txParams.amount,
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
    const { hash, from, txParams } = txInfo

    //ACZ useAPI Hook for better code
    sendWithdrawAddQuery({
      params: { xHash: hash, address: from, amountInUnit: txParams.amount, tokenId: txParams.tokenId }
    })
    // axios.post(API.WITHDRAW_ADD, {
    //   txHash: hash,
    //   address: from,
    //   amountInUnit: txParams.amount,
    //   tokenId: txParams.tokenId
    // })
    sendExternalEvent(txInfo, true)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalEvent(txInfo, false)
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(() => hasStatus(ASYNC_STATUS_ID.PENDING), [hasStatus])

  return { walletWithdraw, status, hasStatus, isLoading, resetStatus }
}

export const useWalletWithdraw = () => {
  const { isProxy } = useUser('wallet')
  const contractWalletWithdraw = useContractWalletWithdraw()
  const proxyWalletWithdraw = useProxyWalletWithdraw()
  return isProxy ? proxyWalletWithdraw : contractWalletWithdraw
}
