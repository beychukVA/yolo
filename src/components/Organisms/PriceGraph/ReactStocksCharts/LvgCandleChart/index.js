import { TextWithAnimatedEllipsis } from 'components/Atoms/TextWithAnimatedEllipsis'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { usePriceDirection } from 'hooks/usePriceDirection'
import { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { CandleStickChart } from './Chart'
import { useLvgCandleGraphData } from 'hooks/games/lvg/useLvgCandleGraphData'
import { current } from '@reduxjs/toolkit'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'

export const LvgCandleChart = ({ width, isToggling, interval }) => {
  const theme = useContext(ThemeContext)
  const {
    xExtendOffset,
    currentPrice,
    data: candleData,
    isDataEmpty,
    dataState,
    fiatDecimals,
    widthRatio
  } = useLvgCandleGraphData(interval)

  const { activeOrder, liveOrder } = useLvgState()
  const { isUp: colorUp } = usePriceDirection(currentPrice, candleData.at(-2)?.open || currentPrice)
  const { isUp: iconUp } = usePriceDirection(currentPrice)

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

  return (
    <ContentSwitcherByState
      noWrapper
      activeState={dataState}
      stateObject={{
        error: <TextPad>Graph isn't available</TextPad>,
        empty: (
          <TextPad>
            <TextWithAnimatedEllipsis>Graph is loading</TextWithAnimatedEllipsis>
          </TextPad>
        ),
        ready: !isToggling && (
          <CandleStickChart
            type={'hybrid'}
            theme={theme}
            data={candleData}
            currentPrice={currentPrice}
            fiatDecimals={fiatDecimals}
            orderData={orderData}
            liveOrderData={liveOrderData}
            result={'neutral'}
            width={width}
            isUp={colorUp}
            iconUp={iconUp}
            xExtendOffset={xExtendOffset}
            widthRatio={widthRatio}
          />
        )
      }}
    />
  )
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
  padding: 20px 30px;
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
