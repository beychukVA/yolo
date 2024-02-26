import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { drawOnCanvas, renderSVG } from './YoloMouseCoordinateRenders'
import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent'
import { getMouseCanvas } from 'react-stockcharts/lib/GenericComponent'
import { isNotDefined } from 'react-stockcharts/lib/utils'
import { findDOMNode } from 'react-dom'

class YoloMouseCoordinateY extends Component {
  constructor(props) {
    super(props)
    this.renderSVG = this.renderSVG.bind(this)
    this.drawOnCanvas = this.drawOnCanvas.bind(this)
  }
  drawOnCanvas(ctx, moreProps) {
    const props = helper(this.props, moreProps)
    if (isNotDefined(props)) return null

    drawOnCanvas(ctx, props)
  }

  renderSVG(moreProps) {
    const props = helper(this.props, moreProps)
    if (isNotDefined(props)) return null
    const node = document.getElementById(`${this.props.id}.textNodeId`)
    const componentDOM = findDOMNode(node)
    const textBBox = componentDOM?.getBBox() || {}
    return renderSVG({ ...props, textBBox })
  }

  render() {
    return (
      <GenericChartComponent
        clip={false}
        svgDraw={this.renderSVG}
        canvasDraw={this.drawOnCanvas}
        canvasToDraw={getMouseCanvas}
        drawOn={['mousemove', 'pan', 'drag']}
      />
    )
  }
}

YoloMouseCoordinateY.propTypes = {
  displayFormat: PropTypes.func.isRequired,
  yAxisPad: PropTypes.number,
  rectWidth: PropTypes.number,
  rectHeight: PropTypes.number,
  orient: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  at: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  dx: PropTypes.number,
  fill: PropTypes.string,
  opacity: PropTypes.number,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  textFill: PropTypes.string,
  textOffsetX: PropTypes.number
}

YoloMouseCoordinateY.defaultProps = {
  yAxisPad: 0,
  rectWidth: 50,
  rectHeight: 20,
  orient: 'left',
  at: 'left',
  dx: 0,
  arrowWidth: 10,
  fill: '#525252',
  opacity: 1,
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: 13,
  textFill: '#FFFFFF',
  textOffsetX: 5,

  // stroke: '#684F1D',
  strokeOpacity: 1,
  strokeWidth: 1
}

function helper(props, moreProps) {
  const { chartId } = moreProps
  const { currentCharts, mouseXY } = moreProps

  if (isNotDefined(mouseXY)) return null
  if (currentCharts.indexOf(chartId) < 0) return null

  const { show } = moreProps
  if (!show) return null

  const y = mouseXY[1]
  const {
    chartConfig: { yScale }
  } = moreProps
  const { displayFormat } = props

  const coordinate = displayFormat(yScale.invert(y))

  return getYCoordinate(y, coordinate, props, moreProps)
}

export function getYCoordinate(y, displayValue, props, moreProps) {
  const { width } = moreProps

  const { id, orient, at, rectWidth, rectHeight, dx } = props
  const { fill, opacity, fontFamily, fontSize, textFill, textOffsetX } = props
  const { stroke, strokeOpacity, strokeWidth, baseScale } = props

  const x1 = 0,
    x2 = width
  const edgeAt = at === 'right' ? width : 0

  const type = 'horizontal'
  const hideLine = true

  const coordinateProps = {
    id,
    coordinate: displayValue,
    show: true,
    type,
    orient,
    edgeAt,
    hideLine,
    fill,
    baseScale,
    opacity,

    fontFamily,
    fontSize,
    textFill,
    textOffsetX,

    stroke,
    strokeOpacity,
    strokeWidth,

    rectWidth,
    rectHeight,

    dx,
    x1,
    x2,
    y1: y,
    y2: y
  }
  return coordinateProps
}

export { YoloMouseCoordinateY }
