import React, { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

import { ProgressBar } from 'components/Organisms/gameV2/ProgressBar'

import { useGameProgress } from 'hooks/games/useGameProgress'

import { PriceGauge } from 'components/Organisms/PriceGauge'
import { IconLib } from 'components/Atoms/IconLib'
// import { LivePriceGraph } from '../LivePriceGraph'
import { useViewport } from 'contexts/viewport/useViewport'
import { GameLiveViewArea } from 'components/Molecules/gameV2/GameLiveViewArea'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'

import { G3minLivePriceO2GA } from 'components/Organisms/PriceGraph/G3minLivePriceO2GA'
import { G3minChart } from 'components/Organisms/PriceGraph/ReactStocksCharts/G3minChart'
import { GAME_TYPES } from 'constants/games/gameTypes'

const BREAK_POINTS = { '980px': 980 }

const options = {
  containerPadding: [50, 0, 0, 0]
}

export const G3minLivePlay = React.memo(() => {
  const { width } = useViewport()
  const { progress } = useGameProgress()
  const [graphVariantIdx, setGraphVariantIdx] = useState(0)
  const { activeGameId } = useActiveGameData()
  const { gameType } = getGameParameters(activeGameId)

  const GRAPH_VARIANT_ARRAY = useMemo(
    () => [
      // { id: 'tick', component: <G3minChart />, onlyMobile: false },
      { id: 'graph', component: <G3minLivePriceO2GA gameId={activeGameId} options={options} />, onlyMobile: false },
      { id: 'gauge', component: <PriceGauge />, onlyMobile: true }
    ],
    [activeGameId]
  )

  const graphSelector = useMemo(() => {
    const variant = GRAPH_VARIANT_ARRAY[graphVariantIdx]
    return variant.component
  }, [graphVariantIdx, GRAPH_VARIANT_ARRAY])

  const setNextGraphVariantIdx = () => {
    if (gameType === GAME_TYPES.G_24HR) return
    const nextGraphVariantIdx = (graphVariantIdx + 1) % GRAPH_VARIANT_ARRAY.length
    setGraphVariantIdx(nextGraphVariantIdx)
  }

  useEffect(() => {
    if (width < BREAK_POINTS['980px']) {
      if (gameType === GAME_TYPES.G_24HR) return
      setGraphVariantIdx(1)
    }
    if (width > BREAK_POINTS['980px']) {
      setGraphVariantIdx(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <>
      <GameLiveViewArea />
      <ProgressBar progress={progress}></ProgressBar>
      <VariantSelector onClick={setNextGraphVariantIdx} active={graphVariantIdx === 0}>
        <IconLib collection='general' name='changeGraphView' height='18px' />
      </VariantSelector>
      <GraphContainer>{graphSelector}</GraphContainer>
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

const variantSelectorActive = css`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const VariantSelector = styled.button`
  ${({ theme }) => theme.commons.button}
  padding:0;
  margin: 20px 0 0 0;
  width: 46px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 1px 49px 0px rgb(0 0 0 / 40%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  ${({ active }) => active && variantSelectorActive}
`
