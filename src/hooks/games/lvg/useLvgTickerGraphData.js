import axios from 'axios'
import ms from 'ms'
import { isEmpty } from 'lodash'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'

import { API } from 'constants/apiEndPoints'
import { useEffect, useRef } from 'react'

const MAX_DATA_LENGTH = 150
const X_EXTEND_OFFSET = Math.trunc(MAX_DATA_LENGTH / 3)
const EXTENTD_OFFSET_PERCENTAGE = 10

function getInitialData(symbol) {
  const endTimeMs = Date.now()
  const startTimeMs = endTimeMs - ms(`${MAX_DATA_LENGTH}s`)
  const promiseCompare = axios
    .get(API.PRICE_DATA_SECOND, {
      params: {
        startTime: startTimeMs,
        endTime: endTimeMs,
        symbol
      }
    })
    .then((res) => {
      return res.data.body
    })
    .then((data) => {
      const processedData = data.map((item) => ({
        date: new Date(+item.window_end),
        price: item.close,
        indexPrice: item.close
      }))

      return processedData
    })
  return promiseCompare
}

export const useLvgTickerGraphData = () => {
  const { activeAsset } = useLvgState()
  const { priceFeedSymbol, aggregationSymbol, fiatDecimals } = activeAsset

  const { priceFeed } = usePriceFeed2(priceFeedSymbol)

  const stateLessData = useRef([])
  const stateLessYExtents = useRef([])

  const xExtendOffset = stateLessData.current.length < X_EXTEND_OFFSET ? stateLessData.current.length : X_EXTEND_OFFSET

  useEffect(() => {
    stateLessData.current = []
    getInitialData(aggregationSymbol).then((data) => {
      stateLessData.current = data
    })
  }, [aggregationSymbol])

  useEffect(() => {
    if (isEmpty(stateLessData.current)) return
    if (!priceFeed) return
    priceFeed.date = priceFeed && new Date(priceFeed?.time)
    stateLessData.current.push(priceFeed)
    if (stateLessData.current.length > MAX_DATA_LENGTH) {
      stateLessData.current = stateLessData.current.slice(-MAX_DATA_LENGTH)
    }
    const prices = stateLessData.current.map((d) => d.price).slice(-xExtendOffset)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const delta = maxPrice - minPrice
    const halfDelta = delta / 2
    const newDelta = delta + delta * (EXTENTD_OFFSET_PERCENTAGE / 100)
    const halfNewDelta = newDelta / 2
    const newMinPrice = minPrice + halfDelta - halfNewDelta
    const newMaxPrice = minPrice + halfDelta + halfNewDelta
    stateLessYExtents.current = [newMinPrice, newMaxPrice, priceFeed?.price]

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFeed?.price, priceFeed?.time])

  return {
    xExtendOffset,
    yExtents: stateLessYExtents.current,
    isDataEmpty: isEmpty(stateLessData.current),
    data: stateLessData.current,
    currentPrice: priceFeed?.price,
    fiatDecimals
  }
}
