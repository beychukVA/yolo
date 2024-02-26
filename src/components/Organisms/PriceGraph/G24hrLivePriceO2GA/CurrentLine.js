import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { css } from 'styled-components'
import { currencyFormatter, linearInterpolator } from 'utils'
import { useToken } from 'utils/hooks/useToken'
import { HorizontalCurrentCursor } from './SvgComponents/HorizontalCurrentCursor'
import { memoThis } from 'utils/react'
import { Zero } from '@ethersproject/constants'

const VERTICAL_TRIMMER = 10
const RANGE = [100, 0]

const range = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]

const getPositionY = (value, yDomain) => linearInterpolator(yDomain, range)(value)
const getPositionX = (value, xDomain) => linearInterpolator(xDomain, [RANGE[1], RANGE[0]])(value)

const getCurrentDelta = (refPrice, currentPrice, domain) => {
  const delta = refPrice - currentPrice
  const positionY = getPositionY(delta, domain)
  return isNaN(positionY) ? 50 : positionY
}

const lineStyle = {
  hidden: false,
  width: 3,
  gradientUp: {
    id: 'downGrad',
    reverse: true,
    x1: '5%',
    x2: '100%',
    stops: [
      { stop: '0%', color: '#00c213', opacity: 0 },
      { stop: '100%', color: '#00c213', opacity: 1 }
    ]
  },
  gradientDown: {
    id: 'upGrad',
    reverse: true,
    x1: '5%',
    x2: '100%',
    stops: [
      { stop: '0%', color: '#DE0E54', opacity: 0 },
      { stop: '100%', color: '#DE0E54', opacity: 1 }
    ]
  }
}

const textStyle = {
  size: 'bigger',
  justify: 'right',
  xOffset: '0'
}

export const CurrentLine = memoThis(({ refPriceBN, currentPrice, xDomain, yDomain }) => {
  const { activeGameId } = useActiveGameData()
  const { gameLabel } = getGameParameters(activeGameId)
  const { formatToken: formatUSD } = useToken('USD')

  const [plotData, setPlotData] = useState({ aboveLabel: 'Current Price', belowLabel: gameLabel })

  const isUp = useMemo(() => currentPrice.valueBN?.gte(refPriceBN), [refPriceBN, currentPrice?.valueBN])

  const updatePosition = useCallback(() => {
    const refPrice = formatUSD(refPriceBN)
    const currentPriceFiat = formatUSD(currentPrice?.valueBN || Zero)
    const positionY = getCurrentDelta(refPrice, currentPriceFiat, yDomain)
    const positionX = getPositionX(currentPrice.timestamp, xDomain)
    setPlotData({
      ...plotData,
      label: currencyFormatter(formatUSD(currentPrice?.valueBN || Zero)),
      y: positionY,
      x: positionX
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refPriceBN, currentPrice?.valueBN, yDomain, formatUSD])

  useEffect(() => {
    updatePosition()
  }, [updatePosition])

  return (
    <HorizontalCurrentCursor
      plotData={plotData}
      isUp={isUp}
      configObj={{ textCss: isUp ? cssUp : cssDown, textStyle, lineStyle }}
    />
  )
})

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
