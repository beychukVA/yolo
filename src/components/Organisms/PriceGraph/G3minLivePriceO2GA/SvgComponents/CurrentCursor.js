import React, { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { isEqual } from 'lodash'

import { getGameParameters } from 'constants/games'
import { currencyFormatter } from 'utils'
import { useViewport } from 'contexts/viewport/useViewport'
import { TextBox } from './TextBox'
import { motion } from 'framer-motion'
import { usePositionY } from './usePositionY'

const STRIKE_LINE_WIDTH = 3
const LINE_BASE_Y_POSITION = -2

const BREAK_POINTS = { '480px': 480 }

export const CurrentCursor = ({ gamePlotData, noLine = false }) => {
  const { gameId, currentPrice, strikePrice, lastValue, yDomain } = gamePlotData
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, gameLabel } = getGameParameters(gameId)

  const { width } = useViewport()
  const [offsets, setOffsets] = useState({})
  const isUp = useMemo(() => currentPrice > strikePrice, [currentPrice, strikePrice])

  const positionY = usePositionY({ lastValue, yDomain })

  // Width responsiveness
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
    <>
      <defs>
        <linearGradient id='CurrGrad' x1='0%' y1='0%' x2='60%' y2='0%' spreadMethod='pad' reverse='true'>
          <stop offset='0%' stopColor='rgb(255, 209, 0)' stopOpacity={0} />
          <stop offset='100%' stopColor='rgb(255, 209, 0)' stopOpacity={1} />
        </linearGradient>
      </defs>
      <StrikeCursorG y={positionY} x='100%' id='newStrikeCirsor'>
        {!noLine && (
          <CurrentLine
            id='currentLine'
            x='0'
            y={LINE_BASE_Y_POSITION}
            width='100%'
            height={STRIKE_LINE_WIDTH}
            fill='url(#CurrGrad)'
          />
        )}
        <TextBox
          id='currentPriceBox'
          title='Current Price'
          price={currencyFormatter(currentPrice || 0, { decimalDigits })}
          gameLabel={gameLabel}
          textCss={isUp ? cssUp : cssDown}
          textJustify='right'
        />
      </StrikeCursorG>
    </>
  )
}

const cssUp = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px 1px 0 ${theme.themeColors.priceGraphGlowUp}
    `};
  fill: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px 1px 0 ${theme.themeColors.priceGraphGlowDown}
    `};
  fill: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`

const StrikeCursorG = styled(motion.svg)`
  overflow: visible;
`
const CurrentLine = styled.rect``
