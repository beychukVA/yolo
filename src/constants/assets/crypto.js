import { icons } from 'common'
import { PRICE_FEED_SYMBOLS_DICT, TRADING_SYMBOLS_DICT, HISTORICAL_DATA_DICT } from 'constants/marketSymbols'
import { atom } from 'jotai'
import { ASSETS_TYPES } from './assetsTypes'

export const CRYPTO = [
  {
    id: 'BTC/USD',
    name: 'BTC/USD',
    coinSymbol: 'BTC',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['BTC/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['BTC/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['BTC/USD'],
    atom: atom({}),
    icon: icons.btc_icon,
    iconPng: icons.btc_icon_png,
    color: '#F7931A',
    fiatDecimals: 2,
    games: ['LVG']
  },
  {
    id: 'ETH/USD',
    name: 'ETH/USD',
    coinSymbol: 'ETH',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['ETH/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['ETH/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['ETH/USD'],
    atom: atom({}),
    icon: icons.eth_icon,
    iconPng: icons.eth_icon_png,
    color: '#87BBFA',
    fiatDecimals: 2,
    games: ['LVG']
  },
  {
    id: 'MATIC/USD',
    name: 'MATIC/USD',
    coinSymbol: 'MATIC',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['MATIC/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['MATIC/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['MATIC/USD'],
    atom: atom({}),
    icon: icons.matic_icon,
    iconPng: icons.matic_icon_png,
    color: '#8247E5',
    fiatDecimals: 5,
    games: []
  },
  {
    id: 'DOGE/USD',
    name: 'DOGE/USD',
    coinSymbol: 'DOGE',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['DOGE/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['DOGE/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['DOGE/USD'],
    atom: atom({}),
    icon: icons.doge_icon,
    iconPng: icons.doge_icon_png,
    color: '#FFB303',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'SOL/USD',
    name: 'SOL/USD',
    coinSymbol: 'SOL',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['SOL/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['SOL/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['SOL/USD'],
    atom: atom({}),
    icon: icons.sol_icon,
    iconPng: icons.sol_icon_png,
    color: '#B941F1',
    fiatDecimals: 2,
    games: ['LVG']
  },
  {
    id: 'TRX/USD',
    name: 'TRX/USD',
    coinSymbol: 'TRX',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['TRX/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['TRX/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['TRX/USD'],
    atom: atom({}),
    icon: icons.trx_icon,
    iconPng: icons.trx_icon_png,
    color: '#FF060A',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'LTC/USD',
    name: 'LTC/USD',
    coinSymbol: 'LTC',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['LTC/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['LTC/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['LTC/USD'],
    atom: atom({}),
    icon: icons.ltc_icon,
    iconPng: icons.ltc_icon_png,
    color: '#4534FF',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'XRP/USD',
    name: 'XRP/USD',
    coinSymbol: 'XRP',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['XRP/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['XRP/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['XRP/USD'],
    atom: atom({}),
    icon: icons.xrp_icon,
    iconPng: icons.xrp_icon_png,
    color: '#008CFF',
    fiatDecimals: 5,
    games: []
  },
  {
    id: 'LINK/USD',
    name: 'LINK/USD',
    coinSymbol: 'LINK',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['LINK/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['LINK/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['LINK/USD'],
    atom: atom({}),
    icon: icons.link_icon,
    iconPng: icons.link_icon_png,
    color: '#2A5ADA',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'ADA/USD',
    name: 'ADA/USD',
    coinSymbol: 'ADA',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['ADA/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['ADA/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['ADA/USD'],
    atom: atom({}),
    icon: icons.ada_icon,
    iconPng: icons.ada_icon_png,
    color: '#0033AD',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'DOT/USD',
    name: 'DOT/USD',
    coinSymbol: 'DOT',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['DOT/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['DOT/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['DOT/USD'],
    atom: atom({}),
    icon: icons.dot_icon,
    iconPng: icons.dot_icon_png,
    color: '#E6007B',
    fiatDecimals: 5,
    games: ['LVG']
  },
  {
    id: 'APE/USD',
    name: 'APE/USD',
    coinSymbol: 'APE',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['APE/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['APE/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['APE/USD'],
    atom: atom({}),
    icon: icons.ape_icon,
    iconPng: icons.ape_icon_png,
    color: '#0052F1',
    fiatDecimals: 5,
    games: []
  },
  {
    id: 'RLB/USD',
    name: 'RLB/USD',
    coinSymbol: 'RLB',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['RLB/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['RLB/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['RLB/USD'],
    atom: atom({}),
    icon: icons.rlb_icon,
    iconPng: icons.rlb_icon_png,
    color: '#FEA103',
    fiatDecimals: 5,
    games: []
  },
  {
    id: 'DYDX/USD',
    name: 'DYDX/USD',
    coinSymbol: 'DYDX',
    type: ASSETS_TYPES.CRYPTO,
    priceFeedSymbol: PRICE_FEED_SYMBOLS_DICT['DYDX/USD'],
    orderSymbol: TRADING_SYMBOLS_DICT['DYDX/USD'],
    aggregationSymbol: HISTORICAL_DATA_DICT['DYDX/USD'],
    atom: atom({}),
    icon: icons.dydx_icon,
    iconPng: icons.dydx_icon_png,
    color: '#6966FF',
    fiatDecimals: 5,
    games: []
  }
]