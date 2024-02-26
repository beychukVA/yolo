import styled from 'styled-components'

import { images } from 'common'

import { BidsGraph } from 'components/Organisms/BidderDashboard/BidsGraph'
import { RewardsGraph } from 'components/Organisms/BidderDashboard/RewardsGraph'
import { BiddingHistory } from 'components/Organisms/BidderDashboard/BiddingHistory'
import { UserHeader } from 'components/Organisms/BidderDashboard/UserHeader'
import { NftLevelsChart } from 'components/Organisms/BidderDashboard/NftLevelsChart'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import { useBidderData } from 'datasource/biddersDashboard'
import { ASYNC_STATUS_ID } from 'constants/index'
import { XFT_LEVELS } from 'constants/xftLevels'
import { useXftProgress } from 'hooks/xftCampaign/useXftProgress'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { scrollToId } from 'utils'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import { ClaimSection } from 'components/Organisms/BidderDashboard/ClaimSection'
import { useUnclaimedBalance } from 'hooks/unclaimedEarning/useUnclaimedBalance'
import { useReactGA4 } from 'GA4/useReactGA4'
import { XftCarrousel } from 'components/Organisms/BidderDashboard/XftCarrousel'

export const BidderDashboardPage = () => {
  const { gaEvent } = useReactGA4()
  const { hasStatus, data } = useBidderData()
  const isPending = hasStatus(ASYNC_STATUS_ID.PENDING)
  const xftProgressData = useXftProgress()
  const nftProps = useMemo(() => XFT_LEVELS[xftProgressData.xftLevel.dec], [xftProgressData.xftLevel.dec])
  const {
    data: { hasUnclaimedRounds }
  } = useUnclaimedBalance()

  const location = useLocation()
  const id = qs.parse(location.search, { ignoreQueryPrefix: true }).id

  useLayoutEffect(() => {
    if (id) scrollToId(id)
  }, [id])

  //External event logger
  useEffect(() => {
    gaEvent('bidders_dashboard_visit', { pathId: 'dashboard.bidders.visit' })
    return () => {
      gaEvent('bidders_dashboard_leave', { pathId: 'dashboard.bidders.leave' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollToClaimSection = () => scrollToId('claimSection')

  return (
    <ContestLayout>
      <Container>
        <TitleRow>
          <Title>Bidders Dashboard</Title>
          <ClaimButton disabled={!hasUnclaimedRounds} nftProps={nftProps} onClick={scrollToClaimSection}>
            Claim earnings
          </ClaimButton>
        </TitleRow>
        <UserHeader isPending={isPending} nftProgressData={xftProgressData} />
        <GridContainer>
          <BidsGraph isPending={isPending} data={{ counts: data?.counts, graphs: data?.graphs }} />
          <RewardsGraph isPending={isPending} data={{ amounts: data?.amounts, graphs: data?.graphs }} />
          {hasUnclaimedRounds && <ClaimSection />}
          <BiddingHistory isPending={isPending} data={{ tableData: data?.tableRows }} />
          <XftCarrousel xftProgressData={xftProgressData} />
          <NftLevelsChart nftProgressData={xftProgressData} />
        </GridContainer>
      </Container>
    </ContestLayout>
  )
}

const Container = styled.div`
  grid-area: 'content';
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  height: 100%;
  transition: width 300ms ease-in-out;
  display: flex;
  flex-direction: column;

  &::before {
    background: rgba(45, 51, 65, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImgBlur}) center center / cover no-repeat;
    z-index: -2;
    @-moz-document url-prefix() {
      background: url(${images.HomePageBgImgBlur});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    padding: 30px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 30px;
  }
`
const TitleRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  letter-spacing: -0.03em;
  line-height: 100%;
  padding: 0 0 5px 0;

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`
const ClaimButton = styled.button`
  padding: 20px 30px;
  line-height: 0;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 15px;
  width: fit-content;
  border: 1px solid ${({ nftProps }) => nftProps.background10};
  background: ${({ nftProps }) => nftProps.background01};
  color: #ffff;
  :hover {
    filter: brightness(1.3);
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`

const GridContainer = styled.div`
  width: 100%;
  margin: 20px 0 0 0;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #fff;
  flex-wrap: wrap;

  ${({ theme }) => theme.breakPoints['980px']} {
    flex-direction: column;
  }
`
