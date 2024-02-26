import { useEffect, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { atom, useAtom, useSetAtom } from 'jotai'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { icons } from 'common'

export const useRankingData = (period) => {
  const [rows, setRows] = useState([])

  const [statsLvgRankingState, sendStatsLvgRankingQuery, hasStatsLvgRankingStatus] = useAPI(
    API.STATISTICS_LVG_RANKING,
    {
      queryType: 'get',
      controlled: true
    }
  )

  useEffect(() => {
    if (hasStatsLvgRankingStatus(ASYNC_STATUS_ID.ERROR)) {
      const message = statsLvgRankingState.status.message
    }
    if (hasStatsLvgRankingStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const rows = statsLvgRankingState?.data?.data?.[period] || []
      const reviewedRows = rows.map((row, idx) => ({
        ...row,
        rank: idx + 1,
        avatar: row.avatar || icons.default_avatar_square
      }))
      setRows(reviewedRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsLvgRankingState.status?.id, period])

  useEffect(() => {
    sendStatsLvgRankingQuery({ pathVars: [{ key: 'period', value: period.toLowerCase() }] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  return { rows }
}
