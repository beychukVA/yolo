import { GAMES_24HRS_PARAMETERS } from './games24h'
import { GAMES_3MINS_PARAMETERS } from './games3m'

const GAMES_PARAMETERS = {
  ...GAMES_3MINS_PARAMETERS
  // ...GAMES_24HRS_PARAMETERS
}

export const REGISTERED_GAME_LIST = Object.keys(GAMES_PARAMETERS)
export const DEFAULT_GAMES = ['ETH_USD_70', 'ETH_USD_86400', 'TSLA_USD_70']
export const DEFAULT_GAME_ID = DEFAULT_GAMES[0]

export const CARDS_ROUND_OFFSET = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

export const getGameParameters = (gameId) => {
  if (!gameId) return {} //DEFAULT_GAME_PARAMETERS
  const gameParameter = GAMES_PARAMETERS[gameId]
  if (gameParameter) {
    const formattedDuration = gameParameter.gameRoundLengthLabel
    const cardsRoundOffset = CARDS_ROUND_OFFSET
    Object.assign(gameParameter, { cardsRoundOffset, formattedDuration })
    return gameParameter
  } else {
    return {}
  }
}
