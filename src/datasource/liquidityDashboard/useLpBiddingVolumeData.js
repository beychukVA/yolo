import { config } from 'config'
import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { Zero } from '@ethersproject/constants'
import { useCallback, useEffect, useReducer } from 'react'
import { useAPI } from 'utils/hooks/useAPI'

import { currencyFormatter } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'

const { DEFAULT_FIAT } = config

export const useLpBiddingVolumeData = (fixedDays) => {
  const { tokenId, formatToken } = useToken()
  const INITIAL_STATE = {
    status: ASYNC_STATUS.PENDING,
    data: null
  }

  const convert = useConvertAmount()
  const [apiState, sendApiQuery, hasApiStatus] = useAPI(API.GET_LP_BIDING_VOLUMES, { withJwt: true })
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

  const refresh = () => {
    dispatch({ type: 'PENDING' })
    sendApiQuery()
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const processAmount = useCallback(
    (unitAmount) => {
      const unitAmountBN = (unitAmount && BigNumber.from(unitAmount)) || Zero
      const token = formatToken(unitAmountBN)
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

  const processData = useCallback(
    (rawData) => {
      const allTimeVolume = processAmount(rawData.allTimeVolume)
      const volume24 = {
        ...rawData.volume24,
        amount: processAmount(rawData.volume24?.amount)
      }
      const lastWeek = {
        amount: processAmount(rawData.lastWeek?.amount)
      }
      const lastMonth = {
        amount: processAmount(rawData.lastMonth?.amount)
      }
      return { allTimeVolume, volume24, lastWeek, lastMonth }
    },
    [processAmount]
  )

  useEffect(() => {
    if (hasApiStatus(ASYNC_STATUS_ID.ERROR)) {
      dispatch({ type: 'IDLE', payload: apiState })
      return
    }
    if (hasApiStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      if (apiState.data) {
        if (!Object.keys(apiState.data).length) return null
        const data = processData(apiState.data)
        dispatch({ type: 'IDLE', payload: data })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.status?.id, apiState?.data])

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])
  return { ...state, hasStatus, refresh }
}
