/*
 * O2GA = Our Own Graph Algorithm
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { StrikeCursor } from './SvgComponents/StrikeCursor'
import { CurrentCursor } from './SvgComponents/CurrentCursor'
import { CurrentPath } from './SvgComponents/CurrentPath'
import { getGameParameters } from 'constants/games'
import { useGameEngineData } from 'hooks/gameEngine/useGameEngineSocket'

const DEFAULT_OPTIONS = {
  containerPadding: [0, 0, 0, 0],
  tailLine: false
}

const getPathPoints = (array = []) => {
  const pathValues = array.map((item) => ({
    x: item[1][0],
    y: item[1][1]
  }))
  const minMaxArray = pathValues.map((item) => Math.abs(item.y))
  const max = (minMaxArray.length && Math.max(...minMaxArray)) || 1
  const min = max * -1
  const yDomain = { min, max }
  return { pathValues, yDomain }
}

const getPlotData = (array = []) => {
  const plotValues = array.map((item) => item[1][1])
  const minMaxArray = plotValues.map((item) => Math.abs(item))
  const max = Math.max(...minMaxArray)
  const min = max * -1
  const lastValue = plotValues[plotValues.length - 1]
  return { plotValues, lastValue, min, max }
}

const getLastValue = (array = []) => {
  return {
    x: array[array.length - 1]?.[1][0],
    y: array[array.length - 1]?.[1][1]
  }
}

const getXDomain = ({ gData, gameId }) => {
  const { roundLength } = getGameParameters(gameId)
  const min = (gData?.startTime || 0) * 1000
  const max = min + roundLength
  return { min, max }
}

export const G3minLivePriceO2GA = ({ className, gameId, options }) => {
  const { containerPadding, tailLine } = { ...DEFAULT_OPTIONS, ...options }
  const { data: gameEngineData } = useGameEngineData((msg) => msg)
  const gameDataProcessor = useCallback(
    (data) => {
      if (!data) return {}

      const gData = data?.[gameId]
      const plotData = getPlotData(gData?.graphData)
      const xDomain = getXDomain({ gData, gameId })
      const pathValues = getPathPoints(gData?.graphData)
      const lastValue = getLastValue(gData?.graphData)
      const gameData = { ...data[gameId], plotData, xDomain, ...pathValues, lastValue }
      delete gameData.graphData
      return { gameId: gameId, ...gameData }
    },
    [gameId]
  )
  const [gamePlotData, setGamePlotData] = useState(gameDataProcessor(gameEngineData))
  useEffect(() => {
    const processedGameData = gameDataProcessor(gameEngineData)
    setGamePlotData(processedGameData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEngineData])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const strikeCursor = useMemo(() => <StrikeCursor gamePlotData={gamePlotData} />, [gamePlotData.strikePrice])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentCursor = useMemo(() => <CurrentCursor gamePlotData={gamePlotData} noLine />, [gamePlotData.currentPrice])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentPath = useMemo(
    () => <CurrentPath gamePlotData={gamePlotData} tailLine={tailLine} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gamePlotData.currentPrice]
  )

  return (
    <Container className={className}>
      <SvgCanvas id='svgCanvas' padding={containerPadding}>
        {gameEngineData && currentPath}
        {gameEngineData && currentCursor}
        {gameEngineData && strikeCursor}
      </SvgCanvas>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`
const SvgCanvas = styled.svg`
  position: absolute;
  top: ${({ padding }) => padding[0]}px;
  width: ${({ padding }) => `calc(100% -  ${padding[3] + padding[1]}px)`};
  height: ${({ padding }) => `calc(100% -  ${padding[0] + padding[2]}px)`};
  left: ${({ padding }) => padding[3]}px;
  overflow: visible;
`
