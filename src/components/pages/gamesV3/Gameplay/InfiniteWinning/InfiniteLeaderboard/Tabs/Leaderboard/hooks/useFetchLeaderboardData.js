import { getLeaderboardData } from 'datasource/leaderboard'
import { useUser } from 'hooks/user/useUser'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const useFetchLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [sortBy, LeaderboardSortBy] = useState()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { account } = useUser('wallet')
  const { accessToken } = useAccessToken(account)

  const fetchLeaderboardData = useCallback(async () => {
    setIsPending(true)
    await getLeaderboardData(accessToken)
      .then((res) => {
        setLeaderboardData(res || [])
      })
      .catch((err) => {
        setError(err)
      })
    setIsPending(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchLeaderboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { leaderboardData, LeaderboardSortBy, error, isPending }
}
