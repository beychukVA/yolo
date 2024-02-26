import styled from 'styled-components'
import { RoundView } from './RoundView'
import { LiveGameView } from './LiveGameView'
import { CountDownView } from './CountDownView'

export const GameLiveViewArea = () => {
  return (
    <GameLiveViewAreaContainer>
      <RoundView />
      <LiveGameView />
      <CountDownView />
    </GameLiveViewAreaContainer>
  )
}

const GameLiveViewAreaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  margin: 0;
  z-index: 0;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 10px 0;
  }
`
