import { config } from 'config'
import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'

import { currencyFormatter } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'

const { DEFAULT_FIAT } = config

export const useLpFeesData = (defaultPeriod) => {
  const { tokenId, formatToken } = useToken()
  const INITIAL_STATE = {
    status: ASYNC_STATUS.PENDING,
    data: null
  }

  const convert = useConvertAmount()
  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.DASHBOARD_STATICS_FEES, {
    queryType: 'get',
    withJwt: true
  })

  const [period, setPeriod] = useState(defaultPeriod)
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'PENDING':
        return { ...state, status: ASYNC_STATUS.PENDING }
      case 'IDLE':
        return { ...state, status: ASYNC_STATUS.IDLE, data: action.payload }
      case 'ERROR':
        return { ...state, status: { ...ASYNC_STATUS.ERROR, message: action.payload } }
      default:
        return state
    }
  }, INITIAL_STATE)

  useEffect(() => {
    dispatch({ type: 'PENDING' })
    sendApiQuery({ pathVars: [{ key: 'period', value: period }] })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  // Processing Data response
  const getTotalAmount = useCallback(
    (rawData = []) => {
      const sortedRawData = [...rawData].sort((itemA, itemB) => {
        const dateA = new Date(itemA.date)
        const dateB = new Date(itemB.date)
        if (dateB > dateA) return 1
        if (dateB < dateA) return -1
        return 0
      })
      const lastRawData = sortedRawData[0]
      const totalInUnitBN = BigNumber.from(lastRawData?.amount_accumulated || '0')
      const token = formatToken(totalInUnitBN)
      const fiat = convert(token, tokenId, DEFAULT_FIAT, { number: true })
      const formatted = currencyFormatter(fiat)
      return {
        token,
        fiat,
        formatted
      }
    },
    [convert, formatToken, tokenId]
  )
  const getGraphPoints = useCallback(
    (rawData = []) => {
      const sortedRawData = [...rawData].sort((itemA, itemB) => {
        const dateA = new Date(itemA.date)
        const dateB = new Date(itemB.date)
        if (dateB > dateA) return -1
        if (dateB < dateA) return 1
        return 0
      })
      const graphPoints = sortedRawData.map((item) => {
        const timestamp = new Date(item.date).getTime()

        const totalInUnitBN = BigNumber.from(item?.amount_accumulated || '0')
        const token = formatToken(totalInUnitBN)
        const fiat = convert(token, tokenId, DEFAULT_FIAT, { number: true })
        return [timestamp, fiat]
      })
      return graphPoints
    },
    [convert, formatToken, tokenId]
  )
  const getLastPeriodVolume = useCallback(
    (rawData = []) => {
      const sortedRawData = [...rawData].sort((itemA, itemB) => {
        const dateA = new Date(itemA.date)
        const dateB = new Date(itemB.date)
        if (dateB > dateA) return 1
        if (dateB < dateA) return -1
        return 0
      })
      const accumulated24BN = BigNumber.from(sortedRawData?.[0]?.amount_accumulated || '0')
      const token = formatToken(accumulated24BN)
      const fiat = convert(token, tokenId, DEFAULT_FIAT, { number: true })
      const formatted = currencyFormatter(fiat)
      return {
        amount: {
          token,
          fiat,
          formatted
        }
      }
    },
    [convert, formatToken, tokenId]
  )

  const attachTotals = useCallback(
    (rawData) => {
      /** 
        rawData: {
          periodStatistics: [
            {
              amount_accumulated: bigint;
              date: Date;
            }
          ]
        }
      */

      const periodStatistics = rawData?.periodStatistics || null
      const last24HoursFeesAmount = rawData?.last24HoursFeesAmount || '0'

      //if (period === 'daily') rawData && rawData.shift()
      const isPeriodStatisticsEmpty = periodStatistics && Object.keys(periodStatistics).length
      const totals = (isPeriodStatisticsEmpty && getTotalAmount(periodStatistics)) || {}
      const points = (isPeriodStatisticsEmpty && getGraphPoints(periodStatistics)) || []
      const lastPeriodVolume = (isPeriodStatisticsEmpty && getLastPeriodVolume(periodStatistics)) || {}
      const last24hoursVolumeBN = BigNumber.from(last24HoursFeesAmount)
      return { tokenId, totals, lastPeriodVolume, last24hoursVolumeBN, points, rawData }
    },
    [tokenId, getTotalAmount, getGraphPoints, getLastPeriodVolume]
  )

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.ERROR)) {
      console.log('ERROR apiState -->', apiState)
      return
    }
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const data = attachTotals(apiState.data.data)
      dispatch({ type: 'IDLE', payload: data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id, apiState?.data])

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])
  return { ...state, hasStatus, setPeriod }
}
