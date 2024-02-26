import { useCallback } from 'react'

import { atom, useAtomValue } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { ASYNC_STATUS, ASYNC_STATUS_ID, TX_TYPE, BALANCE_EVENT } from 'constants/index'
import { useStakingRewardsContract } from 'hooks/contracts/useContract'
import { formatEther } from '@ethersproject/units'
import { useCustomEventListener } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const STAKED_BALANCE_INIT = {
  status: ASYNC_STATUS.PENDING,
  ylpRewardBalance: 0
}

const ylpRewardBalanceAtom = atom(STAKED_BALANCE_INIT)

const useUpdateYlpRewardBalance = () => {
  const { account } = useUser('wallet')
  const stakingRewardsContract = useStakingRewardsContract()

  const [state, dispatch] = useReducerAtom(ylpRewardBalanceAtom, (prev, action) => {
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

  const updateYlpRewardBalance = useCallback(async () => {
    dispatch({ type: 'PENDING' })
    try {
      const ylpRewardBalanceBN = await stakingRewardsContract.getUserPendingReward(account).catch((err) => {
        dispatch({ Type: 'ERROR', payload: err })
      })

      const ylpRewardBalance = +formatEther(ylpRewardBalanceBN)

      dispatch({
        type: 'UPDATED',
        payload: {
          ylpRewardBalance
        }
      })
    } catch (err) {
      dispatch({ Type: 'ERROR', payload: err })
    }
  }, [account, dispatch, stakingRewardsContract])

  // Balance Puller from BlockChain
  useIntervalWhen(updateYlpRewardBalance, BLOCKCHAIN_PULL_INTERVAL, true, true)

  return updateYlpRewardBalance
}

export const YlpRewardBalanceUpdater = () => {
  const updateYlpRewardBalance = useUpdateYlpRewardBalance()

  //REWARDS balance update event Listener
  useCustomEventListener(BALANCE_EVENT.UPDATE_REWARDS, updateYlpRewardBalance)

  //HARVEST TX event listener
  const stakeEvents = getTxEvents(TX_TYPE.YLP_HARVEST)
  useCustomEventListener(stakeEvents.confirmed, updateYlpRewardBalance)
  useCustomEventListener(stakeEvents.error, updateYlpRewardBalance)

  return null
}

export const useYlpRewardBalance = (optionObj) => {
  const { silentUpdate } = { silentUpdate: false, ...optionObj }
  const { account } = useUser('wallet')
  const ylpRewardBalance = useAtomValue(ylpRewardBalanceAtom)
  let status = ylpRewardBalance.status
  if (silentUpdate && ylpRewardBalance.status.id === ASYNC_STATUS_ID.PENDING) {
    status = ASYNC_STATUS_ID.IDLE
  }
  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return Object.assign(account ? { ...ylpRewardBalance, status } : STAKED_BALANCE_INIT, { hasStatus })
}
