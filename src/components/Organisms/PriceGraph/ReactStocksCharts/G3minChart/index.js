import { TextWithAnimatedEllipsis } from 'components/Atoms/TextWithAnimatedEllipsis'
import { use3minGraphData } from 'hooks/games/3min/use3minGraphData'
import { usePriceDirection } from 'hooks/usePriceDirection'
import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { G3minLineChart } from './Chart'

export const G3minChart = () => {
  const theme = useContext(ThemeContext)
  const { data, currentPrice, strikePrice, startTime, roundLength } = use3minGraphData()
  const { isUp } = usePriceDirection(currentPrice)

  const readyToDraw = data && Date.now() - startTime < roundLength

  if (!readyToDraw) {
    return (
      <RoundStatus rLoading={true}>
        <TextWithAnimatedEllipsis>Next round is loading</TextWithAnimatedEllipsis>
      </RoundStatus>
    )
  } else {
    return (
      <G3minLineChart
        type={'svg'}
        ratio={3}
        data={data}
        strikePrice={strikePrice}
        currentPrice={currentPrice}
        startTime={startTime}
        roundLength={roundLength}
        theme={theme}
        isUp={isUp}
      />
    )
  }
}

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
