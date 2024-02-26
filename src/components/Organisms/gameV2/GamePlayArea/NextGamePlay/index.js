import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { G3minNextPlay } from './G3minNextPlay'
import { G24hrNextPlay } from './G24hrNextPlay'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const NextGamePlay = (props) => {
  const { activeGameId } = useActiveGameData()
  const { gameType } = getGameParameters(activeGameId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minNextPlay {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrNextPlay {...props} />
      }}
    />
  )
}
