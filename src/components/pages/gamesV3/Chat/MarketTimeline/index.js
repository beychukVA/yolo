import { useEffect, useRef, useState } from 'react'
import { memoThis } from 'utils/react'
import styled from 'styled-components'
import { EconomicCalendar } from 'react-ts-tradingview-widgets'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

export const MarketTimeline = memoThis(({ isOpen }) => {
  const windowRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const height = windowRef.current.clientHeight
    setHeight(height - 9)
  }, [windowRef?.current])

  return (
    <Container isOpen={isOpen} ref={windowRef}>
      <SingleDataLoader
        loading={!height}
        data={
          <EconomicCalendar
            colorTheme='dark'
            height={height}
            width='101%'
            isTransparent
            currencyFilter='USD'
          ></EconomicCalendar>
        }
      />
    </Container>
  )
})

const Container = styled.div`
  min-width: 300px;
  width: calc(100% + 15px ); */
  margin: 0 0 0 0px;
  height: calc(100% + 10px);
  display: flex;
  justify-content: flex-start;
  background: transparent;
  border-radius: 10px;
  top: -2px;
  left: -13px;
  position: relative;
  align-items: center;
  flex-direction: column;

  padding-left: ${({ isOpen }) => (isOpen ? '0' : '50px')};

  /* &:before {
    position: absolute;
    top: calc(50% + 7px);
    left: 0;
    background: linear-gradient(90deg, rgba(32, 37, 47, 0.8) 0%, rgba(32, 37, 47, 0.1) 100%);
    transform: translateY(-50%);
    content: '';
    height: 100%;
    width: 100%;
    z-index: 0;
  } */
  ${({ theme }) => theme.breakPoints['1200px']} {
    max-width: 100vw;
    margin: 0;
    border-radius: 0;
    overflow-x: hidden;

    &:before {
      display: none;
    }
  }

`
