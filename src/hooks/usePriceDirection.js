import { PRICE_DIRECTION } from 'constants/index.js'
import { useEffect, useMemo, useState } from 'react'
import { usePrevious } from 'utils/hooks'

export const usePriceDirection = (currentPrice, referencePrice) => {
  const DECIMALS = 2
  const prevPriceValue = usePrevious(currentPrice)
  const [direction, setDirection] = useState(PRICE_DIRECTION.NEUTRAL)

  useEffect(() => {
    if (!currentPrice) return
    if (!prevPriceValue) return
    const lastPrice = Number(currentPrice.toFixed(DECIMALS))

    if (referencePrice) {
      const refPrice = Number(referencePrice.toFixed(DECIMALS))
      if (lastPrice === refPrice) {
        setDirection(PRICE_DIRECTION.NEUTRAL)
      } else if (lastPrice > refPrice) {
        setDirection(PRICE_DIRECTION.UP)
      } else {
        setDirection(PRICE_DIRECTION.DOWN)
      }
    } else {
      const prevPrice = Number(prevPriceValue.toFixed(DECIMALS))
      if (prevPrice < lastPrice) {
        setDirection(PRICE_DIRECTION.UP)
      } else {
        setDirection(PRICE_DIRECTION.DOWN)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrice])

  const isUp = useMemo(() => (direction === PRICE_DIRECTION.UP ? true : false), [direction])

  return { direction, isUp }
}
