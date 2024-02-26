import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import styled, { keyframes } from 'styled-components'

export const RoundsStatusInfo = ({ roundLoading }) => (
  <RoundStatus rLoading={roundLoading}>
    <SingleContentToggle
      noWrapper
      toggle={roundLoading}
      trueContent={<NextRoundLoading>Next round is loading</NextRoundLoading>}
      falseContent={<RoundSettled>This round has settled</RoundSettled>}
    />
  </RoundStatus>
)

const ellipsis = keyframes`
    to {
      width: 1.25em;
    }
  `

const RoundStatus = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 700;
  text-align: ${({ rLoading }) => (rLoading ? 'left' : 'center')};
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 2;
  font-weight: 700;
  padding: 20px 40px;
  line-height: 100%;
  border-radius: 20px;
  margin: 20px 0;
  width: 370px;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.2rem;
    margin: 20px 0;
    padding: 20px 30px;
    width: 280px;
  }
`
const RoundSettled = styled.div`
  font-weight: 700;
`
const NextRoundLoading = styled.div`
  font-weight: 700;
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ${ellipsis} steps(5, end) 900ms infinite;
    animation: ${ellipsis} steps(5, end) 1900ms infinite;
    content: '\\2026';
    width: 0px;
    margin-left: 5px;
  }
`
