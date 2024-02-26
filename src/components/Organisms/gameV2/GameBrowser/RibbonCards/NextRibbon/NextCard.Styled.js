import { icons } from 'common'
import styled, { css, keyframes } from 'styled-components'

const designerCSS = css`
  /* ! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css */
  /* @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 7px;
      opacity: 0;
    }
    *:hover ::-webkit-scrollbar {
      opacity: 1;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
      border-radius: 20px;
      opacity: 0;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(21, 26, 34, 0.4);
      border-radius: 20px;
    }
  } */
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    line-height: 140%;
    font-weight: 400;
    color: #fff;
  }
  .gametime {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
  }
  .gametime .game_block_value {
    font-weight: 700;
    line-height: 100%;
    font-size: 0.75rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .game {
    min-width: 280px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    display: flex;
    margin: 0 4px 0 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    height: 35px;
    position: relative;
    font-size: 0.75rem;
    font-weight: 300;
    opacity: 0.4;
  }
  :hover .game {
    opacity: 0.75;
  }
  .game:hover {
    opacity: 1;
  }
  .game .q1,
  .game .q2,
  .game .q3 {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .game .q1 {
    justify-content: center;
    width: 22%;
  }
  .game.next .q1 {
    padding: 0 0 0 5px;
  }
  .game .q2 {
    justify-content: center;
    white-space: nowrap;
    width: 48%;
  }
  .game .q3 {
    justify-content: center;
    width: 22%;
  }
  .game .game_status {
    justify-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 100%;
    align-items: center;
    display: flex;
  }
  .game .q3 .game_status {
    display: flex;
    align-items: center;
  }
  .game .game_status.yolo {
    line-height: 140%;
    font-weight: 600;
  }
  .game .game_status.yolo {
    color: #00ea16;
    white-space: nowrap;
    flex-direction: row;
    display: flex;
    align-items: center;
    line-height: 100%;
  }
  .game .game_status strong {
    font-size: 0.55rem;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
  }
  .game.next .game_status strong {
    margin-left: 0;
  }
  .game.next .gametime {
    border: 0;
  }
  .game.next .gametime .game_block_value {
    font-size: 0.7rem;
  }
  .game .game_status.yolo strong {
    font-size: 0.7rem;
    color: #01a812;
    color: #fff;
    font-weight: 800;
    margin-right: 5px;
    line-height: 100%;
    white-space: nowrap;
  }
  .game .game_status.yolo.rekt strong {
    color: #e20e55;
    color: #fff;
  }
  .game .game_status .amount {
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 100%;
  }
  .game .game_status.yolo .amount {
    font-size: 0.7rem;
    font-weight: 400;
    line-height: 100%;
  }
  .game .q3 .game_status .amount {
    line-height: 100%;
    padding: 2px 0 0 0;
  }
  .game .game_status .gs_data_wrap {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .game .q3 .game_status .gs_data_wrap {
    justify-content: flex-start;
  }
  .games_row.tesla_row .game.next {
    background: rgba(42, 109, 255, 0.15);
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 1200px) {
    .game {
      opacity: 0.75;
    }
  }
  @media (max-width: 600px) {
    .gametime {
      margin: 0 5px;
      padding: 8px 4px;
    }
    .gametime .game_block_value {
      font-weight: 600;
      font-size: 0.65rem;
      line-height: 0;
      top: 0.1em;
      position: relative;
    }
  }
  @media (max-width: 480px) {
    .game {
      min-width: 270px;
      height: 32px;
    }
    .game .game_status .amount {
      font-size: 0.65rem;
    }
  }
`
const developerCSS = css`
  .game.next.active {
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: linear-gradient(
        38deg,
        rgba(42, 109, 255, 0.5) 0%,
        rgba(42, 109, 255, 0.75) 25%,
        rgba(42, 109, 255, 0.85) 50%,
        rgba(42, 109, 255, 0.75) 75%,
        rgba(42, 109, 255, 0.5) 100%
      );
      border-radius: 10px;
      z-index: -1;
    }
  }
  .predict_now {
    background: rgba(135, 187, 250, 0.15);
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 0;
    text-transform: uppercase;
    display: inline-block;
    cursor: pointer;
  }
`

export const NextCardStyled = styled.div`
  margin-bottom: 4px;
  ${designerCSS}
  ${developerCSS}
  #ribbonCardBase {
    opacity: ${({ isActive }) => (isActive ? 1 : '')};
  }
`
