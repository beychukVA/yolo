import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { usePrevious } from 'utils/hooks'

// function component
export const FlipCounter = ({ digit, flipNumberCSS }) => {
  const [currentDigit, setCurrentDigit] = useState('00')
  const previousDigit = usePrevious(currentDigit)
  const [shuffle, setShuffle] = useState(true)

  useEffect(() => {
    setShuffle(!shuffle)
    setCurrentDigit(digit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digit])

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit
  const digit2 = !shuffle ? previousDigit : currentDigit

  // shuffle animations
  const animation1 = shuffle ? fold : unfold
  const animation2 = !shuffle ? fold : unfold

  return (
    <Container>
      <StaticCard isUpperCard={true} flipNumberCSS={flipNumberCSS}>
        <span>{currentDigit}</span>
      </StaticCard>
      <StaticCard isUpperCard={false} flipNumberCSS={flipNumberCSS}>
        <span>{previousDigit}</span>
      </StaticCard>
      <StaticCard isUpperCard={false} digit={previousDigit} flipNumberCSS={flipNumberCSS} />
      <AnimatedCard animation={animation1} flipNumberCSS={flipNumberCSS}>
        <span>{digit1}</span>
      </AnimatedCard>
      <AnimatedCard animation={animation2} flipNumberCSS={flipNumberCSS}>
        <span>{digit2}</span>
      </AnimatedCard>
    </Container>
  )
}

const foldAnim = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
`
const unfoldAnim = keyframes`
  0% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`
const upperCard = css`
  align-items: flex-end;
  span {
    transform: translateY(50%);
  }
`
const lowerCard = css`
  align-items: flex-start;
  span {
    transform: translateY(-50%);
  }
`
const Container = styled.div`
  display: block;
  position: relative;
  perspective-origin: 50% 50%;
  perspective: 300px;
  height: 70px;
  width: 80px;
  line-height: 0;
  border-radius: 10px;
  font-size: 2.4rem;
  letter-spacing: -0.03em;
  text-align: center;
  justify-content: center;
  color: #ffff;
  overflow: hidden;
`

const fold = css`
  top: 0%;
  align-items: flex-end;
  transform-origin: 50% 100%;
  transform: rotateX(0deg);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 0 15px;

  span {
    transform: translateY(50%);
  }
  animation: ${foldAnim} 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  transform-style: preserve-3d;
`

const unfold = css`
  top: 50%;
  align-items: flex-start;
  padding: 0 15px;
  transform-origin: 50% 0%;
  transform: rotateX(180deg);
  ${({ flipNumberCSS }) => flipNumberCSS}

  span {
    transform: translateY(-50%);
  }
  animation: ${unfoldAnim} 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  transform-style: preserve-3d;
`
const StaticCard = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding: 0 15px;
  width: 100%;
  height: 50%;
  ${({ flipNumberCSS }) => flipNumberCSS}

  overflow: hidden;
  span {
    font-weight: 600;
  }
  ${({ isUpperCard }) => (isUpperCard ? upperCard : lowerCard)}
`

const AnimatedCard = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  ${({ flipNumberCSS }) => flipNumberCSS}
  backface-visibility: hidden;
  span {
    font-weight: 600;
    color: #ffff;
  }
  ${({ animation }) => animation}
`
