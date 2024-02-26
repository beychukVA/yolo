import React from 'react'
import PropTypes from 'prop-types'

import { timeFormat } from 'd3-time-format'
import { format } from 'd3-format'

import { scaleTime } from 'd3-scale'
import { utcDay, utcMinute } from 'd3-time'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils'
import fitDimensions from 'lib/react-stockcharts/lib/helper/fitDimensions'
import { CrossHairCursor } from 'react-stockcharts/lib/coordinates'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { YoloMouseCoordinateX } from 'lib/react-stockcharts/lib/coordinates/YoloMouseCoordinate/YoloMouseCoordinateX'
import { YoloMouseCoordinateY } from 'lib/react-stockcharts/lib/coordinates/YoloMouseCoordinate/YoloMouseCoordinateY'
import { currencyFormatter } from 'utils'
import { YoloRefCoordinate } from 'lib/react-stockcharts/lib/coordinates/YoloRefCoordinate/YoloRefCoordinate'
import { YoloMarkerCoordinate } from 'lib/react-stockcharts/lib/coordinates/YoloMarkerCoordinate/YoloMarkerCoordinate'
import { icons } from 'common'

class CandleStickChart extends React.Component {
  render() {
    const { type, width, height, ratio, theme } = this.props
    const {
      data,
      currentPrice,
      fiatDecimals,
      result,
      orderData,
      liveOrderData,
      isUp,
      iconUp,
      yExtents,
      xExtendOffset,
      widthRatio
    } = this.props
    const xAccessor = (d) => d.date
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - xExtendOffset])]

    const margin = { left: 60, right: 160, top: 30, bottom: 30 }
    const gridHeight = height - margin.top - margin.bottom
    const gridWidth = width - margin.left - margin.right - 50

    const candleColor = (d) => (d.close > d.open ? theme.themeColors.priceGraphUp : theme.themeColors.priceGraphDown)
    const barColor = (d) => (d.close > d.open ? theme.themeColors.priceGraphBarUp : theme.themeColors.priceGraphBarDown)

    const yGrid = {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: 'ShortDash',
      tickStrokeOpacity: 0,
      tickStroke: '#727479',
      tickStrokeWidth: 1,
      stroke: 'hsl(223,16%,15%)',
      strokeWidth: 2
    }
    const xGrid = {
      innerTickSize: -1 * gridHeight,
      tickStrokeDasharray: 'ShortDash',
      tickStrokeOpacity: 0.4,
      tickStroke: '#727479',
      tickStrokeWidth: 1,
      stroke: 'hsl(223,16%,15%)',
      strokeWidth: 2
    }

    // timeFormat('%m/%d/%y @ %I:%M:%S UTC')
    const toolTipDateFormat = timeFormat('%m/%d/%y @ %I:%M:%S')
    const xAxisDateFormat = timeFormat('%I:%M:%S')
    const numberFormat = format('.2f')

    function tooltipContent(ys) {
      return ({ currentItem, xAccessor }) => {
        return {
          x: toolTipDateFormat(xAccessor(currentItem)),
          y: [
            {
              label: 'open',
              value: currentItem.open && numberFormat(currentItem.open)
            },
            {
              label: 'high',
              value: currentItem.high && numberFormat(currentItem.high)
            },
            {
              label: 'low',
              value: currentItem.low && numberFormat(currentItem.low)
            },
            {
              label: 'close',
              value: currentItem.close && numberFormat(currentItem.close)
            },
            {
              label: 'volume',
              value: currentItem.volume && numberFormat(currentItem.volume)
            }
          ]
            .concat(
              ys.map((each) => ({
                label: each.label,
                value: each.value(currentItem),
                stroke: each.stroke
              }))
            )
            .filter((line) => line.value)
        }
      }
    }
    return (
      <ChartCanvas
        type={type}
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 170, top: 10, bottom: 30 }}
        // seriesName='MSFT'
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <CrossHairCursor stroke='hsl(59,17%,38%)' />
        <Chart id={1} yExtents={[(d) => d.volume]} height={150} origin={(w, h) => [0, h - 150]}>
          {/* <YAxis axisAt='left' orient='left' ticks={5} tickFormat={format('.2s')} /> */}
          <BarSeries
            yAccessor={(d) => d.volume}
            fill={barColor}
            width={timeIntervalBarWidth(utcMinute)}
            widthRatio={widthRatio}
          />
        </Chart>
        <Chart id={2} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt='bottom' orient='bottom' ticks={6} {...xGrid} />
          <YAxis axisAt='left' orient='left' ticks={5} {...yGrid} />
          <CandlestickSeries
            width={timeIntervalBarWidth(utcMinute)}
            widthRatio={widthRatio}
            wickStroke={candleColor}
            fill={candleColor}
            stroke={candleColor}
          />

          {!!orderData.entryPrice && (
            <YoloRefCoordinate
              id='entryPrice'
              refPrice={orderData.entryPrice}
              refDecimals={fiatDecimals}
              refLabel={'ENTRY'}
              priceDx={10}
              mainColor='hsl(221,100%,58%)'
              refLabelFill='hsl(221,100%,31%)'
            />
          )}
          {!!orderData.bustPrice && (
            <YoloRefCoordinate
              id='orderBust'
              refPrice={orderData.bustPrice}
              refDecimals={fiatDecimals}
              refLabel={'BUST'}
              priceDx={10}
              lineGradOrient='left'
              refLabelColor='hsl(0,0%,100%,.6)'
              refLabelFill='hsl(340,88%,0%)'
              refLabelStroke='hsl(340,88%,46%)'
              mainColor='hsl(340,88%,46%)'
            />
          )}
          {!!liveOrderData.bustPrice && (
            <YoloRefCoordinate
              id='liveBust'
              refPrice={liveOrderData.bustPrice}
              refDecimals={fiatDecimals}
              refLabel={'BUST'}
              priceDx={10}
              lineGradOrient='left'
              refLabelColor='hsl(0,0%,100%,.6)'
              refLabelFill='hsl(340,88%,0%)'
              refLabelStroke='hsla(340,88%,46%, .6)'
              mainColor='hsla(340,88%,46%, .6)'
            />
          )}
          <YoloRefCoordinate
            id='currentPrice'
            refPrice={currentPrice}
            refDecimals={fiatDecimals}
            refLabel={'CURRENT'}
            priceDx={10}
            lineGradOrient='right'
            mainColor={isUp ? 'hsl(126,100%,38%)' : 'hsl(340,88%,46%)'}
            refLabelFill={isUp ? 'rgb(35,85,24)' : 'rgb(100,18,40)'}
            lineDasharray={[10, 10]}
            iconSrc={iconUp ? icons.bid_direction_up_icon : icons.bid_direction_down_icon}
            iconWidth={12}
            hideLine={false}
          />
          <YoloMouseCoordinateY
            id={`mouseYLabel`}
            //position
            at='left'
            orient='right'
            //path
            fill={'hsl(0,0%,44%)'}
            baseScale={0.12}
            //text
            fontFamily='Inter'
            fontWeight={400}
            fontSize='0.65rem' //should be always in rem
            textOffsetX={0}
            textFill={'hsl(0,0%,0%)'}
            displayFormat={(d) => currencyFormatter(d, { decimalDigits: 2, noCurrencySign: true })}
          />
          <HoverTooltip
            yAccessor={(d) => d.open}
            tooltipContent={tooltipContent([])}
            bgFill='#2159d1'
            bgOpacity='0.2'
            fontSize={15}
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
}

CandleStickChart.defaultProps = {
  type: 'svg'
}

CandleStickChart = fitDimensions(CandleStickChart)

export { CandleStickChart }
