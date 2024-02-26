import { CrossHairCursor } from './SvgComponents/CursorCrosshair'

const STROKE_WIDTH = 1

export const Crosshair = ({ x, y, show, zoomScale }) => {
  return show ? (
    <>
      <CrossHairCursor x={x} y={y} />
      <line
        x1='0'
        y1={y}
        x2='100%'
        y2={y}
        stroke='rgba(228,220,118,.4)'
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={'2 5'}
      />
      <line
        x1={x}
        y1='-40px'
        x2={x}
        y2='100%'
        stroke='rgba(228,220,118,.4)'
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={'2 5'}
      />
    </>
  ) : null
}
