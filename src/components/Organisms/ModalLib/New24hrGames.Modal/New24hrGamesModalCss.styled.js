import { icons } from 'common'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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
  button {
    outline: none;
    border: none;
    background: transparent;
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 160%;
  }

  .alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .alert .window:after {
    width: 300px;
    height: 200px;
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(50px);
    z-index: 3;
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .alert .window {
    width: 320px;
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 5;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
  }
  .alert.newgame .window {
    width: 400px;
  }
  .alert.newgame .window .alert_image {
    margin: 15px 0 0 0;
  }
  .alert .window * {
    position: relative;
    z-index: 9;
  }
  .alert .window h1 {
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    line-height: 120%;
  }
  .alert .window h3 {
    text-align: center;
    font-size: 0.9rem;
    padding: 5px 0 0 0;
  }
  .alert.newgame .window h3 {
    font-size: 0.8rem;
  }
  .alert .window button {
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    background: rgba(36, 89, 202, 1);
    display: inline-block;
    flex-direction: row;
    margin: 10px 0 0 0;
    text-decoration: none;
  }
  .alert .window button:hover {
    background: rgba(42, 109, 255, 1);
  }
  .alert .window button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .alert .window button:disabled:hover {
    background: rgba(36, 89, 202, 1);
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .signin_modal_tabs_wrapper #hidden_pr:checked ~ .panels {
    margin: 0;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 1200px) {
    #stats #your_bids .bidders_list.eth #toggle_eth:checked ~ label.currency_wrap::before,
    #stats #your_bids .bidders_list.tesla #toggle_tesla:checked ~ label.currency_wrap::before {
      display: none;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .signin_modal_tabs_wrapper #hidden_pr:checked ~ .panels {
    margin: 0;
  }
`

const developerCSS = css``

export const New24hrGamesModalCss = styled.div`
  ${designerCSS}
  ${developerCSS}
`
