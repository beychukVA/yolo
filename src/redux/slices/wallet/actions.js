import axios from 'axios'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { LOCAL_WALLET_KEY, ASYNC_STATUS_ID, TX_TYPE } from 'constants/index'

import { walletExtraReducer } from './reducers'
import { walletReducerActions } from './'

import { notificationActions } from 'redux/slices/notification/actions'

import { sendContractMethod } from 'datasource/crypto/contracts'

import { localTxActions } from './localTxActions'
import { API } from 'constants/apiEndPoints'
import { getAuthToken__DEPRECATED } from 'hooks/user/getUserToken__DEPRECATED'

// We can write thunks real actions, which may contain both sync and async logic.

// const walletActionsDef = () => async (dispatch, getState) => {
// }

// Actions Helpers

const composeTxEventListener = ({ dispatch, getState, eventCB = {}, gameId }) => {
  /*
    eventCB interface
      onHash: It will be triggered in the time we have the transaction hash, txInfo: { ...txInfo, gameId }
      onConfirmation: It will be triggered on every confirmation
      onConfirmed: It will be triggered once the number of confirmations are >= minConfirmation from config
      onFailed: It will be triggered when tx fails, if 'txInfo' is not define there are a problem with the tx in the blockchain
      onError: It will be triggered when tx process has error

    Code Snippet: 
    {
      onHash: (txInfo) => { console.log('onHash:', txInfo) },
      onConfirmation: (txInfo, txConfirmations) => { console.log('onConfirmation:', txConfirmations, txInfo) },
      onConfirmed: (txHash) => { console.log('onConfirmed:', txHash) },
      onFailed: (txInfo) => {}
      onError: () => {} WIP
    }
  */
  const state = getState()
  const chainId = state.wallet.chainInfo.chainId
  const { onHash, onError, ...restEventCB } = eventCB
  return {
    onTransactionHash: (txInfo) => {
      // txInfo = {from, hash, params, txType, eventListenersCb}
      const payload = { ...txInfo, gameId }
      localTxActions.addTx(chainId, payload)
      dispatch(walletReducerActions.addTx(payload))
      dispatch(walletExtraReducer.pullingTxInfo(restEventCB))
      onHash && onHash(payload)
    },
    onError: () => {
      onError && onError()
    }
  }
}

const { updatePendingTxHashes, bulkTxsAdd } = walletReducerActions

const updateAccount =
  ({ address, chainInfo = null }) =>
  (dispatch, getState) => {
    dispatch(walletExtraReducer.updateAddress({ address }))
    chainInfo && dispatch(walletReducerActions.setChainInfo(chainInfo))
  }

const disconnect = () => (dispatch, getState) => {
  window.localStorage.removeItem(LOCAL_WALLET_KEY)
  window.localStorage.removeItem('walletconnect')
  delete window.yoloWeb3
  dispatch(walletReducerActions.clearConnection())
}

const setTxAsUiHidden = (walletTxInfo) => async (dispatch, getState) => {
  const state = getState()
  const chainId = state.wallet.chainInfo.chainId
  const payload = { [walletTxInfo.hash]: { ...walletTxInfo } }
  localTxActions.updateTx(chainId, payload)
  dispatch(walletReducerActions.updateTx(payload))
}

/* ***************************************
 * User Interaction with contract actions
 * ***************************************/

