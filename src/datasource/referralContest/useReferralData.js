import { API } from 'constants/apiEndPoints'
import { useAPI } from 'utils/hooks/useAPI'
import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

const REFERRAL_DATA_INIT = {
  status: ASYNC_STATUS.IDLE,
  data: null
}

const referralDataAtom = atom(REFERRAL_DATA_INIT)

const useReferralDataGetter = () => {
  const [referralData, setReferralData] = useAtom(referralDataAtom)
  const [state, sendQuery, hasStatus] = useAPI(API.REFERRAL_DATA, {
    queryType: 'get',
    controlled: true,
    withJwt: true
  })
  /**
  {
    "statusCode": 200,
    "body": {
        "numberOfParticipants": "1",
        "rewardsClaimed": 0,
        "rewardsAvailable": 5000,
        "deadline": "1664291506776",
        "currentProgramRewards": 0
    }
}
 */
  useEffect(() => {
    let newData = state.data
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const { rewardsClaimed, currentProgramRewards, numberOfParticipants, rewardsAvailable, deadline } = newData
      newData = {
        numberOfParticipants,
        rewardsClaimed,
        rewardsAvailable,
        currentProgramRewards,
        deadline
      }
    }
    setReferralData({
      ...referralData,
      status: state.status,
      data: newData
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status.id])

  const updateReferralData = () => {
    sendQuery()
  }
  return updateReferralData
}

export const ReferralDataUpdater = () => {
  const updateReferralData = useReferralDataGetter()

  // Balance Puller from BlockChain
  useIntervalWhen(updateReferralData, BLOCKCHAIN_PULL_INTERVAL, true, true)
  return null
}

export const useReferralData = () => {
  const state = useAtomValue(referralDataAtom)
  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return { ...state, hasStatus }
}
