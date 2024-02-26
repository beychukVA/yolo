import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { drawOnCanvas, renderSVG } from './EdgeCoordinateV3'
import { drawOnCanvas, renderSVG } from './YoloMouseCoordinateRenders'

import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent'
import { getMouseCanvas } from 'react-stockcharts/lib/GenericComponent'
import { isNotDefined } from 'react-stockcharts/lib/utils'
import { findDOMNode } from 'react-dom'

class YoloMouseCoordinateX extends Component {
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
    return renderSVG(props, textBBox)
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

YoloMouseCoordinateX.propTypes = {
  displayFormat: PropTypes.func.isRequired,
  yAxisPad: PropTypes.number,
  rectWidth: PropTypes.number,
  rectHeight: PropTypes.number,
  orient: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  at: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  fill: PropTypes.string,
  opacity: PropTypes.number,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  textFill: PropTypes.string,
  snapX: PropTypes.bool
}

function customX(props, moreProps) {
  const { xScale, xAccessor, currentItem, mouseXY } = moreProps
  const { snapX } = props
  const x = snapX ? xScale(xAccessor(currentItem)) : mouseXY[0]

  const { displayXAccessor } = moreProps
  const { displayFormat } = props
  const coordinate = snapX ? displayFormat(displayXAccessor(currentItem)) : displayFormat(xScale.invert(x))
  return { x, coordinate }
}

YoloMouseCoordinateX.defaultProps = {
  yAxisPad: 0,
  rectWidth: 80,
  rectHeight: 20,

  // rectRadius: 5,
  // stroke: '#684F1D',
  strokeOpacity: 1,
  strokeWidth: 1,

  orient: 'bottom',
  at: 'bottom',

  fill: '#525252',
  opacity: 1,
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: 13,
  textFill: '#FFFFFF',
  snapX: true,
  customX: customX
}

function helper(props, moreProps) {
  const { show, currentItem } = moreProps
  const {
    chartConfig: { height }
  } = moreProps

  if (isNotDefined(currentItem)) return null

  const { customX } = props

  const { rectRadius } = props

  const { id, orient, at, rectWidth, rectHeight, dx } = props
  const { fill, opacity, fontFamily, fontSize, textFill, textOffsetX } = props
  const { stroke, strokeOpacity, strokeWidth, baseScale } = props

  const edgeAt = at === 'bottom' ? height : 0

  const { x, coordinate } = customX(props, moreProps)

  const type = 'vertical'
  const y1 = 0,
    y2 = height
  const hideLine = true

  const coordinateProps = {
    id,
    coordinate,
    show,
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
    rectRadius,

    dx,
    x1: x,
    x2: x,
    y1,
    y2
  }
  return coordinateProps
}

export { YoloMouseCoordinateX }
