import ReactGA4 from 'react-ga4'
import { config } from 'config/index'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import { useXftInfo } from 'hooks/xftCampaign/useXftProgress'
import { useToken } from 'utils/hooks/useToken'
import { useDebouncedCallback } from 'utils/hooks/useDebounceCallback'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { useUser } from 'hooks/user/useUser'

const isInitializedAtom = atom(false)
const eventBufferAtom = atom([])
const addEventBufferAtom = atom(null, (get, set, update) => set(eventBufferAtom, (prev) => [...prev, update]))
const removeEventBufferAtom = atom(null, (get, set, update) =>
  set(eventBufferAtom, (prev) => prev.filter((event) => event.id !== update))
)

const analytics = AnalyticsBrowser.load({ writeKey: 'zMraSxr7fFYr7mEHC8ajrQaPoPZczSpL' })

export const useReactGA4Init = () => {
  const { account, chainId } = useUser('wallet')
  const { formatToken } = useToken()
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAtom)
  const [eventBuffer] = useAtom(eventBufferAtom)
  const [, removeEventBuffer] = useAtom(removeEventBufferAtom)

  const { tokenId, yoloWalletAmountBN } = useUser('balance')
  const { xftLevel } = useXftInfo()

  const tokenBalance = useMemo(() => formatToken(yoloWalletAmountBN), [formatToken, yoloWalletAmountBN])

  const commonParam = useMemo(() => {
    return {
      envId: config.NODE_ENV,
      chainId,
      address: `::${account}`,
      token: {
        symbol: tokenId,
        balance: tokenBalance
      },
      xftLevel: xftLevel?.dec
    }
  }, [account, chainId, xftLevel?.dec, tokenBalance, tokenId])

  const sendEvents = useCallback(() => {
    if (!(account || isInitialized)) return
    if (eventBuffer.length) {
      eventBuffer.map((event) => {
        const eventPayload = { ...commonParam, ...event.extraParams }
        ReactGA4.event(event.id, eventPayload)
        analytics.track(event.id, eventPayload)
        removeEventBuffer(event.id)
        return true
      })
    }
  }, [account, isInitialized, commonParam, eventBuffer, removeEventBuffer])

  //Initialization
  useEffect(() => {
    if (isInitialized) return
    if (!account) return
    ReactGA4.initialize(config.GA_MEASUREMENT_ID)
    analytics.track('page_loaded', {
      envId: config.NODE_ENV,
      address: `::${account}`,
      chainId
    })
    setIsInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  //sendEvents
  useEffect(() => {
    sendEvents()
  }, [sendEvents])
}

export const useReactGA4 = () => {
  const [, addEventBuffer] = useAtom(addEventBufferAtom)
  const gaEvent = useDebouncedCallback((eventId, extraParams) => addEventBuffer({ id: eventId, extraParams }), 200)

  return { rga4: ReactGA4, gaEvent }
}
