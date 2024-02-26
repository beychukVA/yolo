import { useCallback, useEffect, useState } from 'react'
import { getLeaderTableData, getWinningStreak } from 'datasource/leaderboard'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useReactGA4 } from 'GA4/useReactGA4'

const useFetchTableData = (callback) => {
  const { connectWallet } = useWalletConnection()
  const { gaEvent } = useReactGA4()
  const [sortBy, setSort] = useState()
  const [leaderTableData, setLeaderTableData] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const fetchTableData = useCallback(async () => {
    setIsPending(true)
    await getLeaderTableData()
      .then((res) => {
        setLeaderTableData(callback && typeof callback === 'function' ? callback(res) || [] : res || [])
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
    fetchTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return [leaderTableData, setSort, error, isPending]
}

export default useFetchTableData
