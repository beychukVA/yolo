import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectChainInfo, selectWalletProviderInfo } from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'

import { getWalletInfo } from 'utils/wallet/getWalletInfo'
import { isMobile } from 'react-device-detect'
import { injected } from 'connectors'
import { ShowText } from 'components/Atoms/ShowText'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { textMiddleTruncate } from 'utils'
import { useUser } from 'hooks/user/useUser'

export const AddressSection = () => {
  const { account, connector } = useUser('wallet')
  const { connectWallet, disconnectWallet } = useWalletConnection()
  const providerInfo = useSelector(selectWalletProviderInfo())
  const { explorerAddressTemplate } = useSelector(selectChainInfo()) || {}
  const addressLink = useMemo(
    () => (explorerAddressTemplate ? explorerAddressTemplate.replace('[hashAddress]', account) : ''),
    [explorerAddressTemplate, account]
  )

  const isMetamask = window.ethereum && window.ethereum.isMetaMask

  const walletInfo = useMemo(() => getWalletInfo({ connector }), [connector])
  const onChange = () => {
    disconnectWallet()
    connectWallet()
  }
  return (
    <>
      <WindowTop>
        <div>
          <WalletLink href={providerInfo.url}>
            {walletInfo.caption} <WalletIcon {...walletInfo.iconProps} />
          </WalletLink>
          {!(isMobile && connector === injected && isMetamask) && (
            <ChangeButton onClick={onChange}>Change</ChangeButton>
          )}
        </div>
        <div>
          <TxHistory href={addressLink}>Tx history</TxHistory>
        </div>
      </WindowTop>
      <ShowText text={textMiddleTruncate(account, [17, account.length - 24], '...')} value={account}></ShowText>
    </>
  )
}

const WindowTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 5px 5px 5px;
  flex-wrap: wrap;

  & div {
    display: flex;
    align-items: center;
  }
`
const WalletLink = styled.div`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin: 0 5px 0 0;
  display: flex;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  color: #fff;
  transition: all 0.3s;
  font-size: 13px;
  font-weight: 400;
`

const WalletIcon = styled(IconLib).attrs((props) => {
  return {
    collection: 'crypto',
    dimension: '20px',
    masking: false
  }
})`
  align-self: center;
  margin: 0 0 0 10px;
  display: flex;
`
const ChangeButton = styled.button`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  font-size: 0.7rem;
  line-height: 100%;
  margin-top: 2px;
  opacity: 0.6;

  &:hover {
    text-decoration: none;
  }
`
const TxHistory = styled(Link)`
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: center;
  -webkit-transition: all 0.3s;
  color: ${({ theme }) => theme.themeColors.white};

  font-size: 0.7rem;
  font-weight: 400;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 5px 10px;
  line-height: 100%;

  &:hover {
    color: #fff;
  }
`
