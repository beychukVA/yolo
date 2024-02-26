import React, { useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { linearInterpolator } from 'utils'

export const GridLines = ({ className, ticksYPosition, lineLength = 150, lineStroke = 2 }) => {
  const yPosArray = ticksYPosition || []

  const lineWrapperRef = useRef()

  const opacityInterpolator = useCallback(() => {
    const max = Math.max(...ticksYPosition)
    const min = Math.min(...ticksYPosition)
    const areaGap = max - min
    const domainArray = [0, 0.25, 0.5, 0.75, 1].map((factor) => min + areaGap * factor)
    const rangeArray = [0, 0.4, 0.7, 0.4, 0]
    return linearInterpolator(domainArray, rangeArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticksYPosition?.length])

  return useMemo(
    () => (
      <GridLinesWrapper id='gridLines' ref={lineWrapperRef} className={className}>
        {yPosArray.map((yPos, idx) => (
          <Line
            key={`Line-${idx}`}
            yPos={yPos}
            lineLength={lineLength}
            lineStroke={lineStroke}
            yOpacity={opacityInterpolator()(yPos)}
          />
        ))}
      </GridLinesWrapper>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ticksYPosition?.length]
  )
}

const GridLinesWrapper = styled.div`
  position: absolute;
  top: 0;
`
const Line = styled.div.attrs((props) => ({
  style: {
    position: 'absolute',
    top: `${props.yPos}px`,
    opacity: props.yOpacity || 0,
    left: '50%',
    transform: 'translate(-50%,0)',
    width: `${props.lineLength}px`,
    height: `${props.lineStroke}px`
  }
}))`
  background-image: ${({ theme }) =>
    `linear-gradient(to right, 
    transparent 0%,
    ${theme.themeColors.manatee} 15%,
    ${theme.themeColors.priceGraphScale} 50%,
    ${theme.themeColors.manatee} 85%,
    transparent 100%)`};
  border-radius: 50%;
`
