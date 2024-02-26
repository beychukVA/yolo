import { useCallback, useEffect, useState } from 'react'

import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS_ID, TRANSACTIONS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'

import { useContract } from 'hooks/contracts/useContract'
import { useDispatch } from 'react-redux'
import { notificationActions } from 'redux/actions'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { useActiveGameData } from './activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useUser } from './user/useUser'

const useYoloContractBid = ({ gameId, callback }) => {
  const { account, chainId } = useUser('wallet')
  const txRegister = useTxsCache()
  const { activeGameId } = useActiveGameData()
  const gameContract = useContract(gameId || activeGameId)
  const [state, setState] = useState({})
  const { gameType } = getGameParameters(gameId || activeGameId)

  const yoloBid = useCallback(
    ({ bidData, gameId, gameHexId, tokenId }) => {
      const { amount, isUp, level, bidRoundIndex } = bidData
      const contractMethodAndParams =
        gameType === GAME_TYPES.G_3MIN
          ? { method: 'bidInYolo', params: [amount, isUp, bidRoundIndex] }
          : { method: 'bid', params: [amount, level, bidRoundIndex] }
      console.log('ACZ contractMethodAndParams --> ', contractMethodAndParams)
      gameContract[contractMethodAndParams.method](...contractMethodAndParams.params)
        .then(async (txResponse) => {
          txRegister({
            chainId,
            from: account,
            gameId,
            hash: txResponse.hash,
            txParams: { ...bidData, bidId: '', currency: tokenId, method: contractMethodAndParams.method },
            txType: TX_TYPE.BID
          })
          setState({ isError: false })
          callback && callback()
        })
        .catch((error) => {
          console.log('ACZ txResponse (error) -->', error)
          setState({ isError: true })
        })
    },
    [account, txRegister, chainId, gameContract, gameType]
  )

  const yoloBidResetState = useCallback(() => setState({}), [])

  return { yoloBidState: state, yoloBidResetState, yoloBid }
}

const useYoloProxyBid = ({ gameId, callback }) => {
  const txRegister = useTxsCache()
  const { activeGameId } = useActiveGameData()
  const gameContract = useContract(gameId || activeGameId)
  const [state, setState] = useState({})
  const { gameType } = getGameParameters(gameId || activeGameId)

  const proxyEndPoint = gameType === GAME_TYPES.G_3MIN ? API.PROXY_WALLET_BID : API.PROXY_WALLET_DAILY_BID

  const [proxyState, sendProxyQuery, hasProxyStatus, resetProxyStatus] = useAPI(proxyEndPoint, {
    controlled: true,
    withJwt: true
  })

  useEffect(() => {
    if (hasProxyStatus(ASYNC_STATUS_ID.ERROR)) {
      console.log('ACZ Error -->', proxyState)
      setState({ isError: true })
      resetProxyStatus()
    }
    if (hasProxyStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const receipt = proxyState?.data?.data?.transaction
      if (!receipt) {
        setState({ isError: true })
        return
      }
      const { bidData, gameId, gameHexId, tokenId } = proxyState?.data?.tunnel
      txRegister({
        chainId: receipt.chainId,
        from: receipt.from,
        gameId,
        gameHexId,
        hash: receipt.hash,
        txParams: { ...bidData, bidId: '', currency: tokenId, method: 'bidInYolo' },
        txType: TX_TYPE.BID
      })
      setState({ isError: false })
      callback && callback()
    }
  }, [proxyState])

  const yoloBid = useCallback(
    ({ bidData, gameId, gameHexId, tokenId }) => {
      // const { amount, isUp, bidRoundIndex } = bidData

      const { amount, isUp, level, bidRoundIndex } = bidData

      // Bid payload example
      //   {
      //     "contractAddress": "0x557cB29C32809624d1a4E9cEeC727B9E51f8ecB3",
      //     "bidAmount": "10000000",
      //     "direction": false,
      //     "roundId": "5170",
      //     "gameId": "ETH_USD_70"
      //   }
      const bidPayload = {
        contractAddress: gameContract.address,
        bidAmount: amount,
        level,
        direction: isUp,
        roundId: bidRoundIndex,
        gameId
      }
      sendProxyQuery({ params: bidPayload, tunnel: { bidData, gameId, gameHexId, tokenId } }, true)
    },
    [sendProxyQuery, gameContract, gameType]
  )

  const yoloBidResetState = useCallback(() => setState({}), [])

  return { yoloBidState: state, yoloBidResetState, yoloBid }
}

