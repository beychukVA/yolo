import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { BetsGauge } from './BetsGauge'
import { TotalBidsAmount } from './TotalBidsAmount'

export const TotalsBids = ({ data }) => {
  const { activeGameType } = useActiveGameData()
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={activeGameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: (
          <>
            <BetsGauge data={data} />
            <TotalBidsAmount data={data} />
          </>
        ),
        [GAME_TYPES.G_24HR]: <TotalBidsAmount data={data} />
      }}
    />
  )
}
