import { useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'

import { atom, useAtomValue } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useNftPackContract, useNftTrackerContract } from 'hooks/contracts/useContract'
import { config } from 'config/index'
import { getLevelId, getNextNftTokenBaseId, getNftTokenBaseId } from 'utils/NFTBitsId'
import { formatEther } from 'ethers/lib/utils'
import { useConvertAmount } from 'utils/hooks'
import { useCustomEventListener } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

const YOLO_NFT_PROGRESS_INIT = {
  status: ASYNC_STATUS.IDLE,
  xftId: '',
  xftLevel: { bn: BigNumber.from(0), dec: 0 },
  nextLevel: { bn: BigNumber.from(1), dec: 1 },
  prevLevel: { bn: BigNumber.from(0), dec: 0 },
  roundCount: Zero,
  cumulativeBidAmount: Zero,
  roundCountThreshold: Zero,
  cumulativeAmountThreshold: Zero,
  roundCountLeft: Zero,
  cumulativeAmountLeft: Zero,
  canUpgrade: false
}

const nftProgressAtom = atom(YOLO_NFT_PROGRESS_INIT)

export const useXftProgress = (address) => {
  const { account } = useUser('wallet')

  const nftPackContract = useNftPackContract()
  const nftTrackerContract = useNftTrackerContract()

  //Internal State manager
  const [state, dispatch] = useReducerAtom(nftProgressAtom, (prev, action) => {
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

  const convert = useConvertAmount()
  const getProgress = useCallback(async () => {
    dispatch({ type: 'PENDING' })

    const xftId = await nftPackContract?.usersTokens(address || account).catch((err) => {
      console.log('nftPackContract.usersTokens method error -->', err)
    })

    const xftProgress = await nftTrackerContract?.nftTrackingMap(xftId).catch((err) => {
      console.log('nftTrackerContract.nftTrackingMap method error -->', err)
    })

    const baseNftId = getNftTokenBaseId(xftId)
    const nextLevelId = getNextNftTokenBaseId(baseNftId)
    const levelRequirements = await nftTrackerContract?.levelRequirements(nextLevelId).catch((err) => {
      console.log('nftTrackerContract.levelRequirements method error -->', err)
    })

    if (xftProgress && levelRequirements) {
      const { roundCount, cumulativeBidAmount } = xftProgress
      const { roundCountThreshold, cumulativeAmountThreshold, nextLevelId, prevLevelId } = levelRequirements

      let roundCountLeft = roundCountThreshold?.sub(roundCount) || Zero
      if (roundCountLeft.lte(Zero)) {
        roundCountLeft = Zero
      }
      const cumulativeBidAmountFiatBN = BigNumber.from(
        convert(formatEther(cumulativeBidAmount), DEFAULT_TOKEN, DEFAULT_FIAT, { format: false })
      )
      let cumulativeAmountLeft = cumulativeAmountThreshold.sub(cumulativeBidAmountFiatBN)
      if (cumulativeAmountLeft.lt(Zero)) {
        cumulativeAmountLeft = Zero
      }

      const canUpgrade =
        !baseNftId.isZero() &&
        !roundCountThreshold.isZero() &&
        roundCount.gte(roundCountThreshold) &&
        cumulativeBidAmountFiatBN.gte(cumulativeAmountThreshold)

      const payload = {
        xftId,
        xftLevel: { bn: getNftTokenBaseId(xftId), dec: getLevelId(xftId) },
        roundCount,
        cumulativeBidAmount,
        roundCountThreshold,
        cumulativeAmountThreshold,
        nextLevel: { bn: nextLevelId, dec: getLevelId(nextLevelId) },
        prevLevel: { bn: prevLevelId, dec: getLevelId(prevLevelId) },
        roundCountLeft,
        cumulativeAmountLeft,
        canUpgrade
      }
      dispatch({ type: 'UPDATED', payload })
    }
  }, [account, address, nftTrackerContract, nftPackContract, dispatch, convert])

  // Balance Puller from BlockChain
  useIntervalWhen(getProgress, BLOCKCHAIN_PULL_INTERVAL, true, true)

  //event listener progress updater
  useCustomEventListener(EVENTS.NFT_UPDATE, () => {
    getProgress()
  })
  //BID TX event listener
  const bidTxEvents = getTxEvents(TX_TYPE.BID)
  useCustomEventListener(bidTxEvents.confirmed, () => {
    getProgress()
  })

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return Object.assign(account || address ? state : YOLO_NFT_PROGRESS_INIT, { hasStatus })
}

export const useXftInfo = () => {
  const xftInfo = useAtomValue(nftProgressAtom)
  return xftInfo
}
