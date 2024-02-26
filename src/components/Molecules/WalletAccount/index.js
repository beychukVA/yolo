import { useMemo } from 'react'
import styled from 'styled-components'

import { AddressSection } from 'components/Molecules/WalletAccount/AddressSection'
import { WalletBids } from 'components/Molecules/WalletAccount/WalletBids'
import { LinksSection } from 'components/Molecules/WalletAccount/LinksSection'
import { WalletWinLoss } from 'components/Molecules/WalletAccount/WalletWinLoss'

import { useWalletConnection } from 'hooks/useWalletConnection'
import { useToken } from 'utils/hooks/useToken'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'
import { useUser } from 'hooks/user/useUser'

export const WalletAccount = ({ closeModal }) => {
  const { tokenId } = useToken()
  const { account } = useUser('wallets')
  const { signOut } = useSignInUpOut()

  const { disconnectWallet } = useWalletConnection()

  const onSignOut = () => {
    disconnectWallet()
    closeModal && closeModal()
    signOut()
  }
  return useMemo(
    () => (
      <Container>
        <WindowAccount>
          <LinksSection />
          <WalletBids />
          <WalletWinLoss />
          <AddressSection />
          <BottomLinks>
            <li className='denote'>All currencies are shown in {tokenId}</li>
            <li>
              <DisconnectButton onClick={onSignOut}>Sign out</DisconnectButton>
            </li>
          </BottomLinks>
        </WindowAccount>
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  )
}

const Container = styled.div`
  width: 100%;
`
const WindowAccount = styled.div`
  display: flex;
  flex-direction: column;
`
const BottomLinks = styled.ul`
  display: flex;
  justify-content: center;
  padding: 10px 10px 0 10px;
  list-style: none;
  flex-direction: column;
  text-align: center;

  li {
    text-align: center;
    justify-content: center;
    display: flex;
  }
  li.denote {
    font-size: 0.7rem;
    padding: 0 20px;
    display: flex;
  }
`
const DisconnectButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
  line-height: 100%;
  margin: 10px 0 0 0;
  font-size: 0.7rem;
  display: flex;
  color: white;
`