export const useYoloBid = (argumentsObj) => {
  const { isProxy } = useUser('wallet')
  const yoloContractBid = useYoloContractBid(argumentsObj)
  const yoloProxyBid = useYoloProxyBid(argumentsObj)
  const yoloBid = isProxy ? yoloProxyBid : yoloContractBid
  return yoloBid
}

export const useYoloBidsObserver = () => {
  const { isProxy } = useUser('wallet')
  const dispatch = useDispatch()
  const [, sendBidDbQuery] = useAPI(API.BIDS_TO_DATABASE, {
    controlled: true,
    withJwt: true
  })

  // External Event Logger
  // const sendExternalLoggerEvent = (txInfo, confirmed) => {
  //   const { hash, txParams } = txInfo
  //   gaEvent('username_change', {
  //     pathId: 'profile.username.change',
  //     hash,
  //     newUsername: txParams.newUsername,
  //     confirmed
  //   })
  // }

  // Toasts Manager
  const showToast = (toastId, txInfo) => {
    const bidToastObj = {
      show: true,
      id: toastId,
      props: {
        isUp: txInfo.txParams.isUp,
        level: txInfo.txParams.level,
        unitAmount: txInfo.txParams.amount,
        roundId: txInfo.txParams.bidRoundIndex,
        gameId: txInfo.gameId
      }
    }
    dispatch(notificationActions.updateToast(bidToastObj))
  }

  /**
   * CUSTOM EVENTS LISTENER
   */

  const txEvents = getTxEvents(TX_TYPE.BID)

  //OnHash
  useCustomEventListener(txEvents.hash, (txInfo) => {
    //console.log('ACZ onDeposit hash (txInfo) -->', txInfo)
    // This lines should stay last
    // showToast('bidHash', txInfo)
    emitCustomEvent(EVENTS.BID_HASH)
  })

  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    // const { chainId, hash, txType, txParams, receipt, confirmations } = txInfo
    const { chainId, hash, txParams } = txInfo
    const cachedTxsStr = window.localStorage.getItem(TRANSACTIONS)
    const cachedTxInfo = JSON.parse(cachedTxsStr)?.[chainId]?.[hash]
    console.log('ACZ3 txInfo -->', txInfo)
    const bidDataForDb = {
      bidRoundIndex: txParams?.bidRoundIndex,
      bidData: {
        amount: txParams?.amount,
        bidRoundIndex: txParams?.bidRoundIndex,
        isUp: txParams?.isUp,
        level: txParams?.level,
        method: txParams?.method,
        currency: txParams?.currency
      },
      txHash: hash,
      txInfo: {
        level: cachedTxInfo?.txParams?.level,
        isUp: txParams?.isUp,
        amount: cachedTxInfo?.txParams?.amount,
        currency: cachedTxInfo?.txParams?.currency,
        bidRoundIndex: cachedTxInfo?.txParams?.bidRoundIndex,
        method: cachedTxInfo?.txParams?.method,
        from: cachedTxInfo?.from,
        hash: cachedTxInfo?.hash,
        gameId: cachedTxInfo?.gameId
      },
      gameId: cachedTxInfo?.gameId
    }
    !isProxy && sendBidDbQuery({ params: bidDataForDb })
    // This lines should stay last
    showToast('bidPlaced', txInfo)
    // sendExternalLoggerEvent(txInfo, true)
    emitCustomEvent(EVENTS.BID_CONFIRMED)
  })

  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    // const { chainId, hash, txParams, receipt, error } = txInfo
    // This lines should stay last
    showToast('usernameError')
    // sendExternalLoggerEvent(txInfo, false)
    emitCustomEvent(EVENTS.BID_ERROR)
  })
}
