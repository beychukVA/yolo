import { LONG_DASH } from 'constants/index'
import { useConvertAmount } from 'utils/hooks'
import { trimString } from 'utils'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'

const { DEFAULT_FIAT } = config

//TODO: this Hook should disappear in a future
export const useUnitConvert = (isUnit = true) => {
  const { tokenId, formatToken } = useToken()
  const convert = useConvertAmount()
  const toCrypto = (unitAmount) => (unitAmount && formatToken(unitAmount)) ?? 0

  const toCryptoAmount = (amountStr, currency) => {
    if (!isUnit) {
      return amountStr ? trimString(amountStr) + ' ' + currency || tokenId : LONG_DASH
    }
    const amountBN = BigNumber.from(amountStr)
    return amountStr ? trimString(isUnit ? toCrypto(amountBN) : amountStr) + ' ' + currency || tokenId : LONG_DASH
  }
  const toFiatAmount = (amountStr, currency) => {
    if (!isUnit) {
      return amountStr ? convert(amountStr, currency || tokenId, DEFAULT_FIAT) : LONG_DASH
    }
    const amountBN = BigNumber.from(amountStr)
    return amountStr ? convert(toCrypto(amountBN), currency || tokenId, DEFAULT_FIAT) : LONG_DASH
  }

  return { toCryptoAmount, toFiatAmount }
}
