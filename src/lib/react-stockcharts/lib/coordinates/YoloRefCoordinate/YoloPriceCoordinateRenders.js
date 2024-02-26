import React from 'react'

import { hexToRGBA, isDefined, getStrokeDasharray } from 'react-stockcharts/lib/utils'

import styled from 'styled-components'

/* eslint-disable react/prop-types */
export function renderSVG(props) {
  const { className } = props
  const edge = helper({ ...props, textPadding: 0 })
  if (edge === null) return null
  let line, shape, coordinate, arrow

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
  if (isDefined(edge.shape)) {
    const { txtAreaWidth, rectWidth, baseScale, baseOffsetY, baseGlow } = edge.shape

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
        stroke={edge.shape.stroke}
        strokeLinejoin='miter'
        strokeOpacity={edge.shape.strokeOpacity}
        strokeWidth={edge.shape.strokeWidth}
        fill={edge.shape.fill}
        fillOpacity={edge.shape.opacity}
        filter={isDefined(edge.shape.baseGlow) ? `url(#glow-${baseGlow.id})` : ''}
      />
    )
    shape =
      edge.orient === 'left' ? (
        <g
          key={1}
          transform={`translate(${edge.shape.edgeXRect + rectWidth},${
            edge.shape.edgeYRect + baseOffsetY
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
          transform={`translate(${edge.shape.edgeXRect},${edge.shape.edgeYRect}), scale(${baseScale},${baseScale})`}
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
      {shape}
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
  const { fill, opacity, strokeOpacity, strokeWidth, baseScale, baseOffsetY, baseGlow, shapeStroke, tagX, tagY } = props

  //Text Props
  const { fontFamily, fontWeight, fontSize, textFill, textOffsetX, textPadding } = props

  //arrow Props
  const { arrowShow, arrowColor, arrowIsUp, arrowWidth, arrowHeight, padding } = props

  // Icon
  const { iconSrc, iconWidth } = props

  const { rectWidth, rectHeight, rectRadius, textBBox } = props

  //Position props
  const { x1, y1, x2, y2, dx } = props

  if (!show) return null

  let shape, coordinate, arrow
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

    // Canvas props
    const pO = { x: tagX + dx, y: tagY }

    shape = {
      edgeXRect,
      edgeYRect,
      rectHeight: rectHeight + strokeWidth + textPadding * 2,
      rectWidth,
      rectRadius,
      txtAreaWidth,
      baseScale,
      fill,
      opacity,
      stroke: shapeStroke,
      strokeOpacity,
      strokeWidth,
      baseOffsetY,
      baseGlow,
      icon,
      // canvas props
      pO,
      arrowWidth
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
      iconSrc,
      iconWidth,
      padding
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
    shape,
    coordinate,
    line,
    arrow,
    orient
  }
}

export function drawOnCanvas(ctx, props) {
  const { fontSize, fontFamily, textPadding = 5 } = props

  ctx.font = `${fontSize} ${fontFamily}`
  const textMetrics = ctx.measureText(props.coordinate)
  const textWidth = Math.round(textMetrics.width)
  const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

  const edge = helper({ ...props, rectWidth: textWidth, textPadding })

  if (edge === null) return

  if (isDefined(edge.line)) drawLine(ctx, edge.line)

  if (isDefined(edge.shape)) {
    ctx.fillStyle = hexToRGBA(edge.shape.fill, edge.shape.opacity)

    if (isDefined(edge.shape.stroke)) {
      ctx.strokeStyle = hexToRGBA(edge.shape.stroke, edge.shape.strokeOpacity)
      ctx.lineWidth = edge.shape.strokeWidth
    }

    ctx.beginPath()
    const { arrowWidth, baseGlow, pO } = edge.shape
    const { iconSrc, iconWidth, padding } = edge.coordinate

    const showIcon = !!iconSrc

    drawTagShape(ctx, {
      showIcon,
      pO: edge.shape.pO,
      arrowWidth,
      textWidth,
      textHeight,
      padding,
      iconWidth,
      orient: edge.orient,
      baseGlow
    })

    if (isDefined(edge.shape.stroke)) {
      ctx.stroke()
    }
    addIcon(ctx, { iconSrc, pO, iconWidth, arrowWidth, textHeight, padding })
    addText(ctx, {
      showIcon,
      pO,
      text: edge.coordinate.displayCoordinate,
      textFill: edge.coordinate.textFill,
      iconWidth,
      arrowWidth,
      textWidth,
      padding
    })
  }
}

const drawLine = (ctx, LineProps) => {
  ctx.setLineDash([])
  const { strokeDasharray, stroke, opacity, lineWidth, x1, x2, y1, y2 } = LineProps
  const dashArray =
    typeof strokeDasharray === 'string'
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

const icon = new Image()
function addIcon(ctx, iconProps) {
  const { iconSrc, pO, iconWidth, arrowWidth, textHeight, padding } = iconProps
  if (!iconSrc) return
  icon.src = iconSrc
  const halfHeight = textHeight / 2 + padding
  const pA = {
    x: pO.x + arrowWidth + padding / 2,
    y: pO.y - halfHeight + padding
  }
  ctx.drawImage(icon, pA.x, pA.y, iconWidth, textHeight)
}

const TXT = styled.text`
  font-weight: ${({ textWeight }) => textWeight};
`
const addText = (ctx, textProps) => {
  const { showIcon, pO, text, textFill, iconWidth, arrowWidth, textWidth, padding } = textProps
  const pA = {
    x: pO.x + arrowWidth + (1 / 2) * padding + (showIcon ? (1 / 2) * padding + iconWidth : 0) + textWidth,
    y: pO.y + 1
  }
  ctx.fillStyle = textFill
  ctx.textAlign = 'end'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, pA.x, pA.y)
}

const drawTagShape = (ctx, shapeProps) => {
  const { showIcon, pO, arrowWidth, textWidth, textHeight, padding, iconWidth, orient, baseGlow } = shapeProps

  const halfHeight = textHeight / 2 + padding
  const iconSpace = showIcon ? (1 / 2) * padding + iconWidth : 0 //-(1 / 2) * padding
  const pA = pO
  const pCAB = {
    x: pA.x,
    y: pA.y - (1 / 8 + 1 / 16) * halfHeight
  }
  const pB = {
    x: pA.x + (2 / 8) * arrowWidth,
    y: pA.y - (3 / 8) * halfHeight
  }
  const pC = {
    x: pA.x + (5 / 8) * arrowWidth,
    y: pA.y - (6 / 8) * halfHeight
  }
  const pCCD = {
    x: pA.x + (6 / 8 + 1 / 16) * arrowWidth,
    y: pA.y - halfHeight
  }
  const pD = {
    x: pA.x + arrowWidth,
    y: pA.y - halfHeight
  }
  const pE = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth,
    y: pA.y - halfHeight
  }
  const pCEF = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth + padding,
    y: pA.y - halfHeight
  }
  const pF = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth + padding,
    y: pA.y - halfHeight + padding
  }
  const pG = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth + padding,
    y: pA.y + halfHeight - padding
  }
  const pCGH = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth + padding,
    y: pA.y + halfHeight
  }
  const pH = {
    x: pA.x + arrowWidth + iconSpace + (1 / 2) * padding + textWidth,
    y: pA.y + halfHeight
  }
  const pI = {
    x: pA.x + arrowWidth,
    y: pA.y + halfHeight
  }
  const pCIJ = {
    x: pA.x + (6 / 8 + 1 / 16) * arrowWidth,
    y: pA.y + halfHeight
  }
  const pJ = {
    x: pA.x + (5 / 8) * arrowWidth,
    y: pA.y + (6 / 8) * halfHeight
  }
  const pK = {
    x: pA.x + (2 / 8) * arrowWidth,
    y: pA.y + (3 / 8) * halfHeight
  }
  const pCKO = {
    x: pA.x,
    y: pA.y + (1 / 8 + 1 / 16) * halfHeight
  }

  ctx.setLineDash([])
  if (orient === 'right') {
    ctx.translate(pA.x, pA.y)
    ctx.rotate(Math.PI)
    ctx.translate(-pA.x, -pA.y)
  }

  ctx.moveTo(pA.x, pA.y)
  ctx.quadraticCurveTo(pCAB.x, pCAB.y, pB.x, pB.y)
  ctx.lineTo(pC.x, pC.y)
  ctx.quadraticCurveTo(pCCD.x, pCCD.y, pD.x, pD.y)
  ctx.lineTo(pE.x, pE.y)
  ctx.quadraticCurveTo(pCEF.x, pCEF.y, pF.x, pF.y)
  ctx.lineTo(pG.x, pG.y)
  ctx.quadraticCurveTo(pCGH.x, pCGH.y, pH.x, pH.y)
  ctx.lineTo(pI.x, pI.y)
  ctx.quadraticCurveTo(pCIJ.x, pCIJ.y, pJ.x, pJ.y)
  ctx.lineTo(pK.x, pK.y)
  ctx.quadraticCurveTo(pCKO.x, pCKO.y, pA.x, pA.y)

  if (orient === 'right') {
    ctx.translate(pA.x, pA.y)
    ctx.rotate(Math.PI)
    ctx.translate(-pA.x, -pA.y)
  }

  if (baseGlow) {
    ctx.shadowBlur = 30
    ctx.shadowColor = baseGlow
  }
  ctx.fill()
  ctx.stroke()
}
