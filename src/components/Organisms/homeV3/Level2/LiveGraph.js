// import { LivePriceO2GA } from 'components/Organisms/PriceGraph/LivePriceO2GA'
import { G3minLivePriceO2GA } from 'components/Organisms/PriceGraph/G3minLivePriceO2GA'
import { useGameEngineSocket } from 'hooks/gameEngine/useGameEngineSocket'
import { useEffect } from 'react'
import styled from 'styled-components'

const GAME_ID = 'ETH_USD_70'

export const LiveGraph = ({ className }) => {
  const { connect, disconnect } = useGameEngineSocket()

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper id='liveGraph' className={className}>
      <Container>
        <G3minLivePriceO2GA gameId={GAME_ID} options={{ tailLine: true }} />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 88px;
  z-index: 1;
`
const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 60px;
  transform: translate(0, -50%);
  display: grid;
  grid-template: 1fr/1fr;
  width: calc(100% - 120px);
  height: 600px;
  ${({ theme }) => theme.breakPoints['768px']} {
    left: 30px;
    width: calc(100% - 60px);
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    height: 540px;
  }
`
