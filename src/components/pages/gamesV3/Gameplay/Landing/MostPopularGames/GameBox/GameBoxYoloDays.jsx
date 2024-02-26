import { images } from 'common'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import React from 'react'
import styled from 'styled-components'
import { GameBox } from './GameBox'

export const GameBoxYoloDays = ({ onTabSelected, hrefTab }) => {
  const { setCurrentGame } = useLayoutV3State()
  const handleCardSelected = () => setCurrentGame(GAME_TYPES.G_24HR)
  return (
    // <GameBox className='yoloDays' onClick={handleCardSelected}>
    <GameBox className='yoloDays' href='game?gametype=G_LVG'>
      <Top className='top'></Top>
      <Bottom>
        <Left>
          <label>YOLO Days</label>
          This is our 24-hour game - place as many bids as you’d like for a day as the price flows up and down.
        </Left>
        <Right>
          {/* <Button onClick={() => handleCardSelected()}>Play now</Button> */}
          <Button href='game/v2'>Play now</Button>
        </Right>
      </Bottom>
    </GameBox>
  )
}

const Top = styled.div`
  display: flex;
  min-height: 200px;
  position: relative;
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 200px;
  background: url(${images.yd_banner_bg}) center center / cover no-repeat;
  z-index: 0;
  box-shadow: inset 0 0 100px 20px hsl(0deg 0% 0% / 60%);
  transition: all 500ms ease;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: hsl(213, 14%, 12%);
  padding: 20px;
  border-radius: 0 0 10px 10px;

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
  background: linear-gradient(0deg, #0e800d, #0f840e, #0f880e, #108c0f, #10900f, #119510, #119910, #129d11);
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
