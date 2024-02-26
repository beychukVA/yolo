import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

import { G3minPredictView } from './G3minPredictView'
import { G24hrPredictView } from './G24hrPredictView'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const PredictView = (props) => {
  const { activeGameType } = useActiveGameData()

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minPredictView {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrPredictView {...props} />
      }}
    />
  )
}
