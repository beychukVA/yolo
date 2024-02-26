import ms from 'ms.macro'

export * from './localStorageKeys'

//Default games
export const DEFAULT_GAMES = ['ETH_USD_70', 'MATIC_USD_70', 'TSLA_USD_70', 'DOGE_USD_70', 'BTC_USD_70']

//Timeouts
export const TIMEOUT = {
  BLOCKCHAIN_OFF: ms`1m`,
  MODAL_AUTO_CLOSE: ms`5s`,
  PAGE_REDIRECTION: ms`5s`
}
// Messages
export const MSG_TYPE = {
  USER: 'USER',
  ACTIVITY: 'ACTIVITY'
}

export const ACTIVITY_TYPE = {
  BID: 'BID',
  WIN: 'WIN'
}

export const WALLET_TYPE = {
  PROXY: 'proxy',
  EXTERNAL: 'external'
}

// Transactions
export const TX_TYPE = {
  BID: 'BID',
  USERNAME: 'USERNAME',
  APPROVE: 'APPROVE',
  WALLET_WITHDRAW: 'WALLET_WITHDRAW',
  CLAIM_NFT: 'CLAIM_NFT',
  UPGRADE_NFT: 'UPGRADE_NFT',
  CHECK_ALLOWANCE: 'CHECK_ALLOWANCE',
  GET_USERNAME: 'GET_USERNAME',
  GET_ADDRESS_TOKEN_BALANCE: 'GET_ADDRESS_TOKEN_BALANCE',
  GET_NFT_BALANCE: 'GET_NFT_BALANCE',
  GET_NFT_INDEX: 'GET_NFT_INDEX',
  GET_NFT_DATA: 'GET_NFT_DATA',
  YOLO_DEPOSIT: 'YOLO_DEPOSIT',
  YLP_WITHDRAW: 'YLP_WITHDRAW',
  YLP_STAKE: 'YLP_STAKE',
  YLP_UNSTAKE: 'YLP_UNSTAKE',
  YLP_HARVEST: 'YLP_HARVEST',
  CLAIM_EARNINGS: 'CLAIM_EARNINGS',
  XFT_CLAIM: 'XFT_CLAIM'
}

export const BALANCE_EVENT = {
  UPDATE_YLP: 'UPDATE_YLP',
  UPDATE_STAKED: 'UPDATE_STAKED',
  UPDATE_REWARDS: 'UPDATE_REWARDS'
}

// Tokens
export const YOLO = 'YOLO'
export const TOKEN = {
  ETH: 'ETH',
  MATIC: 'MATIC',
  YOLO: 'YOLO',
  YLP: 'YLP',
  USDC: 'USDC'
}

export const FIAT = {
  USD: 'USD',
  EUR: 'EUR'
}

// js unicode
export const LONG_DASH = '\u2014'

//GameData
export const LIVE_OFFSET = 0
export const YOUR_BIDS_ROUNDS_PERSISTANCE = 10

// GamePlay
export const UP = 'up'
export const DOWN = 'down'
export const WINNER = 'winner'
export const LOSER = 'loser'
export const PUSH = 'push'

// GameFee
export const GAME_FEE = 0.97

//TODO: ACZ unify this two STATUS and STATUS_ID
// Async status
export const ASYNC_STATUS_ID = {
  IDLE: 'idle',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  FAILED: 'failed',
  ERROR: 'error'
}

export const ASYNC_STATUS = {
  IDLE: { id: ASYNC_STATUS_ID.IDLE, message: '', code: '' },
  PENDING: { id: ASYNC_STATUS_ID.PENDING, message: '', code: '' },
  CONFIRMED: { id: ASYNC_STATUS_ID.CONFIRMED, message: '', code: '' },
  FAILED: { id: ASYNC_STATUS_ID.FAILED, message: '', code: '' },
  ERROR: { id: ASYNC_STATUS_ID.ERROR, message: '', code: '' }
}

export const LVG_ORDER_STATE = {
  PENDING: 'pending',
  LIVE: 'live',
  CLOSING: 'closing',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
  BUSTED: 'busted',
  ERROR: 'error'
}
export const PRICE_DIRECTION = {
  NEUTRAL: 'neutral',
  UP: 'up',
  DOWN: 'down'
}
