import { icons } from 'common'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const designerForPushAndWinnerCSS = css`
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
  .asset_row {
    display: flex;
    padding: 0 0 0 20px;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin: 0 0 2px 0;
    position: relative;
  }
  .asset_row .asset_name {
    text-align: left;
    margin: 0 5px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 80px;
    text-overflow: ellipsis;
  }
  .asset_row.eth .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/eth_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  #stats #your_bids .bidders_list.eth #toggle_eth:checked ~ label.currency_wrap::before,
  #stats #your_bids .bidders_list.tesla #toggle_tesla:checked ~ label.currency_wrap::before {
    -webkit-mask: url('http://yolo.tino.me/game/resources/images/minus_icon.svg') center center / 10px 10px no-repeat;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: 18px;
    content: '';
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/bidders_panel.css */
  .level_ind {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    line-height: 0;
    font-size: 0.7rem;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 6px 0 0;
    padding: 0 0 0 0;
  }
  .level_ind.third {
    background: #698688;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .signin_modal_tabs_wrapper #hidden_pr:checked ~ .panels {
    margin: 0;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/results.css */
  .window_page_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(33, 38, 47, 0.6);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.2em;
    font-weight: 800;
    flex-direction: column;
    display: none;
  }
  .window_page_overlay:before {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    content: '';
    -webkit-transform: translateZ(-50%);
    -moz-transform: translateZ(-50%);
    -ms-transform: translateZ(-50%);
    -o-transform: translateZ(-50%);
    transform: translateZ(-50%);
  }
  .window_page_overlay.you_won:before {
    background: linear-gradient(
      180deg,
      rgba(23, 60, 139, 0.15) 0%,
      rgba(10, 25, 58, 0.95) 60%,
      rgba(10, 25, 58, 0.85) 85%,
      rgba(23, 60, 139, 0.15) 100%
    );
  }
  .window_page_overlay h2 {
    font-size: 3.1rem;
    font-weight: 600;
    position: relative;
    z-index: 9;
    letter-spacing: -0.03em;
    margin: 20px 0 5px 0;
    line-height: 100%;
  }
  .window_page_overlay .which_rounds {
    position: relative;
    z-index: 9;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 15px 30px;
    margin: 0;
    text-align: center;
  }
  .window_page_overlay .round {
    font-size: 1.3rem;
    font-weight: 800;
    z-index: 9;
    padding: 20px 0 10px 0;
  }
  .window_page_overlay .close {
    color: #fff;
    font-size: 1.4rem;
    line-height: 100%;
    position: absolute;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 30px;
    text-align: center;
    text-decoration: none;
    top: 30px;
    z-index: 9;
    cursor: pointer;
    -webkit-mask: url('http://yolo.tino.me/game/resources/images/close.svg') center center / auto 25px no-repeat;
    mask: url('http://yolo.tino.me/game/resources/images/close.svg') center center / auto 25px no-repeat;
    background: rgba(255, 255, 255, 1);
  }
  .window_page_overlay .round_asset_used {
    position: relative;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 5px 0 0 0;
  }
  .window_page_overlay .round_asset_used.asset_row .asset_name {
    font-size: 1.2rem;
    margin: 0 0 0 5px;
    max-width: none;
  }
  .window_page_overlay .round_asset_used .result_round_length {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    font-size: 1rem;
    line-height: 100%;
    padding: 10px 12px;
    margin: 0 10px 0 0;
  }
  .window_page_overlay .which_rounds .settlement_price {
    font-size: 1rem;
    font-weight: 300;
    padding: 0 0 0 0;
  }
  .window_page_overlay a.bid_in_next_game_btn {
    background: rgba(36, 89, 202, 1);
    border-radius: 15px;
    padding: 8px 24px;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    margin: 10px 0 0 0;
    position: relative;
    z-index: 9;
  }
  .window_page_overlay a.bid_in_next_game_btn:hover {
    background: rgba(42, 109, 255, 1);
  }
  .window_page_overlay .list_of_wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;
    position: relative;
    z-index: 8;
  }
  .window_page_overlay .list_of {
    display: flex;
    max-width: 500px;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
    max-height: 250px;
    min-width: 240px;
  }
  .window_page_overlay .list_of h4 {
    font-size: 1rem;
    font-weight: 800;
    padding: 12px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .window_page_overlay .list_of h4 strong {
    display: block;
    text-transform: none;
    font-weight: 500;
  }
  .window_page_overlay .list_of.bid_down h4 strong {
    color: rgba(178, 5, 58, 1);
  }
  .window_page_overlay .list_of.winners h4 {
    color: rgba(255, 255, 255, 1);
  }
  .window_page_overlay .grid {
    display: grid;
    grid-template-columns: 2fr 2fr;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.8rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .window_page_overlay .grid > span {
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .window_page_overlay .grid > span:last-child,
  .window_page_overlay .grid > span:nth-last-child(2) {
    border-bottom: 0;
  }
  .window_page_overlay .grid > span.head {
    background: rgba(255, 255, 255, 0.05);
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
  .window_page_overlay .grid > span.head strong {
    font-weight: 600;
    margin: 0 3px 0 0;
  }
  .window_page_overlay .grid > span.head:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
  .window_page_overlay a.share_on_twitter {
    display: flex;
    position: relative;
    z-index: 7;
    font-size: 0.9rem;
    text-decoration: none;
    border: 1px solid #1da1f2;
    border-radius: 15px;
    padding: 8px 20px 8px 20px;
    line-height: 100%;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
  .window_page_overlay a.share_on_twitter .icon {
    -webkit-mask: url('http://yolo.tino.me/game/resources/images/twitter_icon.svg') center center / auto 16px no-repeat;
    mask: url('http://yolo.tino.me/game/resources/images/twitter_icon.svg') center center / auto 16px no-repeat;
    background: #1da1f2;
    width: 16px;
    height: 16px;
    margin: 0 0 0 10px;
  }
  .window_page_overlay a.share_on_twitter:hover {
    background: rgba(29, 161, 242, 0.3);
  }
  .window_page_overlay a.sharetwitter_learnmore {
    position: relative;
    z-index: 7;
    font-size: 0.8rem;
    display: flex;
    margin: 5px 0 0 0;
  }
  .window_page_overlay a.sharetwitter_learnmore:hover {
    text-decoration: none;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 1200px) {
    #stats #your_bids .bidders_list.eth #toggle_eth:checked ~ label.currency_wrap::before,
    #stats #your_bids .bidders_list.tesla #toggle_tesla:checked ~ label.currency_wrap::before {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .asset_row .asset_name {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .window_page_overlay h2 {
      font-size: 2.7rem;
      letter-spacing: -0.02em;
      margin: 5px 0;
    }
    .window_page_overlay .which_rounds {
      padding: 15px 30px;
      margin: 5px 0;
    }
    .window_page_overlay .round {
      padding: 5px 0;
    }
    .window_page_overlay .grid > span {
      padding: 6px 12px;
      font-size: 0.8rem;
    }
    .window_page_overlay a.bid_in_next_game_btn {
      padding: 8px 24px;
      font-size: 0.9rem;
    }
    .window_page_overlay .list_of_wrap {
      flex-direction: row;
      margin: 15px 0 0 0;
    }
    .window_page_overlay .list_of {
      max-height: 200px;
    }
    .window_page_overlay .list_of h4 {
      font-size: 0.9rem;
    }
    .window_page_overlay .list_of h4 strong {
      display: inline-block;
      padding: 0 0 0 6px;
    }
    .window_page_overlay .list_of {
      min-width: 180px;
    }
  }
  /*! CSS Used from: Embedded */
  .window_page_overlay.you_won {
    display: flex;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/games_menu.css */
  .asset_row .asset_name {
    text-align: left;
    margin: 0 5px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 110px;
    text-overflow: ellipsis;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .signin_modal_tabs_wrapper #hidden_pr:checked ~ .panels {
    margin: 0;
  }
`
const designerForLost = css`
  .window_page_overlay.you_lost:before {
    background: linear-gradient(
      180deg,
      rgba(23, 60, 139, 0.15) 0%,
      rgba(10, 25, 58, 0.35) 60%,
      rgba(10, 25, 58, 0.35) 85%,
      rgba(23, 60, 139, 0.15) 100%
    );
  }
  .window_page_overlay.you_lost {
    display: flex;
  }
`

