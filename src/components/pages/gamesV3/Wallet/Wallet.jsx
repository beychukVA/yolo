import { icons } from 'common'
import { Link } from 'components/Atoms/Link'
import { useUser } from 'hooks/user/useUser'
import styled from 'styled-components'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { config } from 'config'
import { currencyFormatter } from 'utils'
import { useMemo } from 'react'

const { DEFAULT_FIAT } = config

const Wallet = () => {
  const { tokenId, formatToken } = useToken()
  const { yoloWalletAmount, tokenAmount } = useUser('balance')
  const convert = useConvertAmount()

  const balance = useMemo(() => {
    const fiatTokenBalance = convert(formatToken(yoloWalletAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const fiatWalletBalance = convert(formatToken(tokenAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const totalBiddableBalance = fiatTokenBalance + fiatWalletBalance

    return currencyFormatter(totalBiddableBalance)
  }, [convert, yoloWalletAmount, tokenAmount, tokenId])

  return (
    <WalletContainer to='/game/wallet'>
      <BalanceContainer>
        <BalanceIcon />
        <Balance>{balance}</Balance>
      </BalanceContainer>
    </WalletContainer>
  )
}

export default Wallet

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 290px;
  max-height: 0;
  z-index: 2;
  background: hsla(214, 18%, 22%, 0.5);
  border-radius: 5px;
  list-style: none;
  list-style: none;
  overflow: hidden;
  -webkit-transition: max-height 0.2s linear;
  -moz-transition: max-height 0.2s linear;
  transition: max-height 0.2s linear;

  max-height: ${({ isShow }) => (isShow ? '500px' : '0')};
`

const WalletContainer = styled(Link)`
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px;
  width: 100%;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
`

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px 3px 0;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`

const BalanceIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px;
  background: #2775ca;
  border-radius: 50%;
  background-image: url(${icons.usdc});
  background-repeat: no-repeat;
  background-size: contain;
`

const Balance = styled.span`
  cursor: pointer;
  display: flex;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  white-space: nowrap;
`

const Arrow = styled.div`
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px 0 20px;
  transition: all 150ms ease-in;
  transform: rotate(${({ isShow }) => (isShow ? '0deg' : '-180deg')});
`
