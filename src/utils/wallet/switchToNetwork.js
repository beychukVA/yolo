import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { CHAIN_INFO } from 'constants/chainInfo'

function getRpcUrls(chainId) {
  const rpcUrl = CHAIN_INFO[chainId]?.rpcUrl
  if (rpcUrl) return [rpcUrl]
  throw new Error('RPC URLs must be defined')
}

// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ library, chainId }) {
  if (!library?.provider?.request) {
    return
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())
  try {
    await library.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }]
    })
  } catch (error) {
    // 4902 is the error code for attempting to switch to an unrecognized/not added chainId
    if (error.code === 4902) {
      const info = CHAIN_INFO[chainId]

      await library.provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: formattedChainId,
            chainName: info.label,
            rpcUrls: getRpcUrls(chainId),
            nativeCurrency: info.nativeCurrency,
            blockExplorerUrls: [info.explorer]
          }
        ]
      })

      // this call is here because metamask it the only that switch automatically after a network is added
      try {
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }]
        })
      } catch (error) {
        console.debug('Added network but could not switch chains', error)
      }
    } else {
      throw error
    }
  }
}
