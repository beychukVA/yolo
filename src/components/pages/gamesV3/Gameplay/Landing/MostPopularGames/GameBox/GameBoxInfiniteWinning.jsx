import { images } from 'common'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import React from 'react'
import styled, { css } from 'styled-components'
import { GameBox } from './GameBox'

export const GameBoxInfiniteWinning = () => {
  const { setCurrentGame } = useLayoutV3State()
  const handleCardSelected = () => setCurrentGame(GAME_TYPES.G_LVG)
  return (
    <GameBox className='infiniteBox' onClick={handleCardSelected}>
      <Top className='top' />
      <Bottom>
        <Left>
          <p>
            This is next-gen of <span>leveraged trading</span> with the insanely good design and performance that you’ve
            been craving. It’s got killer leverage, incentives, royalties, and leverage up-to 100x with no minimum
            portfolio balance.{' '}
          </p>
        </Left>
        <Right>
          <Button onClick={() => handleCardSelected()}>Trade now</Button>
        </Right>
      </Bottom>
    </GameBox>
  )
}

const Top = styled.div`
  position: relative;
  background: url('http://yolo.tino.me/app_v3/resources/images/landing/iws_banner_bg.jpg') center center / cover
    no-repeat;
  height: 350px;
  width: 100%;
  z-index: 0;
  box-shadow: inset 0 0 100px 20px hsla(0, 0%, 0%, 0.9);
  border-radius: 10px;
  transition: all 500ms ease;
  display: flex;
  min-height: 200px;

  &::before {
    position: absolute;
    top: calc(50% - 80px);

    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 100%;
    height: 200%;
    background: url('http://yolo.tino.me/app_v3/resources/images/landing/futures_feature_title.png') center center /
      750px auto no-repeat;
    z-index: 0;
  }

  @media (max-width: 800px) {
    height: 300px;
  }
  @media (max-width: 600px) {
    min-height: 150px;
    overflow: hidden;
  }
`

const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  background: transparent;
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100%;
  padding: 20px 40px;
  border-radius: 0 0 10px 10px;
  @media (max-width: 600px) {
    bottom: 0px;
  }
`

const Left = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  font-size: 0.8rem;
  padding: 0 0 20px 0;

  & p {
    line-height: 140%;
    font-size: 1.2rem;

    @media (max-width: 1200px) {
      line-height: 140%;
      font-size: 1rem;
    }

    @media (max-width: 800px) {
      line-height: 130%;
      font-size: 0.9rem;
    }
    @media (max-width: 600px) {
      line-height: 130%;
      font-size: 0.9rem;
    }
  }

  & span {
    font-weight: 700;
    display: inline;
  }

  @media (max-width: 800px) {
    padding: 0 0 15px 0;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
  }
  @media (max-width: 600px) {
    padding: 0 0 15px 0;
  }
`

const Right = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`

const Button = styled.button`
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  outline: none;
  border: none;
  background: linear-gradient(0deg, #600dae, #6310b1, #6613b5, #6916b8, #6b19bc, #6e1cbf, #711ec3, #7421c6);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  border-radius: 1.5em;
  padding: 20px 70px;
  box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.7);

  @media (max-width: 600px) {
    font-size: 1.2rem;
    letter-spacing: -0.02em;
    padding: 15px 40px;
  }
`
