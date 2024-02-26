import React, { useCallback, useMemo } from 'react'
import { memoThis } from 'utils/react'
import { VerticalCursor } from './SvgComponents/VerticalCursor'
import { formatUTCTimestampToLocale, linearInterpolator } from 'utils'
import ms from 'ms.macro'
import { getGameParameters } from 'constants/games'

const RANGE = [100, 0]

const xRange = [RANGE[1], RANGE[0]]

const roundSlices = [0, 0.25, 0.5, 0.75, 1]

export const VerticalGrid = memoThis(({ gameId, xDomain, roundStartTimeStamp }) => {
  if (isNaN(roundStartTimeStamp)) return null

  const roundLength = getGameParameters(gameId)?.roundLength || ms`24h`

  const getCoordinateX = useCallback(() => {
    return linearInterpolator(xDomain, xRange)
  }, [xDomain])

  const verticalInfo = useMemo(() => {
    const verticalTS = roundSlices.map((roundSlice) => {
      return roundStartTimeStamp + roundLength * roundSlice
    })

    return verticalTS.map((verticalTS) => {
      return {
        xPos: getCoordinateX()(verticalTS),
        label: formatUTCTimestampToLocale(verticalTS, '%hh:%mm')
      }
    })
  }, [getCoordinateX, roundStartTimeStamp])

  return verticalInfo.map((item, idx) => {
    if (!item) return null
    if (item.xPos < 0) return null
    return <VerticalCursor key={idx} xPosition={`${item.xPos}%`} topLabel={item.label} />
  })
})
