import { Zero, One } from '@ethersproject/constants'

export const getPayouts = (partialArray) => {
  const total = partialArray.reduce((total, value) => total + value, 0)
  const payouts = partialArray.map((value) => Number((total / value || 0).toFixed(2)))
  return payouts
}

export const getPayoutsFactorBN2 = (partialArrayBN, fee = 3) => {
  console.log(
    'ACZ partialArrayBN --->',
    partialArrayBN.map((i) => i.toString())
  )
  const totalBN = partialArrayBN.reduce((totalBN, valueBN) => totalBN.add(valueBN), Zero)
  const levelPayoutBasisPointsBN = partialArrayBN.map((levelValueBN) => {
    const levelAmountAllocatedBN = totalBN.sub(levelValueBN).mul(1 - fee)
    const levelPayoutBasisPointsBN = levelValueBN.isZero()
      ? One
      : levelAmountAllocatedBN.isZero()
      ? One
      : One.div(levelValueBN.mul(levelAmountAllocatedBN))
    return levelPayoutBasisPointsBN
  })
  return levelPayoutBasisPointsBN
}

export const getPayoutsFactorBN = (totalBucketsBN) => {
  const totalBN = Object.values(totalBucketsBN).reduce((totalBN, valueBN) => totalBN.add(valueBN), Zero)
  const bucketsPayoutFactorBN = totalBucketsBN.map((totalLevelAmountBN, level) => {
    if (totalLevelAmountBN.isZero()) return One.mul(10000)
    const levelAmountAllocatedBN = totalBN.sub(totalLevelAmountBN).mul(97).div(100)
    if (levelAmountAllocatedBN.isZero()) return One.mul(10000)
    const factorBN = levelAmountAllocatedBN.mul(10000).div(totalLevelAmountBN)
    return factorBN
  })
  return bucketsPayoutFactorBN
}

/* Calculation formula
Yog
l1 - Total level amount in level 1
bid1 - my bid in level 1
total = l1 + l2 + l3 + l4 + l5
level 1 wins
total amount allocated for level 1
level1WinningAmount = (total-l1) * 0.97 (editado) 
myWinningAmount = (bid1/l1) * level1WinningAMount (editado) 
*/
