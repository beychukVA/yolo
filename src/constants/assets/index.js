import { ASSETS_TYPES } from './assetsTypes'
import { CRYPTO } from './crypto'
import { ETF } from './etf'
import { STOCKS } from './stocks'

export { ASSETS_TYPES }

export const STOCK_MARKET_TIME = {
  openTimeUtc: '14:30',
  closeTimeUtc: '20:55'
}

export const STOCK_MARKET_DAYS_OFF = [
  {
    dateObj: { month: 2, day: 20 },
    reason: `Due to Presidents' Day, stocks are currently closed for trading. The markets will be open this week from Tuesday - Friday from ${STOCK_MARKET_TIME.openTimeUtc} UTC to  ${STOCK_MARKET_TIME.closeTimeUtc} UTC.`
  }
]

export const ASSETS = [...CRYPTO, ...ETF, ...STOCKS]
