import { useCallback, useEffect } from 'react'

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
  ylpStakedBalance: 0
}

const ylpStakedBalanceAtom = atom(STAKED_BALANCE_INIT)

const useUpdateYlpStakedBalance = () => {
  const { account, chainId } = useUser('wallet')
  const stakingRewardsContract = useStakingRewardsContract()

  const [state, dispatch] = useReducerAtom(ylpStakedBalanceAtom, (prev, action) => {
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

  const updateYlpStakedBalance = useCallback(async () => {
    dispatch({ type: 'PENDING' })
    try {
      const ylpStakedBalanceBN = await stakingRewardsContract
        .getUserDepositedAmount(account.toLowerCase())
        .catch((err) => {
          dispatch({ Type: 'ERROR', payload: err })
        })

      const ylpStakedBalance = +formatEther(ylpStakedBalanceBN)

      dispatch({
        type: 'UPDATED',
        payload: {
          ylpStakedBalance
        }
      })
    } catch (err) {
      dispatch({ Type: 'ERROR', payload: err })
    }
  }, [account, dispatch, stakingRewardsContract])

  //Balance updates on wallet changes
  useEffect(() => {
    updateYlpStakedBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  // Balance Puller from BlockChain
  useIntervalWhen(updateYlpStakedBalance, BLOCKCHAIN_PULL_INTERVAL, true, true)

  return updateYlpStakedBalance
}

export const YlpStakedBalanceUpdater = () => {
  const updateYlpStakedBalance = useUpdateYlpStakedBalance()

  //STAKED balance update event Listener
  useCustomEventListener(BALANCE_EVENT.UPDATE_STAKED, updateYlpStakedBalance)

  //STAKE TX event listener
  const stakeEvents = getTxEvents(TX_TYPE.YLP_STAKE)
  useCustomEventListener(stakeEvents.confirmed, updateYlpStakedBalance)
  useCustomEventListener(stakeEvents.error, updateYlpStakedBalance)

  //UNSTAKE TX event listener
  const unstakeEvents = getTxEvents(TX_TYPE.YLP_UNSTAKE)
  useCustomEventListener(unstakeEvents.confirmed, updateYlpStakedBalance)
  useCustomEventListener(unstakeEvents.error, updateYlpStakedBalance)

  return null
}

export const useYlpStakedBalance = (optionObj) => {
  const { silentUpdate } = { silentUpdate: false, ...optionObj }
  const { account } = useUser('wallet')
  const ylpStakedBalance = useAtomValue(ylpStakedBalanceAtom)
  let status = ylpStakedBalance.status
  if (silentUpdate && ylpStakedBalance.status.id === ASYNC_STATUS_ID.PENDING) {
    status = ASYNC_STATUS_ID.IDLE
  }

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return Object.assign(account ? { ...ylpStakedBalance, status } : STAKED_BALANCE_INIT, { hasStatus })
}
