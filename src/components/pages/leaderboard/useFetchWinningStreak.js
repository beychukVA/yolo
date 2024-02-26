import { useCallback, useEffect, useState } from 'react'
import { getWinningStreak } from 'datasource/leaderboard'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUser } from 'hooks/user/useUser'
import { useAccessToken } from 'hooks/user/useAccessToken'

export const useFetchWinningStreak = (callback) => {
  const { connectWallet } = useWalletConnection()
  const { gaEvent } = useReactGA4()
  const [sortBy, SortBy] = useState()
  const [WeekData, setData] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { account } = useUser('wallet')
  const { accessToken } = useAccessToken(account)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchTableData = useCallback(async (startDate, endDate) => {
    setIsPending(true)
    await getWinningStreak(accessToken, startDate, endDate)
      .then((res) => {
        setData(callback && typeof callback === 'function' ? callback(res) || [] : res || [])
      })
      .catch((err) => {
        //TODO: Toast or other notification on error should be here
        if (err.code === 4001) {
          connectWallet()
        }
        setError(err)
      })
    setIsPending(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    gaEvent('leaderboard_visit', {
      pathId: 'dashboard.leaderboard.visit',
      source: '',
      timeSpent: ''
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      fetchTableData(startDate, endDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, startDate, endDate])

  return [WeekData, SortBy, setStartDate, setEndDate, error, isPending]
}
