import { useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { linearInterpolator } from 'utils'

const VERTICAL_TRIMMER = 6
const RANGE = [100, 0]

const range = [RANGE[0] - VERTICAL_TRIMMER, RANGE[1] + VERTICAL_TRIMMER]

export const usePositionY = (plotData, configObj) => {
  const { lastValue = {}, yDomain = {} } = plotData

  const { defaultY } = { defaultY: 0, ...configObj }
  const ySpring = useSpring(defaultY)
  const getPositionY = (value, domain) => linearInterpolator(domain, range)(value)

  const positionY = useMemo(() => {
    if (!plotData) return 50
    if (!plotData?.lastValue?.x) return 50
    if (!plotData?.lastValue?.y) return 50
    if (!plotData.yDomain) return 50
    return getPositionY(lastValue.y, [yDomain.min, yDomain.max])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plotData])

  useEffect(() => {
    ySpring.set(positionY)
  }, [positionY, ySpring])

  const yPosition = useTransform(ySpring, (value) => `${value}%`)

  return yPosition
}
