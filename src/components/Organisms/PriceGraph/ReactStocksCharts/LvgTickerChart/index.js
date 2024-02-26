import { TextWithAnimatedEllipsis } from 'components/Atoms/TextWithAnimatedEllipsis'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { useLvgTickerGraphData } from 'hooks/games/lvg/useLvgTickerGraphData'
import { usePriceDirection } from 'hooks/usePriceDirection'
import { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { LineChart } from './Chart'

export const LvgTickerChart = ({ width, isToggling }) => {
  const theme = useContext(ThemeContext)

  const { xExtendOffset, isDataEmpty, data, currentPrice, yExtents, fiatDecimals } = useLvgTickerGraphData()
  const { activeOrder, liveOrder } = useLvgState()
  const { isUp } = usePriceDirection(currentPrice)

  const orderData = useMemo(() => {
    if (!activeOrder.asset) return {}
    return {
      entryPrice: activeOrder.entryPrice,
      asset: activeOrder.asset,
      bustPrice: activeOrder.bustPrice,
      side: activeOrder.side
    }
  }, [activeOrder])

  const liveOrderData = useMemo(() => {
    if (!liveOrder.asset) return {}
    return {
      asset: liveOrder.asset,
      bustPrice: liveOrder.bustPrice,
      side: liveOrder.side
    }
  }, [liveOrder])

  if (isDataEmpty) {
    return (
      <TextPad>
        <TextWithAnimatedEllipsis>Graph is loading</TextWithAnimatedEllipsis>
      </TextPad>
    )
  } else {
    return (
      !isToggling && (
        <LineChart
          type={'hybrid'}
          theme={theme}
          data={data}
          currentPrice={currentPrice}
          fiatDecimals={fiatDecimals}
          orderData={orderData}
          liveOrderData={liveOrderData}
          result={'neutral'}
          width={width}
          isUp={isUp}
          yExtents={yExtents}
          xExtendOffset={xExtendOffset}
        />
      )
    )
  }
}

const TextPad = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 700;
  text-align: ${({ rLoading }) => (rLoading ? 'left' : 'center')};
  background: rgba(50, 50, 50, 0.5);
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
