import { useWeb3React } from '@web3-react/core'
import { config } from 'config'
import { WALLET_TYPE } from 'constants/index'
import { CHAIN_INFO } from 'constants/chainInfo'

import { NetworkContextName } from '../constants/misc'
import { useSignInInfo } from './user/useSignInUpOut'
import { useUserUpdaters } from './user/useUser'

export function useActiveWeb3React(providerSelector) {
  const { signInInfo, isProxyWallet } = useSignInInfo()
  const interfaceContext = useWeb3React()
  const interfaceNetworkContext = useWeb3React(NetworkContextName)
  // console.log('ACZ interfaceContext __>', interfaceContext)

  if (signInInfo.walletType === WALLET_TYPE.PROXY) {
    if (interfaceContext.active) {
      interfaceContext.deactivate()
    }
    const library = interfaceNetworkContext.library?.[providerSelector || 'library']
    const chainId = signInInfo.chainId || config.DEFAULT_CHAIN_ID
    const account = signInInfo.account
    const chainInfo = CHAIN_INFO[signInInfo.chainId]
    window.yoloWeb3 = {
      ...library,
      yoloApp: {
        connectedWalletId: '',
        connector: ''
      }
    }
    return { ...interfaceNetworkContext, library, chainId, account, chainInfo, isProxyWallet }
  }

  if (interfaceContext.active) {
    //TODO: ACZ --> Uncomment this when all is ported to Web3React
    //return interfaceContext
    //TODO: ACZ --> remove this when all is ported to Web3React
    const library = interfaceContext.library?.[providerSelector || 'library']
    const chainId = interfaceContext.chainId || config.DEFAULT_CHAIN_ID
    const account = interfaceContext.account
    const chainInfo = CHAIN_INFO[interfaceContext.chainId]
    return { ...interfaceContext, library, chainId, account, chainInfo, isProxyWallet: false }
  }

  //TODO: ACZ --> Uncomment this when all is ported to Web3React
  //return interfaceNetworkContext
  //TODO: ACZ --> remove this when all is ported to Web3React
  const library = interfaceNetworkContext.library?.[providerSelector || 'library']
  const chainId = interfaceNetworkContext.chainId || config.DEFAULT_CHAIN_ID
  const account = interfaceNetworkContext.account
  const chainInfo = CHAIN_INFO[interfaceNetworkContext.chainId]

  return { ...interfaceNetworkContext, library, chainId, account, chainInfo, isProxyWallet: false }
}
