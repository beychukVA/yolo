import { useEffect, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { ASYNC_STATUS_ID } from 'constants/index'
import { DateTime } from 'luxon'

export const useWeeklyRewardsData = () => {
  const [data, setData] = useState({ contestInfo: {}, rewards: [] })

  const [lvgWeeklyInfoState, sendLvgWeeklyInfoQuery, hasLvgWeeklyInfoStatus] = useAPI(API.CONTEST_LVG_WEEKLY_INFO, {
    queryType: 'get',
    controlled: true
  })

  const [lvgRewardsInfoState, sendLvgRewardsInfoQuery, hasLvgRewardsInfoStatus] = useAPI(API.CONTEST_LVG_REWARDS_INFO, {
    queryType: 'get',
    controlled: true
  })

  useEffect(() => {
    if (hasLvgWeeklyInfoStatus(ASYNC_STATUS_ID.ERROR)) {
      const message = lvgWeeklyInfoState.status.message
    }
    if (hasLvgWeeklyInfoStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const contestInfo = lvgWeeklyInfoState?.data?.contest || {}
      const startSQL = DateTime.fromISO(contestInfo.start_date).toSQLDate()
      const endSQL = DateTime.fromISO(contestInfo.end_date).toSQLDate()
      sendLvgRewardsInfoQuery({
        params: { startDate: startSQL, endDate: endSQL },
        tunnel: { contestInfo: { ...contestInfo, startSQL, endSQL } }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lvgWeeklyInfoState.status?.id])

  useEffect(() => {
    if (hasLvgRewardsInfoStatus(ASYNC_STATUS_ID.ERROR)) {
      const message = lvgRewardsInfoState.status.message
    }
    if (hasLvgRewardsInfoStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const contestInfo = lvgRewardsInfoState?.data?.tunnel?.contestInfo || []
      const rewards = lvgRewardsInfoState?.data?.rewards || []

      const sortedRewards = rewards.sort((a, b) => {
        const itemA = a.score
        const itemB = b.score
        if (itemA < itemB) return 1
        if (itemA > itemB) return -1
        return 0
      })

      setData({ contestInfo, rewards: sortedRewards })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lvgRewardsInfoState.status?.id])

  useEffect(() => {
    sendLvgWeeklyInfoQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}
