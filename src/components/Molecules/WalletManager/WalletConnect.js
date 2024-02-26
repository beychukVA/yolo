import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { WalletConnectTour } from 'components/Organisms/OnBoarding/WalletConnect.tour'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useUser } from 'hooks/user/useUser'

export const WalletConnect = () => {
  const { connectWallet, disconnectWallet } = useWalletConnection()
  const connectBtnRef = useRef()
  const history = useHistory()
  const { isAllowed } = useUser('allowed')

  const onConnectWallet = () => {
    if (!isAllowed) {
      history.push('/restricted')
      disconnectWallet()
      return
    }
    connectWallet()
  }

  return (
    <>
      <WalletConnectTour componentRef={connectBtnRef} />
      <ConnectButton ref={connectBtnRef} id='connectButton' onClick={onConnectWallet}>
        Sign In
      </ConnectButton>
    </>
  )
}

const steam = keyframes`
0% {
  background-position: 0 0;
}
50% {
  background-position: 400% 0;
}
100% {
  background-position: 0 0;
}
`
const ConnectButton = styled.button`
  color: ${({ theme }) => theme.themeColors.white};
  padding: 0 15px;
  height: 36px;
  white-space: nowrap;
  font-size: 0.9rem;
  background: #191e27;
  border-radius: 0.85em;
  font-weight: 600;
  position: relative;
  :before {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    z-index: -1;
    animation: ${steam} 20s linear infinite;
    border-radius: 10px;
    background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(54, 199, 255, 1) 15%,
        rgba(116, 109, 255, 1) 31%,
        #e20e55 47%,
        rgba(42, 109, 255, 1) 62%,
        rgba(0, 212, 255, 1) 79%,
        rgba(171, 212, 255, 1)
      )
      center center / 400% 400%;
  }
  &:hover {
    background: rgba(25, 30, 39, 0.6);
  }
`
