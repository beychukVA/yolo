import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { G3minLiveCard } from './G3minLiveCard'
import { G24hrLiveCard } from './G24hrLiveCard'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { G24hrOpenCard } from '../NextRibbon/G24hrOpenCard'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const LiveRibbon = (props) => {
  const { gameType } = getGameParameters(props.gId)
  const { liveRoundData } = useLiveRoundData(props.gId)
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minLiveCard {...props} />,
        [GAME_TYPES.G_24HR]: (
          <SingleContentToggle
            noWrapper
            toggle={liveRoundData?.status === 'open'}
            trueContent={<G24hrOpenCard {...props} />}
            falseContent={<G24hrLiveCard {...props} />}
          />
        )
      }}
    />
  )
}
