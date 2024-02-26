import ms from 'ms.macro'
import { getMultiPoolData } from 'datasource/games/offChainBids.source'
import { useCallback, useMemo } from 'react'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { CARDS_ROUND_OFFSET } from 'constants/games'
import { useLiveGamesList } from 'hooks/gameEngine/useLiveRoundData'
import { map, isEmpty, isEqual } from 'lodash'
import { emitCustomEvent } from 'react-custom-events'
import { useUser } from 'hooks/user/useUser'

const POOL_UPDATE_INTERVAL = ms`5s`

export const GAME_POOL_INIT = {
  status: ASYNC_STATUS.IDLE,
  pools: {}
}

const multiRoundEndDetector = (liveRoundData, prevPool, newPool) => {
  map(liveRoundData, (roundData, gameId) => {
    if (isEmpty(prevPool)) return true
    if (!roundData.roundIndex) return true
    const lastRoundIndex = +roundData.roundIndex - 1
    const prevPoolArray = Object.keys(prevPool?.[gameId] || [])
    const newPoolArray = Object.keys(newPool?.[gameId] || [])
    if (isEmpty(prevPoolArray)) return true
    if (isEqual(prevPoolArray, newPoolArray)) return true
    if (+prevPoolArray[0] > +newPoolArray[0]) return true
    const lastGamePool = newPool[gameId][lastRoundIndex]
    const amIin = !isEmpty(lastGamePool.bids.myBids)
    // const pushed2 = !lastGamePool.players > 1
    const pushed = !lastGamePool?.bids?.othersBids?.length > 0
    if (amIin) {
      emitCustomEvent(EVENTS.ROUND_ENDED, {
        amIin,
        pushed,
        gameId,
        lastRoundIndex,
        lastGamePool
      })
      return
    }
  })
}

const gamesPoolsAtom = atom(GAME_POOL_INIT)
const updateGamePoolAtom = atom(null, (get, set, update) => {
  set(gamesPoolsAtom, (prev) => ({ ...prev, ...update }))
})

export const useGamePoolObserver = () => {
  const { account } = useUser('wallet')
  const gamePoolState = useAtomValue(gamesPoolsAtom)
  const updateGamePool = useSetAtom(updateGamePoolAtom)

  const { liveRoundsData } = useLiveGamesList()

  const queryObject = useMemo(() => {
    const gamesData = Object.keys(liveRoundsData).reduce(
      (obj, gameId) => [...obj, { gameId, liveRoundIndex: +liveRoundsData[gameId].roundIndex }],
      []
    )
    return {
      myAddress: account || '',
      roundsOffset: CARDS_ROUND_OFFSET,
      gamesData
    }
  }, [liveRoundsData, account])

  const UpdateGamesPool = useCallback(async () => {
    if (gamePoolState.status.id === ASYNC_STATUS_ID.PENDING) return
    updateGamePool({ status: ASYNC_STATUS.PENDING })
    getMultiPoolData(queryObject)
      .then((multiGamePool) => {
        multiRoundEndDetector(liveRoundsData, gamePoolState.pools, multiGamePool)
        updateGamePool({ status: ASYNC_STATUS.IDLE, pools: multiGamePool })
      })
      .catch((err) => {
        console.log('ACZ useGamePoolObserver err -->', err)
        updateGamePool({ status: ASYNC_STATUS.ERROR })
      })
  }, [queryObject, updateGamePool, liveRoundsData, gamePoolState?.pools, gamePoolState?.status?.id])

  useIntervalWhen(UpdateGamesPool, POOL_UPDATE_INTERVAL, !isEmpty(liveRoundsData), true)
}

export const useGamesPool = (dataProcessor) => {
  const { status, pools } = useAtomValue(gamesPoolsAtom)

  const data = useMemo(() => {
    if (dataProcessor && pools) {
      return dataProcessor(pools)
    } else {
      return null
    }
  }, [dataProcessor, pools])

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(() => hasStatus(ASYNC_STATUS_ID.PENDING), [hasStatus])

  return { status, pools, data, isLoading, hasStatus }
}

export const useGameRoundPool = (gameId, roundId) => {
  const { data, pools, ...rest } = useGamesPool((pools) => ({ gameRoundPool: pools[gameId]?.[roundId] }))
  return { ...rest, gameRoundPool: data.gameRoundPool || {} }
}
export const useGamePoolAllRounds = (gameId) => {
  const { data, pools, ...rest } = useGamesPool((pools) => ({ gameRoundPool: pools[gameId] }))
  return { ...rest, allGamePools: data.gameRoundPool || {} }
}
