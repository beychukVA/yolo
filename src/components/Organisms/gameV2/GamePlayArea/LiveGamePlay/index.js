import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { G3minLivePlay } from './G3minLivePlay'
import { G24hrLivePlay } from './G24hrLivePlay'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { G24hrOpenPlay } from '../NextGamePlay/G24hrOpenPlay'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const LiveGamePlay = () => {
  const { activeGameId } = useActiveGameData()
  const { gameType } = getGameParameters(activeGameId)

  const { liveRoundData } = useLiveRoundData(activeGameId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minLivePlay />,
        [GAME_TYPES.G_24HR]: (
          <SingleContentToggle
            noWrapper
            toggle={liveRoundData?.status === 'open'}
            trueContent={<G24hrOpenPlay />}
            falseContent={<G24hrLivePlay />}
          />
        )
      }}
    />
  )
}
