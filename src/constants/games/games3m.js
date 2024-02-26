import ms from 'ms.macro'
import { icons } from 'common'
import { DEFAULT_GAME_PARAMETERS } from './gameDefaultParams'
import { GAME_TYPES } from './gameTypes'
import { STOCK_MARKET_TIME } from 'constants/assets'

const DEFAULT_GAME_3MINS_PARAMETERS = {
  ...DEFAULT_GAME_PARAMETERS,
  gameType: GAME_TYPES.G_3MIN,
  roundLength: ms`3m`,
  gameRoundStartPeriod: ms`3m`,
  gameTypeLabel: '3 min',
  gameRoundLengthLabel: '3 min'
}

export const GAMES_3MINS_PARAMETERS = {
  ETH_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'ETH_USD_70',
    gameLabel: 'ETH/USD',
    marketSymbol: 'ETH-USD',
    asset: 'Ether',
    icon: icons.eth_icon,
    iconProps: { collection: 'crypto', name: 'ethereumHole' },
    tokenColor: '#87BBFA',
    brightness: 'brightness(30%)'
  },
  MATIC_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'MATIC_USD_70',
    gameLabel: 'MATIC/USD',
    marketSymbol: 'MATIC-USD',
    asset: 'Matic',
    icon: icons.MaticIcon,
    iconProps: { collection: 'crypto', name: 'maticHole' },
    tokenColor: '#8247E5',
    Brightness: 'brightness(30%)',
    FIAT_DECIMAL_SHOW_DIGITS: 5
  },
  BTC_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'BTC_USD_70',
    gameLabel: 'BTC/USD',
    marketSymbol: 'BTC-USD',
    asset: 'Bitcoin',
    icon: icons.btc_icon,
    iconProps: { collection: 'crypto', name: 'bitcoin' },
    tokenColor: '#F7931A',
    Brightness: 'brightness(30%)'
  },
  TSLA_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'TSLA_USD_70',
    gameLabel: 'TSLA/USD',
    marketSymbol: 'TSLA-USD',
    asset: 'Tesla',
    icon: icons.tesla_icon,
    iconProps: { collection: 'crypto', name: 'tesla_icon_hole' },
    tokenColor: '#E81E24',
    brightness: 'brightness(30%)',
    hasGameHours: true,
    openTimeUtc: STOCK_MARKET_TIME.openTimeUtc,
    closeTimeUtc: STOCK_MARKET_TIME.closeTimeUtc,
    name: 'Tesla'
  },
  DOGE_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'DOGE_USD_70',
    gameLabel: 'DOGE/USD',
    marketSymbol: 'DOGE-USD',
    asset: 'DogeCoin',
    icon: icons.doge_icon,
    iconProps: { collection: 'crypto', name: 'doge' },
    tokenColor: '#FFB303',
    brightness: 'brightness(30%)',
    FIAT_DECIMAL_SHOW_DIGITS: 5
  },
  GME_USD_70: {
    ...DEFAULT_GAME_3MINS_PARAMETERS,
    gId: 'GME_USD_70',
    gameLabel: 'GME/USD',
    marketSymbol: 'GME-USD',
    asset: 'Gamestop',
    icon: icons.GameStopIcon,
    iconProps: { collection: 'crypto', name: 'gameStop' },
    tokenColor: '#FC0000',
    Brightness: 'brightness(30%)',
    hasGameHours: true,
    openTimeUtc: STOCK_MARKET_TIME.openTimeUtc,
    closeTimeUtc: STOCK_MARKET_TIME.closeTimeUtc,
    name: 'Game Stop'
  }
}