const customAdjustments = css`
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
`
export const ResultModalCss = styled.div`
  ${designerForPushAndWinnerCSS}
  ${designerForLost}
  ${customAdjustments}
`
export const Close = styled(IconLib).attrs({ collection: 'general', name: 'closeOutline', dimension: '25px' })`
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30px;
  text-align: center;
  text-decoration: none;
  top: 30px;
  z-index: 9;
  cursor: pointer;
  /* -webkit-mask: url(../../resources/images/close.svg) center center / auto 25px no-repeat; */
  background: rgba(255, 255, 255, 1);
`
export const BidGameButton = styled.button`
  background: rgba(36, 89, 202, 1);
  border-radius: 15px;
  padding: 8px 24px;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  margin: 10px 0 0 0;
  position: relative;
  z-index: 9;
  color: rgba(255, 255, 255, 1);

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 8px 24px;
    font-size: 0.9rem;
  }
`
export const ShareOnTwitterLink = styled.div`
  display: flex;
  position: relative;
  z-index: 7;
  font-size: 0.9rem;
  text-decoration: none;
  border: 1px solid #1da1f2;
  border-radius: 15px;
  padding: 8px 20px 8px 20px;
  line-height: 100%;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 242, 0.3);
  }
`

export const TwitterIcon = styled.div`
  -webkit-mask: url(${icons.TwitterIcon}) center center / auto 16px no-repeat;
  mask: url(${icons.TwitterIcon}) center center / auto 16px no-repeat;
  background: #1da1f2;
  width: 16px;
  height: 16px;
  margin: 0 0 0 10px;
`

export const LearnMoreLink = styled(Link)`
  position: relative;
  z-index: 7;
  font-size: 0.8rem;
  display: flex;
  margin: 5px 0 0 0;
  &:hover {
    text-decoration: none;
  }
`
export const Snap = styled.div`
  width: 60vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`
