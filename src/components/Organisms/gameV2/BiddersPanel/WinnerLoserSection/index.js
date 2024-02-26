import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { G3minWinnerLoserList } from './G3minWinnerLoserList'
import { G24hrWinnerLoserList } from './G24hrWinnerLoserList'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const WinnerLoserSection = ({ data }) => {
  const { activeGameType } = useActiveGameData()
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minWinnerLoserList data={data} />,
        [GAME_TYPES.G_24HR]: <G24hrWinnerLoserList data={data} />
      }}
    />
  )
}
