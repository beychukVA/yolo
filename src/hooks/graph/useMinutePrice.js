import { ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import ms from 'ms.macro'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useToken } from 'utils/hooks/useToken'
import { getGameParameters } from 'constants/games'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { isEmpty } from 'lodash'
import { useDebouncedCallback } from 'utils/hooks/useDebounceCallback'

// const INITIAL_STATE = {
//   status: ASYNC_STATUS.IDLE,
//   data: null
// }

const minutePricesAtom = atom({})
const updateMinutePricesAtom = atom(null, (get, set, update) => {
  const minutePrices = get(minutePricesAtom)
  set(minutePricesAtom, () => ({ ...minutePrices, ...update }))
})

export const useMinutePrice = (gameId) => {
  const { parseToken: parseUSDC } = useToken('USDC')
  const minutesPrices = useAtomValue(minutePricesAtom)
  const [, setMinutePrices] = useAtom(updateMinutePricesAtom)
  const [state, setState] = useState(ASYNC_STATUS_ID.PENDING)
  const { marketSymbol } = getGameParameters(gameId)
  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.PRICE_DATA_MINUTE, {
    queryType: 'get',
    controlled: true
  })

  const lastTS = useRef(Date.now())
  const [trimTS, setTrimTS] = useState({ startTS: null, endTS: null })
  const [dataSet, setData] = useState([])

  const updateMinuteData = (data) => {
    const transformed = data.array.map((item) => ({
      value: item.close,
      valueBN: parseUSDC(item.close),
      timestamp: item.window_end
    }))
    setMinutePrices({ [marketSymbol]: transformed })
    setState(ASYNC_STATUS_ID.IDLE)
  }

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      updateMinuteData(apiState.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id, marketSymbol])

  const getApiData = useCallback(() => {
    setState(ASYNC_STATUS_ID.PENDING)
    const callTS = Date.now()
    lastTS.current = callTS
    const roundLength = getGameParameters(gameId)?.roundLength || ms`24h`
    sendApiQuery({
      params: {
        startTime: (callTS - roundLength).toFixed(),
        endTime: callTS.toFixed(),
        symbol: marketSymbol
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, marketSymbol])

  useIntervalWhen(getApiData, ms`1m`, true, false)
  useEffect(() => getApiData(), [getApiData])

  useEffect(() => {
    const dataSet = minutesPrices[marketSymbol]
    if (isEmpty(dataSet)) return
    if (!trimTS.startTS && !trimTS.endTS) {
      setData(dataSet)
      return
    }
    if (trimTS.startTS) {
      const startTS = lastTS.current - trimTS.startTS
      const filteredDataSet = dataSet.filter((item) => +item.timestamp >= startTS)
      setData(filteredDataSet)
    }
  }, [minutesPrices, marketSymbol, trimTS.startTS, trimTS.endTS])

  const setDataTrimer = useDebouncedCallback(setTrimTS, 100)

  return { state, data: dataSet, setDataTrimer }
}
