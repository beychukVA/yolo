import { useCallback, useMemo } from 'react'
import { socketConnect, socketDisconnect } from 'datasource/games'
import { atom, useAtom, useAtomValue } from 'jotai'
import { emitCustomEvent } from 'react-custom-events'
import { EVENTS } from 'constants/index'
import { useDispatch } from 'react-redux'
import { priceFeedActions } from 'redux/actions'
import { sortByRegisteredGameList } from 'utils/arrays'
import { usePriceFeedObserver } from './usePriceFeed'
// import { useLiveRoundDataSocketUpdater, useLiveRoundDataPuller } from './useLiveRoundData'
import { useG3minGraphDataUpdater } from './g3minGameEngine/useG3minGraphData'
import { useLiveRoundDataPuller, useLiveRoundDataSocketUpdater } from './useLiveRoundData'
import { useLvgState } from 'hooks/games/lvg/useLvgState'

//initials
const SOCKET_INFO_INIT = {
  id: undefined,
  connected: false,
  hooks: 0,
  msg: undefined
}

//atoms definitions
export const socketMsgAtom = atom(SOCKET_INFO_INIT)
const updateSocketMsgAtom = atom(null, (get, set, update) => {
  if (update.msg) {
    update.msg.globals.gamesList = sortByRegisteredGameList(update?.msg?.globals?.gamesList || [])
  }
  set(socketMsgAtom, (prev) => ({ ...prev, ...update }))
})

//hook declaration
export const useGameEngineSocket = () => {
  const dispatch = useDispatch()
  const { updateCurrentPrices } = usePriceFeedObserver()

  const { update3minGraphData } = useG3minGraphDataUpdater()
  const { updateLiveRoundsDataSocket } = useLiveRoundDataSocketUpdater()
  useLiveRoundDataPuller()

  const [, updateSocketMsg] = useAtom(updateSocketMsgAtom)
  const socketEventListener = useMemo(
    () => ({
      connect: (socket) => {
        updateSocketMsg({ id: socket.id, connected: socket.connected })
        // dispatch(priceFeedActions.priceFeedOpenSocket(socket))
        // emitCustomEvent(EVENTS.ADMIN_CONNECTED, socket.id)
      },
      disconnect: (socket) => {
        // dispatch(priceFeedActions.priceFeedCloseSocket())
        // emitCustomEvent(EVENTS.ADMIN_DISCONNECTED)
      },
      broadcast: (data) => {
        // dispatch(priceFeedActions.updateGames({ ...data }))
        update3minGraphData(data)
        updateLiveRoundsDataSocket(data)
        updateSocketMsg({ msg: data })
      },
      onceBroadcast: (data) => {
        // emitCustomEvent(EVENTS.ADMIN_FIRST_MESSAGE, data)
      },
      priceFeed: (data) => {
        updateCurrentPrices(data)
      }
    }),
    [updateSocketMsg, dispatch]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connect = useCallback(() => socketConnect(socketEventListener), [])
  const disconnect = useCallback(() => socketDisconnect(), [])

  return { connect, disconnect }
}

export const useGameEngineData = (dataProcessor) => {
  const socketMsg = useAtomValue(socketMsgAtom)

  const data = useMemo(() => {
    if (dataProcessor && socketMsg.msg) {
      return dataProcessor(socketMsg.msg)
    } else {
      return undefined
    }
  }, [dataProcessor, socketMsg.msg])

  return { ...socketMsg, data }
}
