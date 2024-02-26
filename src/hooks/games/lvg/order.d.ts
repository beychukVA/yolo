export interface RawOrder {
  asset: string
  side: string
  amount: number
  leverage: number
  uuid: string
}

export interface LiveResponseOrder {
  userAddress: string
  orderId: string
  uuid: string
  side: string
  leverage: number
  entryPrice: number
  asset: string
  stopLoss?: number
  bustPrice: number
}

export interface CancelledResponseOrder {
  userAddress: string
  orderId: string
  asset: string
  uuid: string
  originalAmount: number
  side: string
  leverage: number
  entryPrice: number
}

export interface ClosedResponseOrder {
  userAddress: string
  orderId: string
  asset: string
  uuid: string
  originalAmount: number
  pnl: number
  isProfit: boolean
  side: string
  leverage: number
  entryPrice: number
  exitPrice: number
  bustPrice: number
}

export interface BustResponseOrder {
  userAddress: string
  orderId: string
  asset: string
  uuid: string
  originalAmount: number
  side: string
  leverage: number
  entryPrice: number
  bustPrice: number
}

export interface ErrorResponse {
  userAddress: string
  uuid?: string
  reason: string
  details?: string
}

export type PublicResponseOrder = BustResponseOrder | ClosedResponseOrder | CancelledResponseOrder | LiveResponseOrder
