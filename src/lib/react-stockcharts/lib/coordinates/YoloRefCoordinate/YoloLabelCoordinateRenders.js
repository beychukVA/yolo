import React from 'react'

import { hexToRGBA, isDefined, getStrokeDasharray } from 'react-stockcharts/lib/utils'

import styled from 'styled-components'

/* eslint-disable react/prop-types */
export function renderSVG(props) {
  const { className } = props
  const edge = helper({ ...props, textPadding: 0 })
  if (edge === null) return null
  let line, coordinateBase, coordinate, arrow

  const strikeGradId = `strikeGrad-${Date.now() + Math.random()}`

  if (isDefined(edge.line)) {
    line = isDefined(edge.line.lineGrad) ? (
      <g>
        <defs>
          <linearGradient
            id={strikeGradId}
            x1={edge.line.lineGradOrient === 'right' ? '40%' : '0%'}
            y1='0%'
            x2='100%'
            y2='0%'
            spreadMethod='pad'
          >
            {edge.line.lineGrad.map((stop, idx) => (
              <stop key={idx} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
            ))}
          </linearGradient>
        </defs>
        <rect
          id='strikeLine'
          x={edge.line.x1}
          y={edge.line.y1 - edge.line.strokeWidth / 2}
          width={edge.line.lineEnd - edge.line.x1}
          height={edge.line.strokeWidth}
          fill={`url(#${strikeGradId})`}
        />
      </g>
    ) : (
      <line
        strokeOpacity={edge.line.opacity}
        stroke={edge.line.stroke}
        strokeWidth={edge.line.strokeWidth}
        strokeDasharray={
          getStrokeDasharray(edge.line.strokeDasharray) !== 'none'
            ? getStrokeDasharray(edge.line.strokeDasharray)
            : edge.line.strokeDasharray
        }
        x1={edge.line.x1}
        y1={edge.line.y1}
        x2={edge.line.lineEnd}
        y2={edge.line.y2}
      />
    )
  }
  if (isDefined(edge.coordinateBase)) {
    const { txtAreaWidth, rectWidth, baseScale, baseOffsetY, baseGlow } = edge.coordinateBase

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

    const baseShape = (
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
          {baseShape}
        </g>
      ) : (
        <g
          key={1}
          transform={`translate(${edge.coordinateBase.edgeXRect},${edge.coordinateBase.edgeYRect}), scale(${baseScale},${baseScale})`}
        >
          {baseShape}
        </g>
      )

    coordinate = (
      <TXT
        id={`${edge.id}.textNodeId`}
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
    if (isDefined(edge.arrow.arrowShow)) {
      const { scaleXArrow, scaleYArrow, arrowX, arrowY, arrowColor } = edge.arrow
      arrow = (
        <g
          version='1.1'
          id='Capa_1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 30 42.7'
          width='5px'
          height='16px'
          transform={`translate(${arrowX},${arrowY}),scale(${scaleXArrow},${scaleYArrow})`}
          fill={arrowColor}
        >
          <path d='M1.4,19.4c-1.7,-1.4,-1.9,-4,-0.5,-5.6s4,-1.9,5.6,-0.5l4.4,3.8v-13.1c0,-2.2,1.8,-4,4,-4c2.2,0,4,1.8,4,4v13.1l4.4,-3.8c1.7,-1.4,4.2,-1.2,5.6,0.5c1.4,1.7,1.2,4.2,-0.5,5.6l-11,9.4c-0.7,0.6,-1.7,1,-2.6,1s-1.8,-0.3,-2.6,-1l-10.8,-9.4zm22,6.9l-8.4,7.2l-8.4,-7.2c-1.7,-1.4,-4.2,-1.2,-5.6,0.5c-1.4,1.7,-1.2,4.2,0.5,5.6l11,9.4c0.7,0.6,1.7,1,2.6,1c0.9,0,1.8,-0.3,2.6,-1l11,-9.4c1.7,-1.4,1.9,-4,0.5,-5.6c-1.6,-1.7,-4.1,-1.9,-5.8,-0.5z' />
        </g>
      )
    }
  }

  return (
    <g className={className}>
      {line}
      {coordinateBase}
      {coordinate}
      {arrow}
    </g>
  )
}
/* eslint-enable react/prop-types */

function helper(props) {
  const { id, coordinate: displayCoordinate, show, type, orient, edgeAt, hideLine } = props

  //Line Props
  const { lineStroke, lineOpacity, lineWidth, lineStrokeDasharray, lineGrad, lineGradOrient, lineDx } = props

  //Path Props
  const { fill, opacity, strokeOpacity, strokeWidth, baseScale, baseOffsetY, baseGlow, shapeStroke } = props

  //Text Props
  const { fontFamily, fontWeight, fontSize, textFill, textOffsetX, textPadding } = props

  //arrow Props
  const { arrowShow, arrowColor, arrowIsUp, arrowWidth, arrowHeight } = props

  // Icon
  const { icon } = props

  const { rectWidth, rectHeight, rectRadius, textBBox } = props

  //Position props
  const { x1, y1, x2, y2, dx } = props

  if (!show) return null

  let coordinateBase, coordinate, arrow
  if (isDefined(displayCoordinate)) {
    const textAnchor = orient === 'right' ? 'start' : 'end'
    const alignmentBaseline = 'middle'

    let edgeXRect, edgeYRect, edgeXText, edgeYText

    const txtAreaWidth = (textBBox?.width + arrowWidth) / baseScale

    if (type === 'horizontal') {
      edgeXRect = dx + (orient === 'right' ? edgeAt + 1 : edgeAt - rectWidth - 1)
      edgeYRect = y1 - rectHeight / 2 - strokeWidth - textPadding
      edgeXText = dx + (orient === 'right' ? edgeAt + textOffsetX : edgeAt - textOffsetX)
      edgeYText = y1 + 1
    } else {
      const dy = orient === 'bottom' ? strokeWidth - 1 : -strokeWidth + 1
      edgeXRect = x1 - rectWidth / 2
      edgeYRect = (orient === 'bottom' ? edgeAt : edgeAt - rectHeight) + dy
      edgeXText = x1
      edgeYText = (orient === 'bottom' ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2) + dy
    }

    const scaleXArrow = arrowWidth / 30 //this magic number comes from the wiewBox width of the SVG we use as origin
    const scaleYArrow = (arrowIsUp ? arrowHeight * -1 : arrowHeight) / 42.7 //this magic number comes from the wiewBox height of the SVG we use as origin
    const arrowX = edgeXText - txtAreaWidth * baseScale - 10
    const arrowY = edgeYRect + (arrowIsUp ? arrowHeight + 2 : 2)

    coordinateBase = {
      edgeXRect,
      edgeYRect,
      rectHeight: rectHeight + strokeWidth + textPadding * 2,
      rectWidth,
      rectRadius,
      txtAreaWidth,
      baseScale,
      fill,
      opacity,
      arrowWidth,
      stroke: shapeStroke,
      strokeOpacity,
      strokeWidth,
      baseOffsetY,
      baseGlow,
      icon
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
      textOffsetX,
      icon
    }
    arrow = {
      arrowShow,
      arrowColor,
      arrowIsUp,
      arrowHeight,
      arrowX,
      arrowY,
      scaleXArrow,
      scaleYArrow
    }
  }
  const line = hideLine
    ? undefined
    : {
        opacity: lineOpacity,
        stroke: lineStroke,
        strokeDasharray: lineStrokeDasharray,
        lineWidth,
        lineGrad,
        lineGradOrient,
        lineEnd: x2 + lineDx,
        x1,
        y1,
        x2,
        y2
      }

  return {
    id,
    coordinateBase,
    coordinate,
    line,
    arrow,
    orient
  }
}

export function drawOnCanvas(ctx, props) {
  const { fontSize, fontFamily, textPadding = 5 } = props

  ctx.font = `${fontSize} ${fontFamily}`
  ctx.textBaseline = 'middle'
  const textMetrics = ctx.measureText(props.coordinate)
  const textWidth = Math.round(textMetrics.width)
  const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

  const edge = helper({ ...props, rectWidth: textWidth, textPadding })

  if (edge === null) return

  if (isDefined(edge.line)) {
    const { strokeDasharray, stroke, opacity, lineWidth, x1, x2, y1, y2 } = edge.line
    const dashArray =
      typeof edge.line.strokeDasharray === 'string'
        ? getStrokeDasharray(strokeDasharray)
            .split(',')
            .map((d) => +d)
        : strokeDasharray
    ctx.setLineDash(dashArray)
    ctx.strokeStyle = hexToRGBA(stroke, opacity)
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  ctx.setLineDash([])
  if (isDefined(edge.coordinateBase)) {
    const { rectWidth, rectHeight, rectRadius, icon, baseGlow } = edge.coordinateBase

    ctx.fillStyle = hexToRGBA(edge.coordinateBase.fill, edge.coordinateBase.opacity)
    if (isDefined(edge.coordinateBase.stroke)) {
      ctx.strokeStyle = hexToRGBA(edge.coordinateBase.stroke, edge.coordinateBase.strokeOpacity)
      ctx.lineWidth = edge.coordinateBase.strokeWidth
    }

    let x = edge.coordinateBase.edgeXRect
    const y = edge.coordinateBase.edgeYRect - textHeight / 2
    const fullHeight = rectHeight + textHeight
    const halfHeight = fullHeight / 2
    const rx = halfHeight * 2.3
    const ry = halfHeight

    ctx.beginPath()
    if (edge.orient === 'right') {
      ctx.moveTo(x + ry, y)
      ctx.lineTo(x + rectWidth, y)
      const cpx = x + rectWidth + rx
      const cpy1 = y
      const middleX = cpx
      const middleY = y + ry
      ctx.quadraticCurveTo(cpx, cpy1, middleX, middleY)
      const cpy2 = y + fullHeight
      const endX = x + rectWidth
      const endY = y + fullHeight
      ctx.quadraticCurveTo(cpx, cpy2, endX, endY)
      ctx.lineTo(x + rectWidth, y + fullHeight)
      ctx.lineTo(x + ry, y + fullHeight)
      ctx.quadraticCurveTo(x, y + fullHeight, x, y + ry)
      ctx.quadraticCurveTo(x, y, x + ry, y)
      ctx.closePath()
    } else if (edge.orient === 'left') {
      ctx.moveTo(x, y)
      ctx.lineTo(x + rectWidth, y)
      ctx.quadraticCurveTo(x + rectWidth + ry, y, x + rectWidth + ry, y + ry)
      ctx.quadraticCurveTo(x + rectWidth + ry, y + fullHeight, x + rectWidth, y + fullHeight)
      ctx.lineTo(x, y + fullHeight)

      const cpx = x - rx
      const cpy1 = y + fullHeight
      const middleX = cpx
      const middleY = y + ry
      ctx.quadraticCurveTo(cpx, cpy1, middleX, middleY)
      const cpy2 = y
      const endX = x
      const endY = y
      ctx.quadraticCurveTo(cpx, cpy2, endX, endY)
      ctx.closePath()
    } else {
      // console.error(x, y, rectWidth, rectHeight)
      if (rectRadius) {
        roundRect(ctx, x, y, rectWidth, fullHeight, 3)
      } else {
        ctx.rect(x, y, rectWidth, fullHeight)
      }
    }
    if (baseGlow) {
      ctx.shadowBlur = 30
      ctx.shadowColor = baseGlow
    }
    ctx.fill()
    if (edge.coordinate.icon) {
      const iconWidth = (30 / 42) * textHeight
      addIcon(ctx, edge.coordinate.icon, x - iconWidth - textPadding, y + textPadding + 2, iconWidth, textHeight)
    }

    if (isDefined(edge.coordinateBase.stroke)) {
      ctx.stroke()
    }

    ctx.fillStyle = edge.coordinate.textFill
    ctx.textAlign = edge.coordinate.textAnchor === 'middle' ? 'center' : edge.coordinate.textAnchor
    ctx.fillText(edge.coordinate.displayCoordinate, edge.coordinate.edgeXText, edge.coordinate.edgeYText)
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

const icon = new Image()
function addIcon(ctx, iconUrl, x, y, width, height) {
  icon.src = iconUrl
  ctx.drawImage(icon, x, y, width, height)
}

// export default EdgeCoordinate;
const TXT = styled.text`
  font-weight: ${({ textWeight }) => textWeight};
`
