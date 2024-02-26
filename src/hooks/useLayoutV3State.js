import { GAME_TYPES } from 'constants/games/gameTypes'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const INIT_STATE = {
  currentGame: GAME_TYPES.G_NONE,
  isOpenLeftPanel: false,
  isOpenRightPanel: false,
  hideRightPanel: true
}

const layoutV3StateAtom = atom(INIT_STATE)
const setPanelAtom = atom(null, (get, set, { panel, isOpen }) => {
  console.log()
  set(layoutV3StateAtom, (prev) => ({
    ...prev,
    isOpenLeftPanel: panel === 'left' ? isOpen : prev.isOpenLeftPanel,
    isOpenRightPanel: panel === 'right' ? isOpen : prev.isOpenRightPanel
  }))
})
const setCurrentGameAtom = atom(null, (get, set, gameType) => {
  set(layoutV3StateAtom, (prev) => {
    switch (gameType) {
      case GAME_TYPES.G_3MIN:
        return {
          currentGame: gameType,
          isOpenLeftPanel: false,
          isOpenRightPanel: false,
          hideRightPanel: true
        }
      case GAME_TYPES.G_24HR:
        return {
          currentGame: gameType,
          isOpenLeftPanel: false,
          isOpenRightPanel: false,
          hideRightPanel: true
        }
      case GAME_TYPES.G_LVG:
        return {
          currentGame: gameType,
          isOpenLeftPanel: true,
          isOpenRightPanel: true,
          hideRightPanel: false
        }
      default:
        return {
          currentGame: GAME_TYPES.G_NONE,
          isOpenLeftPanel: false,
          isOpenRightPanel: false,
          hideRightPanel: true
        }
    }
  })
})

export const useLayoutV3State = () => {
  const history = useHistory()
  const state = useAtomValue(layoutV3StateAtom)
  const setPanel = useSetAtom(setPanelAtom)
  const setActiveGame = useSetAtom(setCurrentGameAtom)

  const setOpenRightPanel = useCallback((isOpen) => setPanel({ panel: 'right', isOpen }), [setPanel])
  const setOpenLeftPanel = useCallback((isOpen) => setPanel({ panel: 'left', isOpen }), [setPanel])
  const setCurrentGame = useCallback(
    (gameType) => {
      setActiveGame(gameType)
      if (gameType === GAME_TYPES.G_NONE) history.push(`/game`)
      else history.push(`/game?gametype=${gameType}`)
    },
    [setActiveGame, history]
  )

  return { ...state, setOpenLeftPanel, setOpenRightPanel, setCurrentGame }
}
