import { SUPPORTED_CHAIN_ID } from './chains'

export const NETWORK_RPC_URLS = {
  [SUPPORTED_CHAIN_ID.POLYGON]: process.env.REACT_APP_RPC_POLYGON || 'https://polygon-rpc.com/', // || 'https://nodes.yolorekt.finance',
  [SUPPORTED_CHAIN_ID.POLYGON_MUMBAI]:
    process.env.REACT_APP_RPC_POLYGON_MUMBAI || 'https://matic-mumbai.chainstacklabs.com'
}

export const CHAIN_INFO = {
  [SUPPORTED_CHAIN_ID.POLYGON]: {
    chainId: 137,
    network: 'Polygon',
    label: 'Polygon',
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    explorerTxTemplate: 'https://polygonscan.com/tx/[hashAddress]',
    explorerAddressTemplate: 'https://polygonscan.com/address/[hashAddress]',
    background: '#9A71E4',
    border: 'rgba(91,47,169,1.0)',
    logoProps: { collection: 'crypto', name: 'polygon' },
    rpcUrl: 'https://polygon-rpc.com/',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 }
  },
  [SUPPORTED_CHAIN_ID.POLYGON_MUMBAI]: {
    chainId: 80001,
    network: 'Polygon',
    label: 'Polygon Mumbai',
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    explorerTxTemplate: 'https://mumbai.polygonscan.com/tx/[hashAddress]',
    explorerAddressTemplate: 'https://mumbai.polygonscan.com/address/[hashAddress]',
    background: '#9A71E4',
    border: 'rgba(91,47,169,1.0)',
    logoProps: { collection: 'crypto', name: 'polygon' },
    rpcUrl: 'https://rpc-endpoints.superfluid.dev/mumbai',
    nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 }
  }
}
