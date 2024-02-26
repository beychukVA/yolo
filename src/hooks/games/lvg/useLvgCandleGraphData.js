import axios from 'axios'
import { isEmpty } from 'lodash'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'

import { API } from 'constants/apiEndPoints'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { tsvParse, csvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'
import { DateTime } from 'luxon'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import ms from 'ms'
import { linearInterpolator } from 'utils'

const parseData = (d) => ({
  date: DateTime.fromISO(d.t, { zone: 'utc' }).toJSDate(),
  open: +d.o,
  high: +d.h,
  low: +d.l,
  close: +d.c,
  volume: +d.v
})

const MAX_DATA_LENGTH = 250
const X_EXTEND_OFFSET = Math.trunc(MAX_DATA_LENGTH / 2)
const EXTENTD_OFFSET_PERCENTAGE = 10

function getInitialData(symbol, type, interval) {
  if (symbol === 'XBT/USD') symbol = 'BTC/USD'
  const promiseCompare = axios
    .get(API.PRICE_DATA_OHLC, {
      params: {
        type,
        symbol,
        interval
      }
    })
    .then((res) => {
      return res.data.body
    })
    .then((data) => {
      const processedData = data.map((item) => parseData(item))
      return processedData
    })
    .catch((err) => {
      return ['error']
    })
  return promiseCompare
}

const getInterval = (lastCandleDate, chartInterval) => {
  const candleDate = DateTime.fromJSDate(lastCandleDate)
  const nowDate = DateTime.now()
  const diff = nowDate.diff(candleDate, ['minutes']).toObject()
  const pendingTime = 2 * chartInterval - diff.minutes
  return pendingTime <= 0 ? chartInterval : pendingTime
}

export const useLvgCandleGraphData = (chartInterval) => {
  const { activeAsset } = useLvgState()
  const { priceFeedSymbol, orderSymbol, type, fiatDecimals } = activeAsset

  const { priceFeed } = usePriceFeed2(priceFeedSymbol)

  const [interval, setInternalInterval] = useState(0)
  const [isError, setError] = useState(false)
  const apiCandleData = useRef([])
  const stateLessData = useRef([])
  const liveCandle = useRef({})

  const xExtendOffset = stateLessData.current.length < X_EXTEND_OFFSET ? stateLessData.current.length : X_EXTEND_OFFSET

  const updateCache = async () => {
    //Fetching data from Backend
    const allCandles = await getInitialData(orderSymbol, type, chartInterval)
    if (allCandles.includes('error')) {
      setError(true)
      return
    }
    apiCandleData.current = allCandles

    // Composing candles data
    const lastCandle = allCandles.at(-1)
    const emptyCandle = {
      date: DateTime.fromJSDate(lastCandle.date).plus({ minute: chartInterval }).toJSDate()
    }
    const composedCandles = [...allCandles, emptyCandle]
    stateLessData.current = composedCandles
    liveCandle.current = {}
    const newInterval = getInterval(lastCandle.date, chartInterval)
    setInternalInterval(newInterval)
  }
  useIntervalWhen(updateCache, ms(`${interval}m`), interval > 0 && !isEmpty(stateLessData.current), false)

  //Fill the cached with historic data
  useEffect(() => {
    setInternalInterval(0)
    setError(false)
    apiCandleData.current = []
    stateLessData.current = []
    updateCache()
  }, [orderSymbol, chartInterval, type])

  //TODO: WIP live candle
  useEffect(() => {
    if (!priceFeed?.price) return
    const lastCandle = apiCandleData.current.at(-1)
    const prevLiveCandle = liveCandle.current

    if (isEmpty(lastCandle)) {
      stateLessData.current = apiCandleData.current
      return
    }
    const price = priceFeed.price
    const { date, open, close, high, low, volumen } = lastCandle
    const newLiveCandle = {
      open: close,
      close: price,
      high: prevLiveCandle?.high ? Math.max(prevLiveCandle.high, price) : price,
      low: prevLiveCandle?.low ? Math.min(prevLiveCandle.low, price) : price,
      date: DateTime.fromJSDate(date).plus({ minute: chartInterval }).toJSDate()
    }
    liveCandle.current = newLiveCandle
    const emptyCandle = {
      date: DateTime.fromJSDate(newLiveCandle.date).plus({ minute: chartInterval }).toJSDate()
    }

    stateLessData.current = [...apiCandleData.current, newLiveCandle, emptyCandle]
  }, [priceFeed?.price, priceFeed?.time, orderSymbol, chartInterval, type])

  const widthRatio = useMemo(() => (chartInterval > 1 ? chartInterval * 0.75 : undefined), [chartInterval])

  return {
    xExtendOffset,
    widthRatio,
    dataState: isError ? 'error' : isEmpty(stateLessData.current) ? 'empty' : 'ready',
    isDataEmpty: isEmpty(stateLessData.current),
    data: stateLessData.current,
    currentPrice: priceFeed.price
  }
}
