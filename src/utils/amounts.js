import { UP, DOWN } from 'constants/index'
import { replaceAll } from './uiUtils'

export const potentialGain = (gamePool, fee, direction, tokenAmount = 0) => {
  //Payout Amount = Payout Ratio × Value Locked × (1 — Treasury Fee)
  let rawGain = 0
  let potentialPayout = 0
  let potentialPayoutStr = '0.00X'

  if (gamePool) {
    const totalPool = gamePool.up + gamePool.down
    const tokenAmountNumber = Number(typeof tokenAmount === 'string' ? replaceAll(tokenAmount, ',', '') : tokenAmount)

    if (!totalPool) {
      return {
        potentialRawGain: tokenAmountNumber,
        potentialPayout: '1.00X'
      }
    }

    let poolUp = gamePool.up
    let poolDown = gamePool.down

    if (tokenAmountNumber) {
      if (direction === UP) {
        poolUp += tokenAmountNumber
      } else if (direction === DOWN) {
        poolDown += tokenAmountNumber
      }
    }

    const totalPotentialPool = poolUp + poolDown
    if (direction === UP) {
      potentialPayout = (totalPotentialPool / poolUp) * (1 - fee) || 0
      rawGain = potentialPayout * tokenAmountNumber * (1 - fee)
    } else if (direction === DOWN) {
      potentialPayout = (totalPotentialPool / poolDown) * (1 - fee) || 0
      rawGain = potentialPayout * tokenAmountNumber * (1 - fee)
    }

    if (potentialPayout === Infinity) {
      potentialPayoutStr = 'MAX'
    } else {
      potentialPayoutStr = potentialPayout.toFixed(2) + 'X'
    }
  }
  return {
    potentialRawGain: rawGain,
    potentialPayout: potentialPayoutStr
  }
}
