import { atom, useAtomValue, useSetAtom } from 'jotai'
import { getGameParameters } from 'constants/games'
import { useToken } from 'utils/hooks/useToken'
import { useCallback } from 'react'
import { lvgStateAtom } from 'hooks/games/lvg/useLvgState'
import { ASSETS } from 'constants/assets'

// const priceFeedCacheAtom = atom({})

// const updatePriceFeedAtom = atom(null, (get, set, currentPrice) => {
//   const cachedPrices = get(priceFeedCacheAtom)
//   const lvgState = get(lvgStateAtom)
//   const symbol = currentPrice.symbol
//   if (lvgState?.activeAsset?.priceFeedSymbol && lvgState?.activeAsset?.priceFeedSymbol !== symbol) return
//   set(priceFeedCacheAtom, () => ({
//     ...cachedPrices,
//     [symbol]: currentPrice
//   }))
// })

const updateGranularPriceFeedAtom = atom(null, (get, set, currentPrice) => {
  const symbol = currentPrice.symbol
  const asset = ASSETS.filter((asset) => asset.priceFeedSymbol === symbol)[0]
  if (!asset) return
  const assetAtom = asset.atom
  set(assetAtom, () => currentPrice)
})

const priceFeedCacheAtom2 = atom({})

const priceFeedCacheAtom = atom((get) => {
  const priceFeedCache = ASSETS.map((asset) => {
    const atom = asset.atom
    return get(atom)
  }).reduce((obj, item) => ({ ...obj, [item.symbol]: item }), {})
  return priceFeedCache
})

export const usePriceFeedObserver = (symbol) => {
  const { parseToken: parseUSDC, decimals: tokenDecimals } = useToken('USDC')
  // const setPriceFeed = useSetAtom(updatePriceFeedAtom)
  // const setGPriceFeed = useSetAtom(updateGranularPriceFeedAtom)
  const setGPriceFeed = useSetAtom(priceFeedCacheAtom2)

  const updateCurrentPrices = (data) => {
    const processedData = Object.keys(data)
      .map((symbol) => {
        const priceObj = data[symbol]
        if (!priceObj?.symbol) return null
        if (!(priceObj?.price || priceObj?.natsClosePrice)) return null
        if (priceObj?.price === 0 || priceObj?.natsClosePrice === 0) return null
        const price = Number(priceObj?.natsClosePrice || priceObj?.price)
        const closeBN = parseUSDC(price.toFixed(tokenDecimals))
        //ACZ - I know it is redundant but these are here for compatibility and will be removed in the future
        const natsClosePriceBN = closeBN
        const valueBN = closeBN
        const value = price

        const newData = { ...priceObj, price, natsClosePriceBN, closeBN, valueBN, value }
        return newData
      })
      .reduce((cache, item) => {
        if (!item) return cache
        return { ...cache, [item.symbol]: { ...item } }
      }, {})
    setGPriceFeed(processedData)

    // const updateCurrentPrices = (data) => {
    //   if (!data?.symbol) return
    //   if (!(data?.indexPrice || data?.natsClosePrice)) return
    //   if (data?.indexPrice === 0 || data?.natsClosePrice === 0) return
    //   const price = Number(data?.natsClosePrice || data?.indexPrice)
    //   const closeBN = parseUSDC(price.toFixed(6))

    // const natsClosePriceBN = closeBN
    // const valueBN = closeBN
    // const value = price
    // -------------
    // setPriceFeed({ ...data, price, natsClosePriceBN, closeBN, valueBN, value })
    // setGPriceFeed({ ...data, price, natsClosePriceBN, closeBN, valueBN, value })
  }

  return { updateCurrentPrices }
}

export const useCurrentPrice = (gameId, id) => {
  //const currentPrices = useAtomValue(priceFeedCacheAtom)
  const currentPrices = useAtomValue(priceFeedCacheAtom2)
  const getCurrentPrice = useCallback(
    (gId) => {
      const { marketSymbol } = getGameParameters(gId)
      return currentPrices[marketSymbol]
    },
    [currentPrices]
  )
  const currentPrice = getCurrentPrice(gameId)
  return gameId ? { currentPrice } : getCurrentPrice
}

export const usePriceFeed2 = (priceFeedSymbol) => {
  // const currentPrices = useAtomValue(priceFeedCacheAtom)
  const currentPrices = useAtomValue(priceFeedCacheAtom2)

  const getPriceFeed = useCallback(
    (priceFeedSymbol) => {
      return currentPrices[priceFeedSymbol]
    },
    [currentPrices]
  )
  const priceFeed = getPriceFeed(priceFeedSymbol)
  return priceFeedSymbol ? { priceFeed: { ...priceFeed } } : getPriceFeed
}

// export const usePriceFeed = (priceFeedSymbol) => {
//   const currentPrices = useAtomValue(priceFeedCacheAtom)

//   const getPriceFeed = useCallback(
//     (priceFeedSymbol) => {
//       return currentPrices[priceFeedSymbol]
//     },
//     [currentPrices]
//   )
//   const priceFeed = getPriceFeed(priceFeedSymbol)
//   return priceFeedSymbol ? { priceFeed: { ...priceFeed } } : getPriceFeed
// }
