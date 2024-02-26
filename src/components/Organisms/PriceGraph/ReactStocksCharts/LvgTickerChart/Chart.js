import React from 'react'
import PropTypes from 'prop-types'

import { timeFormat } from 'd3-time-format'
import { curveMonotoneX } from 'd3-shape'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { CrossHairCursor } from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'

import LineSeries from 'lib/react-stockcharts/lib/series/LineSeries'
import fitDimensions from 'lib/react-stockcharts/lib/helper/fitDimensions'
import { YoloMarkerCoordinate } from 'lib/react-stockcharts/lib/coordinates/YoloMarkerCoordinate/YoloMarkerCoordinate'
import { YoloRefCoordinate } from 'lib/react-stockcharts/lib/coordinates/YoloRefCoordinate/YoloRefCoordinate'
import { YoloMouseCoordinateX } from 'lib/react-stockcharts/lib/coordinates/YoloMouseCoordinate/YoloMouseCoordinateX'
import { YoloMouseCoordinateY } from 'lib/react-stockcharts/lib/coordinates/YoloMouseCoordinate/YoloMouseCoordinateY'

import { AnimatePresence } from 'framer-motion'
import { currencyFormatter } from 'utils'
import { icons } from 'common'

class LineChart extends React.Component {
  render() {
    const { type, width, height, ratio, theme } = this.props
    const {
      data: initialData,
      currentPrice,
      fiatDecimals,
      result,
      orderData,
      liveOrderData,
      isUp,
      yExtents,
      xExtendOffset
    } = this.props

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date)
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData)

    const yAccessor = (d) => d.price

    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - xExtendOffset])]

    let lineColor = 'hsl(0,0%,67%)'
    switch (result) {
      case 'win':
        lineColor = theme.themeColors.priceGraphGlowUp
        break
      case 'lost':
        lineColor = theme.themeColors.priceGraphGlowDown
        break
      default:
        lineColor = 'hsl(0,0%,67%)'
    }

    const margin = { left: 60, right: 160, top: 30, bottom: 30 }
    const gridHeight = height - margin.top - margin.bottom
    const gridWidth = width - margin.left - margin.right

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

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={margin}
        type={type}
        pointsPerPxThreshold={1}
        seriesName='MSFT'
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        displayXAccessor={displayXAccessor}
        panEvent={true}
        zoomEvent={true}
        clamp={true}
      >
        <CrossHairCursor stroke='hsl(59,17%,38%)' />
        <Chart
          id={1}
          yExtents={yExtents}
          // yExtents={(d) => {
          //   const dOffset = (d.price * yOffsetPercentage) / 100
          //   return [d.price + dOffset, d.price - dOffset, currentPrice]
          // }}
        >
          <XAxis axisAt='bottom' orient='bottom' ticks={5} {...xGrid} />
          <YAxis axisAt='left' orient='left' ticks={10} {...yGrid} />
          <LineSeries
            yAccessor={yAccessor}
            strokeDasharray='solid'
            strokeWidth={3}
            interpolation={curveMonotoneX}
            stroke={lineColor}
            theme={theme}
          />
          {/* We need to define how to manage the strikerice aka referencePrice */}
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
            iconSrc={isUp ? icons.bid_direction_up_icon : icons.bid_direction_down_icon}
            iconWidth={12}
          />

          <YoloMarkerCoordinate strikePrice={currentPrice} currentPrice={currentPrice} />
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
          <AnimatePresence>
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
          </AnimatePresence>
          <YoloMouseCoordinateX
            id={`mouseXLabel`}
            //position
            at='bottom'
            orient='top'
            snapX={true}
            //path
            fill={'hsl(0,0%,44%)'}
            baseScale={1}
            rectRadius={50}
            //text
            fontFamily='Inter'
            fontWeight={400}
            fontSize='0.65rem' //should be always in rem
            textOffsetX={0}
            textFill={'hsl(0,0%,0%)'}
            displayFormat={timeFormat('%m/%d/%y @ %I:%M:%S UTC')}
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
            displayFormat={(d) => currencyFormatter(d, { decimalDigits: fiatDecimals, noCurrencySign: true })}
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
}

LineChart.defaultProps = {
  type: 'svg'
}

LineChart = fitDimensions(LineChart)

export { LineChart }
