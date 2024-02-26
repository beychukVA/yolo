import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from 'connectors'
import { isMobile } from 'utils/userAgent'
import { atomWithStorage } from 'jotai/utils'
import { atom, useAtom } from 'jotai'
import { WALLET_RECONNECT } from 'constants/index'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)
  const [reconnect, setReconnect] = useReconnectionFlag()

  //  try connecting to an injected connector if exists
  useEffect(() => {
    setTried(false)
    if (!active && reconnect) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true)
            .then(() => {
              setReconnect(true)
            })
            .catch(() => {
              setTried(true)
            })
        } else {
          // This activate the connection if we opens the page in a wallet built in browser
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true)
              .then(() => {
                setReconnect(true)
              })
              .catch(() => {
                setTried(true)
              })
          } else {
            setReconnect(false)
            setTried(false)
          }
        }
      })
    }
  }, [activate, active, reconnect, setReconnect])

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()
  useEffect(() => {
    const ethereum = window.ethereum | undefined

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = (chainId) => {
        // eat errors
        console.log('chainChanged', chainId)
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts)
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      const handleNetworkChanged = (networkId) => {
        console.log('networkChanged', networkId)
        activate(injected).catch((error) => {
          console.error('Failed to activate after network changed', error)
        })
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
        ethereum.removeListener('networkChanged', handleNetworkChanged)
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}

/* Manage Reconnection flag */
const reconnectAtom = atomWithStorage(WALLET_RECONNECT, true)
const setReconnectAtom = atom(null, (get, set, update) => set(reconnectAtom, (prev) => update))

export function useReconnectionFlag() {
  const [reconnect] = useAtom(reconnectAtom)
  const [, setReconnect] = useAtom(setReconnectAtom)
  return [reconnect, setReconnect]
}
