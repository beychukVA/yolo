import { AddressSection } from 'components/Molecules/WalletAccount/AddressSection'
import { LinksSection } from 'components/Molecules/WalletAccount/LinksSection'
import { WalletWinLoss } from 'components/Molecules/WalletAccount/WalletWinLoss'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useUser } from 'hooks/user/useUser'

const WalletAccount = ({ isOpen, onClose }) => {
  const { account } = useUser('wallet')
  const { signOut } = useSignInUpOut()
  const { disconnectWallet } = useWalletConnection()

  return useMemo(
    () => (
      <Container>
        <WindowAccount>
          <LinksSection />
          <WalletWinLoss />
          <AddressSection />
          <BottomLinks>
            <SignOutLink
              onClick={() => {
                signOut()
                disconnectWallet()
                // closeMenu()
              }}
            >
              Sign out
            </SignOutLink>
          </BottomLinks>
        </WindowAccount>
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  )
}

export default WalletAccount

const Container = styled.div`
  width: 100%;
  padding: 20px;
  backdrop-filter: blur(40px);
`
const WindowAccount = styled.div`
  display: flex;
  flex-direction: column;
`
const BottomLinks = styled.div`
  display: flex;
  justify-content: space-between;
  list-style: none;
  flex-direction: row;
  text-align: center;
  margin: 15px 0 0 0;
`
const SignOutLink = styled.button`
  display: flex;
  cursor: pointer;
  border-bottom: 1px dotted hsla(0, 0%, 100%, 0.3);
  width: fit-content;
  text-decoration: none;
  :hover {
    color: #fff;
  }
`
