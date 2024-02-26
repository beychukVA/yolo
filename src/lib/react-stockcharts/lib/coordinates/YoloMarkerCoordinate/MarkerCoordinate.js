import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { drawOnCanvas, renderSVG } from './MarkerCoordinateFunctions'
import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent'
import { getAxisCanvas } from 'react-stockcharts/lib/GenericComponent'
import { findDOMNode } from 'react-dom'

class MarkerCoordinate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textBBox: {}
    }
    this.renderSVG = this.renderSVG.bind(this)
    this.drawOnCanvas = this.drawOnCanvas.bind(this)
  }

  componentDidMount() {
    if (this.props.id) {
      const node = document.getElementById(`${this.props.id}.textNodeId`)
      const componentDOM = findDOMNode(node)
      const BBox = componentDOM?.getBBox() || {}
      this.setState({ textBBox: BBox })
    }
  }

  drawOnCanvas(ctx, moreProps) {
    const props = helper(this.props, moreProps)
    drawOnCanvas(ctx, props)
  }
  renderSVG(moreProps) {
    const props = helper(this.props, moreProps)
    return renderSVG({ ...props, textBBox: this.state.textBBox })
  }
  render() {
    return (
      <GenericChartComponent
        className='markerPoint'
        clip={false}
        svgDraw={this.renderSVG}
        canvasDraw={this.drawOnCanvas}
        canvasToDraw={getAxisCanvas}
        drawOn={['pan']}
      />
    )
  }
}

MarkerCoordinate.propTypes = {
  at: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  price: PropTypes.number,
  dx: PropTypes.number,
  coreFill: PropTypes.string,
  radarFill: PropTypes.string
}

MarkerCoordinate.defaultProps = {
  at: 'left',
  price: 0,
  dx: 0,
  coreFill: 'hsl(0,0%,67%)',
  radarFill: 'hsla(0,0%,67%,.5)'
}

function helper(props, moreProps) {
  const { width } = moreProps
  const {
    chartConfig: { yScale }
  } = moreProps
  const [lowerYValue, upperYValue] = yScale.domain()

  const { id, price } = props
  const { at, dx } = props
  const { coreFill, radarFill } = props

  const x1 = 0,
    x2 = width

  const y = yScale(price)
  const show = price <= upperYValue && price >= lowerYValue

  const coordinateProps = {
    id,
    show,
    at,
    dx,
    x1,
    x2,
    y1: y,
    y2: y,
    coreFill,
    radarFill
  }
  return coordinateProps
}

export { MarkerCoordinate }
