import UAuth from '@uauth/js'
import { UAuthConnector } from '@uauth/web3-react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { config } from 'config'
import { NETWORK_RPC_URLS } from 'constants/chainInfo'
import { ALL_SUPPORTED_CHAIN_IDS, SUPPORTED_CHAIN_ID } from 'constants/chains'

import YOLOREKT_LOGO_URL from 'assets/logo/yolorekt_logo_blue.svg'

export const network = new NetworkConnector({
  urls: NETWORK_RPC_URLS,
  defaultChainId: config.DEFAULT_CHAIN_ID
})

export const injected = new InjectedConnector({
  SUPPORTED_CHAIN_IDs: ALL_SUPPORTED_CHAIN_IDS
})

export const walletconnect = new WalletConnectConnector({
  rpc: NETWORK_RPC_URLS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  SUPPORTED_CHAIN_IDs: ALL_SUPPORTED_CHAIN_IDS,
  pollingInterval: 12_000
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_RPC_URLS[SUPPORTED_CHAIN_ID.POLYGON],
  appName: 'Yolorekt',
  appLogoUrl: YOLOREKT_LOGO_URL,
  SUPPORTED_CHAIN_IDs: ALL_SUPPORTED_CHAIN_IDS
})

export const uauth = new UAuthConnector({
  uauth: new UAuth({
    clientID: process.env.REACT_APP_UNSTOPPABLE_ID,
    clientSecret: process.env.REACT_APP_UNSTOPPABLE_SECRET,
    redirectUri: process.env.REACT_APP_UNSTOPPABLE_REDIRECT_URI,
    scope: 'openid wallet'
  }),
  connectors: { injected, walletconnect }
})

//postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
