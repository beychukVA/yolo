import React from 'react'
import { css } from 'styled-components'
import { HorizontalCursor } from './SvgComponents/HorizontalCursor'
import { memoThis } from 'utils/react'

const textCss = css`
  fill: ${({ theme }) => theme.themeColors.priceGraphStrike};
  opacity: 0.25;
  font-weight: 500 !important;
`
const lineStyle = {
  width: 2,
  gradientFill: {
    id: 'startGrad',
    stops: [
      { stop: '0%', color: 'rgba(42, 109, 255)', opacity: 0.1 },
      { stop: '100%', color: 'rgba(42, 109, 255)', opacity: 0.2 }
    ]
  }
}

const textStyle = {
  size: 'small',
  justify: 'left',
  xOffset: '-10'
}
export const StartLine = memoThis(({ refPriceBN }) => {
  return <HorizontalCursor plotData={{ label: `START`, y: 50 }} configObj={{ textCss, textStyle, lineStyle }} />
})
