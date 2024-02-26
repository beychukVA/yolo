import { motion, useSpring, useTransform } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { isEqual } from 'lodash'

import { getGameParameters } from 'constants/games'
import { currencyFormatter } from 'utils'
import { useViewport } from 'contexts/viewport/useViewport'
import { TextBox } from './TextBox'

const STRIKE_LINE_WIDTH = 3
const LINE_BASE_Y_POSITION = -2

const BREAK_POINTS = { '480px': 480 }

export const HorizontalCursor = ({ plotData, configObj }) => {
  const { width } = useViewport()
  const [offsets, setOffsets] = useState({})

  const { defaultY, textCss, lineStyle, textStyle = {} } = { defaultY: 50, ...configObj }
  const ySpring = useSpring(defaultY)

  useEffect(() => {
    ySpring.set(plotData.y)
  }, [plotData?.y, ySpring])

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

  const yPosition = useTransform(ySpring, (value) => `${value}%`)

  return (
    <>
      <defs>
        <linearGradient
          id={lineStyle.gradientFill.id || 'grad1'}
          x1={lineStyle.gradientFill.x1}
          y1='0%'
          x2={lineStyle.gradientFill.x2}
          y2='0%'
          spreadMethod='pad'
          reverse={`${lineStyle.gradientFill.reverse}` || 'false'}
        >
          {lineStyle.gradientFill.stops.map((fill, idx) => (
            <stop key={idx} offset={fill.stop} stopColor={fill.color} stopOpacity={fill.opacity} />
          ))}
        </linearGradient>
      </defs>

      <StrikeCursorG y={yPosition} x={textStyle.justify === 'left' ? '0%' : '100%'} id='newStrikeCursor'>
        {!lineStyle.hidden && (
          <StrikeLine
            id='strikeLine'
            x='0'
            y={LINE_BASE_Y_POSITION}
            width='100%'
            height={lineStyle?.width || STRIKE_LINE_WIDTH}
            fill={`url(#${lineStyle.gradientFill.id || 'grad1'})`}
          />
        )}
        <TextBox
          id='strikePriceBox'
          title='Strike Price'
          aboveLabel={plotData.aboveLabel}
          label={plotData.label}
          belowLabel={plotData.belowLabel}
          textCss={textCss}
          textJustify={textStyle.justify}
          textSize={textStyle.size}
        />
      </StrikeCursorG>
    </>
  )
}

const StrikeLine = styled.rect``

const StrikeCursorG = styled(motion.svg)`
  overflow: visible;
`
