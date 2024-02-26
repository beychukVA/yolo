import { useMemo } from 'react'
import styled from 'styled-components'
import { Tooltip } from 'components/Atoms/Tooltip'
import { ASYNC_STATUS_ID, LONG_DASH } from 'constants/index'
import { Link } from 'components/Atoms/Link'
import { useBidderData } from 'datasource/biddersDashboard'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

export const WalletWinLoss = () => {
  const { data, isPending } = useBidderData()
  const amounts = data?.amounts || {}

  return (
    <WinLossWrapper>
      <h4>Winnings & Losses</h4>
      <WinLossDetail>
        <WinLossItem>
          <StatusWrapper>
            <Status>
              <strong>Total winnings</strong>
            </Status>
          </StatusWrapper>
          <InfoWrapper>
            <SingleDataLoader
              loading={isPending}
              data={
                <Tooltip container={<ValueInfo>{amounts.winningAmount?.formatted ?? LONG_DASH}</ValueInfo>}>
                  {`${amounts.winningAmount?.token ?? LONG_DASH} ${amounts.winningAmount?.tokenId}`}
                </Tooltip>
              }
            />
          </InfoWrapper>
        </WinLossItem>
        <WinLossItem>
          <StatusWrapper>
            <Status>
              <strong>Total losses</strong>
            </Status>
          </StatusWrapper>
          <InfoWrapper>
            <SingleDataLoader
              loading={isPending}
              data={
                <Tooltip container={<ValueInfo>{amounts.losingAmount?.formatted ?? LONG_DASH}</ValueInfo>}>
                  {`${amounts.losingAmount?.token ?? LONG_DASH} ${amounts.losingAmount?.tokenId}`}
                </Tooltip>
              }
            />
          </InfoWrapper>
        </WinLossItem>
        <HistoryButtonWrap>
          <HistoryButton to='/game/bidder-dashboard'>History</HistoryButton>
        </HistoryButtonWrap>
      </WinLossDetail>
    </WinLossWrapper>
  )
}

const WinLossWrapper = styled.div`
  padding: 15px 0 0 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 -15px;
  flex-direction: column;
  * {
    font-size: 13px;
  }
  h4 {
    display: flex;
    margin: 0;
    padding-left: 25px;
    text-align: center;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
  }
`

const WinLossDetail = styled.div`
  display: flex;
  max-height: 1950px;
  overflow-y: hidden;
  margin-top: 5px;
  flex-direction: column;
`

const WinLossItem = styled.div`
  text-align: left;
  margin: 0;
  padding: 3px 25px 0 25px;
  cursor: default;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
`

const StatusWrapper = styled.div`
  justify-content: space-between;
  margin: 0;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  cursor: default;
  text-align: left;
`
const Status = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
  opacity: 1;
  display: flex;
  max-width: 85%;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
`

const ValueInfo = styled.div`
  justify-content: space-between;
  margin: 0 0 0 5px;
  font-weight: 500;
  font-size: 0.8rem;
  white-space: nowrap;
  letter-spacing: -0.01em;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  line-height: 100%;
  display: flex;
`

const HistoryButtonWrap = styled.div`
  display: flex;
`

const HistoryButton = styled(Link)`
  justify-content: center;
  align-items: center;
  -webkit-transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 5px 10px;
  line-height: 100%;
  display: block;
  margin: 10px 20px;
  color: #fff;
`
