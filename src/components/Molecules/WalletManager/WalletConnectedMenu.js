import React from 'react'
import styled from 'styled-components'

import { WalletMenu } from 'components/Molecules/HeaderItems/WalletMenu'
import { AccountMenu } from 'components/Molecules/HeaderItems/AccountMenu'
import { NetworkSelector } from 'components/Molecules/NetworkSelector'
import { DepositButton } from 'components/Molecules/DepositButton'
import Wallet from 'components/pages/gamesV3/Wallet/Wallet'

export const WalletConnectedMenu = () => {
  return (
    <WalletMenuWrapper id='WalletConnectedMenu'>
      <AccountMenu />
      <NetworkSelector />
      <Wallet />
      <DepositButton />
    </WalletMenuWrapper>
  )
}

const WalletMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
