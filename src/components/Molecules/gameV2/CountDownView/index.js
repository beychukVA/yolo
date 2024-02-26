import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { getGameParameters } from 'constants/games'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { G24hrCountDownView } from './G24hrCountDownView'
import { G3minCountDownView } from './G3minCountDownView'

export const CountDownView = () => {
  const { activeGameId } = useActiveGameData()
  const { gameType } = getGameParameters(activeGameId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minCountDownView />,
        [GAME_TYPES.G_24HR]: <G24hrCountDownView />
      }}
    />
  )
}
