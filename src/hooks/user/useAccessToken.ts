import { config } from 'config/index'
import { ACCESS_TOKEN } from 'constants/index'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface AccessToken {
  address: string
  accessToken: string
}

const ACCESS_TOKEN_INIT: { [idx: string]: { [idx: string]: string } } = {}

const accessTokensCacheAtom = atomWithStorage(ACCESS_TOKEN, ACCESS_TOKEN_INIT)
const addAccessTokenToCacheAtom = atom(null, (get, set, update: AccessToken) =>
  set(accessTokensCacheAtom, (prev) => ({
    ...prev,
    [config.NODE_ENV]: { ...prev[config.NODE_ENV], [update.address.toLowerCase()]: update.accessToken }
  }))
)

export const useAccessToken = (address: string) => {
  const accessTokensCache = useAtomValue(accessTokensCacheAtom)

  const [, addAccessTokenToCache] = useAtom(addAccessTokenToCacheAtom)

  const setAccessToken = ({ address, accessToken }: AccessToken) => {
    addAccessTokenToCache({ address, accessToken })
  }
  const accessToken = accessTokensCache?.[config.NODE_ENV]?.[address?.toLowerCase()] || ''
  const getAccessToken = (jwtAddress: string) => accessTokensCache?.[config.NODE_ENV]?.[jwtAddress.toLowerCase()] || ''
  return { accessTokensCache, accessToken, setAccessToken, getAccessToken }
}
