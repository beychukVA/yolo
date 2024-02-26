import { ASSETS, ASSETS_TYPES } from 'constants/assets'
import { PRICE_FEED_SYMBOLS_DICT } from 'constants/marketSymbols'

const DEFAULT_ASSET_PARAM = { minimumBidAmount: 15, maximumBidAmount: 10000, leverageRange: { min: 1, max: 100 } }

const ASSETS_TYPES_PARAMS = {
  [ASSETS_TYPES.CRYPTO]: { minimumBidAmount: 15, maximumBidAmount: 30000, leverageRange: { min: 1, max: 1000 } },
  [ASSETS_TYPES.STOCK]: { minimumBidAmount: 15, maximumBidAmount: 50000, leverageRange: { min: 1, max: 1000 } },
  [ASSETS_TYPES.ETF]: { minimumBidAmount: 15, maximumBidAmount: 50000, leverageRange: { min: 1, max: 1000 } }
}

// We use the marketSymbol as key
const LVG_ASSETS_PARAMS = {
  [PRICE_FEED_SYMBOLS_DICT['ETH/USD']]: {
    minimumBidAmount: 20
  },
  [PRICE_FEED_SYMBOLS_DICT['BTC/USD']]: {},
  [PRICE_FEED_SYMBOLS_DICT['BBBY']]: {
    bidSideConstrain: 'down'
  },
  [PRICE_FEED_SYMBOLS_DICT['AMC']]: {
    bidSideConstrain: 'down'
  },
  [PRICE_FEED_SYMBOLS_DICT['GME']]: {
    bidSideConstrain: 'down'
  }
}

export const LVG_ASSETS = ASSETS.filter((asset) => asset.games.includes('LVG')).map((asset) => {
  return {
    ...asset,
    ...DEFAULT_ASSET_PARAM,
    ...ASSETS_TYPES_PARAMS?.[asset.type],
    ...LVG_ASSETS_PARAMS?.[asset.priceFeedSymbol]
  }
})

export const LVG_ASSETS_TYPES = [...new Set(LVG_ASSETS.map((asset) => asset.type))]
