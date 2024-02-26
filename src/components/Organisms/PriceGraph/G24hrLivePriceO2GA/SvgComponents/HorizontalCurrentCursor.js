import { motion, useSpring, useTransform } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { isEqual } from 'lodash'

import { useViewport } from 'contexts/viewport/useViewport'
import { TextBox } from './TextBox'

const STRIKE_LINE_WIDTH = 3
const LINE_BASE_Y_POSITION = -1
const X_OFFSET = 4
const LINE_TEXT_MARGIN = 10

const BREAK_POINTS = { '480px': 480 }

export const HorizontalCurrentCursor = ({ plotData, isUp, configObj }) => {
  const { width } = useViewport()
  const [offsets, setOffsets] = useState({})
  const textRef = useRef()

  const { defaultY, textCss, lineStyle, textStyle = {} } = { defaultY: 50, ...configObj }
  const ySpring = useSpring(defaultY)

  const leadingPointX = useMemo(() => (isNaN(plotData.x) ? 0 : plotData.x), [plotData?.x])

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

  const {
    x: xText,
    y: yText,
    width: wText,
    height: hText
  } = useMemo(() => textRef.current?.getBBox() || {}, [textRef.current, plotData.label])

  return (
    <>
      <defs>
        <linearGradient
          id={lineStyle.gradientUp.id || 'grad1'}
          x1={lineStyle.gradientUp.x1}
          y1='0%'
          x2={lineStyle.gradientUp.x2}
          y2='0%'
          spreadMethod='pad'
          reverse={`${lineStyle.gradientUp.reverse}` || 'false'}
        >
          {lineStyle.gradientUp.stops.map((fill, idx) => (
            <stop key={idx} offset={fill.stop} stopColor={fill.color} stopOpacity={fill.opacity} />
          ))}
        </linearGradient>
        <linearGradient
          id={lineStyle.gradientDown.id || 'grad1'}
          x1={lineStyle.gradientDown.x1}
          y1='0%'
          x2={lineStyle.gradientDown.x2}
          y2='0%'
          spreadMethod='pad'
          reverse={`${lineStyle.gradientDown.reverse}` || 'false'}
        >
          {lineStyle.gradientDown.stops.map((fill, idx) => (
            <stop key={idx} offset={fill.stop} stopColor={fill.color} stopOpacity={fill.opacity} />
          ))}
        </linearGradient>
      </defs>

      <StrikeCursorG y={yPosition} x={textStyle.justify === 'left' ? '0%' : '100%'} id='newStrikeCursor'>
        {!lineStyle.hidden && (
          <>
            <StrikeLine
              id='strikeLine'
              x={`${-(100 + X_OFFSET - leadingPointX)}%`}
              y={LINE_BASE_Y_POSITION}
              xEndOffset={`calc(100% - ${plotData.x - X_OFFSET}% - ${wText + LINE_TEXT_MARGIN}px)`}
              xStartOffset='100%'
              height={lineStyle?.width || STRIKE_LINE_WIDTH}
              fill={`url(#${lineStyle[isUp ? 'gradientUp' : 'gradientDown'].id || 'grad1'})`}
            />
          </>
        )}
        {/* <line
          x1={`-${99 - plotData.x}%`}
          y1={LINE_BASE_Y_POSITION}
          x2={xText - 10}
          y2={LINE_BASE_Y_POSITION}
          stroke-width={STRIKE_LINE_WIDTH}
          css={textCss}
        /> */}
        {/* <rect x={xText - 10} y={yText} width={wText} height={hText} stroke='red' /> */}
        <TextBox
          id='strikePriceBox'
          boxRef={textRef}
          title='Strike Price'
          aboveLabel={plotData.aboveLabel}
          label={plotData.label}
          belowLabel={plotData.belowLabel}
          textCss={textCss}
          textJustify={textStyle.justify}
          textSize={textStyle.size}
          xOffset={textStyle.xOffset}
        />
      </StrikeCursorG>
    </>
  )
}

const StrikeLine = styled.rect`
  width: ${({ xEndOffset }) => xEndOffset};
  ${({ css }) => css}
`

const StrikeCursorG = styled(motion.svg)`
  overflow: visible;
`
