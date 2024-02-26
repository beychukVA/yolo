import React, { useEffect, useState, useContext, useCallback } from 'react'
import styled, { css, ThemeContext } from 'styled-components'
import { isEqual } from 'lodash'

import { linearInterpolator } from 'utils'
import { useViewport } from 'contexts/viewport/useViewport'
import { isMobile, isSafari } from 'react-device-detect'
import { useToken } from 'utils/hooks/useToken'
import { memoThis } from 'utils/react'

const STRIKE_LINE_WIDTH = 3
const VERTICAL_TRIMMER = 10
const RANGE = [100, 0]

const BREAK_POINTS = { '480px': 480 }

const yRange = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]
const xRange = [RANGE[1], RANGE[0]]

const spLineTypeD = (pointsArray, sharp = false) => {
  const getControlPoints = ([[x0, y0], [x1, y1], [x2, y2]], t) => {
    const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
    const d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    const fa = (t * d01) / (d01 + d12)
    const fb = t - fa
    const p1x = x1 + fa * (x0 - x2)
    const p1y = y1 + fa * (y0 - y2)
    const p2x = x1 - fb * (x0 - x2)
    const p2y = y1 - fb * (y0 - y2)
    return {
      pc1: [p1x, p1y],
      pc2: [p2x, p2y]
    }
  }
  const expPointsArray = [[-0.8, 50], ...pointsArray]
  const controlPointArray = expPointsArray.map((p0, idx, ps) => {
    const triangleVertexes = ps.slice(idx, idx + 3)
    if (triangleVertexes.length !== 3) return false
    const pc = getControlPoints(triangleVertexes, sharp ? 0 : 0.4)
    return pc
  })

  const grouped = pointsArray.map((pt, idx) => {
    if (idx === 0) return `M${pt[0]},${pt[1]}`
    if (idx === pointsArray.length - 1) return `L${pt[0]},${pt[1]}`
    const pc1 = idx - 1 === 0 ? pointsArray[idx - 1] : controlPointArray[idx - 1].pc2
    const pc2 = idx === pointsArray.length - 2 ? pointsArray[idx - 1] : controlPointArray[idx].pc1
    return `C${pc1.join(',')},${pc2.join(',')},${pt.join(',')}`
  })
  return grouped.filter((pathCommand) => !!pathCommand)
}

export const CurrentPath = memoThis(({ isUp, pathValues, yDomain, xDomain, tailLine }) => {
  const theme = useContext(ThemeContext)
  const { formatToken: formatUSD } = useToken('USD')

  //Coordinates Interpolators
  const getCoordinateY = useCallback(() => {
    return linearInterpolator(yDomain, yRange)
  }, [yDomain, formatUSD])

  const getCoordinateX = useCallback(() => {
    return linearInterpolator(xDomain, xRange)
  }, [xDomain])

  const makeLinePathDefinition = useCallback(() => {
    if (!pathValues) return {}
    // pathValues.shift()
    const pointsArray = [...pathValues].map((point, idx) => {
      const x2 = getCoordinateX()(point.x)
      const y2 = getCoordinateY()(point.y)
      return [x2, y2]
    })
    const dSp = [...spLineTypeD([...pointsArray])]
    return dSp
  }, [getCoordinateX, getCoordinateY, pathValues])

  // Width responsiveness
  const { width } = useViewport()
  const [offsets, setOffsets] = useState({})
  useEffect(() => {
    let newOffsets
    if (width < BREAK_POINTS['480px']) {
      newOffsets = { title: -13, gameId: 17 }
    }
    if (width > BREAK_POINTS['480px']) {
      newOffsets = { title: -18, gameId: 21 }
    }
    if (!isEqual(offsets, newOffsets)) {
      setOffsets({ ...offsets, ...newOffsets })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <PathPercentageArtifact>
      <defs>
        <filter id='glowUp'>
          <feFlood result='flood' floodColor={theme.themeColors.priceGraphGlowUp} floodOpacity='1'></feFlood>
          <feComposite in='flood' in2='SourceGraphic' operator='in' result='color-out'></feComposite>
          <feGaussianBlur result='color-out' stdDeviation='1' in='mask'></feGaussianBlur>
          <feOffset in='shadow' dx='0' dy='0' result='color-out'></feOffset>
          <feMerge>
            <feMergeNode in='drop-shadow'></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
        <filter id='glowDown'>
          <feFlood result='flood' floodColor={theme.themeColors.priceGraphGlowDown} floodOpacity='1'></feFlood>
          <feComposite in='flood' in2='SourceGraphic' operator='in' result='color-out'></feComposite>
          <feGaussianBlur result='color-out' stdDeviation='1' in='mask'></feGaussianBlur>
          <feOffset in='shadow' dx='0' dy='0' result='color-out'></feOffset>
          <feMerge>
            <feMergeNode in='drop-shadow'></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <HistoricPath
        isUp={isUp}
        d={makeLinePathDefinition()}
        vectorEffect='non-scaling-stroke'
        filter={isMobile || isSafari ? 'none' : `url(${isUp ? '#glowUp' : '#glowDown'})`}
      />
    </PathPercentageArtifact>
  )
})

const cssUp = css`
  stroke: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  stroke: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`

const PathPercentageArtifact = styled.svg.attrs(() => {
  return {
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
    width: '100%',
    height: '100%'
  }
})``

const HistoricPath = styled.path`
  vector-effect: 'non-scaling-stroke';
  fill: transparent;
  stroke: red;
  stroke-width: ${STRIKE_LINE_WIDTH};
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
`
