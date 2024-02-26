import { useGameProgress } from 'hooks/games/useGameProgress'

import axios from 'axios'
import ms from 'ms'
import { API } from 'constants/apiEndPoints'
import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useCurrentPrice } from 'hooks/gameEngine/usePriceFeed'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useState, useEffect, useMemo } from 'react'

function getInitialData(gameId, startTimeMs) {
  const { marketSymbol: symbol, roundLength } = getGameParameters(gameId)

  const endTime = +startTimeMs + roundLength
  const promiseCompare = axios
    .get(API.PRICE_DATA_SECOND, {
      params: {
        startTime: startTimeMs,
        endTime,
        symbol
      }
    })
    .then((res) => {
      return res.data.body
    })
    .then((data) => {
      return data.map((item) => ({
        ...item,
        date: new Date(+item.window_end)
      }))
    })
  return promiseCompare
}

const PointsPerRound = 130

export const use3minGraphData = () => {
  const { activeGameId } = useActiveGameData()
  const {
    liveRoundData: { strikePrice, startTime }
  } = useLiveRoundData(activeGameId)
  const { currentPrice } = useCurrentPrice(activeGameId)
  const { roundLength } = getGameParameters(activeGameId)
  const { msTimeLeft } = useGameProgress(activeGameId)

  const startTimeMs = useMemo(() => ms(`${startTime}s`), [startTime])

  //   const [startTimeMs, setStartTimeMs] = useState(Date.now() - ms('2m'))
  const [data, setData] = useState(null)
  useEffect(() => {
    setData(null)
    getInitialData(activeGameId, startTimeMs).then((data) => {
      setData(data)
    })
  }, [activeGameId, startTime])

  useEffect(() => {
    if (!data) return
    currentPrice.date = new Date(+currentPrice.endTime)
    const newDataSet = [...data, currentPrice]
    setData(newDataSet)
  }, [currentPrice?.close])

  const emptyDots = useMemo(
    () =>
      data?.length < PointsPerRound
        ? Array(PointsPerRound - data.length - 1)
            .fill(null)
            .map((item, index) => ({
              close: undefined, //+currentPrice.close,
              date: new Date(+currentPrice?.endTime + ms(`${index + 1}s`))
            }))
        : [],
    [data?.length]
  )

  return {
    data: !!data && [...data, ...emptyDots],
    currentPrice: currentPrice?.close,
    strikePrice,
    startTime: startTimeMs,
    roundLength
  }
}
