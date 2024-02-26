import { getGameParameters } from 'constants/games'
import { useCallback } from 'react'

import { atom, useAtom } from 'jotai'
import { getWeb3Utils } from 'utils'
import { useCustomEventListener } from 'react-custom-events'
import { EVENTS } from 'constants/index'
import { useLiveGamesList } from 'hooks/gameEngine/useLiveRoundData'

const ACTIVE_GAME_DATA_INIT = {
  activeGameId: '',
  activeGameHexId: '', //getWeb3Utils().soliditySha3(DEFAULT_GAME_ID),
  activeGameType: '',
  activeCardRoundOffset: 0,
  activeCardRoundIndex: 0,
  activePanel: 'game'
}

const activeGameAtom = atom(ACTIVE_GAME_DATA_INIT)

export const useActiveGameData = () => {
  const [state, setState] = useAtom(activeGameAtom)
  const { liveRoundsData } = useLiveGamesList()

  const setActiveGame = useCallback(
    ({ gameId, activeCardRoundOffset = 0 }) => {
      if (!gameId) return
      const activeGameHexId = getWeb3Utils().soliditySha3(gameId)
      const gameIdRoundIndex = liveRoundsData?.[gameId]?.roundIndex || 0
      const activeCardRoundIndex = gameIdRoundIndex ? Number(gameIdRoundIndex) + activeCardRoundOffset : 0
      const activeGameType = getGameParameters(gameId).gameType
      const statePayload = {
        activeGameId: gameId,
        activeGameHexId,
        activeGameType,
        activeCardRoundOffset,
        activeCardRoundIndex
      }
      setState((prev) => ({ ...prev, ...statePayload }))
    },
    [liveRoundsData, setState]
  )

  const updateActiveGame = useCallback(
    (gameId, newRoundIndex) => {
      const { activeGameId, activeCardRoundOffset, activeCardRoundIndex: ll } = state
      if (!activeGameId) return
      if (activeGameId !== gameId) return
      const activeCardRoundIndex = newRoundIndex ? Number(newRoundIndex) + activeCardRoundOffset : 0
      const statePayload = {
        activeCardRoundIndex
      }
      setState((prev) => ({ ...prev, ...statePayload }))
    },
    [setState, state]
  )

  const bidOnNext = () => {
    const activeGameId = state.activeGameId
    const activeCardRoundOffset = 1
    setActiveGame({ activeGameId, activeCardRoundOffset })
  }

  const setActivePanel = (panelId) => {
    setState((prev) => ({ ...prev, activePanel: panelId }))
  }

  // useCustomEventListener(EVENTS.ADMIN_FIRST_MESSAGE, (msg) => {
  //   updateActiveGame()
  // })

  return { ...state, setActiveGame, bidOnNext, setActivePanel, updateActiveGame }
}
