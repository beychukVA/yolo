import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { G3minAllBidList } from './G3minAllBidList'
import { G24hrAllBidList } from './G24hrAllBidList'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const AllBidSection = () => {
  const { activeGameType } = useActiveGameData()

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minAllBidList />,
        [GAME_TYPES.G_24HR]: <G24hrAllBidList />
      }}
    />
  )
}
