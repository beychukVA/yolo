import styled, { css } from 'styled-components'

export const OnBoardingProgressDots = ({ className, totalDots, currentIdx }) => {
  return (
    <ProgressDots id='progress_dots' className={className}>
      {Array(totalDots)
        .fill()
        .map((_, idx) => (
          <Dot key={`progressDots-${idx}`} current={idx === currentIdx} />
        ))}
    </ProgressDots>
  )
}

const ProgressDots = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0 0 0;
`
const currentDots = css`
  opacity: 0.3;
  cursor: default;
`
const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  margin: 0 8px 0 0;
  ${({ current }) => (current ? currentDots : '')}
`
