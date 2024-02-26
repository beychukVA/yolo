import { useCallback, useEffect, useState } from 'react'
import socket from 'socket.io-client'
import { atom, useAtom, useAtomValue } from 'jotai'
// import { useAccessToken } from 'hooks/user/useAccessToken'
import { emitCustomEvent } from 'react-custom-events'
import { EVENTS } from 'constants/events'
import { useUser } from 'hooks/user/useUser'

const lvgSocketClientAtom = atom()

export const useGatewaySocket = (serverUrl) => {
  const { isConnected: isWalletConnected } = useUser('wallet')
  const [client, setClient] = useAtom(lvgSocketClientAtom)
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    // if (!accessToken) return
    const client = socket.connect(serverUrl, { transports: ['websocket'] })
    client.on('connect', (id) => {
      console.log('Gateway connected')
      setClient(client)
      setIsConnected(true)
      emitCustomEvent(EVENTS.GATEWAY_CONNECTED)
    })
    client.on('disconnect', () => {
      console.log('Gateway disconnected')
      setClient()
      setIsConnected(false)
      emitCustomEvent(EVENTS.GATEWAY_DISCONNECTED)
    })
    return () => {
      client.off('connect')
      client.off('disconnect')
      client.disconnect()
    }
    // TODO: Review if this works correctly
    // accordantly with React Docs this must be []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // if it works remove the following line
  // }, [serverUrl, setClient, accessToken])

  return { isConnected, client }
}

export const useGatewayEmitter = () => {
  const client = useAtomValue(lvgSocketClientAtom)

  const gatewayEmit = useCallback(
    (channel, message) => {
      if (!client) return
      client.emit(channel, message)
    },
    [client]
  )

  return { gatewayEmit }
}

/**
 * Hook that helps to manage subscription to any topic in the socket connection
 * @param {string} topic || The topic you want subscribe
 * @param {function} listener || A function that do something with the message
 * ! Warning: use only once per topic/channel in the app - WIP to fix it
 */
export const useGatewayListener = (topic, listener) => {
  const client = useAtomValue(lvgSocketClientAtom)
  useEffect(() => {
    if (!client) return
    client.on(topic, listener)
    return () => {
      client.off(topic, listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, listener, client])
}
