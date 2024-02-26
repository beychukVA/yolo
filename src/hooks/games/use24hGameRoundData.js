import { ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { isEmpty } from 'lodash'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

export const use24hGameRoundData = () => {
  const [state, setSate] = useState()
  const retries = useRef(0)
  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.GAME_ROUNDS_DATA, {
    queryType: 'get',
    controlled: true
  })

  const processingResponse = (dataArray) => {
    const roundData = dataArray[0]
    if (!isEmpty(roundData)) retries.current = 0
    setSate(roundData)
  }

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      processingResponse(apiState.data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id])

  useIntervalWhen(
    () => {
      retries.current = ++retries.current
      sendApiQuery(apiState.queries[0])
    },
    1000,
    isEmpty(apiState.data?.data) && retries.current < 5,
    false
  )

  const getGameRoundData = useCallback(
    (gameId, roundId) => {
      sendApiQuery({ params: { gameId, roundId } })
    },
    [sendApiQuery]
  )

  return { state, getGameRoundData }
}
