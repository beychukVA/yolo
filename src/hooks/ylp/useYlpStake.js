import { useCallback, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { parseEther } from '@ethersproject/units'

import { useStakingRewardsContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, BALANCE_EVENT, TX_TYPE } from 'constants/index'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { useUser } from 'hooks/user/useUser'

export const useYlpStake = () => {
  const { account } = useUser('wallet')
  const stakingRewardsContract = useStakingRewardsContract()
  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.YLP_STAKE)

  const stakeYLP = useCallback(
    (ylpAmount) => {
      setStatus(ASYNC_STATUS.PENDING)
      const weiAmountBN = parseEther(ylpAmount)
      stakingRewardsContract
        .deposit(weiAmountBN)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { amount: ylpAmount },
            txType: TX_TYPE.YLP_STAKE
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, stakingRewardsContract, txRegister]
  )

  /**
   * CUSTOM EVENTS LISTENER
   */
  //OnHash
  useCustomEventListener(txEvents.hash, (txInfo) => {
    //console.log('ACZ onDeposit hash (txInfo) -->', txInfo)
  })
  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    emitCustomEvent(BALANCE_EVENT.UPDATE_YLP)
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { stakeYLP, status, hasStatus }
}
