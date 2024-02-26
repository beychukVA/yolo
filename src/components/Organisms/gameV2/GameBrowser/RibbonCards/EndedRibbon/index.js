import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { G3minSettledCard } from './G3minSettledCard'
import { G24hrSettledCard } from './G24hrSettledCard'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const EndedRibbon = (props) => {
  const { gameType } = getGameParameters(props.gId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minSettledCard {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrSettledCard {...props} />
      }}
    />
  )
}
