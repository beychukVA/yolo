import socketIO from 'socket.io-client'

import { config } from 'config'

const { BACKEND_SOCKET_URL } = config

let gamesSocket

//    BACKEND_SOCKET_URL: 'http://ec2-34-220-198-216.us-west-2.compute.amazonaws.com:3570'

export const socketConnect = async (onData) => {
  gamesSocket = socketIO(BACKEND_SOCKET_URL)
  gamesSocket &&
    gameSocketSubscribe({
      onConnect: () => onData.connect(gamesSocket),
      onDisconnect: () => onData.disconnect(gamesSocket),
      onBroadcast: (data) => {
        onData.broadcast(data)
      },
      onPriceFeed: (data) => {
        onData.priceFeed(data)
      }
    })
}

export const socketDisconnect = async () => {
  gamesSocket.disconnect()
}

export const gameSocketSubscribe = ({
  onConnect,
  onDisconnect,
  onceBroadcast,
  onBroadcast,
  oncePriceFeed,
  onPriceFeed
}) => {
  // const { onConnect, onDisconnect, onBroadcast, onceBroadcast } = eventListenerObj
  gamesSocket && onConnect && gamesSocket.on('connect', onConnect)
  gamesSocket && onDisconnect && gamesSocket.on('disconnect', onDisconnect)
  gamesSocket && onceBroadcast && gamesSocket.once('broadcast', onceBroadcast)
  gamesSocket && onBroadcast && gamesSocket.on('broadcast', onBroadcast)
  gamesSocket && onPriceFeed && gamesSocket.on('price-feed', onPriceFeed)
}

/**
 * This Function checks if the token you are trying to use in Polygon is Approved
 * @param {*} tokenContractData {abi, address}
 * @param {number} amountInCrypto
 * @returns boolean
 */
