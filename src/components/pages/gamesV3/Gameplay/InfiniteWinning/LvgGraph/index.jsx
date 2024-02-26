import { LvgTickerChart } from 'components/Organisms/PriceGraph/ReactStocksCharts/LvgTickerChart'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import useResizeObserver from '@react-hook/resize-observer'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { icons } from 'common'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { LvgCandleChart } from 'components/Organisms/PriceGraph/ReactStocksCharts/LvgCandleChart'
import { ChartSelector } from './ChartSelector'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { ASSETS_TYPES } from 'constants/assets'

const OPTIONS = [
  { id: '0', caption: 'Tick', chart: 'tick', interval: '0', hideIf: [] },
  { id: '1', caption: '1 min', chart: 'candle', interval: '1', hideIf: [] },
  { id: '2', caption: '5 mins', chart: 'candle', interval: '5', hideIf: [] },
  { id: '3', caption: '15 mins', chart: 'candle', interval: '15', hideIf: [] },
  { id: '4', caption: '30 mins', chart: 'candle', interval: '30', hideIf: [] },
  { id: '5', caption: '60 mins', chart: 'candle', interval: '60', hideIf: [] },
  { id: '6', caption: '4 hrs', chart: 'candle', interval: '240', hideIf: [ASSETS_TYPES.STOCK] },
  { id: '7', caption: '24 hrs', chart: 'candle', interval: '1440', hideIf: [ASSETS_TYPES.STOCK] },
  { id: '8', caption: '7 days', chart: 'candle', interval: '10080', hideIf: [ASSETS_TYPES.STOCK] },
  { id: '9', caption: '15 days', chart: 'candle', interval: '21600', hideIf: [ASSETS_TYPES.STOCK, ASSETS_TYPES.CRYPTO] }
]

export const LvgGraph = () => {
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0])
  const { activeAsset } = useLvgState()

  const target = useRef(null)
  const size = useSize(target)
  const [graphWidth, setGraphWidth] = useState()
  const [isToggling, setToggling] = useState(false)

  useIntervalWhen(
    () => {
      setToggling(false)
    },
    100,
    isToggling,
    false
  )
  useLayoutEffect(() => {
    const newWidth = Number((size?.width - 10).toFixed())
    setToggling(true)
    setGraphWidth(newWidth)
  }, [size?.width])

  const filteredOptions = useMemo(
    () => OPTIONS.filter((option) => !option.hideIf.includes(activeAsset?.type)),
    [activeAsset?.type]
  )

  return (
    <GraphContainer ref={target}>
      <ChartSelector options={filteredOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
      <ContentSwitcherByState
        noWrapper
        activeState={selectedOption.chart}
        stateObject={{
          tick: !!size && <LvgTickerChart width={graphWidth} height={size?.height} isToggling={isToggling} />,
          candle: !!size && (
            <LvgCandleChart
              width={graphWidth}
              height={size?.height}
              isToggling={isToggling}
              interval={selectedOption.interval}
            />
          )
        }}
      />
    </GraphContainer>
  )
}

const GraphContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
  svg.react-stockchart {
    left: 5px;
  }
  .react-stockcharts-axis-domain,
  g.tick {
    stroke: rgb(100, 102, 106);
  }
  .react-stockcharts-crosshair-cursor {
    cursor: url(${icons.crosshair_yellow_18}) 9 9, crosshair;
  }
`

const useSize = (target) => {
  const [size, setSize] = useState()

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}
