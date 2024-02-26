import styled from 'styled-components'
import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { CssPageWrapper } from './cssRoundView.styled'
import { formatTimeStamp } from 'utils'
import { useMemo } from 'react'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const RoundView = () => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { gameType, roundLength } = getGameParameters(activeGameId)
  const { liveRoundData } = useLiveRoundData(activeGameId)

  const roundDate = useMemo(() => {
    const startDay = formatTimeStamp(+liveRoundData.startTime * 1000, 'MMMM DD')
    const endDay = formatTimeStamp(+liveRoundData.startTime * 1000 + roundLength, 'DD')
    return gameType === GAME_TYPES.G_24HR ? `${startDay} - ${endDay}` : ''
  }, [gameType, liveRoundData?.startTime, roundLength])

  return (
    <CssPageWrapper>
      <div className='live_game_data_left'>
        <div className='round_number'>
          Round <div>{isNaN(activeCardRoundIndex) ? 0 : activeCardRoundIndex}</div>
        </div>
        <div className='round_date_span'>{roundDate}</div>
      </div>
    </CssPageWrapper>
  )
}

const RoundNumber = styled.div`
  font-size: 1.4rem;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 110%;
  margin: 4px 0 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: row;

  & div {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 110%;
    padding: 0 0 0 6px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.9rem;
    margin: 0;

    & div {
      text-align: left;
      display: inline-block;
    }
  }
`
