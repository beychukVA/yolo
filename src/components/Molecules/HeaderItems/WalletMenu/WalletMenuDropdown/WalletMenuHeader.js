import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'

import { useConvertAmount } from 'utils/hooks'

import { selectHasPendingTx } from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'
import { useUser } from 'hooks/user/useUser'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'

const { DEFAULT_FIAT } = config

export const WalletMenuHeader = ({ isActive }) => {
  const hasPendingTx = useSelector(selectHasPendingTx())
  const convert = useConvertAmount()
  const { totalBalance, tokenId } = useUser('balance')
  const { formatToken } = useToken(tokenId)

  const balanceInUsd = useMemo(
    () => convert(formatToken(totalBalance), tokenId, DEFAULT_FIAT),
    [tokenId, totalBalance, convert, formatToken]
  )

  return (
    <ShowWalletWithBalanceWrapper>
      <IconContainer>
        <DollarIcon />
        <DollarIcon animated={hasPendingTx} />
      </IconContainer>
      <BalanceContainer>
        <BalanceInUSD>{balanceInUsd}</BalanceInUSD>
        <AnimatedBalanceInUSD animated={hasPendingTx}>{balanceInUsd}</AnimatedBalanceInUSD>
      </BalanceContainer>
    </ShowWalletWithBalanceWrapper>
  )
}

const pendingAnim = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
100% {
  transform: scale(3);
  opacity:.1;
  }
`
const IconPulseAnimation = css`
  animation: 1s ${pendingAnim} ease-in infinite;
  background: ${({ theme }) => theme.themeColors.txPending};
`
const BalancePulseAnimation = css`
  animation: 1s ${pendingAnim} ease-in infinite;
  color: ${({ theme }) => theme.themeColors.txPending};
`

const IconContainer = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  margin: 0 5px 0 0;
  ${({ theme }) => theme.breakPoints['425px']} {
    display: none;
  }
`
const BalanceContainer = styled.div`
  position: relative;
`

const DollarIcon = styled(IconLib).attrs({
  collection: 'crypto',
  name: 'dollarCircle',
  masking: true
})`
  position: absolute;
  width: 14px;
  height: 14px;
  background: #d1d2d4;

  ${({ animated }) => (animated ? IconPulseAnimation : '')};
`
const BalanceInUSD = styled.div`
  ${({ animated }) => (animated ? BalancePulseAnimation : '')};
`
const AnimatedBalanceInUSD = styled.div`
  display: none;
  ${({ theme }) => theme.breakPoints['425px']} {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    ${({ animated }) => (animated ? BalancePulseAnimation : '')};
  }
`
const ShowWalletWithBalanceWrapper = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 0;
  border-right: 0;
  padding: 0 10px 0 14px;
  height: 34px;
  margin-left: -5px;
  text-decoration: none;
  color: #d1d2d4;
  white-space: nowrap;
  &:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    text-decoration: none;
    text-decoration-color: #666;
    ${DollarIcon} {
      background: #ffffff;
    }
  }
`
