import { SUPPORTED_CHAIN_ID } from './chains'

const FALLBACK_CHAIN_ID = SUPPORTED_CHAIN_ID.POLYGON

//Percentage Basic Points
const BASIS_PNT = {
  symbol: '',
  decimals: 4
}

const BASIS_POINT = {
  [SUPPORTED_CHAIN_ID.POLYGON]: BASIS_PNT
}

//USDC definition in different chains
const USDC_POLYGON = {
  symbol: 'USDC',
  decimals: 6 // token native decimals
}

const USDC = {
  [SUPPORTED_CHAIN_ID.POLYGON]: USDC_POLYGON
}

//YOLO definition in different chains
const YOLO_POLYGON = {
  symbol: 'YOLO',
  decimals: 18 // token native decimals
}
const YOLO = {
  [SUPPORTED_CHAIN_ID.POLYGON]: YOLO_POLYGON
}

//YLP definition in different chains
const YLP_POLYGON = {
  symbol: 'YLP',
  decimals: 18 // token native decimals
}
const YLP = {
  [SUPPORTED_CHAIN_ID.POLYGON]: YLP_POLYGON
}

export const getTokenInfo = (tokenId, chainId) =>
  ({ BASIS_POINT, USD: USDC, USDC, YOLO, YLP }?.[tokenId]?.[chainId || FALLBACK_CHAIN_ID] || undefined)
