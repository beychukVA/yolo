import { useMemo } from 'react'
import styled from 'styled-components'

import { YourBids } from './YourBids'
import { WinnerLoserSection } from './WinnerLoserSection'
import { TotalWonLost } from './TotalWonLost'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { AllBidSection } from './AllBidSection'
import { TotalsBids } from './TotalsBids'

export const BiddersBoard = ({ className, data }) => {
  const { activeCardRoundIndex, activeCardRoundOffset } = useActiveGameData()
  const gaugeData = data.gaugeValues
  const bidders = data.bidders
  const allMyBids = data.allMyBids
  const winDirection = bidders?.othersBids?.length ? bidders.othersBids[0].winDirection : 'NONE'
  const winBucket = bidders?.allBids?.length ? bidders.allBids[0].winBucket : 'NONE'

  const totalBidders = useMemo(
    () => bidders?.othersBids.length + bidders?.myBids.length,
    [bidders?.othersBids.length, bidders?.myBids.length]
  )
  return useMemo(
    () => (
      <Container className={className}>
        <YourBids bids={allMyBids} />
        <SingleContentToggle
          noWrapper
          toggle={activeCardRoundOffset >= 0}
          trueContent={<AllBidSection />}
          falseContent={<WinnerLoserSection data={{ bidders, gaugeData }} />}
        />
        <SingleContentToggle
          noWrapper
          toggle={activeCardRoundOffset >= 0}
          trueContent={<TotalsBids data={gaugeData} />}
          falseContent={<TotalWonLost data={gaugeData} winDirection={winDirection} winBucket={winBucket} />}
        />
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalBidders, activeCardRoundIndex, activeCardRoundOffset]
  )
}

const Container = styled.div`
  min-width: 250px;
  display: grid;
  grid-template: auto 1fr auto / 1fr;
  position: relative;
  padding: 0 0 0 15px;
  ${({ theme }) => theme.breakPoints['1200px']} {
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    border-radius: 0;
    top: 0;
    position: relative;
    padding: 0 15px;
  }
`
