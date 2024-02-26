import { useCallback, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { ASYNC_STATUS } from 'constants/index'
import { isObject } from 'utils/uiUtils'
import { Exception } from 'utils/general'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { useUser } from 'hooks/user/useUser'

const OPTIONS_INIT = { queryType: 'post', controlled: false, withJwt: false }

const INITIAL_STATE = {
  status: ASYNC_STATUS.IDLE,
  apiUrl: '',
  queries: [],
  data: null
}

const UNDEFINED_QUERY_PARAMS = {}
/**
 *
 * @param {string} apiUrl
 * @param  options // {{queryType:['get', 'post'], controlled: boolean, withJwt:boolean}}
 *
 * @returns {[state, sendQuery, hasStatus, resetStatus]}
 */
export const useAPI = (apiUrl, options) => {
  const { queryType, controlled, withJwt } = { ...OPTIONS_INIT, ...options }
  const { account } = useUser('wallet')
  const [refreshIndex, setRefreshIndex] = useState(0)
  const { accessToken, getAccessToken } = useAccessToken(account)

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_QUERIES':
        return {
          ...state,
          status: ASYNC_STATUS.IDLE,
          queries: action.payload,
          options: { ...OPTIONS_INIT, ...options }
        }
      case 'FETCHING':
        return { ...state, status: ASYNC_STATUS.PENDING, apiUrl }
      case 'FETCHED':
        return { ...state, status: ASYNC_STATUS.CONFIRMED, data: action.payload }
      case 'FETCH_ERROR':
        return {
          ...state,
          status: { ...ASYNC_STATUS.ERROR, message: action.payload.message, code: action.payload.code }
        }
      case 'RESET':
        return INITIAL_STATE
      default:
        return state
    }
  }, INITIAL_STATE)

  const resetStatus = () => {
    setRefreshIndex(0)
  }

  const sendQuery = (queriesParams, isResetState) => {
    //queriesParams = [{ id , params, pathVars, tunnel, jwtAddress, callback }])
    isResetState && dispatch({ type: 'RESET' })
    const isArray = Array.isArray(queriesParams)
    dispatch({ type: 'SET_QUERIES', payload: isArray ? queriesParams : [queriesParams || UNDEFINED_QUERY_PARAMS] })
    setRefreshIndex(refreshIndex + 1)
  }

  const fetchData = useCallback(
    async (cancelRequest) => {
      dispatch({ type: 'FETCHING' })
      const queriesLength = state.queries.length
      let axiosConfig = {}
      if (withJwt && accessToken) {
        axiosConfig = {
          ...axiosConfig,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
      try {
        if (withJwt && !accessToken) {
          throw new Exception(401, 'you need an auth token to use this feature')
        }
        const dataResponse = await Promise.all(
          state.queries.map(async (query, idx) => {
            let axiosUrl = apiUrl
            const jwtAddress = query.jwtAddress
            if (jwtAddress) {
              const jwtToken = getAccessToken(jwtAddress)
              axiosConfig = {
                ...axiosConfig,
                headers: {
                  Authorization: `Bearer ${jwtToken}`
                }
              }
            }

            if (query.pathVars?.length > 0) {
              axiosUrl = query.pathVars.reduce(
                (url, pathVar) => url.replace(`{{${pathVar.key}}}`, pathVar.value),
                apiUrl
              )
            }
            let rawResponse = {}
            if (queryType === 'get') {
              rawResponse = await axios.get(axiosUrl, { ...axiosConfig, params: query.params || {} }).catch((err) => {
                throw err
              })
            } else if (queryType === 'post') {
              rawResponse = await axios.post(axiosUrl, query.params, axiosConfig).catch((err) => {
                throw err
              })
            }
            const rawData = rawResponse.data?.body || rawResponse.data || rawResponse.body || {}
            const data = isObject(rawData) ? rawData : Array.isArray(rawData) ? { array: rawData } : JSON.parse(rawData)
            if (cancelRequest) return
            const queryId = query.id || `default${idx}`
            const response = { ...data, tunnel: query.tunnel }
            if (query.callback) query.callback(response)
            return { [queryId]: response }
          })
        ).catch((err) => {
          throw err
        })

        if (queriesLength === 1) {
          dispatch({ type: 'FETCHED', payload: dataResponse[0].default0 })
          return
        }
        const payload = dataResponse.reduce((obj, item) => ({ ...obj, ...item }), {})
        dispatch({ type: 'FETCHED', payload })
      } catch (error) {
        if (cancelRequest) return

        dispatch({
          type: 'FETCH_ERROR',
          payload: {
            message: error?.response?.data?.error || error?.message || '',
            code: error?.response?.status || error?.code || ''
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiUrl, refreshIndex, state.queries.length, account, accessToken]
  )

  useEffect(() => {
    let cancelRequest = false
    if (!apiUrl || !apiUrl.trim()) return
    if (withJwt && !accessToken) return
    if (controlled) {
      if (refreshIndex > 0) {
        fetchData(cancelRequest)
      }
    } else {
      fetchData(cancelRequest)
    }

    return () => {
      cancelRequest = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, queryType, refreshIndex, state.queries.length, accessToken])

  const hasStatus = useCallback((statusToCheck) => state.status.id === statusToCheck, [state.status.id])

  return [state, sendQuery, hasStatus, resetStatus]
}
