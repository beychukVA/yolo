import { getTokenInfo } from 'constants/tokens'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { config } from 'config'
import { useCallback } from 'react'
import { useUser } from 'hooks/user/useUser'

export const useToken = (tokenId = config.DEFAULT_TOKEN) => {
  const { chainId } = useUser('wallet')
  const tokenInfo = getTokenInfo(tokenId, chainId)

  const formatToken = useCallback(
    (amountBN, options) => {
      const opt = {
        floor: false,
        ...options
      }

      const units = +formatUnits(amountBN, tokenInfo?.decimals)

      if (opt.floor) return Math.floor(units * 100) / 100
      return units
    },
    [tokenInfo?.decimals]
  )

  const parseToken = useCallback(
    (amount) => {
      let parseAmount = amount
      if (typeof amount === 'number') {
        parseAmount = amount.toString()
      }
      return parseUnits(parseAmount, tokenInfo?.decimals)
    },
    [tokenInfo?.decimals]
  )

  return { tokenId, ...tokenInfo, formatToken, parseToken }
}
