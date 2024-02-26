import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { getGameParameters } from 'constants/games'
import { G3minBidPlacedToast } from './G3minBidPlaced.toast'
import { G24hrBidPlacedToast } from './G24hrBidPlaced.toast'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const BidPlacedToast = (props) => {
  const gameId = props.gameId
  const { gameType } = getGameParameters(gameId)

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minBidPlacedToast {...props} />,
        [GAME_TYPES.G_24HR]: <G24hrBidPlacedToast {...props} />
      }}
    />
  )
}
