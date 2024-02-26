import { useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { linearInterpolator } from 'utils'

const VERTICAL_TRIMMER = 6
const RANGE = [100, 0]

const range = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]

export const usePositionY = (lastValue, yDomain, configObj) => {
  const { defaultY } = { defaultY: 50, ...configObj }
  const ySpring = useSpring(defaultY)
  const getPositionY = (value, domain) => linearInterpolator(domain, range)(value)

  const positionY = useMemo(() => {
    if (!lastValue) return 50
    // return `${getPositionY(plotData.lastValue, [plotData.min, plotData.max])}%`
    return getPositionY(lastValue?.y, [yDomain.min, yDomain.max])
  }, [lastValue, yDomain?.min, yDomain?.max])

  useEffect(() => {
    ySpring.set(positionY || 50)
  }, [positionY, ySpring])

  const yPosition = useTransform(ySpring, (value) => `${value}%`)

  return yPosition
}
