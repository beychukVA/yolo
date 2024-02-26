import React from 'react'

import { hexToRGBA, isDefined } from 'react-stockcharts/lib/utils'

import styled from 'styled-components'

/* eslint-disable react/prop-types */
export function renderSVG(props) {
  const { className } = props
  const edge = helper(props)
  if (edge === null) return null
  let line, coordinateBase, coordinate, arrow

  const strikeGradId = `strikeGrad-${Date.now() + Math.random()}`

  if (isDefined(edge.coordinateBase)) {
    const { txtAreaWidth, rectWidth, baseScale, baseOffsetY, baseGlow, type } = edge.coordinateBase

    const path = `
      M${txtAreaWidth + 65}, 10
      h-${txtAreaWidth}
      c-41,0,-74.2,33.2,-74.2,74.2
      v8.2
      c0,41,33.2,74.2,74.2,74.2
      h${txtAreaWidth}
      c41,0,131.9,-33.2,131.9,-74.2
      l0,0
      c0,-40.9,-90.9,-82.4,-131.9,-82.4
      z
    `

    const xBaseShape = (
      <path
        d={path}
        // className='react-stockchart-text-background'
        stroke={edge.coordinateBase.stroke}
        strokeLinejoin='miter'
        strokeOpacity={edge.coordinateBase.strokeOpacity}
        strokeWidth={edge.coordinateBase.strokeWidth}
        fill={edge.coordinateBase.fill}
        fillOpacity={edge.coordinateBase.opacity}
        filter={isDefined(edge.coordinateBase.baseGlow) ? `url(#glow-${baseGlow.id})` : ''}
      />
    )
    const vBaseShape = <circle cx='0' cy='0' r='10' fill='orange' />

    coordinateBase =
      edge.orient === 'left' ? (
        <g
          key={1}
          transform={`translate(${edge.coordinateBase.edgeXRect + rectWidth},${
            edge.coordinateBase.edgeYRect + baseOffsetY
          }), scale(-${baseScale}, ${baseScale})`}
        >
          <defs>
            <filter id={`glow-${baseGlow.id}`}>
              <feFlood result='flood' floodColor={baseGlow.color} floodOpacity={baseGlow.opacity}></feFlood>
              <feComposite in='flood' in2='SourceGraphic' operator='in' result='color-out'></feComposite>
              <feGaussianBlur result='color-out' stdDeviation={baseGlow.stdDeviation} in='mask'></feGaussianBlur>
              <feOffset in='shadow' dx='0' dy='0' result='color-out'></feOffset>
              <feMerge>
                <feMergeNode in='drop-shadow'></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          {type === 'horizontal' ? xBaseShape : vBaseShape}
        </g>
      ) : (
        <g
          key={1}
          transform={`translate(${edge.coordinateBase.edgeXRect},${edge.coordinateBase.edgeYRect}), scale(${baseScale},${baseScale})`}
        >
          {type === 'horizontal' ? xBaseShape : vBaseShape}
        </g>
      )
    coordinate = (
      <TXT
        id={`${edge.id}.textNodeId`}
        // id={`${edge.id}.textNodeId`}
        key={2}
        x={edge.coordinate.edgeXText}
        y={edge.coordinate.edgeYText}
        textAnchor={edge.coordinate.textAnchor}
        alignmentBaseline={edge.coordinate.alignmentBaseline}
        fontFamily={edge.coordinate.fontFamily}
        textWeight={edge.coordinate.fontWeight}
        fontSize={edge.coordinate.fontSize}
        dy={'0px'}
        fill={edge.coordinate.textFill}
      >
        {edge.coordinate.displayCoordinate}
      </TXT>
    )
  }

  return (
    <g className={className}>
      {line}
      {coordinateBase}
      {coordinate}
    </g>
  )
}
/* eslint-enable react/prop-types */
function helper(props) {
  //Position Props
  const { id, coordinate: displayCoordinate, show, type, orient, edgeAt } = props

  //Pixel Position props
  const { x1, y1, x2, y2, dx } = props

  //Path Props
  const { fill, opacity, stroke, strokeOpacity, strokeWidth, baseScale, baseOffsetY, baseGlow } = props

  //Text Props
  const { fontFamily, fontWeight, fontSize, textFill, textOffsetX } = props

  const { rectWidth, rectHeight, rectRadius, textBBox } = props

  if (!show) return null

  let coordinateBase, coordinate
  if (isDefined(displayCoordinate)) {
    const textAnchor = orient === 'right' ? 'start' : 'end'
    const alignmentBaseline = 'middle'

    let edgeXRect, edgeYRect, edgeXText, edgeYText

    const txtAreaWidth = textBBox?.width / baseScale

    if (type === 'horizontal') {
      edgeXRect = dx + (orient === 'right' ? edgeAt + 1 : edgeAt - rectWidth - 1)
      edgeYRect = y1 - rectHeight / 2 - strokeWidth
      edgeXText =
        dx + (orient === 'right' ? edgeAt + rectHeight / 2 + textOffsetX : edgeAt - rectHeight / 2 - textOffsetX)
      edgeYText = y1 + 1
    } else {
      const dy = orient === 'bottom' ? strokeWidth - 1 : -strokeWidth + 1
      edgeXRect = x1 - rectWidth / 2
      edgeYRect = (orient === 'bottom' ? edgeAt : edgeAt - rectHeight) + dy
      edgeXText = x1
      edgeYText = (orient === 'bottom' ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2) + dy
    }

    coordinateBase = {
      type,
      edgeXRect,
      edgeYRect,
      rectHeight: rectHeight + strokeWidth,
      rectWidth,
      rectRadius,
      txtAreaWidth,
      baseScale,
      fill,
      opacity,
      stroke,
      strokeOpacity,
      strokeWidth,
      baseOffsetY,
      baseGlow
    }
    coordinate = {
      edgeXText,
      edgeYText,
      textAnchor,
      alignmentBaseline,
      fontFamily,
      fontWeight,
      fontSize,
      textFill,
      displayCoordinate,
      textOffsetX
    }
  }

  return {
    id,
    coordinateBase,
    coordinate,
    orient
  }
}

