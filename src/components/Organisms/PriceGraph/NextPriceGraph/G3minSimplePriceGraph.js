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
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useG3minGraphData } from 'hooks/gameEngine/g3minGameEngine/useG3minGraphData'
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

export const G3minSimplePriceGraph = ({ className }) => {
  const { activeGameId } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(activeGameId)
  const { liveGraphData: initialGraphData } = useG3minGraphData(activeGameId)
  const { currentPrice } = useCurrentPrice(activeGameId)

  const { strikePrice } = liveRoundData

  const containerRef = useRef()
  const chartRef = useRef()
  const { width: windowWidth } = useViewport()
  const [graphOptions, setGraphOptions] = useState(composeGraphOptions())
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, tokenColor } = useMemo(
    () => getGameParameters(activeGameId) || {},
    [activeGameId]
  )

  const priceDelta = strikePrice && currentPrice ? currentPrice.value - strikePrice : 0
  const isUp = priceDelta >= 0
  const priceDeltaAbs = strikePrice ? `${((Math.abs(priceDelta) / strikePrice) * 100).toFixed(2)}%` : LONG_DASH
  const priceChange = `${currencyFormatter(priceDelta, {
    decimalDigits
  })} (${priceDeltaAbs})`

  const formatSeries = useCallback(
    (rawData) => {
      const plotPoints = rawData.map((item, idx) => {
        const price = currencyFormatter(item[0], {
          decimalDigits
        })
        const x = ms(`${item[1][0]}s`)
        const y = item[1][1]
        const point = { price, x, y, delta: priceChange }
        return idx > 0 ? point : null
      })
      const trimmedPlotPoints = plotPoints.filter((item) => !!item)
      return rawData.length > 3 ? trimmedPlotPoints.slice(-MIN_POINTS) : []
    },
    [priceChange, decimalDigits]
  )

  useEffect(() => {
    const chart = chartRef.current?.chart
    if (chart && initialGraphData) {
      setGraphOptions(composeGraphOptions({ data: formatSeries(initialGraphData), color: tokenColor }))
    }
  }, [activeGameId, formatSeries, initialGraphData, tokenColor])

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
