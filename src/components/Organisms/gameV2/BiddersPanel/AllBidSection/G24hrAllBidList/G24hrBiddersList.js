import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { PlayerItem } from 'components/Molecules/gameV2/PlayerItem'
import { GAME_TYPES } from 'constants/games/gameTypes'

import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useMemo } from 'react'
import styled from 'styled-components'

export const G24hrBiddersList = () => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { gameRoundPool } = useGameRoundPool(activeGameId, activeCardRoundIndex)
  const bidders = useMemo(() => gameRoundPool?.bids?.allBids || [], [gameRoundPool?.bids?.allBids])

  return (
    <BidderList>
      <BidColumn>
        <List>
          <ScrollList>
            <SingleContentToggle
              noWrapper
              toggle={!!(bidders?.length || 0)}
              falseContent={<div className='no_bids'>No bids available</div>}
              trueContent={
                <>
                  {bidders.map((player, idx) => (
                    <PlayerItem key={idx} playerItem={player} gameType={GAME_TYPES.G_24HR} />
                  ))}
                </>
              }
            />
          </ScrollList>
        </List>
      </BidColumn>
    </BidderList>
  )
}

const BidderList = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template: 100% /1fr;
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

  @-moz-document url-prefix() {
    background: #2e394a;
  }
`
const BidColumn = styled.div`
  overflow: hidden;
  margin-top: 20px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    margin-top: 10px;
  }
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 15px 0;
`
const ScrollList = styled.div`
  flex: 1 0 1px;
  overflow-y: auto;

  padding: ${({ isUp }) => (isUp ? '0 15px 0 15px' : '0 15px 0 30px')};
  ${({ isUp }) => (isUp ? 'margin: 0 15px 0 0;' : '')}

  ${({ theme }) => theme.breakPoints['1200px']} {
    padding: ${({ isUp }) => (isUp ? '0 10px 0 20px' : '0px 15px 0 20px')};
    ${({ isUp }) => (isUp ? 'margin: 0 10px 0 0;' : '')}
  }
`
