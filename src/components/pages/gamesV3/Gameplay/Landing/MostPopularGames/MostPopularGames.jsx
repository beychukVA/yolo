import React from 'react'
import styled, { css } from 'styled-components'
import { GameBoxBadges } from './GameBox/GameBoxBadges'
import { GameBoxInfiniteWinning } from './GameBox/GameBoxInfiniteWinning'
import { GameBoxShortThermPrediction } from './GameBox/GameBoxShortThermPrediction'
import { GameBoxYoloDays } from './GameBox/GameBoxYoloDays'

export const MostPopularGames = () => {
  return (
    <MostPopularGamesContainer>
      <Title>Games</Title>
      <GameBoxContainer>
        <GameBoxInfiniteWinning />
        <GameBoxBadges />
        <GameBoxShortThermPrediction />
        <GameBoxYoloDays />
      </GameBoxContainer>
    </MostPopularGamesContainer>
  )
}

const designerCSS = css`
  .infiniteBox {
    width: 100%;
    height: 350px;
    margin: 0 0 0 0;
    position: relative;
    flex-direction: column;
    padding: 0;
    cursor: pointer;
    .top {
      height: 350px;
    }
    &:hover .top,
    &:focus .top {
      box-shadow: inset 0 0 0 1px hsl(270deg 72% 45%);
    }

    @media (max-width: 1600px) {
      .top:before {
        top: calc(50% - 80px);
      }
    }

    @media (max-width: 800px) {
      .top:before {
        top: calc(50% - 70px);
        background-size: 550px auto;
      }
    }

    @media (max-width: 600px) {
      height: 300px;
      .top {
        height: 300px;
      }
      .top:before {
        top: calc(50% - 65px);
      }
      .bottom {
        bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
      }
      a.ph_badge {
        left: 50%;
        transform: translateX(-50%);
      }
      a.ph_badge_2 {
        top: 72px;
        right: auto;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    @media (max-width: 430px) {
      height: 430px;
      .top {
        height: 430px;
      }
      .top:before {
        top: calc(50% - 30px);
      }
    }
  }

  .shortTherm {
    background: linear-gradient(45deg, #101d39, #111e3b, #12203c, #13213e, #14233f, #152441, #162642, #172744);
    position: relative;
    box-shadow: inset 0 0 100px 20px hsl(0deg 0% 0% / 60%);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
    cursor: pointer;
    transition: all 500ms ease;

    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 1px hsl(221deg 73% 47%);
    }
  }

  .yoloDays {
    background: linear-gradient(45deg, #101d39, #111e3b, #12203c, #13213e, #14233f, #152441, #162642, #172744);
    position: relative;
    box-shadow: inset 0 0 100px 20px hsl(0deg 0% 0% / 60%);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
    cursor: pointer;

    &:hover .top,
    &:focus .top {
      box-shadow: inset 0 0 0 1px hsl(120deg 82% 33%);
    }
  }
`

const MostPopularGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-radius: 10px;
  margin: 0 0 20px 0;
  line-height: 140%;
  text-align: start;

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 800px) {
    width: 95%;
  }
`

const GameBoxContainer = styled.div`
  width: 100%;
  margin: 0 0 30px 0;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  line-height: 140%;
  text-align: center;
  flex-wrap: wrap;
  ${designerCSS}
`

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 300;
  text-transform: uppercase;
  width: 100%;
  padding: 5px 30px 10px 0;
`
