import { useGameEngineData } from 'hooks/gameEngine/useGameEngineSocket'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GridLines } from './GridLines'
import { PriceCursor } from './PriceCursor'
import { StrikeCursor } from './StrikeCursor'
import { linearInterpolator } from 'utils'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const GAUGE_MARGIN = 100

const calcTicksYPosition = (height, lines) => {
  const tickLength = (height / lines).toFixed()
  const ticksYPositionArray = Array.from({ length: lines }, (_, idx) => (1 + idx) * tickLength)
  return { tickLength, ticksYPositionArray }
}

const getRange = (array) => {
  const plotValues = array.map((item) => item[1][1])
  const minMaxArray = plotValues.map((item) => Math.abs(item))
  const max = Math.max(...minMaxArray)
  const min = max * -1
  const lastPoint = plotValues[plotValues.length - 1]
  return { domain: [min, max], lastPoint }
}

export const PriceGauge = () => {
  const wrapperRef = useRef()

  const { activeGameId } = useActiveGameData()
  const { data: gameEngineData } = useGameEngineData((msg) => msg)

  const gameDataProcessor = useCallback(
    (data) => {
      if (!data) return {}
      const gameData = { ...data[activeGameId], ...getRange(data?.[activeGameId]?.graphData) }
      delete gameData.graphData
      const interpolator = linearInterpolator(gameData.domain, [
        wrapperRef.current.clientHeight - GAUGE_MARGIN,
        GAUGE_MARGIN
      ])
      const priceCursorY = interpolator(gameData.lastPoint)
      const strikeCursorY = interpolator(0)
      return { gameId: activeGameId, priceCursorY, strikeCursorY, ...gameData }
    },
    [activeGameId]
  )

  const [ticksYPosition, setTicksYPosition] = useState([])
  useEffect(() => {
    const wrapperHeight = wrapperRef.current.clientHeight
    const ticksYPositionArray = calcTicksYPosition(wrapperHeight, 30)
    setTicksYPosition(ticksYPositionArray.ticksYPositionArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef.current])
  return (
    <PriceGaugeWrapper ref={wrapperRef}>
      {wrapperRef.current && (
        <>
          <GaugeScale ticksYPosition={ticksYPosition} lineLength='150' lineStroke='2' />
          <StrikeCursor gameGraphData={gameDataProcessor(gameEngineData)} />
          <PriceCursor gameGraphData={gameDataProcessor(gameEngineData)} />
        </>
      )}
    </PriceGaugeWrapper>
  )
}

const PriceGaugeWrapper = styled.div`
  position: relative;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const GaugeScale = styled(GridLines)`
  height: 100%;
`
