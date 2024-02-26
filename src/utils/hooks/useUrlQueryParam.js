import qs from 'qs'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const useUrlQueryParam = (queryParam) => {
  const location = useLocation()
  const queryObject = useRef(qs.parse(location.search, { ignoreQueryPrefix: true }))
  return queryObject.current[queryParam]
}