// yoloBid refactored to BlockChain Polling Schema, tested in: desktop
const yoloBid = (actionData) => async (dispatch, getState) => {
  const state = getState()
  const network = state.wallet.chainInfo?.network
  const chainId = state.wallet.chainInfo?.chainId
  const { bidData, gameId, gameHexId, tokenId } = actionData
  const [tokenContractInfo, gameContractInfo] = getSmartContractsInfo([tokenId, gameId])
  if (!tokenContractInfo || !gameContractInfo) {
    !tokenContractInfo && console.warn('ERROR: Token contract undefined ')
    !gameContractInfo && console.warn('ERROR: Game contract undefined')
    return false
  }
  const eventCB = {
    onConfirmed: (txHash) => {
      const state = getState()
      const bidRoundIndex = bidData.bidRoundIndex
      const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`

      const txInfo = state.wallet?.txs?.[network]?.[txHash]
      const accessToken = getAuthToken__DEPRECATED(txInfo.from)
      const updatedTxInfo = { ...txInfo, txParams: { ...txInfo.txParams, bidId } }
      const bidDataForDb = {
        bidRoundIndex: bidRoundIndex,
        bidData: bidData,
        txHash: txInfo.hash,
        txInfo,
        gameId,
        gameContract: gameContractInfo.address
      }

      axios.post(API.BIDS_TO_DATABASE, bidDataForDb, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      console.log('ACZ txInfo -->', txInfo)
      const bidToastObj = {
        show: true,
        id: 'bidPlaced',
        props: {
          isUp: txInfo.txParams.isUp,
          unitAmount: txInfo.txParams.amount,
          roundId: txInfo.txParams.bidRoundIndex
        }
      }

      const payload = { [txHash]: { ...updatedTxInfo } }
      localTxActions.updateTx(chainId, payload)
      dispatch(walletReducerActions.updateTx(payload))
      dispatch(notificationActions.updateToast(bidToastObj))
    },
    onFailed: (txData) => {
      if (txData) {
        const state = getState()
        const txHash = txData.hash
        const bidRoundIndex = bidData.bidRoundIndex
        const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`
        const txInfo = state.wallet?.txs?.[network]?.[txHash]
        const updatedTxInfo = { ...txInfo, status: 'failed', txParams: { ...txInfo.txParams, bidId } }

        const payload = { [txHash]: { ...updatedTxInfo } }
        localTxActions.updateTx(chainId, payload)
        dispatch(walletReducerActions.updateTx(payload))
      }
    }
  }
  const txData = { contractInfo: gameContractInfo, method: 'bidInYolo', params: bidData, txType: TX_TYPE.BID }
  const bidEventListener = composeTxEventListener({ dispatch, getState, eventCB, gameId })
  await sendContractMethod(txData, bidEventListener)
}

const updateTxError =
  ({ chainId, hash, txType, txParams, receipt, error }) =>
  async (dispatch, getState) => {
    const state = getState()
    const txHash = hash
    const txInfo = state.wallet?.txs?.[chainId]?.[hash]
    // test if bidId is not used
    // const bidRoundIndex = txParams?.bidRoundIndex
    // const bidId = `${txInfo.gameHexId}-${bidRoundIndex}-${txHash}`
    // const updatedTxInfo = { ...txInfo, status: 'failed', txParams: { ...txInfo.txParams, bidId } }
    const updatedTxInfo = { ...txInfo, status: 'failed', txParams: { ...txInfo.txParams } }

    const payload = { [txHash]: { ...updatedTxInfo } }
    localTxActions.updateTx(chainId, payload)
    dispatch(walletReducerActions.updateTx(payload))
  }

const updateTxConfirmations =
  ({ chainId, hash, confirmations }) =>
  async (dispatch, getState) => {
    const state = getState()
    const isConfirmed = confirmations >= config.MIN_CONFIRMATIONS
    const status = isConfirmed ? ASYNC_STATUS_ID.CONFIRMED : ASYNC_STATUS_ID.PENDING
    const txInfo = state.wallet?.txs?.[chainId]?.[hash]
    const payload = { [hash]: { ...txInfo, confirmations, status, isConfirmed } }
    localTxActions.updateTx(chainId, payload)
    dispatch(walletReducerActions.updateTx(payload))
  }

export const reduxWalletActions = {
  ...walletExtraReducer,
  updateAccount,
  disconnect,
  yoloBid,
  setTxAsUiHidden,
  updatePendingTxHashes,
  bulkTxsAdd,
  updateTxConfirmations,
  updateTxError
}
