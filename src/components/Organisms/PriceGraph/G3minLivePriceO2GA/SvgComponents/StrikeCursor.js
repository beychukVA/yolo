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

export const StrikeCursor = ({ gamePlotData }) => {
  const { gameId, strikePrice } = gamePlotData
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, gameLabel } = getGameParameters(gameId)

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
    <>
      <defs>
        <linearGradient id='strikeGrad' x1='40%' y1='0%' x2='100%' y2='0%' spreadMethod='pad'>
          <stop offset='0%' stopColor='rgba(42, 109, 255)' stopOpacity={1} />
          <stop offset='100%' stopColor='rgba(42, 109, 255)' stopOpacity={0} />
        </linearGradient>
      </defs>
      <StrikeCursorG y='50%' id='newStrikeCursor'>
        <StrikeLine
          id='strikeLine'
          x='0'
          y={LINE_BASE_Y_POSITION}
          width='100%'
          height={STRIKE_LINE_WIDTH}
          fill='url(#strikeGrad)'
        />
        <TextBox
          id='strikePriceBox'
          title='Strike Price'
          price={currencyFormatter(strikePrice || 0, { decimalDigits })}
          gameLabel={gameLabel}
          textCss={cssStrike}
          textJustify='left'
        />
      </StrikeCursorG>
    </>
  )
}

const cssStrike = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphStrike},
    1px -1px 0 ${theme.themeColors.priceGraphStrike},
    -1px 1px 0 ${theme.themeColors.priceGraphStrike},
    1px 1px 0 ${theme.themeColors.priceGraphStrike}
    `};
  fill: ${({ theme }) => theme.themeColors.priceGraphStrike};
`
const StrikeCursorG = styled.svg`
  overflow: visible;
`
const StrikeLine = styled.rect``
