import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'

import { useViewport } from 'contexts/viewport/useViewport'
import ms from 'ms'
import { currencyFormatter } from 'utils'
import { LONG_DASH } from 'constants/index'
import { getGameParameters } from 'constants/games'
import { usePrevious } from 'utils/hooks'
import { isEqual } from 'lodash'
import { use24hGameRoundData } from 'hooks/games/use24hGameRoundData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { BigNumber } from 'ethers'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'
import { useCurrentPrice } from 'hooks/gameEngine/usePriceFeed'

highcharts3d(Highcharts)

const MIN_POINTS = 20
const currentSeriesOptions = {
  name: 'Current',
  data: [],
  animation: false,
  dataLabels: {
    useHTML: true,
    enabled: true,
    formatter: function () {
      const lastIndex = this.series.points.length - 1
      const lastPoint = this.series.points[lastIndex]
      if (this.key !== lastPoint.x) return ''
      return `
              <div class="currentWrapper">
                <div class="currentPrice">${lastPoint.price}</div>
                <label class="currentStats"> ${lastPoint.delta || LONG_DASH}</label>
              </div > `
    }
  }
}

const symbolChartOptions = {
  title: {
    text: ''
  },
  chart: {
    type: 'spline',
    backgroundColor: 'transparent',
    animation: true,
    plotBackgroundColor: 'rgba(0,0,0,0)'
  },
  xAxis: {
    visible: false,
    type: 'datetime',
    minorTickLength: 0,
    tickLength: 0
  },
  yAxis: {
    visible: false
  },
  plotOptions: {
    animation: true,
    spline: {
      enableMouseTracking: false,
      lineWidth: 2,
      marker: {
        enabled: false
      }
    }
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  }
}

const composeGraphOptions = (extraParams) => ({
  ...symbolChartOptions,
  series: [{ ...currentSeriesOptions, ...extraParams }]
})

export const G24hrSimplePriceGraph = ({ className }) => {
  const { formatToken } = useToken()
  const containerRef = useRef()
  const chartRef = useRef()
  const { width: windowWidth } = useViewport()
  const [graphOptions, setGraphOptions] = useState(composeGraphOptions())

  const { activeGameId } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(activeGameId)
  const graphPoints = useRef([])
  const { currentPrice: lastPrice } = useCurrentPrice(activeGameId)
  const prevPrice = usePrevious(lastPrice)

  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, tokenColor } = useMemo(
    () => getGameParameters(activeGameId) || {},
    [activeGameId]
  )

  const priceDeltaBN =
    liveRoundData.strikePrice && lastPrice?.value
      ? lastPrice.valueBN.sub(BigNumber.from(liveRoundData.strikePrice))
      : Zero

  const isUp = priceDeltaBN.gte(Zero)

  useEffect(() => {
    if (isEqual(prevPrice, lastPrice)) return
    const priceDeltaAbs = liveRoundData.strikePrice
      ? `${((formatToken(priceDeltaBN.abs()) / formatToken(BigNumber.from(liveRoundData.strikePrice))) * 100).toFixed(
          4
        )}%`
      : LONG_DASH
    const priceChange = `${currencyFormatter(formatToken(priceDeltaBN), {
      decimalDigits
    })} (${priceDeltaAbs})`
    const point = {
      price: currencyFormatter(lastPrice?.value),
      x: lastPrice?.timestamp,
      y: lastPrice?.value,
      delta: priceDeltaBN.isZero() ? ' ' : priceChange
    }
    graphPoints.current = [...graphPoints.current, point]
    const chart = chartRef.current?.chart
    if (chart && graphPoints.current) {
      const data = graphPoints.current.slice(-MIN_POINTS)
      setGraphOptions(composeGraphOptions({ data, color: tokenColor }))
    }
  }, [lastPrice, prevPrice, tokenColor, priceDeltaBN])

  useEffect(() => {
    if (chartRef?.current?.chart) {
      const chart = chartRef.current.chart
      containerRef.current.children[0].style.overflow = ''
      chart.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      chart.redraw()
    }
  }, [windowWidth, chartRef?.current?.chart])

  return (
    <ChartContainer id='simplePriceGraph' ref={containerRef} className={className} isUp={isUp}>
      <HighchartsReact ref={chartRef} highcharts={Highcharts} options={graphOptions}></HighchartsReact>
    </ChartContainer>
  )
}

const cssUp = css`
  color: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  color: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`

const currentLabel = css`
  .currentWrapper {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(18px, -40%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .currentPrice {
    position: relative;
    background: none;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    margin: 0px 0 0 0;
    letter-spacing: -0.02em;
    //line-height: 0em;
    color: rgba(255, 255, 255, 1);
    ${({ theme }) => theme.breakPoints['xs']} {
      font-size: 1.4rem;
    }
  }
  .currentStats {
    text-shadow: none;
    font-size: 0.7rem;
    font-weight: 400;
    ${({ isUp }) => (isUp ? cssUp : cssDown)}
  }
`

const ChartContainer = styled.figure`
  height: 10vw;
  width: 40%;
  max-width: 40%;
  ${currentLabel}
  .highcharts-container {
    overflow: visible !important;
  }
`
