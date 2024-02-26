import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { G3minBiddingModal } from './G3minBiddingModal'
import { G24hrBiddingModal } from './G24hrBiddingModal'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const BiddingModal = (props) => {
  const { activeGameType } = useActiveGameData()
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minBiddingModal {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrBiddingModal {...props} />
      }}
    />
  )
}
