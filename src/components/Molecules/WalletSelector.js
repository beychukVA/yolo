import React from 'react'
import styled from 'styled-components'

import { SUPPORTED_WALLETS } from 'constants/wallet'
import { getBrowser, isMobile } from 'utils/userAgent'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Link } from 'components/Atoms/Link'
import { useReconnectionFlag } from 'hooks/web3'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'

const getBrowserURL = () => {
  const browserHref = window.location.href
  return browserHref.replace('https://', '').replace('http://', '')
}

export const WalletSelector = ({ className, closeModal, noWrapper }) => {
  const { gaEvent } = useReactGA4()
  const { connector, activate } = useWeb3React()
  const [, setReconnect] = useReconnectionFlag()
  const { signOut } = useSignInUpOut()

  const tryActivation = async (connector, name) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }
    signOut()
    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          setReconnect(true)
          gaEvent('wallet_connect', {
            pathId: 'wallet.connect',
            walletType: name
          })
          //const walletAddress = await connector.getAccount()
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector).then(async () => {
              setReconnect(true)
              gaEvent('wallet_connect', {
                pathId: 'wallet.connect',
                walletType: name
              })
              //const walletAddress = await connector.getAccount()
            }) // a little janky...can't use setError because the connector isn't set
          } else {
            //setPendingError(true)
          }
        })
  }

  const renderButtonWallets = () =>
    Object.keys(SUPPORTED_WALLETS).map((key, idx) => {
      const option = SUPPORTED_WALLETS[key]
      const browser = getBrowser()
      // Only render mobile compatible wallets
      if (!option.showInBrowsers?.includes('all') && !option.showInBrowsers?.includes(browser)) return null
      if (isMobile && option?.mobile) {
        return (
          <WalletButton
            className={className}
            key={idx}
            onClick={
              !option.dappDeepLinkTemplate
                ? () => {
                    option.connector !== connector &&
                      !option.dappDeepLinkTemplate &&
                      tryActivation(option.connector, option.name)
                  }
                : undefined
            }
            href={option.dappDeepLinkTemplate?.replace('{dappURL}', getBrowserURL())}
            noBlur
          >
            <Typography variant='caption' size='0.9'>
              {option.name}
            </Typography>
            {React.cloneElement(<IconLib {...option.iconProps} />, {
              dimension: '20px'
            })}
          </WalletButton>
        )
      }
      // Render desktop compatible wallets
      else if (!isMobile && option.desktop) {
        return (
          <WalletButton
            className={className}
            key={idx}
            onClick={
              !option.href
                ? () => {
                    option.connector !== connector && !option.href && tryActivation(option.connector, option.name)
                  }
                : undefined
            }
            href={option.href}
            noBlur
          >
            <Typography variant='caption' size='0.9'>
              {option.name}
            </Typography>
            {React.cloneElement(<IconLib {...option.iconProps} />, {
              width: '20px'
            })}
          </WalletButton>
        )
      } else {
        return null
      }
    })

  return noWrapper ? renderButtonWallets() : <WalletsContainer>{renderButtonWallets()}</WalletsContainer>
}

const WalletsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px 0 0 0;
`
const WalletButton = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.themeColors.white};
  background: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.black, 25)};
  backdrop-filter: ${({ noBlur }) => (noBlur ? 'none' : 'blur(10px)')};
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  padding: 15px 25px;
  margin: 0 0 5px 0;
  font-size: 1rem;
  white-space: nowrap;
  min-width: 260px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.black, 40)};
  }
`
