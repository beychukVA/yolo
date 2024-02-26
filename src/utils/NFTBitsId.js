import { BigNumber } from '@ethersproject/bignumber'
import { HashZero, Two } from '@ethersproject/constants'

const NON_FUNGIBLE_FLAG = Two.pow(255)
const SEMI_FUNGIBLE_FLAG = NON_FUNGIBLE_FLAG.add(Two.pow(254))
const ONE_LEVEL = Two.pow(128)

export const getNftTokenBaseId = (id) => {
  if (!id) return BigNumber.from(HashZero)
  const isBigNumber = BigNumber.isBigNumber(id)
  if (isBigNumber) {
    if (id.isZero()) {
      return SEMI_FUNGIBLE_FLAG
    }
    const tokenNumber = id.mask(127)
    return id.sub(tokenNumber)
  }
  return BigNumber.from(HashZero)
}

export const getLevelId = (id) => {
  if (!id) return undefined
  const isBigNumber = BigNumber.isBigNumber(id)
  if (isBigNumber) {
    if (id.isZero()) return 0
    const idBin = id.toBigInt().toString(2)
    const levelIdDec = parseInt(idBin.slice(2, 128), 2)
    return levelIdDec
  }
  return undefined
}

export const getNextNftTokenBaseId = (baseId) => {
  if (!baseId) return undefined
  const isBigNumber = BigNumber.isBigNumber(baseId)
  if (isBigNumber) {
    return baseId.add(ONE_LEVEL)
  }
  return BigNumber.from(HashZero)
}
