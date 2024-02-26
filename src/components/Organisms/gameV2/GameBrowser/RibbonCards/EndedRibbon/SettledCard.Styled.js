import { icons } from 'common'
import styled, { css, keyframes } from 'styled-components'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css */
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
  a {
    color: #fff;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  a:hover {
    text-decoration: none;
  }
  .triangle {
    margin-right: 0;
  }
  .games_tiles_wrapper .games_row a {
    text-decoration: none;
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
  .game.past .q1 {
    font-weight: 600;
  }
  .game .q2 {
    justify-content: center;
    white-space: nowrap;
    width: 48%;
  }
  .game.past .q2 {
    color: rgba(255, 255, 255, 1);
    text-transform: uppercase;
    font-size: 0.7rem;
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
  .game.past.yolo .q1 .game_status strong {
    margin-left: 0;
    font-weight: 600;
  }
  .game.past.yolo .q1 .game_status .gs_data_wrap .amount {
    color: rgba(0, 194, 19, 1);
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
  .game.past .q1 .game_status strong {
    margin-left: 0;
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
  .game .q1 .game_status .gs_data_wrap {
    padding: 0;
  }
  .game .q3 .game_status .gs_data_wrap {
    justify-content: flex-start;
  }
  .game.past .q3 .game_status .gs_data_wrap {
    justify-content: center;
  }
  .games_row.tesla_row .game.past {
    background: rgba(64, 74, 94, 0.6);
  }
  .triangle.up {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
  }
  .triangle.down {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
    transform: rotate(180deg);
  }
  .triangle.up.large {
    width: 12px;
    height: 10px;
    -webkit-mask-size: 12px 12px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.down.large {
    width: 12px;
    height: 10px;
    -webkit-mask-size: 12px 12px;
    background: rgba(226, 14, 85, 1);
    margin-right: 5px;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 1200px) {
    .game {
      opacity: 0.75;
    }
  }
  @media (max-width: 480px) {
    .game {
      min-width: 270px;
      height: 32px;
    }
    .triangle.up.large {
      width: 10px;
      height: 10px;
      -webkit-mask-size: 10px 10px;
      margin: 0 0 1px 0;
    }
    .game .game_status .amount {
      font-size: 0.65rem;
    }
    .games_row .game.past {
      display: none;
    }
  }
`
const developerCSS = css`
  .game.past.current:hover {
    opacity: 1;
  }
  .game.past.current.active {
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
  .game .game_status .gs_data_wrap {
    flex-direction: column;
  }
  .game.past.yolo .q1 .game_status .gs_data_wrap .amount.rekt {
    color: rgba(226, 14, 85, 1);
  }
`

export const SettledCardStyled = styled.div`
  margin-bottom: 4px;
  ${designerCSS}
  ${developerCSS}
    #ribbonCardBase {
    opacity: ${({ isActive }) => (isActive ? 1 : '')};
  }
`
