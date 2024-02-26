const { useCallback } = require('react')

export const useLvgResult = () => {
  const getLvgResult = useCallback((currentPrice, entryPrice, side) => {
    if (!currentPrice) return 'neutral'
    if (!entryPrice) return 'neutral'
    if (!side) return 'neutral'

    const current = currentPrice
    const entry = entryPrice

    if (side === 'sell') {
      return current > entry ? 'Lost' : 'Won'
    } else {
      return current > entry ? 'Won' : 'Lost'
    }
  }, [])
  return { getLvgResult }
}
