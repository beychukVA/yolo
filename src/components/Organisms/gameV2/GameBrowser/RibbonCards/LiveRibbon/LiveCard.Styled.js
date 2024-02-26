import { icons } from 'common'
import styled, { css, keyframes } from 'styled-components'

const blink = keyframes`
  50% {
      border-color: rgba(42,109,255,.8);
      -webkit-box-shadow: 0 1px 19px 0px rgb(42 109 255 / 90%);
      opacity: 1;
    }
    `

const designerCSS = css`
  .game.live.current {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 0;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.7);
    position: relative;
  }
  .game.live.current:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(42, 109, 255, 1) 88%);
    border-radius: 9px;
    z-index: -1;
  }
  .game.live.current.hr24:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #2a6dff;
    background: linear-gradient(
      90deg,
      rgba(0, 135, 13, 1) 0%,
      rgba(0, 113, 11, 1) 15%,
      rgba(0, 96, 9, 1) 25%,
      rgba(0, 82, 8, 1) 40%,
      rgba(51, 56, 67, 1) 50%,
      rgba(104, 0, 35, 1) 60%,
      rgba(119, 7, 45, 1) 75%,
      rgba(150, 9, 57, 1) 85%,
      rgba(175, 11, 66, 1) 100%
    );
    background: linear-gradient(
      38deg,
      rgba(0, 135, 13, 1) 0%,
      rgba(0, 113, 11, 1) 25%,
      rgba(150, 9, 57, 1) 75%,
      rgba(175, 11, 66, 1) 100%
    );
    background: linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(42, 109, 255, 1) 88%);
    border-radius: 9px;
    z-index: -1;
  }
  .game.live.current .q2 {
    color: #fff;
    font-weight: 400;
    font-size: 0.7rem;
  }
  .game.live.current .q2 strong {
    font-weight: 600;
    margin: 0 5px 0 0;
    font-size: 0.65rem;
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
  .game.live .q1 {
    width: 25%;
  }
  .game .q1 .block_time_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .game .q1 .block_time_wrap strong {
    font-size: 0.55rem;
    font-weight: 400;
    opacity: 0.7;
  }
  .game .q1 .block_time_wrap #real_time_value {
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 100%;
  }
  .game .q2 {
    justify-content: center;
    white-space: nowrap;
    width: 48%;
  }
  .game.live .q2 {
    font-weight: 600;
    line-height: 0;
    width: 41%;
  }
  .game.live .q2 strong {
    font-weight: 600;
    margin: 0 5px 0 0;
    line-height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    padding: 4px 5px 3px 5px;
    border-radius: 5px;
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
  .game .game_status .amount {
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 100%;
  }
  .game .q3 .game_status .amount {
    line-height: 100%;
    padding: 2px 0 0 0;
  }
  .game.live .q3 .game_status .amount {
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
  .game.live .q3 .game_status .gs_data_wrap {
    justify-content: center;
    padding: 0;
  }
  .game.live {
    background: rgba(0, 0, 0, 0.3);
    position: relative;
  }
  .game.live:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(135, 92, 255, 1) 20%, rgba(42, 109, 255, 1) 88%);
    border-radius: 10px;
    z-index: -1;
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
    .game.live .q3 .game_status .amount {
      padding: 0;
    }
    .triangle.up.large {
      width: 10px;
      height: 10px;
      -webkit-mask-size: 10px 10px;
      margin: 0 0 1px 0;
    }
    .game.live.current .q2 {
      padding-top: 2px;
      font-size: 0.7rem;
    }
    .game .game_status .amount {
      font-size: 0.65rem;
    }
  }
  /*! CSS Used from: Embedded */
  .game.live.current {
    opacity: 0.4;
  }
  .game.live.current.hr24 {
    opacity: 1;
  }
`
const developerCSS = css`
  .game.live.current.active,
  .game.live.current:hover {
    opacity: 1;
  }
  .game.live {
    animation: ${blink} 1s linear infinite alternate;
    animation: ${({ shouldFlash }) => !shouldFlash && 'none'};
  }
  .game .game_status .gs_data_wrap {
    flex-direction: column;
  }
  .game.live.current:after {
    background: ${({ liveBackgroundColor }) => liveBackgroundColor};
  }
`

export const LiveCardStyled = styled.div`
  margin-bottom: 4px;
  ${designerCSS}
  ${developerCSS}
`
