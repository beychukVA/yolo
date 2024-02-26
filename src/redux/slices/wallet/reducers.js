// The `reducers` object lets us define reducers and generate associated actions
import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import axios from 'axios'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { Exception, getWeb3Utils, getTxInfo } from 'utils'

import { getBotBidStats, getNftTokenIndex, getNftTrackerData } from 'datasource/crypto/contracts'
import { getYoloTokenContractBalance, getUserContractBalance } from 'datasource/wallets'

import { walletReducerActions } from '.'
import { walletInitialState } from './initialState'
import { localTxActions } from './localTxActions'
import { API } from 'constants/apiEndPoints'

export const walletReducers = {
  setChainInfo: (state, action) => {
    state.chainInfo = action.payload
  },
  clearConnection: (state, action) => walletInitialState,

  addTx: (state, action) => {
    //state.lastPendingTxHash = action.payload.hash
    state.pendingTxHashes = [...state.pendingTxHashes, action.payload.hash]
    state.txs = {
      ...state.txs,
      //TODO: ACZ - this is here for legacy compatibility, will removed once the migration is completed
      [state.chainInfo.network]: {
        ...state.txs[state.chainInfo.network],
        [action.payload.hash]: {
          ...action.payload,
          status: 'pending',
          confirmations: 0,
          isConfirmed: false,
          timestamp: Math.round(Date.now() / 1000)
        }
      },
      [state.chainInfo.chainId]: {
        ...state.txs[state.chainInfo.chainId],
        [action.payload.hash]: {
          ...action.payload,
          status: 'pending',
          confirmations: 0,
          isConfirmed: false,
          timestamp: Math.round(Date.now() / 1000) // in seconds
        }
      }
    }
  },
  bulkTxsAdd: (state, action) => {
    state.txs = {
      ...state.txs,
      //ACZ - this is here for legacy compatibility, will removed once the migration is completed
      [action.payload.network]: {
        ...action.payload.txs
      },
      [action.payload.chainId]: {
        ...action.payload.txs
      }
    }
  },
  updateTx: (state, action) => {
    state.txs = {
      ...state.txs,
      //ACZ - this is here for legacy compatibility, will removed once the migration is completed
      [state.chainInfo.network]: {
        ...state.txs[state.chainInfo.network],
        ...action.payload
      },
      [state.chainInfo.chainId]: {
        ...state.txs[state.chainInfo.network],
        ...action.payload
      }
    }
  },
  updatePendingTxHashes: (state, action) => {
    state.pendingTxHashes = action.payload
  },
  setBidTxHash: (state, action) => {
    state.lastBidTxHash = action.payload
  }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

const updateAddress = createAsyncThunk('wallet/updateAddress', async ({ address }, thunkAPI) => {
  try {
    return { address: address.toLowerCase() }
  } catch (err) {
    console.error(`ERROR: "updateAddress" action in Redux fails: ${err}`)
  }
})

const updateYoloEarnings = createAsyncThunk('wallet/updateYoloEarnings', async ({ address, thunkAPI }) => {
  const [NftTracker, YoloNFT] = getSmartContractsInfo(['NftTracker', 'yoloNft'])
  const botStats = await getBotBidStats(NftTracker, YoloNFT)
  const tokenIndex = await getNftTokenIndex({ params: { senderAddress: address, index: 0 } }, {})

  const nftData = await getNftTrackerData({ params: { tokenIndex } }, {})
  const individualBidCount = nftData?.bidCount || 0
  const individualCumBidAmount = new BigNumber(nftData.cumulativeBidAmount || 0)
  const individualFraction = individualCumBidAmount.times(0.3).plus(new BigNumber(individualBidCount).times(0.7))
  const cumulativeStats = await axios.post(API.BIDS_GET_STAT, {})
  let data = JSON.parse(cumulativeStats.data.body)[0]

  const totalBidCount = +data.totalbidcount - botStats.botBidCount
  const cumulativeBidAmount = new BigNumber(data.cumulativebidamount).minus(botStats.botBidAmount)
  let bidsFraction = cumulativeBidAmount.times(0.3).plus(new BigNumber(totalBidCount).times(0.7))
  let yoloEarned = individualFraction.times(500000).dividedBy(bidsFraction).toFixed(0)
  // console.log('yoloEarned =>', yoloEarned)
  if (isNaN(yoloEarned)) {
    yoloEarned = '0'
  }
  const web3utils = getWeb3Utils()
  return web3utils.toWei(yoloEarned)
})

/*Actions helpers for manage store on trackTx dispatch*/
const removePendingTxHash = (txHash) => async (dispatch, getState) => {
  const state = getState()
  const pendingTxHashes = state.wallet?.pendingTxHashes || []
  const updatedTxHashes = pendingTxHashes.filter((item) => item !== txHash)
  dispatch(walletReducerActions.updatePendingTxHashes(updatedTxHashes))
}

const pullingTxInfo = createAsyncThunk('wallet/updateTxsInfo', async (eventCB = {}, thunkAPI) => {
  const { dispatch, getState } = thunkAPI
  const state = getState()
  const defaultEventCB = {
    onFailed: (txData) => {
      const state = getState()
      const chainInfo = state.wallet.chainInfo
      const txHash = txData?.hash
      // const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`
      const txInfo = state.wallet?.txs?.[chainInfo.network]?.[txHash]
      const updatedTxInfo = { ...txInfo, status: 'failed' }

      const payload = { [txHash]: { ...updatedTxInfo } }
      localTxActions.updateTx(chainInfo.chainId, payload)
      dispatch(walletReducerActions.updateTx(payload))
    }
  }
  const pendingTxHashes = state.wallet.pendingTxHashes || []
  let prevConfirmations = 0
  const trackTx = (txHash, eventCB) => {
    const minConfirmations = config.MIN_CONFIRMATIONS
    const { onConfirmation, onConfirmed, onFailed } = { ...defaultEventCB, ...eventCB }
    setTimeout(async () => {
      try {
        const currentBlock = getState().priceFeed.currentBlock
        const txInfo = await getTxInfo(txHash).catch((err) => {
          throw err
        })
        const txBlockNumber = txInfo?.blockNumber || null
        const txConfirmations = txBlockNumber === null ? 0 : currentBlock - txBlockNumber
        if (txConfirmations > prevConfirmations) {
          onConfirmation && onConfirmation(txInfo, txConfirmations)
          prevConfirmations = txConfirmations
        }
        if (txConfirmations >= minConfirmations) {
          onConfirmed && onConfirmed(txHash)
          return
        }
        if (txInfo?.status === false) {
          onFailed && onFailed(txInfo)
          return
        }
        // Recursive call
        return trackTx(txHash, eventCB)
      } catch (err) {
        if (!onFailed) {
          throw new Exception('4050', `'pullingTxInfo' has failed`)
        } else {
          onFailed && onFailed()
          return
        }
      }
    }, config.TX_PULLING_INTERVAL)
  }
  pendingTxHashes.map((txHash) => trackTx(txHash, eventCB))
})

export const walletExtraReducer = {
  updateAddress,
  updateYoloEarnings,
  pullingTxInfo,
  removePendingTxHash
}
