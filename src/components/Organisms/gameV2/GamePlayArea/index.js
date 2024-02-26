import styled from 'styled-components'

import { MarketCloseAlert } from 'components/Molecules/MarketCloseAlert'
import { PredictionWidget } from 'components/Organisms/gameV2/PredictionWidget'
import { LiveGamePlay } from './LiveGamePlay'
import { PastGamePlay } from './PastGamePlay'
import { NextGamePlay } from './NextGamePlay'
import { getGameParameters } from 'constants/games'
import { useGameProgress } from 'hooks/games/useGameProgress'
import { useGamesList } from 'hooks/games/useGamesList'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { RoundsStatusInfo } from './RoundStatusInfo'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'

const getContentToShow = (activeCardRoundOffset) =>
  activeCardRoundOffset < 0 ? <PastGamePlay /> : activeCardRoundOffset > 0 ? <NextGamePlay /> : <LiveGamePlay />

export const GamePlayArea = () => {
  const { closedGamesList } = useGamesList()
  const { msTimeLeft } = useGameProgress()
  const { activeGameId, activeCardRoundOffset } = useActiveGameData()

  const isActiveGameClosed = !!closedGamesList.includes(activeGameId)

  const { name, openTimeUtc, closeTimeUtc, ROUND_ALMOST_END_TIME } = getGameParameters(activeGameId)
  const roundEnding = msTimeLeft < ROUND_ALMOST_END_TIME
  const roundLoading = msTimeLeft < ROUND_ALMOST_END_TIME / 2

  return (
    <MainBoard id='roundInfo'>
      {/* <SingleContentToggle
        noWrapper
        toggle={roundEnding && activeCardRoundOffset === 0}
        trueContent={<RoundsStatusInfo roundLoading={roundLoading} />}
        falseContent={null}
      /> */}
      <SingleContentToggle
        noWrapper
        toggle={!isActiveGameClosed}
        trueContent={
          <>
            {getContentToShow(activeCardRoundOffset)}
            <PredictionWidget />
          </>
        }
        falseContent={null}
      />
      <SingleContentToggle
        noWrapper
        toggle={isActiveGameClosed}
        trueContent={<MarketCloseAlert assetName={name} openTimeUtc={openTimeUtc} closeTimeUtc={closeTimeUtc} />}
        falseContent={null}
      />
    </MainBoard>
  )
}

const MainBoard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`
