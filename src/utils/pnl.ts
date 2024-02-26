const SIDE_DICT = {
  buy: 'buy',
  sell: 'sell',
  up: 'buy',
  down: 'sell'
}

const getFeeRate = (entryPr: number, exitPr: number): number => {
  return 0.1
}

export const getPnL = (entryPrice: number, exitPrice: number, side: keyof typeof SIDE_DICT, qty: number): number => {
  let result
  if (SIDE_DICT[side] === 'buy') {
    //ACZ create a const for this
    if (exitPrice <= entryPrice) {
      result = exitPrice - entryPrice
    } else {
      const rate = getFeeRate(entryPrice, exitPrice)
      result = (1 - rate) * (exitPrice - entryPrice)
    }
  } else if (SIDE_DICT[side] === 'sell') {
    //ACZ create a const for this
    if (exitPrice >= entryPrice) {
      result = entryPrice - exitPrice
    } else {
      const rate = getFeeRate(entryPrice, exitPrice)
      result = (1 - rate) * (entryPrice - exitPrice)
    }
  } else {
    throw new Error('pnl side is unspecified')
  }

  return result * qty
}
