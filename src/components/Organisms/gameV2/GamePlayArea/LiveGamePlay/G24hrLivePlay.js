import styled from 'styled-components'

import { ProgressBar } from 'components/Organisms/gameV2/ProgressBar'

import { useGameProgress } from 'hooks/games/useGameProgress'

import { GameLiveViewArea } from 'components/Molecules/gameV2/GameLiveViewArea'
import { memoThis } from 'utils/react'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useMemo } from 'react'
import { G24hrLivePriceO2GA } from 'components/Organisms/PriceGraph/G24hrLivePriceO2GA'
import { getGameParameters } from 'constants/games'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { formatUTCTimestampToLocale } from 'utils'

const options = {
  containerPadding: [50, 0, 0, 0]
}

export const G24hrLivePlay = memoThis(() => {
  const { progress } = useGameProgress()
  const { activeGameId } = useActiveGameData()
  const { roundLength } = getGameParameters(activeGameId)
  const { liveRoundData } = useLiveRoundData(activeGameId)

  const timeSpan = useMemo(() => {
    if (!liveRoundData?.startTime) return '-'
    const startDay = formatUTCTimestampToLocale(+liveRoundData.startTime * 1000, '%hh:%mm')
    const endDay = formatUTCTimestampToLocale(+liveRoundData.startTime * 1000 + roundLength, '%hh:%mm')
    return `${startDay} - ${endDay} `
  }, [liveRoundData?.startTime, roundLength])

  return (
    <>
      <GameLiveViewArea />
      <RoundTimeSpan className='round_time_span'>{timeSpan}</RoundTimeSpan>
      <ProgressBar progress={progress} topOffset={5}></ProgressBar>
      <GraphContainer>
        <G24hrLivePriceO2GA gameId={activeGameId} options={options} />
      </GraphContainer>
    </>
  )
})

const GraphContainer = styled.div`
  justify-self: stretch;
  align-self: stretch;
  flex: 1 0 auto;
  position: relative;
  grid-template: 1fr / 1fr;
  align-items: center;
  display: grid;
  /* margin: 0 2.5vw; */
`
const RoundTimeSpan = styled.div`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/gameplay_top.css */
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-style: italic;
  font-size: 0.75rem;
  opacity: 0.7;
  margin: 0 0 20px 0;
  @media (max-width: 1200px) {
    margin: 0 0 15px 0;
  }
`
