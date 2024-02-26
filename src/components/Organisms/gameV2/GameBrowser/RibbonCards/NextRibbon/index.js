import { getGameParameters } from 'constants/games'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { G3minNextCard } from './G3minNextCard'
import { G24hrNextCard } from './G24hrNextCard'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const NextRibbon = (props) => {
  const { gameType } = getGameParameters(props.gId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minNextCard {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrNextCard {...props} />
      }}
    />
  )
}
