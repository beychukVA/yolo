import { YOLO } from 'constants/index'
import { config } from 'config'

export const HARD_CURRENCY = {
  YOLO: { network: 'Polygon', currentPrice: 0.035, symbol: 'yolo' },
  ETH: { network: 'Polygon', currentPrice: 3500, symbol: 'eth' }
}
export const walletInitialState = {
  approvedNetworkIds: config.APPROVED_CHAINS_IDS,
  connectionStatus: 'idle',
  isConnected: false,
  chainInfo: null,
  providerInfo: {},
  pendingTxStatus: 'idle',
  pendingTxHashes: [],
  txs: {},
  addressStatus: 'idle',
  address: '',
  nftStatus: 'idle',
  hasNFT: null,
  claimExpirationTime: null,
  waitlistInfo: {},
  yoloEarningStatus: 'idle',
  yoloEarnings: null
}
