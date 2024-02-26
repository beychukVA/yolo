import { icons } from 'common'
import { STOCK_MARKET_TIME } from 'constants/assets'
import { CARDS_ROUND_OFFSET } from 'constants/games'
import ms from 'ms.macro'
import { getSmartContractsInfo } from './smartContracts.config'

export const DEFAULT_GAME_ID_ACZ = 'ETH_USD_70'

export const CARDS_ROUND_OFFSET_ACZ = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

const defaultGameParameters = {
  FIAT_DECIMAL_SHOW_DIGITS: 2,
  FIAT_MAX_DECIMALS_DIGITS: 1000000,
  GAME_BLOCK_LENGTH: 70,
  PRICE_GRAPH_RESOLUTION: 125,
  AVRG_BLOCK_MINT_TIME: ms`2.5s`,
  LIVE_ROUND_FLASH_TIME: ms`15s`,
  ROUND_ALMOST_END_TIME: ms`2s`,
  FEE: 0.03,
  hasGameHours: false,
  roundLength: ms`3m`
}

const GAMES_PARAMETERS = {
  ETH_USD_70: {
    ...defaultGameParameters,
    gId: 'ETH_USD_70',
    gameLabel: 'ETH/USD',
    asset: 'Ether',
    icon: icons.eth_icon,
    iconProps: { collection: 'crypto', name: 'ethereum' },
    tokenColor: '#87BBFA',
    brightness: 'brightness(30%)'
  },
  DOGE_USD_70: {
    ...defaultGameParameters,
    gId: 'DOGE_USD_70',
    gameLabel: 'DOGE/USD',
    asset: 'DogeCoin',
    icon: icons.doge_icon,
    iconProps: { collection: 'crypto', name: 'doge' },
    tokenColor: '#FFB303',
    brightness: 'brightness(30%)',
    FIAT_DECIMAL_SHOW_DIGITS: 5
  },
  TSLA_USD_70: {
    ...defaultGameParameters,
    gId: 'TSLA_USD_70',
    gameLabel: 'TSLA/USD',
    asset: 'Tesla',
    icon: icons.tesla_icon,
    iconProps: { collection: 'crypto', name: 'tsla' },
    tokenColor: '#E81E24',
    brightness: 'brightness(30%)',
    hasGameHours: true,
    openTimeUtc: STOCK_MARKET_TIME.openTimeUtc,
    closeTimeUtc: STOCK_MARKET_TIME.closeTimeUtc,
    name: 'Tesla'
  },
  MATIC_USD_70: {
    ...defaultGameParameters,
    gId: 'MATIC_USD_70',
    gameLabel: 'MATIC/USD',
    asset: 'Matic',
    icon: icons.MaticIcon,
    iconProps: { collection: 'crypto', name: 'maticHole' },
    tokenColor: '#8247E5',
    Brightness: 'brightness(30%)',
    FIAT_DECIMAL_SHOW_DIGITS: 5
  },
  GME_USD_70: {
    ...defaultGameParameters,
    gId: 'GME_USD_70',
    gameLabel: 'GME/USD',
    asset: 'Gamestop',
    icon: icons.GameStopIcon,
    iconProps: { collection: 'crypto', name: 'gameStop' },
    tokenColor: '#FC0000',
    Brightness: 'brightness(30%)',
    hasGameHours: true,
    openTimeUtc: STOCK_MARKET_TIME.openTimeUtc,
    closeTimeUtc: STOCK_MARKET_TIME.closeTimeUtc,
    name: 'Game Stop'
  },
  BTC_USD_70: {
    ...defaultGameParameters,
    gId: 'BTC_USD_70',
    gameLabel: 'BTC/USD',
    asset: 'Bitcoin',
    icon: icons.btc_icon,
    iconProps: {
      collection: 'crypto',
      name: 'bitcoinMask'
    },
    tokenColor: '#F7931A',
    Brightness: 'brightness(30%)'
  }
}

export const getRegisteredGameIdListACZ = () => Object.keys(GAMES_PARAMETERS)

export const getGameParametersACZ = (gameId) => {
  if (!gameId) return defaultGameParameters
  const gameParameter = GAMES_PARAMETERS[gameId]
  if (gameParameter) {
    const [gameContract] = getSmartContractsInfo([gameId]) || {}
    const cardsRoundOffset = CARDS_ROUND_OFFSET
    Object.assign(gameParameter, { gameContract, cardsRoundOffset })
    return gameParameter
  }
}
