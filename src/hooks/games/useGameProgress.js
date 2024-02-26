import { useCallback } from 'react'
import { useInterval } from 'react-interval-hook'
import { atom, useAtom, useAtomValue } from 'jotai'
import { map, isEmpty } from 'lodash'
import ms from 'ms'

import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveGamesList } from 'hooks/gameEngine/useLiveRoundData'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

const MIN_DURATION = 0

const GAMES_PROGRESS_STATE_INIT = {
  error: false,
  gameDuration: 0,
  progress: 0,
  msTimePassed: 0,
  msTimeLeft: ms(`180s`),
  blocksPassed: 0,
  blocksLeft: 70
}

const gameProgressAtom = atom({})
const setGameProgressAtom = atom(null, (get, set, update) => {
  set(gameProgressAtom, (prev) => ({ ...prev, ...update }))
})

const useUpdateLiveGamesProgress = () => {
  const [, setGameProgress] = useAtom(setGameProgressAtom)
  const { liveRoundsData } = useLiveGamesList()

  const updateGamesProgress = useCallback(() => {
    if (isEmpty(liveRoundsData)) return
    const gamesProgress = map(liveRoundsData, (gameData, gameId, obj) => {
      const { roundLength, gameRoundStartPeriod } = getGameParameters(gameId)
      const { startTime: startEpoch } = gameData
      const startTime = ms(`${startEpoch}s`)
      const endTime = startTime + roundLength
      const currentTime = Date.now()

      const percentageProgressCursor = ((currentTime - startTime) / roundLength) * 100
      const progress = Math.min(Math.max(percentageProgressCursor, 0), 100)
      const msTimePassed = Math.min(currentTime - startTime, roundLength)
      const msTimeLeft = Math.max(endTime - currentTime, MIN_DURATION)
      const msStartsIn = Math.max(startTime + gameRoundStartPeriod - currentTime, 0)

      const progressData = {
        [gameId]: {
          error: false,
          gameDuration: roundLength,
          gamePeriod: gameRoundStartPeriod,
          progress,
          msTimePassed,
          msTimeLeft,
          msStartsIn
        }
      }
      return progressData
    })

    const statePayload = gamesProgress.reduce((payload, item) => ({ ...payload, ...item }), {})
    setGameProgress(statePayload)
  }, [liveRoundsData, setGameProgress])

  return updateGamesProgress
}

export const GamesProgressUpdater = () => {
  const updateGamesProgress = useUpdateLiveGamesProgress()
  useIntervalWhen(updateGamesProgress, 1000, true, false)
  return null
}

export const useGameProgress = (gameIdentifier, cardRoundOffset) => {
  const gameProgress = useAtomValue(gameProgressAtom)
  const { activeGameId } = useActiveGameData()
  const gId = gameIdentifier || activeGameId
  return gameProgress[gId] || GAMES_PROGRESS_STATE_INIT
}
