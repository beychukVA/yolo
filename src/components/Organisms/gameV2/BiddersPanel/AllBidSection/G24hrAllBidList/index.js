import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import styled from 'styled-components'
import { G24hrBiddersList } from './G24hrBiddersList'
import { G24hrSumUpBids } from './G24hrSumUpBids'

export const G24hrAllBidList = () => {
  const { activeCardRoundIndex } = useActiveGameData()
  return (
    <Container>
      <Title>
        Bids in round <strong>{activeCardRoundIndex}</strong>
      </Title>
      <G24hrSumUpBids />
      <G24hrBiddersList />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`
const Title = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 10px;

  strong {
    font-weight: 600;
    padding-left: 5px;
  }
`
