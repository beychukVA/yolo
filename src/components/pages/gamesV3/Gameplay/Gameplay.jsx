import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import React from 'react'
import styled from 'styled-components'
import InfiniteWinning from './InfiniteWinning/InfiniteWinning'
import Landing from './Landing/Landing'
import ShortTermPrediction from './ShortTermPrediction/ShortTermPrediction'
import YoloDays from './YoloDays/YoloDays'

const Gameplay = () => {
  const { currentGame } = useLayoutV3State()
  return (
    <GameCenterWrapper>
      <ContentSwitcherByState
        noWrapper
        activeState={currentGame}
        stateObject={{
          [GAME_TYPES.G_NONE]: <Landing />,
          [GAME_TYPES.G_3MIN]: <Landing />,
          // [GAME_TYPES.G_3MIN]: <ShortTermPrediction />,
          [GAME_TYPES.G_24HR]: <Landing />,
          // [GAME_TYPES.G_24HR]: <YoloDays />,
          [GAME_TYPES.G_LVG]: <InfiniteWinning />
        }}
      ></ContentSwitcherByState>
    </GameCenterWrapper>
  )
}

export default Gameplay

const GameCenterWrapper = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  z-index: 0;

  @media (max-width: 1600px) {
    padding: 0 50px 0 90px;
  }

  @media (max-width: 800px) {
    padding: 0 30px 0 30px;
  }
`
