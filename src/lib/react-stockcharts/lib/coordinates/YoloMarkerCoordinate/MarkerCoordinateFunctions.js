import React from 'react'

import { hexToRGBA, isDefined, getStrokeDasharray } from 'react-stockcharts/lib/utils'

const PULSE_DUR = '1s'
const RADIUS = '3'
const FPS = 25

/* eslint-disable react/prop-types */
export function renderSVG(props) {
  const { className } = props
  const edge = helper(props)
  if (edge === null) return null
  let pulseDot

  if (isDefined(edge.pulseDot)) {
    pulseDot = (
      <>
        <g>
          <circle id='core' cx={edge.pulseDot.x} cy={edge.pulseDot.y} r={RADIUS} fill={edge.pulseDot.coreFill}>
            <animate
              attributeType='SVG'
              attributeName='r'
              begin='0s'
              dur={PULSE_DUR}
              repeatCount='indefinite'
              values={`${RADIUS * 1};${RADIUS * 2};${RADIUS * 1}`}
            />
            <animate
              attributeType='CSS'
              attributeName='opacity'
              begin='0s'
              dur={PULSE_DUR}
              repeatCount='indefinite'
              values='0;1;0'
            />
          </circle>
          <circle id='radar' cx={edge.pulseDot.x} cy={edge.pulseDot.y} r={RADIUS} fill={edge.pulseDot.radarFill}>
            <animate
              attributeType='SVG'
              attributeName='r'
              begin='0s'
              dur={PULSE_DUR}
              repeatCount='indefinite'
              values={`${RADIUS * 1};${RADIUS * 4}`}
            />
            <animate
              attributeType='CSS'
              attributeName='opacity'
              begin='0s'
              dur={PULSE_DUR}
              repeatCount='indefinite'
              values='0;1;0'
            />
          </circle>
        </g>
      </>
    )
  }

  return (
    <g className={className} id='pulseMarker'>
      {pulseDot}
    </g>
  )
}

/* eslint-enable react/prop-types */

function helper(props) {
  const { id, show, edgeAt } = props

  //Position props
  const { x1, y1, x2, y2, dx, at, coreFill, radarFill } = props

  if (!show) return null

  const pulseDot = {
    y: y1,
    x: dx + (at === 'right' ? x2 : x1),
    coreFill,
    radarFill
  }

  return {
    id,
    pulseDot,
    edgeAt
  }
}

let r = RADIUS
let angle = 0
let fadeInOut = 0

export function drawOnCanvas(ctx, props) {
  const { fontSize, fontFamily } = props

  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.textBaseline = 'middle'
  const width = Math.round(ctx.measureText(props.coordinate).width + 10)

  const edge = helper(props)
  if (edge === null) return
  if (isDefined(edge.pulseDot)) {
    //Draw the dot core
    ctx.beginPath()
    ctx.arc(edge.pulseDot.x, edge.pulseDot.y, RADIUS, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.fillStyle = edge.pulseDot.coreFill
    ctx.fill()
    ctx.closePath()

    //Draw the dot radar
    ctx.beginPath()
    ctx.arc(edge.pulseDot.x, edge.pulseDot.y, r, 0, 2 * Math.PI)
    ctx.globalAlpha = fadeInOut
    ctx.fillStyle = edge.pulseDot.radarFill
    ctx.fill()
    drawPulseCore()
    ctx.closePath()
  }
}

function drawPulseCore() {
  setTimeout(() => {
    requestAnimationFrame(drawPulseCore)
    const varData = Math.abs(Math.cos(angle))
    r = Number(RADIUS) + Number(RADIUS) * 2 * varData //radius of circle
    fadeInOut = varData
    angle += Math.PI / 220
  }, 1000 / FPS)
}
