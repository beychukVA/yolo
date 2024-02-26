import { useCallback } from 'react'

import { atom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { ASYNC_STATUS } from 'constants/index'
import { useWhitelistSFTClaimsContract } from 'hooks/contracts/useContract'
import { BigNumber } from 'ethers'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const XFT_CLAIM_INIT = {
  status: ASYNC_STATUS.PENDING,
  isEligible: false,
  isClaimed: false
}

const XFTClaimAtom = atom(XFT_CLAIM_INIT)

export const useXftEligible = () => {
  const { account } = useUser('wallet')
  const WhitelistSFTClaimsContract = useWhitelistSFTClaimsContract()

  const [state, dispatch] = useReducerAtom(XFTClaimAtom, (prev, action) => {
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

  const updateXFTStatus = useCallback(async () => {
    dispatch({ type: 'PENDING' })
    try {
      const expirationEpochTimeBn = await WhitelistSFTClaimsContract.claimeesRegister(account).catch((err) => {
        dispatch({ Type: 'ERROR', payload: err })
      })

      const nowTimeStamp = (Date.now() / 1000).toFixed()
      const nowEpochBN = BigNumber.from(nowTimeStamp)
      let isEligible = state.isEligible
      if (expirationEpochTimeBn.gt(nowEpochBN)) {
        isEligible = true
      } else {
        isEligible = false
      }
      dispatch({
        type: 'UPDATED',
        payload: { isEligible }
      })
    } catch (err) {
      dispatch({ Type: 'ERROR', payload: err })
    }
  }, [account, dispatch, WhitelistSFTClaimsContract, state.isEligible])

  // Balance Puller from BlockChain
  useIntervalWhen(updateXFTStatus, BLOCKCHAIN_PULL_INTERVAL, true, true)

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return { xftState: state, hasXftStatus: hasStatus }
}
