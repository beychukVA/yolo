import styled from 'styled-components'
import { motion } from 'framer-motion'

export const VerticalCursor = ({ xPosition, topLabel }) => {
  return (
    <StrikeCursorG y='0' x={xPosition} id='newStrikeCursor'>
      <StrikeLine x1='0' y1='-30' x2='0' y2='100%' />
      <Text x='0' y='-60px'>
        {topLabel}
      </Text>
    </StrikeCursorG>
  )
}

const StrikeLine = styled.line`
  stroke-width: 2px;
  stroke: rgba(255, 255, 255, 0.15);
  stroke-dasharray: 6 8;
`
const Text = styled.text`
  fill: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  font-style: italic;
  text-transform: uppercase;
  text-anchor: middle;
`
const StrikeCursorG = styled(motion.svg)`
  overflow: visible;
`
