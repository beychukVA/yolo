import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import { config } from 'config'

export default function getLibrary(provider) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  )
  library.pollingInterval = config.TX_PULLING_INTERVAL

  //TODO: ACZ --> Uncomment this when all is ported to Web3React
  //return library
  //TODO: ACZ --> remove this when all is ported to Web3React
  return { web3: new Web3(provider), library }
}
