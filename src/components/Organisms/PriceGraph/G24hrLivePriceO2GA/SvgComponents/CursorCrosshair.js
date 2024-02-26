import styled from 'styled-components'

const W = 18
const H = 18

export const CrossHairCursor = ({ x, y }) => {
  return (
    <Svg id='Layer_1' x={x} y={y} width={W} height={H} viewBox='0 0 18 18'>
      <path d='M17,9H1 M9,1v16' />
    </Svg>
  )
}

const Svg = styled.svg`
  stroke: #e4dc76;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  overflow: visible;
  path {
    transform: translate(-9px, -9px);
  }
`
