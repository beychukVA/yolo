import './assets/css/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { useAtomsDevtools } from 'jotai/devtools'

import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { config } from 'config'
import { store } from 'redux/store'

import { ViewportProvider } from 'contexts/viewport/viewportContext'

import { Routes } from 'router'

import { themeSelector } from './themes'
import { NetworkContextName } from 'constants/misc'
import getLibrary from './utils/getLibrary'
import { Web3ReactManager } from 'components/Web3ReactManager'
import { GlobalStyle } from 'themes/globalStyle'
import Hotjar from '@hotjar/browser'
import { MobileWIP } from 'MobileWIP'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const siteId = 3098872
const hotjarVersion = 6

Hotjar.init(siteId, hotjarVersion)

if (config.DISABLED_CONSOLE_MSG) {
  console.log = () => {}
  console.warn = () => {}
  //console.error = () => {}
}

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const AtomsDevtools = ({ children }) => {
  useAtomsDevtools('yolorektAtoms')
  return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <ThemeProvider theme={themeSelector('steelMoon')}>
            <GlobalStyle />
            <ViewportProvider>
              <Web3ReactManager>
                <BrowserRouter>
                  <AtomsDevtools>
                    <Routes />
                  </AtomsDevtools>
                </BrowserRouter>
              </Web3ReactManager>
            </ViewportProvider>
          </ThemeProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
    <MobileWIP />
  </React.StrictMode>,
  document.getElementById('root')
)
