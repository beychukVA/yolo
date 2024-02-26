import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useEffect, useRef } from 'react'
import { getPnL } from 'utils/pnl'

export const useActivePnl = (order) => {
  const { asset, pnl, entryPrice, side, fillQuantity } = order
  const pnlRef = useRef()
  const priceSymbol = LVG_ASSETS.find((assetInfo) => assetInfo.orderSymbol === asset)?.priceFeedSymbol
  const { priceFeed } = usePriceFeed2(priceSymbol)

  useEffect(() => {
    if (!priceFeed?.price) return
    pnlRef.current = pnl ?? getPnL(entryPrice, priceFeed?.price, side, fillQuantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFeed?.price])

  return { activePnl: pnlRef.current }
}
