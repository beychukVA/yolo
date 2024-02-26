import PropTypes from 'prop-types'
import { currencyFormatter } from 'utils'

import { YoloPriceCoordinate } from './YoloPriceCoordinate'
import { YoloLabelCoordinate } from './YoloLabelCoordinate'
import { functor } from 'react-stockcharts/lib/utils'

import { motion } from 'framer-motion'
import { addAlpha } from 'utils/colors/addAlpha'

export const YoloRefCoordinate = ({
  id,
  refPrice,
  refDecimals,
  refLabel,
  refLabelColor = '#ffffff',
  priceDx = 0,
  mainColor = 'orange',
  lineGradOrient = 'right',
  lineDasharray,
  refLabelFill,
  refLabelStroke,
  iconSrc,
  iconWidth,
  hideLine
}) => {
  return (
    <motion.g animate={{ opacity: 1 }} exit={{ opacity: 0, duration: 1000 }}>
      <YoloPriceCoordinate
        id={`${id}.refPrice`}
        //position
        at='right'
        orient='left'
        price={refPrice}
        yClamp={true}
        dx={priceDx}
        //shape
        fill='#000000'
        baseScale={0.2}
        baseOffsetY={-8}
        strokeWidth={1}
        rectPadding={5}
        rectHeight={5}
        baseGlow={addAlpha(mainColor, 0.2)}
        arrowWidth={16}
        padding={12}
        //text
        fontFamily='Inter'
        fontWeight={800}
        fontSize='1.2rem' //should be always in rem
        textFill={mainColor}
        displayFormat={(d) => currencyFormatter(d, { decimalDigits: refDecimals, noCurrencySign: true })}
        textOffsetX={0}
        //icon
        iconSrc={iconSrc}
        iconWidth={iconWidth}
        //line
        hideLine={true}
      />
      {/* refLabelFill='hsl(340,88%,0%)' refLabelStroke='hsl(340,88%,46%)' */}
      <YoloLabelCoordinate
        id={`${id}.refLabel`}
        //position
        at='left'
        orient='right'
        price={refPrice}
        dx={-2}
        yClamp={true}
        //tag shape
        fill={refLabelFill || mainColor}
        baseScale={0.12}
        shapeStroke={refLabelStroke}
        //text
        fontFamily='Inter'
        fontWeight={900}
        fontSize='0.65rem' //should be always in rem
        textOffsetX={9}
        textFill={refLabelColor}
        displayFormat={(d) => refLabel}
        //line
        strokeDasharray={lineDasharray}
        lineStroke={mainColor}
        lineWidth={2}
        lineOpacity={1}
        lineGradOrient={lineGradOrient}
        lineGrad={[
          { offset: '0%', color: mainColor, opacity: lineGradOrient === 'right' ? 1 : 0 },
          { offset: '80%', color: mainColor, opacity: lineGradOrient === 'right' ? 0 : 1 }
        ]}
        hideLine={hideLine}
      />
    </motion.g>
  )
}

YoloRefCoordinate.propTypes = {
  id: PropTypes.string.isRequired
}
