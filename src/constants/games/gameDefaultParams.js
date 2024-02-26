import ms from 'ms.macro'

export const DEFAULT_GAME_PARAMETERS = {
  FIAT_DECIMAL_SHOW_DIGITS: 2,
  FIAT_MAX_DECIMALS_DIGITS: 1000000,
  GAME_BLOCK_LENGTH: 70,
  PRICE_GRAPH_RESOLUTION: 125,
  AVRG_BLOCK_MINT_TIME: ms`2.5s`,
  LIVE_ROUND_FLASH_TIME: ms`15s`,
  ROUND_ALMOST_END_TIME: ms`2s`,
  FEE: 0.03,
  hasGameHours: false,
  isNew: false,
  liveTileBackgroundColor: 'linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(42, 109, 255, 1) 88%)'
}
