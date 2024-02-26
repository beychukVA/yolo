import { useCallback, useMemo } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { useContractArray } from 'hooks/contracts/useContract'
import { ASYNC_STATUS, ASYNC_STATUS_ID, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useCustomEventListener } from 'react-custom-events'
import { REGISTERED_GAME_LIST } from 'constants/games'
import { atom, useAtomValue } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { Zero } from '@ethersproject/constants'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const UNCLAIMED_INIT = {
  hasUnclaimedRounds: false,
  gamesIdWithUnclaimed: [],
  unclaimedAmount: {},
  totalUnclaimedAmount: Zero
}

const UNCLAIMED_STATE_INIT = {
  status: ASYNC_STATUS.IDLE,
  data: { ...UNCLAIMED_INIT }
}

const unclaimedAtom = atom(UNCLAIMED_STATE_INIT)

const useUpdateUnclaimedBalance = () => {
  const { account } = useUser('wallet')
  const gamesContractArray = useContractArray(REGISTERED_GAME_LIST)
  const [state, dispatch] = useReducerAtom(unclaimedAtom, (prev, action) => {
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
          data: { ...action.payload }
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

  const updateUnclaimed = useCallback(async () => {
    if (state.status.id === ASYNC_STATUS_ID.PENDING) return
    dispatch({ type: 'PENDING' })
    try {
      const payloadArray = await Promise.all(
        gamesContractArray.map(async (gameContract, idx) => {
          if (!gameContract) return null
          const gameId = REGISTERED_GAME_LIST[idx]
          if (!gameContract.getUnclaimedRoundsLength) return null
          const unclaimedRoundsLengthByGame = await gameContract.getUnclaimedRoundsLength(account)

          const hasGameIdUnclaimedRounds = !unclaimedRoundsLengthByGame.isZero()

          if (hasGameIdUnclaimedRounds) {
            const { roundPayoutAmounts, roundsClaimed } = await gameContract.calculateExpectedReturns(account)
            const gameIdWithUnclaimed = [gameId]
            const gameIdTotalUnclaimedAmount = roundPayoutAmounts.reduce((total, amountBN) => {
              return total.add(amountBN)
            }, Zero)

            return {
              gameId,
              hasGameIdUnclaimedRounds,
              gameIdWithUnclaimed,
              gameIdUnclaimedAmount: {
                [gameId]: { totalUnclaimedAmount: gameIdTotalUnclaimedAmount, roundsClaimed, roundPayoutAmounts }
              },
              gameIdTotalUnclaimedAmount
            }
          } else {
            return null
          }
        })
      ).catch((err) => {
        throw err
      })

      const filteredPayloadArray = payloadArray.filter((item) => {
        if (item) {
          return !item.gameIdTotalUnclaimedAmount.isZero()
        }
        return false
      })

      const payload = filteredPayloadArray.reduce((Obj, item, idx) => {
        if (!item) return UNCLAIMED_INIT
        const gameIdTotalUnclaimedAmount = item.gameIdTotalUnclaimedAmount
        const response = {
          hasUnclaimedRounds: Obj.hasUnclaimedRounds || item?.hasGameIdUnclaimedRounds,
          gamesIdWithUnclaimed: [...Obj.gamesIdWithUnclaimed, ...item?.gameIdWithUnclaimed],
          unclaimedAmount: { ...Obj.unclaimedAmount, ...item?.gameIdUnclaimedAmount },
          totalUnclaimedAmount: Obj.totalUnclaimedAmount.add(gameIdTotalUnclaimedAmount)
        }
        return response
      }, UNCLAIMED_INIT)

      dispatch({ type: 'UPDATED', payload })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
      return
    }
  }, [account, dispatch, state.status.id, gamesContractArray])

  return updateUnclaimed
}

export const UnclaimedBalanceUpdater = () => {
  const updateUnclaimed = useUpdateUnclaimedBalance()

  // Balance Puller from BlockChain
  useIntervalWhen(updateUnclaimed, BLOCKCHAIN_PULL_INTERVAL, true, true)

  //BID TX event listener
  const bidTxEvents = getTxEvents(TX_TYPE.BID)
  useCustomEventListener(bidTxEvents.confirmed, updateUnclaimed)
  useCustomEventListener(bidTxEvents.error, updateUnclaimed)

  //WITHDRAW TX event listener
  const withdrawTxEvents = getTxEvents(TX_TYPE.WALLET_WITHDRAW)
  useCustomEventListener(withdrawTxEvents.confirmed, updateUnclaimed)
  useCustomEventListener(withdrawTxEvents.error, updateUnclaimed)

  //GAME RESULT event listener
  useCustomEventListener(EVENTS.GAME_WON, updateUnclaimed)
  useCustomEventListener(EVENTS.GAME_LOST, updateUnclaimed)
  useCustomEventListener(EVENTS.GAME_PUSHED, updateUnclaimed)
  useCustomEventListener(EVENTS.CLAIM_EARNINGS, updateUnclaimed)

  return null
}

export const useUnclaimedBalance = (optionObj) => {
  const { silentUpdate } = { silentUpdate: false, ...optionObj }
  const unclaimedState = useAtomValue(unclaimedAtom)

  let status = unclaimedState.status
  if (silentUpdate && unclaimedState.status.id === ASYNC_STATUS_ID.PENDING) {
    status = ASYNC_STATUS_ID.IDLE
  }

  const getGameUnclaimed = useCallback(
    (gameId) => unclaimedState.data.unclaimedAmount[gameId],
    [unclaimedState.data.unclaimedAmount]
  )

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(
    () => (silentUpdate ? false : hasStatus(ASYNC_STATUS_ID.PENDING)),
    [silentUpdate, hasStatus]
  )

  return Object.assign(unclaimedState, { hasStatus, isLoading, getGameUnclaimed })
}
