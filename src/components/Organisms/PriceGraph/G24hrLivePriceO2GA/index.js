import { BigNumber } from 'ethers'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useMinutePrice } from 'hooks/graph/useMinutePrice'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useToken } from 'utils/hooks/useToken'
import { BucketsLines } from './BucketsLines'
import { CurrentLine } from './CurrentLine'
import { StartLine } from './StartLine'
import { Zero } from '@ethersproject/constants'

import { CurrentPath } from './SvgComponents/CurrentPath'
import ms from 'ms.macro'
import { useCurrentPrice } from 'hooks/gameEngine/usePriceFeed'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { usePrevious } from 'utils/hooks'
import { isEqual } from 'lodash'
import { VerticalGrid } from './VerticalGrid'
import { Crosshair } from './CrossHair'
import { linearInterpolator } from 'utils'
import { getGameParameters } from 'constants/games'

const DEFAULT_OPTIONS = {
  containerPadding: [0, 0, 0, 0],
  tailLine: false
}

export const G24hrLivePriceO2GA = ({ className, gameId, options }) => {
  const { containerPadding } = { ...DEFAULT_OPTIONS, ...options }
  const { formatToken: formatUSD, parseToken: parseUSD } = useToken('USD')
  const { activeGameId } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(gameId)

  const { currentPrice } = useCurrentPrice(activeGameId)
  const { data = [], setDataTrimer } = useMinutePrice(activeGameId)

  const refPriceBN = useMemo(
    () => (liveRoundData.strikePrice && BigNumber.from(liveRoundData.strikePrice)) || Zero,
    [liveRoundData.strikePrice]
  )
  const bucketsBP = useMemo(() => liveRoundData.buckets || [], [liveRoundData.buckets])

  // Mouse hover manager -----------------------------------

  const VERTICAL_TRIMMER = 10
  const RANGE = [100, 0]
  const yRange = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]
  const xRange = [RANGE[1], RANGE[0]]

  const refContainer = useRef()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCrosshair, setShowCrosshair] = useState(false)

  const getMouseValues = (mousePosition) => {
    const yDomain = yDomain
    const getValueY = (value) => linearInterpolator(yRange, yDomain)(value)
    const getValueX = (value) => linearInterpolator(xRange, xDomain)(value)
    return { xValue: +getValueX(mousePosition.x).toFixed(), yValue: getValueY(mousePosition.y) }
  }

  const handleMouseMove = (event) => {
    const { clientHeight: h, clientWidth: w } = refContainer.current
    const newMousePosition = {
      x: (event.nativeEvent.offsetX / w) * 100,
      y: (event.nativeEvent.offsetY / h) * 100
    }
    setMousePosition(newMousePosition)
  }
  // Mouse hover manager -----------------------------------

  // Zoom State related ------------------------------
  const MIN_TRIMMER = ms`1m`
  const MAX_TRIMMER = ms`24h`
  const [startTrimmer, setStartTrimmer] = useState(MAX_TRIMMER)
  const dataLength = useMemo(() => data.length, [data])

  const currentPoint = useMemo(() => {
    if (!currentPrice) return { x: Date.now(), y: 0 }
    const x = (currentPrice?.times - ms`20s`).toString()
    const yBN = refPriceBN.sub(currentPrice.valueBN)
    return { x, y: formatUSD(yBN) }
  }, [currentPrice, formatUSD, refPriceBN])

  // Zoom State related ------------------------------

  // Build Domain Y -----------------------------
  const [yDomain, setyDomain] = useState([-0.1, 0.1])
  const getMaxBucketDeltaDomainY = useCallback(() => {
    const refPrice = formatUSD(refPriceBN)
    const bucketsDeltaArray = bucketsBP.map((bucketBP) => {
      const delta = Math.abs((refPrice * bucketBP) / 10000)
      return +delta.toFixed(6)
    })
    const maxDelta = bucketsDeltaArray.length > 0 ? Math.max(...bucketsDeltaArray) : 0
    return maxDelta
  }, [formatUSD, bucketsBP, refPriceBN])

  const getMaxMinuteDeltaDomainY = useCallback(() => {
    const refPrice = formatUSD(refPriceBN)
    const minuteDeltaArray = data.map((item) => {
      const delta = Math.abs(refPrice - item.value)
      return +delta.toFixed(6)
    })
    const maxDelta = minuteDeltaArray.length > 0 ? Math.max(...minuteDeltaArray) : 0
    return maxDelta
  }, [data, formatUSD, refPriceBN])

  const getMinMaxPathValuesDomainY = useCallback(() => {
    const PathValuesDeltaArray = pathValues?.filter((item, idx) => {
      return +item.x > Date.now() - startTrimmer
    })
    const deltaPathValues = PathValuesDeltaArray.map((item) => {
      return Math.abs(item.y)
    })
    const maxDelta = PathValuesDeltaArray.length > 0 ? Math.max(...deltaPathValues) : 0
    const minDelta = PathValuesDeltaArray.length > 0 ? Math.min(...deltaPathValues) : 0
    return { minDelta, maxDelta }
  }, [data, formatUSD, refPriceBN])

  const buildDomainY = useCallback(() => {
    const maxBucketDelta = startTrimmer > ms`12h` ? getMaxBucketDeltaDomainY() : 0
    const maxMinuteDelta = getMaxMinuteDeltaDomainY()
    const minMaxPathValues = getMinMaxPathValuesDomainY()
    const currentPointYDelta = Math.abs(currentPoint?.y || 0)
    const maxDelta = Math.max(maxBucketDelta, maxMinuteDelta, minMaxPathValues.maxDelta, currentPointYDelta)

    maxDelta !== 0 && setyDomain([maxDelta, maxDelta * -1])
  }, [getMaxBucketDeltaDomainY, getMaxMinuteDeltaDomainY, getMinMaxPathValuesDomainY, startTrimmer, currentPoint])
  useLayoutEffect(() => {
    buildDomainY()
  }, [buildDomainY, activeGameId])
  // Build Domain Y -----------------------------

  // Build pathValues and Domain X -----------------------------
  const X_TRIMMER = ms`1m`
  const [xDomain, setXDomain] = useState()
  const [pathValues, setPathValues] = useState([])
  const prevData = usePrevious(data)

  const buildMinutePricesDomainX = useCallback(() => {
    // const minuteValueArray = data.map((item) => item.timestamp)
    const roundLength = getGameParameters(gameId)?.roundLength || ms`24h`

    // const minValue = minuteValueArray.length > 0 ? Math.min(...minuteValueArray) : 0
    // const maxValue = minuteValueArray.length > 0 ? Math.max(...minuteValueArray, +currentPoint?.x) : 0
    // const domainMin = minValue
    // const domainMax = maxValue + X_TRIMMER
    const domainMin = +(liveRoundData?.startTime || 0) * 1000
    const domainMax = +(liveRoundData?.startTime || 0) * 1000 + roundLength + X_TRIMMER
    return [domainMin, domainMax]
  }, [data, X_TRIMMER, currentPoint?.x, liveRoundData.startTime])

  const buildPathValues = useCallback(() => {
    const minuteValueArray = data.map((item) => {
      const x = item.timestamp
      const yBN = refPriceBN.sub(item.valueBN)
      return { x, y: formatUSD(yBN) }
      // return [x:item.timestamp,y]
    })
    if (isEqual(prevData, data)) {
      setPathValues([...pathValues, currentPoint])
    }
    if (startTrimmer > ms`1h`) {
      setPathValues([...minuteValueArray, currentPoint])
    }
  }, [data, currentPoint, formatUSD])
  const buildDomainX = useCallback(() => {
    const domainX = buildMinutePricesDomainX()
    setXDomain(domainX)
    buildPathValues()
  }, [buildMinutePricesDomainX, buildPathValues])
  useEffect(() => {
    buildDomainX()
  }, [buildDomainX, activeGameId])
  // Build pathValues and Domain X -----------------------------

  const isUp = useMemo(() => (currentPrice?.valueBN || refPriceBN).gte(refPriceBN), [refPriceBN, currentPrice?.valueBN])

  // Zoom Effect ------------------------------------------

  // const zoomIn = () => {
  //   const resolution = startTrimmer > ms`1h` ? ms`1h` : ms`1m`
  //   const newTrimmer = startTrimmer - resolution
  //   setStartTrimmer(newTrimmer)
  // }
  // const zoomOut = () => {
  //   const resolution = startTrimmer > ms`1h` ? ms`1h` : ms`1m`
  //   const newTrimmer = startTrimmer + resolution
  //   setStartTrimmer(newTrimmer)
  // }

  // const onWheel = (e) => {
  //   const deltaY = e.deltaY
  //   if (deltaY > 0) {
  //     // zoomOut()
  //   } else {
  //     // zoomIn()
  //   }
  // }

  // useLayoutEffect(() => {
  //   if (startTrimmer < MIN_TRIMMER) {
  //     setStartTrimmer(MIN_TRIMMER)
  //     setDataTrimer({ startTS: MIN_TRIMMER, endTS: null })
  //     return
  //   }
  //   if (startTrimmer > MAX_TRIMMER) {
  //     setStartTrimmer(MAX_TRIMMER)
  //     setDataTrimer({ startTS: MAX_TRIMMER, endTS: null })
  //   }
  //   setDataTrimer({ startTS: startTrimmer, endTS: startTrimmer })
  // }, [startTrimmer, setDataTrimer, dataLength])
  // Zoom Effect ------------------------------------------

  return (
    !!xDomain && (
      <Container className={className}>
        <SvgCanvas
          id='svgCanvas'
          padding={containerPadding}
          ref={refContainer}
          // onWheelCapture={onWheel}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowCrosshair(true)}
          onMouseLeave={() => setShowCrosshair(false)}
        >
          <VerticalGrid gameId={gameId} xDomain={xDomain} roundStartTimeStamp={+liveRoundData.startTime * 1000} />
          <StartLine refPriceBN={refPriceBN} />
          <CurrentPath isUp={isUp} pathValues={pathValues} yDomain={yDomain} xDomain={xDomain} />
          <BucketsLines refPriceBN={refPriceBN} bucketsBP={bucketsBP} yDomain={yDomain} />
          <CurrentLine
            refPriceBN={refPriceBN}
            currentPrice={currentPrice || refPriceBN}
            xDomain={xDomain}
            yDomain={yDomain}
          />
          {/* <rect x1='0' y1='0' width='100%' height='100%' fill='none' stroke='yellow' /> */}
          <Crosshair x={`${mousePosition.x}%`} y={`${mousePosition.y}%`} show={showCrosshair} />
        </SvgCanvas>
      </Container>
    )
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  cursor: crosshair;
`
const SvgCanvas = styled.svg`
  position: absolute;
  top: ${({ padding }) => padding[0]}px;
  width: ${({ padding }) => `calc(100% -  ${padding[3] + padding[1]}px)`};
  height: ${({ padding }) => `calc(100% -  ${padding[0] + padding[2]}px)`};
  left: ${({ padding }) => padding[3]}px;
  overflow: visible;
  &:hover {
    cursor: none;
  }
`
