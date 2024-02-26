import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'
import { Tooltip } from 'components/Atoms/Tooltip'

import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { currencyFormatter } from 'utils'
import { useYlpBalance } from 'hooks/ylp/useYlpBalance'
import { Zero } from '@ethersproject/constants'
import { useToken } from 'utils/hooks/useToken'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

export const Tokens = () => {
  const { formatToken: formatYlp } = useToken('YLP')
  const { formatToken } = useToken()
  const { updateModal } = useYoloModal()

  const { tokenId, yoloWalletAmountBN } = useUser('balance')

  const { ylpTokenId, ylpTotalSupplyBN, ylpBalanceBN, withdrawableBalanceBN, isYlpLoading } = useYlpBalance({
    silentUpdate: true
  })

  const depositModalObj = {
    show: true,
    id: 'tokenDeposit',
    backdropClose: false,
    backdropBlurred: false
  }

  const withdrawModalObj = {
    show: true,
    id: 'tokenWithdraw',
    backdropClose: false,
    backdropBlurred: false
  }

  const onDeposit = () => {
    updateModal(depositModalObj)
  }

  const onWithdraw = () => {
    updateModal(withdrawModalObj)
  }

  return (
    <Container>
      <YoloCard>
        <Title>{tokenId} Balance</Title>
        <BalanceContainer>
          <YoloBalance>
            <CellTitle>
              Your / Total YLP shares
              <Tooltip>Your share of LP tokens and the Total Supply.</Tooltip>
            </CellTitle>
            <CellData>
              {`${currencyFormatter(formatYlp(ylpBalanceBN), {
                noCurrencySign: true
              })} / ${currencyFormatter(formatYlp(ylpTotalSupplyBN), {
                noCurrencySign: true
              })}`}
              <CurrencyType>{ylpTokenId}</CurrencyType>
            </CellData>
          </YoloBalance>
          <YoloBalance>
            <CellTitle>
              Withdrawable Liquidity
              <Tooltip>This is the amount you can withdraw right now</Tooltip>
            </CellTitle>
            <CellData>
              <SingleDataLoader
                loading={isYlpLoading}
                data={currencyFormatter(formatToken(withdrawableBalanceBN), {
                  noCurrencySign: true
                })}
              />
              <CurrencyType>{tokenId}</CurrencyType>
            </CellData>
          </YoloBalance>
        </BalanceContainer>
        <GridRewards>
          <CellButton>
            <DepositButton disabled={yoloWalletAmountBN.lte(Zero)} onClick={onDeposit}>
              Deposit
            </DepositButton>
            <WithdrawButton disabled={withdrawableBalanceBN.lte(Zero)} onClick={onWithdraw}>
              Withdraw
            </WithdrawButton>
          </CellButton>
          <CellButton></CellButton>
          <CellButton></CellButton>
        </GridRewards>
      </YoloCard>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: default;
  grid-template-areas: 'card1 card2';
  grid-gap: 5px; 
  grid-template-columns: 1fr;
  grid-template-rows: auto; */
  width: 100%;
  margin-top: 10px;

  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
    flex-direction: column;
  } 
`
const YoloCard = styled(Card)`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 3px 0;
  line-height: 100%;
`
const BalanceContainer = styled.div`
  display: flex;
  flex-flow: column;
`
const YoloBalance = styled.div`
  display: flex;
  flex-flow: row;
  padding: 15px 0 0 0;
  font-size: 0.9rem;
`
const CellTitle = styled.span`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: flex-start;
  text-align: right;
  white-space: nowrap;
  min-width: 190px;
`
const CellData = styled.span`
  padding-left: 15px;
  font-size: 1.7rem;
  font-weight: 100;
  line-height: 100%;
  letter-spacing: -0.03em;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const GridRewards = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  font-size: 0.8rem;
  max-width: 25%;
  margin: 15px 0 0 0;
`
const CellButton = styled.span`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0;
  padding: 0;
`
const DepositButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const WithdrawButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const CurrencyType = styled.div`
  margin: 0 0 0 10px;
  font-size: 0.9rem;
  opacity: 0.5;
  padding: 2px 0 0 0;
  line-height: 160%;
  letter-spacing: 0;
`
