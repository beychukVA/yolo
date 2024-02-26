import ms from 'ms.macro'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { isEqual, map } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useCurrentPrice } from '../usePriceFeed'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'
import { REGISTERED_GAME_LIST } from 'constants/games'

const g24hrLiveRoundsDataAtom = atom({})
const g24hrUpdateLiveRoundsDataAtom = atom(null, (get, set, update) => {
  const liveRoundsData = get(g24hrLiveRoundsDataAtom)
  const prevData = liveRoundsData[update.gameId]
  const newData = update.roundData
  // The next line is because a Bug in the backend that return non valid old live rounds
  // if (prevData?.roundIndex > newData.roundIndex) return
  // if (isEqual(prevData, newData)) return
  // set(g24hrLiveRoundsDataAtom, (prev) => ({ ...prev, [update.gameId]: newData }))
  return {}
})

const g3minLiveRoundsDataAtom = atom({})
const g3minUpdateLiveRoundsDataAtom = atom(null, (get, set, update) => {
  const liveRoundsData = get(g24hrLiveRoundsDataAtom)
  const prevData = liveRoundsData[update.gameId]
  const newData = update.roundData
  // The next line is because a Bug in the backend that return non valid old live rounds
  if (prevData?.roundIndex > newData.roundIndex) return
  if (isEqual(prevData, newData)) return
  set(g3minLiveRoundsDataAtom, (prev) => ({ ...prev, [update.gameId]: newData }))
})

export const useLiveRoundDataSocketUpdater = () => {
  const setLiveRoundsData = useSetAtom(g3minUpdateLiveRoundsDataAtom)
  const { parseToken: parseUSDC } = useToken('USDC')
  const updateLiveRoundsDataSocket = useCallback(
    (data) => {
      const { globals, ...gamesData } = data
      map(gamesData, (gameData, gameId) => {
        const { currentPrice, currentTime, graphData, natsClosePrice, natsEndTime, natsMarketPair, ...roundData } =
          gameData
        roundData.strikePriceBN = parseUSDC(`${roundData.strikePrice || 0}`)
        setLiveRoundsData({ gameId, roundData })
        return true
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setLiveRoundsData]
  )
  return { updateLiveRoundsDataSocket }
}

export const useLiveRoundDataPuller = () => {
  const setLiveRoundsData = useSetAtom(g24hrUpdateLiveRoundsDataAtom)

  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.LIVE_OPEN_ROUNDS_DATA, {
    queryType: 'get',
    controlled: true
  })

  const processingResponse = (dataArray) => {
    //reducing data
    const liveArray = dataArray.filter((item) => item.status === 'live')
    const reducedLiveData = liveArray.reduce((obj, item) => {
      const { game_id, ...newRoundData } = item
      const prevRoundData = obj[game_id]
      if (prevRoundData?.round_id > newRoundData?.round_id) {
        return obj
      }
      return { ...obj, [game_id]: newRoundData }
    }, {})

    const openArray = dataArray.filter((item) => item.status === 'open')
    const reducedOpenData = openArray.reduce((obj, item) => {
      const { game_id, ...newRoundData } = item
      const prevRoundData = obj[game_id]
      if (prevRoundData?.round_id > newRoundData?.round_id) {
        return obj
      }
      return { ...obj, [game_id]: newRoundData }
    }, {})
    const mixedRoundData = { ...reducedOpenData, ...reducedLiveData }

    //renaming and updateState
    map(mixedRoundData, (gameData, gameId) => {
      const {
        round_id: roundIndex,
        settlement_price: settlementPrice,
        start_time_utc: startTime,
        strike_price: strikePrice,
        buckets,
        status
      } = gameData
      const strikePriceBN = BigNumber.from(strikePrice || '0')
      const roundData = { roundIndex, settlementPrice, startTime, strikePrice, strikePriceBN, buckets, status }
      setLiveRoundsData({ gameId, roundData })
      return true
    })
  }

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      processingResponse(apiState.data.array)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id])

  // Games rounds data updater interval
  // useIntervalWhen(sendApiQuery, ms`5s`, navigator.onLine, true)
}

export const useLiveRoundData = (gameId) => {
  const live24hRoundData = useAtomValue(g24hrLiveRoundsDataAtom)
  const live3minRoundData = useAtomValue(g3minLiveRoundsDataAtom)
  const liveRoundsData = useMemo(
    () => ({ ...live24hRoundData, ...live3minRoundData }),
    [live24hRoundData, live3minRoundData]
  )
  const getLiveRoundData = useCallback((gId) => liveRoundsData?.[gId], [liveRoundsData])
  return gameId ? { liveRoundData: liveRoundsData?.[gameId] || {} } : getLiveRoundData
}

export const useLiveGamesList = () => {
  const live24hRoundData = useAtomValue(g24hrLiveRoundsDataAtom)
  const live3minRoundData = useAtomValue(g3minLiveRoundsDataAtom)
  const liveRoundsData = useMemo(
    () => ({ ...live24hRoundData, ...live3minRoundData }),
    [live24hRoundData, live3minRoundData]
  )
  const getCurrentPrice = useCurrentPrice()
  const gamesList = useMemo(() => Object.keys(liveRoundsData), [liveRoundsData])
  const gamesWithCurrentPrices = gamesList.map((gameId) => {
    const currentPrice = getCurrentPrice(gameId)?.value || 0
    return { gameId, currentPrice }
  })

  return { gamesList, gamesWithCurrentPrices, liveRoundsData }
}
