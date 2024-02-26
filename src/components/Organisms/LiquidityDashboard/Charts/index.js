import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'

import { SymbolChart } from 'components/Organisms/LiquidityDashboard/Charts/SymbolChart'
import { ASYNC_STATUS_ID, LONG_DASH } from 'constants/index'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useLpFeesData } from 'datasource/liquidityDashboard/useLpFeesData'
import { useLpBidsData } from 'datasource/liquidityDashboard/useLpBidsData'

const PERIODS = [
  { id: '1d', label: '1D', caption: 'Today', dataSelector: 'daily' },
  { id: '1w', label: '1W', caption: 'Last week', dataSelector: 'weekly' },
  { id: '1m', label: '1M', caption: ' Last month', dataSelector: 'monthly' },
  { id: '1y', label: '1Y', caption: ' Last year', dataSelector: 'yearly' }
]

const DEFAULT_PERIOD = PERIODS[0]

export const Charts = ({ allTimeAmount }) => {
  //LpFees Data Block
  const [feesPeriod, setFeesPeriod] = useState(DEFAULT_PERIOD)
  const {
    data: feesData,
    hasStatus: hasStatusFees,
    setPeriod: setLpFeesPeriods
  } = useLpFeesData(DEFAULT_PERIOD.dataSelector)
  const isFeesPending = hasStatusFees(ASYNC_STATUS_ID.PENDING)
  useEffect(() => {
    setLpFeesPeriods(feesPeriod.dataSelector)
  }, [feesPeriod, setLpFeesPeriods])

  //Bids Data Block
  const [bidsPeriod, setBidsPeriod] = useState(DEFAULT_PERIOD)
  const {
    data: bidsData,
    hasStatus: hasStatusBids,
    setPeriod: setLpBidsPeriods
  } = useLpBidsData(DEFAULT_PERIOD.dataSelector)
  const isBidsPending = hasStatusBids(ASYNC_STATUS_ID.PENDING)
  useEffect(() => {
    setLpBidsPeriods(bidsPeriod.dataSelector)
  }, [bidsPeriod, setLpBidsPeriods])

  return (
    <Container>
      <CardYoloPrice>
        <CardTitleWrapper>
          <CardTitle className='title'>BIDDING VOLUME</CardTitle>
          <CardDataWrap>
            <CardData>
              <Title> All-time </Title>
              <Value>
                <SingleDataLoader loading={isBidsPending} data={bidsData?.allTime?.formatted || LONG_DASH} />
              </Value>
            </CardData>
            <CardData>
              <Title>{bidsPeriod.caption}</Title>
              <Value>
                <SingleDataLoader
                  loading={isBidsPending}
                  data={bidsData?.lastPeriodVolume?.amount?.formatted || LONG_DASH}
                />
              </Value>
            </CardData>
          </CardDataWrap>
        </CardTitleWrapper>
        <CardContent>
          <ChartContainer>
            <YAxisLabel> Bid amounts </YAxisLabel>
            <XAxisLabel>
              <XAxisForm>
                {PERIODS.map((item, idx) => (
                  <Button
                    id={`bidAmountPeriod-${item.id}`}
                    key={idx}
                    selected={item.id === bidsPeriod.id}
                    onClick={() => setBidsPeriod(item)}
                  >
                    {item.label}
                  </Button>
                ))}
              </XAxisForm>
            </XAxisLabel>
            <SymbolChart series={bidsData?.points} height={200} seriesName='Bids amount' />
          </ChartContainer>
        </CardContent>
      </CardYoloPrice>
      <CardGameFees>
        <CardTitleWrapper>
          <CardTitle className='title'>GAME FEES</CardTitle>
          <CardDataWrap>
            <CardData>
              <Title> {feesPeriod.caption} </Title>
              <Value>
                <SingleDataLoader
                  loading={isFeesPending}
                  data={feesData?.lastPeriodVolume?.amount?.formatted || LONG_DASH}
                />
              </Value>
            </CardData>
            <CardData>
              <Title> </Title>
              <Value> </Value>
            </CardData>
          </CardDataWrap>
        </CardTitleWrapper>
        <CardContent>
          <ChartContainer>
            <YAxisLabelFees> Fees </YAxisLabelFees>
            <XAxisLabel>
              <XAxisForm>
                {PERIODS.map((item, idx) => (
                  <Button
                    id={`feesPeriods-${item.id}`}
                    key={idx}
                    selected={item.id === feesPeriod.id}
                    onClick={() => setFeesPeriod(item)}
                  >
                    {item.label}
                  </Button>
                ))}
              </XAxisForm>
            </XAxisLabel>
            <SymbolChart series={feesData?.points} height={200} seriesName='Fees amount' />
          </ChartContainer>
        </CardContent>
      </CardGameFees>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: default;
  grid-template-areas: 'card1' 'card2' 'card3';
  grid-gap: 5px;

  @media only screen and (min-width: 750px) {
    margin: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
    grid-template-rows: auto;
    grid-template-areas: 'card1 card2';
    grid-gap: 10px;
  }

  @media (max-width: 576px) {
    margin: 5px 0;
  }
`

const CardYoloPrice = styled(Card)`
  flex-direction: column;
  justify-content: space-between;
  grid-area: card1;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(42, 109, 255, 0.1);
    filter: blur(30px);
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`

const CardTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;

    & .title {
      margin: 0 0 20px 0;
    }
  }
`

const CardTitle = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 40px 0 0;
  white-space: nowrap;
  line-height: 100%;
`

const CardDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0 0 0;
  width: 100%;
`

const CardData = styled.div`
  display: flex;
  flex-flow: row;
  padding: 4px;
`

const Title = styled.div`
  padding: 8px 15px 8px 8px;
  line-height: 100%;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  margin: 0 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: none;
  width: 20%;
`

const Value = styled.div`
  font-size: 1.7rem;
  font-weight: 100;
  line-height: 100%;
  letter-spacing: -0.03em;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const ChartContainer = styled.div`
  left: 0px;
  margin: 15px 0 0 0;
  position: relative;
  padding: 0 30px 45px 30px;
  bottom: 0;
  width: 100%;
`

const XAxisLabel = styled.div`
  position: absolute;
  transform: translateX(-50%);
  bottom: -15px;
  left: 50%;
  display: flex;
  flex-flow: row;
`

const YAxisLabel = styled.div`
  position: absolute;
  transform: translateY(-50%) rotate(-90deg);
  left: -30px;
  top: calc(50% - 30px);
  font-size: 0.75rem;
`

const YAxisLabelFees = styled.div`
  position: absolute;
  transform: translateY(-50%) rotate(-90deg);
  left: -10px;
  top: calc(50% - 30px);
  font-size: 0.75rem;
`

const XAxisForm = styled.div`
  display: flex;
  flex-flow: row;
`

const Button = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  background: ${({ selected }) => (selected ? 'rgba(42,109,255,1)' : 'rgba(42,109,255,.2)')};
  margin: 0 1px;
  border-radius: 8px;
  line-height: 100%;
  color: #fff;
`

const CardGameFees = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  grid-area: card2;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(42, 109, 255, 0.1);
    filter: blur(30px);
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`
