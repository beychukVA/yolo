import { useCallback } from 'react'
import { Zero } from '@ethersproject/constants'

import { atom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useNftPackContract, useWhitelistSFTClaimsContract } from 'hooks/contracts/useContract'
import { useCustomEventListener } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const YOLO_NFT_PROGRESS_INIT = {
  status: ASYNC_STATUS.IDLE,
  campaignLimit: Zero,
  claimCounter: Zero
}

const xftMintedAtom = atom(YOLO_NFT_PROGRESS_INIT)

export const useXftMinted = () => {
  const { account } = useUser('wallet')
  const nftPackContract = useNftPackContract()
  const whitelistSFTClaimsContract = useWhitelistSFTClaimsContract()

  //Internal State manager
  const [state, dispatch] = useReducerAtom(xftMintedAtom, (prev, action) => {
    switch (action.type) {
      case 'PENDING':
        return {
          ...prev,
          status: ASYNC_STATUS.PENDING
        }
      case 'UPDATED':
        return {
          ...prev,
          status: ASYNC_STATUS.IDLE,
          ...action.payload
        }
      case 'ERROR':
        return {
          ...prev,
          status: {
            ...ASYNC_STATUS.ERROR,
            message: action.payload
          }
        }
      default:
        return state
    }
  })

  const getClaimed = useCallback(async () => {
    dispatch({ type: 'PENDING' })

    const campaignLimit = await whitelistSFTClaimsContract?.campaignLimit().catch((err) => {
      console.log('nftPackContract.campaignLimit method error -->', err)
    })
    const claimCounter = await whitelistSFTClaimsContract?.claimCounter().catch((err) => {
      console.log('nftPackContract.campaignLimit method error -->', err)
    })

    const payload = {
      campaignLimit: campaignLimit || state.campaignLimit,
      claimCounter: claimCounter || state.claimCounter
    }

    dispatch({ type: 'UPDATED', payload })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, nftPackContract, dispatch])

  // Balance Puller from BlockChain
  useIntervalWhen(getClaimed, BLOCKCHAIN_PULL_INTERVAL, true, true)

  //event listener progress updater
  useCustomEventListener(EVENTS.NFT_UPDATE, () => {
    getClaimed()
  })
  //BID TX event listener
  const bidTxEvents = getTxEvents(TX_TYPE.BID)
  useCustomEventListener(bidTxEvents.confirmed, () => {
    getClaimed()
  })

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return { ...state, hasStatus }
}
