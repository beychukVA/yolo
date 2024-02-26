import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { G3minSimplePriceGraph } from './G3minSimplePriceGraph'
import { G24hrSimplePriceGraph } from './G24hrSimplePriceGraph'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const NextPriceGraph = () => {
  const { activeGameType } = useActiveGameData()

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minSimplePriceGraph />,
        [GAME_TYPES.G_24HR]: <G24hrSimplePriceGraph />
      }}
    />
  )
}
