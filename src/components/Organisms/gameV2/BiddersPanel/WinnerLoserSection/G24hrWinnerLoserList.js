import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { PlayerItem } from 'components/Molecules/gameV2/PlayerItem'

import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useUser } from 'hooks/user/useUser'

export const G24hrWinnerLoserList = ({ data: { gaugeData } }) => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { account: myAddress } = useUser('wallet')
  const [players, setPlayers] = useState({ winners: [], losers: [] })

  const { gameRoundPool } = useGameRoundPool(activeGameId, activeCardRoundIndex)
  const bidders = useMemo(() => gameRoundPool?.bids || [], [gameRoundPool?.bids])

  const allBids = bidders.allBids
  const otherBidders = bidders.othersBids
  const myBids = bidders.myBids

  const totalBids = useMemo(() => otherBidders?.length + myBids?.length || 0, [otherBidders?.length, myBids?.length])
  const winBucket = useMemo(() => gameRoundPool?.winBucket || 0, [gameRoundPool?.winBucket])

  useEffect(() => {
    if (!allBids) return
    const winners = [],
      losers = []
    allBids.map((bid, idx) => {
      const { bucketLevel, address } = bid
      bid.isMe = isAddressesEqual(myAddress, address)
      if (bucketLevel === winBucket) {
        winners.push(bid)
      } else {
        losers.push(bid)
      }
    })
    setPlayers({ winners, losers })
  }, [totalBids, gaugeData, allBids, myAddress, winBucket])

  return useMemo(
    () => (
      <Container>
        <Title>
          WINS AND LOSSES IN ROUND <strong>{activeCardRoundIndex}</strong>
        </Title>
        <ModuleBoxes>
          <Box>
            {players?.winners.length} <strong>TOTAL WINS</strong>
          </Box>
          <Box>
            {players?.losers.length} <strong>TOTAL LOSSES</strong>
          </Box>
        </ModuleBoxes>
        <BidderList>
          <BidColumn>
            <List isUp={false}>
              <ScrollList>
                {players?.winners.length > 0 ? (
                  players?.winners.map((player, index) => (
                    <PlayerItem key={index} playerItem={player} gameType={GAME_TYPES.G_24HR} />
                  ))
                ) : (
                  <NoBids>No winners available</NoBids>
                )}
              </ScrollList>
            </List>
          </BidColumn>
          <BidColumn>
            <List isUp={true}>
              <ScrollList>
                {players?.losers.length > 0 ? (
                  players?.losers.map((player, index) => (
                    <PlayerItem key={index} playerItem={player} gameType={GAME_TYPES.G_24HR} />
                  ))
                ) : (
                  <NoBids>No losers available</NoBids>
                )}
              </ScrollList>
            </List>
          </BidColumn>
        </BidderList>
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalBids, activeCardRoundIndex, players]
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
const BidderList = styled.div`
  flex 1 1 auto;
  display: grid;
  grid-template: 100% /1fr 1fr;
  width: 100%;
  background: rgba(152, 183, 253, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0px 0px 45px -1px rgb(23 27 34 / 31%);
  
  ${({ theme }) => theme.breakPoints['1200px']} {
    padding-bottom: 10px;
    border-radius: 10px;
  }
`
const BidColumn = styled.div`
  overflow: hidden;
  margin-top: 20px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    margin-top: 10px;
  }
`
const ModuleBoxes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 0 6px 0;
`
const Box = styled.div`
  width: 50%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 1.7rem;
  font-weight: 200;
  margin: 0 6px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(5px);
  line-height: 100%;
  letter-spacing: -0.03em;

  & strong {
    font-weight: 600;
    font-size: 0.75rem;
    opacity: 0.4;
    text-transform: uppercase;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    line-height: 120%;

    ${({ theme }) => theme.breakPoints['1200px']} {
      line-height: 100%;
      font-size: 0.7rem;
    }
  }

  &:last-child {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 1.3rem;
    padding: 12px 20px 10px 20px;
    &:last-child {
      border-radius: 10px;
    }
  }
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ isUp }) => (isUp ? '0 15px 0 15px' : '0px 15px 0 30px')};
  ${({ isUp }) => (isUp ? 'margin: 0 15px 0 0;' : '')}
  height: 100%;

  ${({ theme }) => theme.breakPoints['1200px']} {
    padding: ${({ isUp }) => (isUp ? '0 10px 0 20px' : '0px 15px 0 20px')};
    ${({ isUp }) => (isUp ? 'margin: 0 10px 0 0;' : '')}
  }
`
const ScrollList = styled.div`
  flex: 1 0 1px;
  overflow-y: auto;
`

const NoBids = styled.div`
  overflow-y: auto;
  font-weight: 400;
  font-size: 0.8rem;
`
