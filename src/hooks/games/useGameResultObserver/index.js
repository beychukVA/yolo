import { useCallback, useEffect } from 'react'
import { useCustomEventListener } from 'react-custom-events'

import { EVENTS } from 'constants/events.js'
import { getGameParameters } from 'constants/games'
import { useG3minResultObserver } from './useG3minResultObserver'
import { useG24hrResultObserver } from './useG24hrResultObserver'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const useGameResultObserver = () => {
  const { amIaWinner3min } = useG3minResultObserver()
  const { amIaWinner24hr } = useG24hrResultObserver()

  const amIaWinner = useCallback(
    (roundEndedData) => {
      const { gameId } = roundEndedData
      const { gameType } = getGameParameters(gameId)
      return gameType === GAME_TYPES.G_3MIN ? amIaWinner3min(roundEndedData) : amIaWinner24hr(roundEndedData)
    },
    [amIaWinner3min, amIaWinner24hr]
  )

  //Load, remove indicator
  useEffect(() => {
    console.log('GameResult Observer: loaded')
    return () => {
      console.log('GameResult Observer: removed')
    }
  }, [])

  //CLAIM EARNING event listener
  useCustomEventListener(EVENTS.ROUND_ENDED, amIaWinner)
}
