import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

import { G3minNextPredictView } from './G3minNextPredictView'
import { G24hrNextPredictView } from './G24hrNextPredictView'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const NextPredictView = (props) => {
  const { activeGameType } = useActiveGameData()

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minNextPredictView {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrNextPredictView {...props} />
      }}
    />
  )
}
