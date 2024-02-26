import { images } from 'common'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import React from 'react'
import styled from 'styled-components'
import { GameBox } from './GameBox'

export const GameBoxShortThermPrediction = () => {
  const { setCurrentGame } = useLayoutV3State()
  // const handleCardSelected = () => setCurrentGame(GAME_TYPES.G_3MIN)
  const handleCardSelected = () => setCurrentGame(GAME_TYPES.G_NONE)
  return (
    // <GameBox className='shortTherm' onClick={handleCardSelected}>
    <GameBox className='shortTherm' href='game?gametype=G_LVG'>
      <Top></Top>
      <Bottom>
        <Left>
          <label>3 Minutes</label>
          You have only 3 minutes to choose whether the price will be above or below the strike -- good luck!
        </Left>
        <Right>
          {/* <Button onClick={() => handleCardSelected()}>Play now</Button> */}
          <Button href='game/v2'>Bid now</Button>
        </Right>
      </Bottom>
    </GameBox>
  )
}

const Top = styled.div`
  width: 100%;
  display: flex;
  min-height: 200px;
  position: relative;
  border-radius: 10px 10px px 0 0;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 200px;
    background: url(${images.stpp_banner_bg}) left center / 95% auto no-repeat;
    z-index: 0;
  }

  @media (max-width: 600px) {
    height: 150px;
    min-height: 150px;
  }
`
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: hsl(213, 14%, 12%);
  padding: 20px;
  border-radius: 0 0 8px 8px;

  @media (max-width: 1600px) {
    flex-direction: column;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 900px;
  width: 55%;
  font-size: 0.8rem;
  line-height: 140%;

  & label {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1.4rem;
    margin: 0 0 10px 0;
    white-space: nowrap;

    @media (max-width: 600px) {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 1600px) {
    width: 100%;
    text-align: center;
  }
`
const Right = styled.div``

const Button = styled.a`
  border-radius: 1.5em;
  padding: 15px 40px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 700;
  white-space: nowrap;
  margin: 0 0 0 30px;
  outline: none;
  border: none;
  background: linear-gradient(
    180deg,
    #2159d1,
    #2159d0,
    #2158cf,
    #2057cd,
    #2056ca,
    #1f55c7,
    #1f53c3,
    #1e52c0,
    #1e51bd,
    #1d50bb,
    #1d4fba,
    #1d4fb9
  );
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;

  @media (max-width: 1600px) {
    margin: 10px 0 0 0;
  }

  @media (max-width: 600px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`
