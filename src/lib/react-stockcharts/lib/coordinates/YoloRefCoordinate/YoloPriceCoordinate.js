import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { drawOnCanvas, renderSVG } from './YoloPriceCoordinateRenders'
import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent'
import { getAxisCanvas } from 'react-stockcharts/lib/GenericComponent'
import { functor, strokeDashTypes } from 'react-stockcharts/lib/utils'
import { findDOMNode } from 'react-dom'

class YoloPriceCoordinate extends Component {
  constructor(props) {
    super(props)
    this.renderSVG = this.renderSVG.bind(this)
    this.drawOnCanvas = this.drawOnCanvas.bind(this)
  }

  drawOnCanvas(ctx, moreProps) {
    const props = helper(this.props, moreProps)
    drawOnCanvas(ctx, props)
  }
  renderSVG(moreProps) {
    const props = helper(this.props, moreProps)
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
        canvasToDraw={getAxisCanvas}
        drawOn={['pan']}
      />
    )
  }
}

YoloPriceCoordinate.propTypes = {
  //Position
  at: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  orient: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  price: PropTypes.number,
  yAxisPad: PropTypes.number,
  dx: PropTypes.number,
  //path
  opacity: PropTypes.number,
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  stroke: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWidth: PropTypes.number,
  baseOffsetY: PropTypes.number,
  baseGlow: PropTypes.object,
  //text
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  textFill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  displayFormat: PropTypes.func.isRequired,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.number,
  fontSize: PropTypes.string,
  textOffsetX: PropTypes.number,
  //line
  lineOpacity: PropTypes.number,
  lineStroke: PropTypes.string,
  lineWidth: PropTypes.number,
  strokeDasharray: PropTypes.oneOfType([PropTypes.oneOf(strokeDashTypes), PropTypes.array]),
  lineDx: PropTypes.number
}

YoloPriceCoordinate.defaultProps = {
  yAxisPad: 0,
  rectWidth: 50,
  rectHeight: 20,
  orient: 'left',
  at: 'left',
  price: 0,
  dx: 0,
  arrowWidth: 16,
  fill: '#BAB8b8',
  opacity: 1,
  lineOpacity: 0.2,
  lineStroke: '#000000',
  lineWidth: 1,
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: 13,
  textFill: '#FFFFFF',
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeDasharray: 'Solid',
  baseOffsetY: 0,
  textOffsetX: 0,
  lineDx: 0
}

function helper(props, moreProps) {
  const { width } = moreProps
  const {
    chartConfig: { yScale }
  } = moreProps
  const [lowerYValue, upperYValue] = yScale.domain()

  //Position Props
  const { at, orient, price, yClamp, dx } = props

  const { id, stroke, strokeDasharray, strokeOpacity, strokeWidth, baseScale, baseOffsetY, hideLine } = props
  const { rectWidth, rectHeight, displayFormat, textOffsetX, baseGlow } = props
  const {
    fill,
    opacity,
    fontFamily,
    fontSize,
    fontWeight,
    textFill,
    lineOpacity,
    lineStroke,
    lineWidth,
    lineGrad,
    lineGradOrient,
    lineDx
  } = props

  const { arrowShow, arrowColor, arrowIsUp, arrowWidth, arrowHeight, iconSrc, iconWidth, padding } = props

  const x1 = 0,
    x2 = width
  const edgeAt = at === 'right' ? width : 0

  const type = 'horizontal'

  const valueForYCalc = !yClamp ? price : price > upperYValue ? upperYValue : price < lowerYValue ? lowerYValue : price

  const y = yScale(valueForYCalc)

  const show = yClamp || (price <= upperYValue && price >= lowerYValue)

  // const coordinate = displayFormat(yScale.invert(y))
  const coordinate = displayFormat(price)

  const coordinateProps = {
    id,
    coordinate,
    show,
    type,
    orient,
    edgeAt,
    hideLine,
    lineOpacity,
    lineStroke,
    lineStrokeDasharray: strokeDasharray,
    stroke,
    strokeOpacity,
    strokeWidth,
    fill: functor(fill)(price),
    textFill: functor(textFill)(price),
    opacity,
    fontFamily,
    fontSize,
    fontWeight,
    rectWidth,
    rectHeight,
    tagX: at === 'right' ? width : 0,
    tagY: y,
    lineWidth,
    lineGrad,
    lineGradOrient,
    baseScale,
    baseOffsetY,
    textOffsetX,
    baseGlow,
    lineDx,
    arrowShow,
    arrowColor,
    arrowIsUp,
    arrowWidth,
    padding,
    arrowHeight,
    iconSrc,
    iconWidth,
    dx,
    x1,
    x2,
    y1: y,
    y2: y
  }
  return coordinateProps
}

export { YoloPriceCoordinate }
