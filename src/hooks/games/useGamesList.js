import { getGameParameters } from 'constants/games'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { isEqual, isEmpty } from 'lodash'
import { useCallback, useEffect } from 'react'
import { getIsGameOpen } from 'utils'
import { atomWithStorage } from 'jotai/utils'
import { GAMES_LIST_CACHED } from 'constants/index'
import { isMobile } from 'utils/userAgent'
import { usePrevious } from 'utils/hooks'
import { useLiveGamesList } from 'hooks/gameEngine/useLiveRoundData'

const LOCAL_STORAGE_VERSION = 2
const MIN_SELECTED_GAMES = 1
const MAX_SELECTED_GAMES = isMobile ? 2 : 3

const GAME_LIST_INIT = {
  version: LOCAL_STORAGE_VERSION,
  firstTimeLoad: true,
  gamesList: [],
  closedGamesList: [],
  sortedGamesList: [],
  selectedGames: [],
  showPastGames: true
}

const gamesDataAtom = atomWithStorage(GAMES_LIST_CACHED, GAME_LIST_INIT)
const updateGamesDataAtom = atom(null, (get, set, update) => {
  set(gamesDataAtom, (prev) => ({ ...prev, ...update }))
})

export const useGamesList = () => {
  const data = useLiveGamesList()
  const gamesListData = data?.gamesList || []
  const gamesData = useAtomValue(gamesDataAtom)
  const setGamesData = useSetAtom(updateGamesDataAtom)
  //Helpers functions
  const sortBy = useCallback(
    (field, direction) => {
      if (field === 'roundLength') {
        const sortedList = gamesListData.sort((gameIdA, gameIdB) => {
          const { roundLength: roundLengthA } = getGameParameters(gameIdA)
          const { roundLength: roundLengthB } = getGameParameters(gameIdB)
          if (roundLengthB > roundLengthA) return direction === 'asc' ? 1 : -1
          if (roundLengthB < roundLengthA) return direction === 'asc' ? -1 : 1
          return 0
        })
        setGamesData({ sortedGamesList: sortedList, sortedOptions: [field, direction] })
      }
      if (field === 'price') {
        const gamesWithCurrentPrices = data?.gamesWithCurrentPrices || []

        const sortedList = gamesWithCurrentPrices
          .sort((itemA, itemB) => {
            const priceA = itemA.currentPrice
            const priceB = itemB.currentPrice
            if (priceB > priceA) return direction === 'asc' ? 1 : -1
            if (priceB < priceA) return direction === 'asc' ? -1 : 1
            return 0
          })
          .map((items) => items.gameId)

        setGamesData({ sortedGamesList: sortedList, sortedOptions: [field, direction] })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gamesData, setGamesData]
  )

  const toggleShowPastGames = useCallback(
    () => setGamesData({ showPastGames: !gamesData.showPastGames }),
    [gamesData.showPastGames, setGamesData]
  )

  const toggleGameSelection = useCallback(
    (gameId) => {
      const prevSelectedGames = gamesData.selectedGames
      // remove from selected array
      if (prevSelectedGames.includes(gameId)) {
        //it needs to have at least one game in the list
        if (prevSelectedGames.length <= MIN_SELECTED_GAMES) return
        const newSelectedGames = prevSelectedGames.filter((item) => item !== gameId)
        setGamesData({ selectedGames: newSelectedGames })
      }
      // add to selected array
      else {
        let newSelectedGames = [...prevSelectedGames, gameId]
        if (newSelectedGames.length > MAX_SELECTED_GAMES) {
          setGamesData({ selectedGames: newSelectedGames.shift() })
        }
        setGamesData({ selectedGames: newSelectedGames })
      }
    },
    [setGamesData, gamesData.selectedGames]
  )

  //Effects
  useEffect(() => {
    if (gamesListData) {
      // Keeping Games List up to date
      const gamesListNeedsUpdate = !isEmpty(gamesListData) && !isEqual(gamesData.gamesList, gamesListData)
      // if (!gamesListNeedsUpdate) {
      //   if (gamesCounts.current >= 50 && gamesCounts.current <= 55) {
      //     // Toggle from selected list the off games
      //     gamesData.selectedGames.map((selectedGameId) => {
      //       if (!gamesListData.includes(selectedGameId)) {
      //         toggleGameSelection(selectedGameId)
      //       }
      //     })
      //     gamesCounts.current = 60
      //   }
      //   if (gamesCounts.current <= 55) {
      //     gamesCounts.current = gamesCounts.current + 1
      //   }
      // }
      if (gamesListNeedsUpdate) {
        setGamesData({ gamesList: gamesListData, sortedGamesList: gamesListData })
      }

      // Check if we need to  initialize the sorted game lists
      if (isEmpty(gamesData.sortedGamesList)) setGamesData({ sortedGamesList: gamesListData })

      // Check if we need to  initialize the selected game lists
      if (gamesData.firstTimeLoad) {
        if (gamesData.selectedGames.length < MAX_SELECTED_GAMES) {
          const definedGamesList = gamesListData.filter((gameId) => !isEmpty(getGameParameters(gameId)))
          setGamesData({ selectedGames: definedGamesList.slice(0, MAX_SELECTED_GAMES) })
          return
        }
        setGamesData({ firstTimeLoad: false })
      }

      // Check If there are some game closed
      const newClosedGamesList = gamesData.gamesList.filter((gameId) => {
        const { hasGameHours, openTimeUtc, closeTimeUtc } = getGameParameters(gameId)
        const isGameClosed = hasGameHours && !getIsGameOpen(openTimeUtc, closeTimeUtc)
        return isGameClosed
      })
      const closedGamesUpdate = !isEqual(gamesData.closedGamesList, newClosedGamesList)
      if (closedGamesUpdate) setGamesData({ closedGamesList: newClosedGamesList })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamesListData])

  return { ...gamesData, sortBy, toggleShowPastGames, toggleGameSelection }
}
