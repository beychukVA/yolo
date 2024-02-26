import axios from 'axios'
import { API } from 'constants/apiEndPoints'

const fetchDataFromDB = async () => {
  const contestTableDataResponse = await axios.post(API.CONTEST_GET_CACHED).catch((err) => {
    throw err
  })
  const contestTableData = JSON.parse(contestTableDataResponse.data.body)?.rows
  return contestTableData
}

const processRawData = (rawContestData) => {
  return rawContestData.map((data) => ({
    account: data.owner,
    winningpercent: data.winningpercent,
    totalgameswon: data.totalgameswon
  }))
}

const calcRanking = (rawContestData) => {
  const rankedData = rawContestData
    .sort((a, b) => {
      const itemA = Number(a.winningpercent)
      const itemB = Number(b.winningpercent)
      if (itemA < itemB) return 1
      if (itemA > itemB) return -1
      return 0
    })
    .map((item, idx) => ({ ...item, ranking: idx + 1 }))
  return rankedData
}

export const getContestTableData = async () => {
  const rawContestData = await fetchDataFromDB()
  const contestData = processRawData(rawContestData)
  const rankedData = calcRanking(contestData)
  return rankedData
}