export function drawOnCanvas(ctx, props) {
  const { fontSize, fontFamily } = props

  ctx.font = `${fontSize} ${fontFamily}`
  ctx.textBaseline = 'middle'
  const width = Math.round(ctx.measureText(props.coordinate).width)

  const edge = helper({ ...props, rectWidth: width })

  if (edge === null) return

  ctx.setLineDash([])
  if (isDefined(edge.coordinateBase)) {
    const { rectWidth, rectHeight, rectRadius } = edge.coordinateBase

    ctx.fillStyle = hexToRGBA(edge.coordinateBase.fill, edge.coordinateBase.opacity)
    if (isDefined(edge.coordinateBase.stroke)) {
      ctx.strokeStyle = hexToRGBA(edge.coordinateBase.stroke, edge.coordinateBase.strokeOpacity)
      ctx.lineWidth = edge.coordinateBase.strokeWidth
    }

    let x = edge.coordinateBase.edgeXRect
    const y = edge.coordinateBase.edgeYRect
    const halfHeight = rectHeight / 2
    const rx = halfHeight * 2.3
    const ry = halfHeight
    let textX = edge.coordinate.edgeXText

    ctx.beginPath()
    if (edge.orient === 'right') {
      ctx.moveTo(x + ry, y)
      ctx.lineTo(x + rectWidth, y)
      const cpx = x + rectWidth + rx
      const cpy1 = y
      const middleX = cpx
      const middleY = y + ry
      ctx.quadraticCurveTo(cpx, cpy1, middleX, middleY)
      const cpy2 = y + rectHeight
      const endX = x + rectWidth
      const endY = y + rectHeight
      ctx.quadraticCurveTo(cpx, cpy2, endX, endY)
      ctx.lineTo(x + rectWidth, y + rectHeight)
      ctx.lineTo(x + ry, y + rectHeight)
      ctx.quadraticCurveTo(x, y + rectHeight, x, y + ry)
      ctx.quadraticCurveTo(x, y, x + ry, y)
      ctx.closePath()
    } else if (edge.orient === 'left') {
      ctx.moveTo(x, y)
      ctx.lineTo(x + rectWidth, y)
      ctx.quadraticCurveTo(x + rectWidth + ry, y, x + rectWidth + ry, y + ry)
      ctx.quadraticCurveTo(x + rectWidth + ry, y + rectHeight, x + rectWidth, y + rectHeight)
      ctx.lineTo(x, y + rectHeight)

      const cpx = x - rx
      const cpy1 = y + rectHeight
      const middleX = cpx
      const middleY = y + ry
      ctx.quadraticCurveTo(cpx, cpy1, middleX, middleY)
      const cpy2 = y
      const endX = x
      const endY = y
      ctx.quadraticCurveTo(cpx, cpy2, endX, endY)
      ctx.closePath()
    } else {
      textX = edge.coordinate.edgeXText + width / 2
      pillShape(ctx, x, y, rectWidth, rectHeight)
    }
    ctx.fill()
    if (isDefined(edge.coordinateBase.stroke)) {
      ctx.stroke()
    }
    ctx.fillStyle = edge.coordinate.textFill
    ctx.textAlign = edge.coordinate.textAnchor === 'middle' ? 'center' : edge.coordinate.textAnchor
    ctx.fillText(edge.coordinate.displayCoordinate, textX, edge.coordinate.edgeYText)
  }
}

function pillShape(ctx, x, y, width, height) {
  const radius = height / 2
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + width, y)
  ctx.quadraticCurveTo(x + width + radius, y, x + width + radius, y + radius)
  ctx.quadraticCurveTo(x + width + radius, y + height, x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.quadraticCurveTo(x - radius, y + height, x - radius, y + radius)
  ctx.quadraticCurveTo(x - radius, y, x, y)

  ctx.closePath()
}

// export default EdgeCoordinate;
const TXT = styled.text`
  font-weight: ${({ textWeight }) => textWeight};
`
