import axios from 'axios'
import BigNumber from 'bignumber.js'

import { API } from 'constants/apiEndPoints'

const fetchDataFromDB = async () => {
  const leaderTableDataResponse = await axios.get(API.LEADERBOARD_GET_CACHED).catch((err) => {
    throw err
  })
  const leaderTableData = leaderTableDataResponse?.data?.data?.userBidStatistics || []
  return leaderTableData
}

const fetchWinningStreakFromDB = async (accessToken, startDate, endDate) => {
  const winningStreakDataResponse = await axios
    .get(API.LEADERBOARD_GET_WINNING_STREAK, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    .catch((err) => {
      throw err
    })
  // const leaderTableData = winningStreakDataResponse?.data?.players || []
  const leaderTableData = winningStreakDataResponse?.data?.data?.players || []
  return leaderTableData
}

const fetchLeaderboardDataFromDB = async (accessToken) => {
  const leaderboardDataResponse = await axios
    .get(API.LEADERBOARD_GET_HIGHEST_PROFIT)
    // , {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // }
    // )
    .catch((err) => {
      throw err
    })
  const leaderboardData = leaderboardDataResponse?.data?.body || []
  return leaderboardData
}

const calcRanking = (rawLeaderData) => {
  //ACZ --> The biggest earning with the lowest game played goes first
  const rankedData = rawLeaderData
    .sort((a, b) => {
      const itemA = Number(a.winningVolume)
      const itemB = Number(b.winningVolume)
      if (itemA < itemB) return 1
      if (itemA > itemB) return -1
      const itemA2 = Number(a.numberOfBids)
      const itemB2 = Number(b.numberOfBids)
      if (itemA2 < itemB2) return -1
      if (itemA2 > itemB2) return 1
      return 0
    })
    .map((item, idx) => ({ ...item, ranking: idx + 1 }))
  return rankedData
}

const getYoloEarned = async (rawLeaderData) => {
  const totalYoloAvailableForBeta = 500000
  const cumulativeStats = await axios.post(API.BIDS_GET_STAT, {})
  let data = JSON.parse(cumulativeStats.data.body)[0]

  const dataWithEarned = rawLeaderData.map((nftData) => {
    const individualBidCount = nftData?.totalGames || 0
    const individualCumBidAmount = new BigNumber(nftData.cumulativeBidAmount || 0)
    const individualFraction = individualCumBidAmount.times(0.3).plus(new BigNumber(individualBidCount).times(0.7))
    const totalBidCount = +data.totalbidcount
    const cumulativeBidAmount = new BigNumber(data.cumulativebidamount)
    let bidsFraction = cumulativeBidAmount.times(0.3).plus(new BigNumber(totalBidCount).times(0.7))
    let totalYoloEarned = individualFraction.times(totalYoloAvailableForBeta).dividedBy(bidsFraction).toFixed(0)
    if (isNaN(totalYoloEarned)) {
      totalYoloEarned = '0'
    }
    return { ...nftData, totalYoloEarned: Number(totalYoloEarned) }
  })
  return dataWithEarned
}

export const getLeaderTableData = async () => {
  const rawLeaderData = await fetchDataFromDB()
  const rankedData = calcRanking(rawLeaderData)

  return rawLeaderData
}

export const getWinningStreak = async (accessToken, startDate, endDate) => {
  const rawWinningStreakData = await fetchWinningStreakFromDB(accessToken, startDate, endDate)
  return rawWinningStreakData
}

export const getLeaderboardData = async (accessToken) => {
  const rawLeaderboardData = await fetchLeaderboardDataFromDB(accessToken)
  return rawLeaderboardData
}
