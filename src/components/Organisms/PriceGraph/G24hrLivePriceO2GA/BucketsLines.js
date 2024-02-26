import React, { useCallback, useEffect, useState } from 'react'
import { css } from 'styled-components'
import { linearInterpolator } from 'utils'
import { useToken } from 'utils/hooks/useToken'
import { HorizontalCursor } from './SvgComponents/HorizontalCursor'
import { memoThis } from 'utils/react'

const VERTICAL_TRIMMER = 6
const RANGE = [100, 0]

const TEXT_SIZE = {
  0: 'bigger',
  1: 'big',
  2: 'big',
  3: 'bigger'
}

const range = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]

const getPositionY = (value, domain) => linearInterpolator(domain, range)(value)

const getBucketsDeltaArray = (refPrice, bucketsBP, domain) => {
  const bucketsDeltaArray = bucketsBP.map((bucketBasisPoint) => {
    const percentageToAdd = (refPrice * bucketBasisPoint) / 10000
    const value = refPrice + percentageToAdd
    const delta = refPrice - value
    const positionY = getPositionY(delta, domain)

    return { basisPoints: bucketBasisPoint, delta, positionY, value }
  })
  return bucketsDeltaArray
}

const textCss = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphStrike},
    1px -1px 0 ${theme.themeColors.priceGraphStrike},
    -1px 1px 0 ${theme.themeColors.priceGraphStrike},
    1px 1px 0 ${theme.themeColors.priceGraphStrike}
    `};
  fill: ${({ theme }) => theme.themeColors.priceGraphStrike};
`

const lineStyle = {
  width: 3,
  gradientFill: {
    id: 'bucketGrad',
    reverse: false,
    x1: '5%',
    x2: '100%',
    stops: [
      { stop: '0%', color: 'rgba(42, 109, 255)', opacity: 0 },
      { stop: '100%', color: 'rgba(42, 109, 255)', opacity: 1 }
    ]
  }
}

const textStyle = {
  size: 'bigger',
  justify: 'left',
  xOffset: '-10'
}

export const BucketsLines = memoThis(({ refPriceBN, bucketsBP, yDomain }) => {
  const { formatToken: formatUSD } = useToken('USD')
  const [bucketLinesData, setBucketLinesData] = useState([
    { label: '0%', y: 50 },
    { label: '0%', y: 50 },
    { label: '0%', y: 50 },
    { label: '0%', y: 50 }
  ])

  const updateBucketsLinesPosition = useCallback(() => {
    const refPrice = formatUSD(refPriceBN)
    const domain = yDomain
    const bucketsDeltaArray = (bucketsBP && getBucketsDeltaArray(refPrice, bucketsBP, domain)) || []

    const bucketLinesData = bucketsDeltaArray.map((item, idx) => {
      const label = (item.basisPoints / 10000) * 100
      return { label: `${label > 0 ? '+' : ''}${label.toFixed(2)}% `, y: item.positionY }
    })
    setBucketLinesData(bucketLinesData)
  }, [refPriceBN, bucketsBP, yDomain, formatUSD])

  useEffect(() => {
    updateBucketsLinesPosition()
  }, [updateBucketsLinesPosition])

  return (
    <>
      {bucketLinesData.map((plotData, idx) => (
        <HorizontalCursor
          key={idx}
          plotData={plotData}
          configObj={{
            textCss,
            textStyle: { ...textStyle, size: TEXT_SIZE[idx] },
            lineStyle
          }}
        />
      ))}
    </>
  )
})
