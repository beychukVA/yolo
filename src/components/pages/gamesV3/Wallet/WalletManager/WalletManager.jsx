import { useMemo } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

import { useSelector } from 'react-redux'
import { selectActiveStep } from 'redux/selectors'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import Wallet from '../Wallet'
import { WalletConnect } from 'components/Molecules/WalletManager/WalletConnect'
import { useUser } from 'hooks/user/useUser'

export const WalletManager = () => {
  const { active } = useWeb3React()
  const { isProxy } = useUser('wallet')

  const tourActiveStep = useSelector(selectActiveStep())

  const isTourRunning = useMemo(
    () => !!tourActiveStep,
    // eslint-disable-next-line
    [tourActiveStep]
  )
  return (
    <WalletWrapper>
      <ContentSwitcherByState
        noWrapper
        activeState={isTourRunning ? 'disconnected' : isProxy ? 'connected' : active ? 'connected' : 'disconnected'}
        stateObject={{
          disconnected: <WalletConnect />,
          connected: <Wallet />
        }}
      />
    </WalletWrapper>
  )
}

const WalletWrapper = styled.div`
  z-index: 1;
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: flex;
    justify-content: center;
  }
`
