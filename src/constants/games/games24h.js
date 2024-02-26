import ms from 'ms.macro'
import { icons } from 'common'
import { DEFAULT_GAME_PARAMETERS } from './gameDefaultParams'
import { GAME_TYPES } from './gameTypes'

const DEFAULT_GAME_24HRS_PARAMETERS = {
  ...DEFAULT_GAME_PARAMETERS,
  gameType: GAME_TYPES.G_24HR,
  roundLength: ms`24h`,
  gameRoundStartPeriod: ms`24h`,
  gameTypeLabel: 'DAY',
  gameRoundLengthLabel: '24 hrs'
}

export const GAMES_24HRS_PARAMETERS = {
  ETH_USD_86400: {
    ...DEFAULT_GAME_24HRS_PARAMETERS,
    gId: 'ETH_USD_86400',
    gameLabel: 'ETH/USD',
    marketSymbol: 'ETH-USD',
    asset: 'Ether',
    icon: icons.eth_icon,
    iconProps: { collection: 'crypto', name: 'ethereum' },
    tokenColor: '#87BBFA',
    brightness: 'brightness(30%)',
    isNew: true
  },
  SPY_USD_23400: {
    ...DEFAULT_GAME_24HRS_PARAMETERS,
    gId: 'SPY_USD_23400',
    gameLabel: 'SPY/USD',
    marketSymbol: 'SPY',
    asset: 'SPY',
    icon: icons.spy_icon,
    iconProps: { collection: 'crypto', name: 'spy_icon' },
    tokenColor: '#4ea686',

    brightness: 'brightness(30%)',
    isNew: true,
    roundLength: ms`6.5h`,
    gameRoundLengthLabel: '6.5 hrs',
    liveTileBackgroundColor: 'linear-gradient(38deg, rgb(19,169,108) 0%, rgb(12,111,71) 88%)'
  },

  //this game should be removed since it is only for develop
  ETH_USD_864: {
    ...DEFAULT_GAME_24HRS_PARAMETERS,
    gId: 'ETH_USD_86400',
    gameLabel: 'ETH/USD24',
    marketSymbol: 'ETH-USD',
    asset: 'Ether',
    icon: icons.eth_icon,
    iconProps: { collection: 'crypto', name: 'ethereum' },
    tokenColor: '#009900',
    brightness: 'brightness(30%)',
    isNew: true
  }
}
