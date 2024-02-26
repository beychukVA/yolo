import { REGISTERED_GAME_LIST } from 'constants/games'

export const sortByRegisteredGameList = (gamesArrayList) =>
  [...gamesArrayList].sort((a, b) => {
    const indexA = REGISTERED_GAME_LIST.indexOf(a)
    const indexB = REGISTERED_GAME_LIST.indexOf(b)
    return indexA - indexB
  })
