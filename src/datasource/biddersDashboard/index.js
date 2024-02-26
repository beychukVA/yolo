import { config } from 'config'
import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { Zero } from '@ethersproject/constants'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useAPI } from 'utils/hooks/useAPI'

import { currencyFormatter, formatTimeStamp } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import ms from 'ms'
import { getGameParameters } from 'constants/games'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

export const useBidderData = () => {
  const INITIAL_STATE = {
    status: ASYNC_STATUS.PENDING,
    data: null
  }
  const { formatToken, tokenId } = useToken()

  const { account, chainId } = useUser('wallet')
  const convert = useConvertAmount()

  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.BIDS_GET_USER_STAT, { withJwt: true })

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'PENDING':
        return { ...INITIAL_STATE, status: ASYNC_STATUS.PENDING }
      case 'IDLE':
        return { ...INITIAL_STATE, status: ASYNC_STATUS.IDLE, data: action.payload }
      case 'ERROR':
        return { ...INITIAL_STATE, status: { ...ASYNC_STATUS.ERROR, message: action.payload } }
      default:
        return state
    }
  }, INITIAL_STATE)

  useEffect(() => {
    if (account) {
      dispatch({ type: 'PENDING' })
      //  sendApiQuery({ params: { address: account.toLowerCase() } })
      sendApiQuery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const getTotalAmount = useCallback(
    (array, id) => {
      const unitAmount = array.reduce((total, item) => total.add(item.bid.amount), Zero)
      const token = formatToken(unitAmount || Zero)
      const fiat = convert(token, tokenId, DEFAULT_FIAT, { number: true })
      const formatted = currencyFormatter(fiat)
      return {
        tokenId,
        token,
        fiat,
        formatted
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [convert, tokenId]
  )

  const filterBidsData = useCallback((rawData) => {
    const { allBids, allWinningBids: allWinningRounds } = rawData

    const winningRoundsInfo = allWinningRounds?.reduce((obj, item) => {
      const settlementPriceBN = BigNumber.from(
        item?.roundsettleddata?.returnValues?.finalGameInfo?.settlementPrice || '0'
      )
      const strikePriceBN = BigNumber.from(item?.roundsettleddata?.returnValues?.finalGameInfo?.strikePrice || '0')
      const winDirectionIsUp = settlementPriceBN.gte(strikePriceBN)
      return { ...obj, [item.roundindex]: { winDirectionIsUp, returnValues: item?.roundsettleddata?.returnValues } }
    }, {})

    let winningRows = []
    let losingRows = []

    allBids.map((bidRow) => {
      const winningRoundIsUp = winningRoundsInfo?.[bidRow.roundid]?.winDirectionIsUp
      const bidDirectionIsUp = bidRow.bid.isUp

      //! TODO  ACZ --> Filter and reduce the values here to get the winning amount in the winning bids

      if (bidDirectionIsUp === winningRoundIsUp) {
        winningRows.push(bidRow)
      } else {
        losingRows.push(bidRow)
      }
    })

    const winningRowsUp = winningRows.filter((row) => row.bid.isUp === true)
    const winningRowsDown = winningRows.filter((row) => row.bid.isUp === false)

    const losingRowsUp = losingRows.filter((row) => row.bid.isUp === true)
    const losingRowsDown = losingRows.filter((row) => row.bid.isUp === false)

    return {
      winningRoundsInfo,
      allBids,
      winningRows,
      winningRowsUp,
      winningRowsDown,
      losingRows,
      losingRowsUp,
      losingRowsDown
    }
  }, [])

  const totalCountsData = useCallback(
    ({ allBids, winningRows, winningRowsUp, winningRowsDown, losingRows, losingRowsUp, losingRowsDown }) => ({
      allBids: allBids.length,
      winningBids: winningRows.length,
      winningUpPercentageBids: winningRows.length ? +((winningRowsUp.length / winningRows.length) * 100).toFixed(2) : 0,
      winningDownPercentageBids: winningRows.length
        ? +((winningRowsDown.length / winningRows.length) * 100).toFixed(2)
        : 0,
      losingBids: losingRows.length,
      losingUpPercentageBids: losingRows.length ? +((losingRowsUp.length / losingRows.length) * 100).toFixed(2) : 0,
      losingDownPercentageBids: losingRows.length ? +((losingRowsDown.length / losingRows.length) * 100).toFixed(2) : 0
    }),
    []
  )

  const totalAmountsData = useCallback(
    ({
      winningRoundsInfo,
      allBids,
      winningRows,
      winningRowsUp,
      winningRowsDown,
      losingRows,
      losingRowsUp,
      losingRowsDown
    }) => ({
      allAmount: getTotalAmount(allBids),
      winningAmount: getTotalAmount(winningRows),
      winningUpAmount: getTotalAmount(winningRowsUp),
      winningDownAmount: getTotalAmount(winningRowsDown),
      losingAmount: getTotalAmount(losingRows),
      losingUpAmount: getTotalAmount(losingRowsUp),
      losingDownAmount: getTotalAmount(losingRowsDown)
    }),
    [getTotalAmount]
  )

  const plotData = useCallback(
    ({ winningRows, losingRows }) => {
      const wins = winningRows
        .map((row) => ({ x: ms(`${row.bid.txInfo.timestamp}s`), y: +getTotalAmount([row], 'WINS').fiat.toFixed() }))
        .sort((a, b) => a.x - b.x)
      const losses = losingRows
        .map((row) => ({ x: ms(`${row.bid.txInfo.timestamp}s`), y: +getTotalAmount([row], 'LOSSES').fiat.toFixed() }))
        .sort((a, b) => a.x - b.x)
      return { wins, losses }
    },
    [getTotalAmount]
  )

  const tableRowsData = useCallback(
    ({ winningRows, losingRows }) => {
      const processRows = (array, result) =>
        array.map((row) => {
          return {
            timeStamp: new Date(row.time_created).getTime(),
            date: formatTimeStamp(new Date(row.time_created).getTime(), 'MM/DD/YY'),
            roundNumber: row.roundid,
            asset: getGameParameters(row.gameid).asset,
            roundLength: '70/3:00',
            bidAmount: getTotalAmount([row]).formatted,
            bidDirection: row.bid.isUp ? 'up' : 'down',
            roundResult: result
          }
        })

      const tableRows = [...processRows(winningRows, 'Won'), ...processRows(losingRows, 'Lost')].sort(
        (a, b) => a.timeStamp - b.timeStamp
      )
      return tableRows
    },
    [getTotalAmount]
  )

  const headerData = useCallback(({ allBids }) => {
    const sortedBids = allBids
      .map((row) => ({ ...row, timeStamp: ms(`${row.bid.txInfo.timestamp}s`) }))
      .sort((a, b) => a.timeStamp - b.timeStamp)
    const fistBidsTimeStamp = sortedBids[0]?.bid.txInfo.timestamp * 1000
    return { fistBidsTimeStamp }
  }, [])

  const processData = useCallback(
    (rawData) => {
      const filteredBids = filterBidsData(rawData)
      if (!filteredBids) return null
      const counts = totalCountsData(filteredBids)
      const amounts = totalAmountsData(filteredBids)
      const graphs = plotData(filteredBids)
      const tableRows = tableRowsData(filteredBids)
      const header = headerData(filteredBids)
      return { header, counts, amounts, graphs, tableRows }
    },
    [filterBidsData, totalCountsData, totalAmountsData, plotData, tableRowsData, headerData]
  )

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED) && chainId) {
      if (!Object.keys(apiState.data).length) return null
      const data = processData(apiState.data)
      dispatch({ type: 'IDLE', payload: data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id, apiState?.data, chainId])

  //API
  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])
  const isPending = useMemo(() => hasStatus(ASYNC_STATUS_ID.PENDING), [hasStatus])

  return { ...state, hasStatus, isPending }
}
