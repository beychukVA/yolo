import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { curveMonotoneX } from 'd3-shape'

import { ChartCanvas, Chart } from 'react-stockcharts'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { fitDimensions } from 'react-stockcharts/lib/helper'
import { last, head } from 'react-stockcharts/lib/utils'
import LineSeries from 'lib/react-stockcharts/lib/series/LineSeries'
import { icons } from 'common'
import { YoloRefCoordinate } from 'lib/react-stockcharts/lib/coordinates/YoloRefCoordinate/YoloRefCoordinate'

class G3minLineChart extends React.Component {
  render() {
    const { type, width, height, ratio } = this.props
    const { data: initialData, strikePrice, currentPrice, startTime, roundLength, isUp } = this.props
    const { theme } = this.props
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date)
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData)

    const yAccessor = (d) => d.close

    const xExtents = [xAccessor(head(data)), xAccessor(last(data))]
    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={{ left: 0, right: 0, top: 60, bottom: 30 }}
        type={type}
        pointsPerPxThreshold={1}
        seriesName='MSFT'
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        displayXAccessor={displayXAccessor}
        panEvent={false}
        zoomEvent={false}
        clamp={true}
      >
        <Chart id={1} yExtents={(d) => [d.close, strikePrice, currentPrice]}>
          <StyledLineSeries
            yAccessor={yAccessor}
            strokeDasharray='Solid'
            strokeWidth={3}
            interpolation={curveMonotoneX}
            isUp={strikePrice < currentPrice}
            filter={`url(${strikePrice < currentPrice ? '#glowUp' : '#glowDown'})`}
            theme={theme}
          />
          <YoloRefCoordinate
            id='entryPrice'
            refPrice={strikePrice}
            refLabel={'STRIKE'}
            priceDx={130}
            lineGradOrient='right'
            mainColor='hsl(221,100%,58%)'
          />
          <YoloRefCoordinate
            id='currentPrice'
            refPrice={currentPrice}
            refLabel={'CURRENT'}
            priceDx={130}
            lineGradOrient='right'
            mainColor={isUp ? 'hsl(126,100%,38%)' : 'hsl(340,88%,46%)'}
            refLabelFill={isUp ? 'rgb(35,85,24)' : 'rgb(100,18,40)'}
            lineDasharray={[10, 10]}
            icon={isUp ? icons.bid_direction_up_icon : icons.bid_direction_down_icon}
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

G3minLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
}

G3minLineChart.defaultProps = {
  type: 'svg'
}
G3minLineChart = fitDimensions(G3minLineChart)

export { G3minLineChart }

const cssUp = css`
  stroke: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  stroke: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`

const StyledLineSeries = styled(LineSeries)`
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
`
