import React from 'react'
import styled from 'styled-components'

import { OverviewCard } from './OverviewCard'
import { useConvertAmount } from 'utils/hooks'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useYlpBalance } from 'hooks/ylp/useYlpBalance'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { currencyFormatter } from 'utils'
import { useLpFeesData } from 'datasource/liquidityDashboard/useLpFeesData'
import { config } from 'config'
import { useLpBidsData } from 'datasource/liquidityDashboard/useLpBidsData'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const Overview = () => {
  const convert = useConvertAmount()
  const { formatToken } = useToken()
  const { formatToken: formatPercentage } = useToken('BASIC_POINTS')

  const { tvlBalanceBN, tvlTokenId, isYlpLoading } = useYlpBalance({ silentUpdate: true })

  const { data: feesData1d, hasStatus: hasStatusFees1d } = useLpFeesData('daily')
  const isPendingFees1d = hasStatusFees1d(ASYNC_STATUS_ID.PENDING)

  const { data: bidsData1d, hasStatus: hasStatusBids1d } = useLpBidsData('daily')
  const isPendingBids1d = hasStatusBids1d(ASYNC_STATUS_ID.PENDING)

  // const { data: biddingData, hasStatus: hasStatusBidding } = useLpBiddingVolumeData('daily')
  // const isBiddingPending = hasStatusBidding(ASYNC_STATUS_ID.PENDING)

  return (
    <Container>
      <OverviewCard>
        <CardTitle>TVL</CardTitle>
        <CardValue>
          <SingleDataLoader
            loading={isYlpLoading}
            data={convert(formatToken(tvlBalanceBN), DEFAULT_TOKEN, DEFAULT_FIAT)}
          />
        </CardValue>
      </OverviewCard>
      {tvlTokenId !== 'USDC' && (
        <OverviewCard>
          <CardTitle>{tvlTokenId} BALANCE</CardTitle>
          <CardValue>
            <SingleDataLoader
              loading={isYlpLoading}
              data={
                <>
                  {currencyFormatter(formatToken(tvlBalanceBN), {
                    noCurrencySign: true
                  })}
                  <div className='currency_type'>{tvlTokenId}</div>
                </>
              }
            />
          </CardValue>
        </OverviewCard>
      )}
      <OverviewCard>
        <CardTitle>Game Fees (24hrs)</CardTitle>
        <CardValue>
          <SingleDataLoader
            loading={isPendingFees1d}
            data={
              <>
                {currencyFormatter(formatToken(feesData1d?.last24hoursVolumeBN || Zero), {
                  noCurrencySign: true
                })}
                <div className='currency_type'>{feesData1d?.tokenId}</div>
              </>
            }
          />
        </CardValue>
      </OverviewCard>
      <OverviewCard>
        <CardTitle>Bidding Volume (24hrs)</CardTitle>
        <CardValue>
          <SingleDataLoader
            loading={isPendingBids1d}
            data={currencyFormatter(formatToken(bidsData1d?.last24hoursVolumeBN || Zero), {
              noCurrencySign: true
            })}
          />
          <Change isUp={bidsData1d?.last24hoursDeltaBN?.gte(0)}>
            <SingleDataLoader
              loading={isPendingBids1d}
              data={`${currencyFormatter(formatPercentage(bidsData1d?.last24hoursDeltaBN || Zero), {
                decimalDigits: 4,
                noCurrencySign: true
              })}%`}
            />
          </Change>
        </CardValue>
      </OverviewCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

const CardTitle = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 3px 0;
  line-height: 100%;

  & .chain_name {
    color: #14f195;
    white-space: nowrap;
  }
`

const CardValue = styled.div`
  font-size: 1.7rem;
  font-weight: 100;
  line-height: 100%;
  letter-spacing: -0.03em;
  display: flex;
  flex-direction: row;
  align-items: center;

  & .currency_type {
    letter-spacing: 0;
    margin: 0 0 0 10px;
    font-size: 0.9rem;
    opacity: 0.5;
    padding: 0;
    line-height: 160%;
  }
`

const Change = styled.div`
  padding: 8px;
  line-height: 100%;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ isUp }) => (isUp ? `rgba(0,194,19,.2)` : `rgba(226,14,85,.2)`)};
  border-radius: 10px;
  margin: 0 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
