import { MarkerCoordinate } from './MarkerCoordinate'

export const YoloMarkerCoordinate = ({ currentPrice, refPrice }) => {
  return (
    <MarkerCoordinate
      at='right'
      price={currentPrice}
      dx={0}
      coreFill={'hsl(0,0%,67%)'}
      radarFill={'hsl(0,0%,67%,.5)'}
    />
  )
}
