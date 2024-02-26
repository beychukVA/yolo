import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useCallback, useEffect, useReducer } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { isObjectEmpty } from 'utils'

const GAME_BIDS_ROUNDS_INIT = {
  status: ASYNC_STATUS.IDLE,
  data: {}
}

export const useGameBidsByRounds = () => {
  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.BIDS_GET_MULTI_ROUND_BIDS, { controlled: true })

  const [state, dispatch] = useReducer((prev, action) => {
    switch (action.type) {
      case 'PENDING':
        return {
          ...prev,
          status: ASYNC_STATUS.PENDING
        }
      case 'UPDATED':
        return {
          ...prev,
          status: ASYNC_STATUS.IDLE,
          data: action.payload
        }
      case 'ERROR':
        return {
          ...prev,
          status: {
            ...ASYNC_STATUS.ERROR,
            message: action.payload
          }
        }
      default:
        return state
    }
  }, GAME_BIDS_ROUNDS_INIT)

  const getBids = (gameId, roundsArray) => {
    dispatch({ type: 'PENDING' })
    const params = {
      bidRoundIndex: `{${roundsArray.join()}}`,
      gameId
    }
    sendApiQuery({ params })
  }

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED) && !isObjectEmpty(apiState.data)) {
      const gameRoundsBidRows = apiState.data.rows
      dispatch({ type: 'UPDATED', payload: gameRoundsBidRows })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status.id])

  const hasBidsStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return { bidsState: state, getBids, hasBidsStatus }
}
