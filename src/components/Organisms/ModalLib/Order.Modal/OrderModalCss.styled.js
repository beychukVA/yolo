import { icons } from 'common'
import styled, { css } from 'styled-components'
const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/global.css */

  button {
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
    border-radius: 10px;
  }
  button:hover {
    background: hsl(221, 73%, 47%);
  }
  /* @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
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
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  } */

  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/modal.css */
  .popUpContainer {
    /* width: 100%; */
    min-width: 300px;
    max-width: 600px;
    /* position: fixed; */
    /* left: 50%; */
    /* top: -100vh; */
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
    /* transform: translateX(-50%); */
    -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    z-index: 99;
  }
  article {
    max-height: 800px;
    height: fit-content;
    background-color: hsla(214, 18%, 16%, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 0 0 10px 10px;
    padding: 0 30px 30px 0;
    display: flex;
    flex-direction: row;
  }
  header {
    z-index: 1;
    position: relative;
    top: 0;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    padding: 30px;
    background: hsla(214, 18%, 16%, 0.8);
    border-radius: 10px 10px 0 0;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    line-height: 130%;
  }
  .closePopUp {
    cursor: pointer;
    top: -5px;
    left: -5px;
    mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    background: hsl(0, 0%, 100%);
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
  }

  &:target .popUpContainer {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/games_panel.css */
  .profile_avatar img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 8px;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */
  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/user-bid.css */
  .popUpContainer.user-bid article {
    padding: 0;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
  .popUpContainer.user-bid {
    width: fit-content;
  }
  .popUpContainer.user-bid header {
    padding: 20px 30px 5px 30px;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    border: 0;
  }
  .popUpContainer.user-bid label .profit_direction.up {
    -webkit-mask: url(${icons.pandl_up_icon}) center center / 22px auto no-repeat;
    background: hsl(126, 100%, 38%);
    height: 15px;
    width: 30px;
    transform: translate(0, 2px);
  }
  .popUpContainer.user-bid label .profit_direction.down {
    -webkit-mask: url(${icons.pandl_up_icon}) center center / 22px auto no-repeat;
    background: hsl(340, 88%, 46%);
    height: 15px;
    width: 30px;
    transform: scaleY(-1);
  }
  .popUpContainer.user-bid .content {
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }
  .popUpContainer.user-bid .content.column {
    width: 100%;
    align-items: center;
    padding: 5px 30px;
    border-top: 0;
  }
  .popUpContainer.user-bid .content.column-alt {
    width: 100%;
    align-items: center;
    padding: 0 30px;
    border-top: 0;
    justify-content: center;
    text-align: center;
  }
  .popUpContainer.user-bid .profile_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 0 0 0;
  }
  .popUpContainer.user-bid .bid_date {
    font-size: 0.75rem;
    padding: 8px 0 0 0;
    text-align: center;
    font-weight: 400;
  }
  .popUpContainer.user-bid .profile_wrapper .profile_avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popUpContainer.user-bid .profile_wrapper .profile_avatar img {
    border-radius: 0.3em;
  }
  .popUpContainer.user-bid .profile_wrapper .profile_name {
    margin: 0 0 0 5px;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .popUpContainer.user-bid .grid-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .popUpContainer.user-bid .grid-content label {
    padding: 0 0 6px 0;
  }
  .popUpContainer.user-bid .grid-content label.title {
    text-align: right;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .popUpContainer.user-bid .grid-content label.value {
    margin: 0 0 0 15px;
    font-weight: 700;
    white-space: nowrap;
  }
  .popUpContainer.user-bid .grid-content label.value.green {
    color: hsl(120, 100%, 39%);
  }
  .popUpContainer.user-bid .grid-content label.value.red {
    color: hsl(340, 88%, 46%);
  }
  .popUpContainer.user-bid .grid-content label.value .asset {
    flex-direction: row;
    display: flex;
    white-space: nowrap;
    color: inherit;
    font-weight: inherit;
    white-space: inherit;
  }
  .popUpContainer.user-bid .grid-content label.value .price_direction_icon {
    margin: 0 5px 0 0;
    mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
  }

  .price_direction_icon.down {
    background: hsl(340, 88%, 46%);
    transform: rotate(0deg) translate(0, 3px);
    width: 14px;
    height: 14px;
  }

  .price_direction_icon.up {
    background: hsl(120, 100%, 39%);
    transform: rotate(180deg) translate(0, -3px);
    width: 14px;
    height: 14px;
  }

  .popUpContainer.user-bid .social_list {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 0 5px 0;
  }
  .popUpContainer.user-bid .social_list div.twitter {
    border-radius: 10px;
    height: 60px;
    line-height: 100%;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: linear-gradient(0deg, #053958, #053b5b, #053d5e, #053f61, #054164, #064368, #06456b, #06476e);
    position: relative;
    &:hover {
      cursor: pointer;
    }
  }
  .popUpContainer.user-bid .social_list div.twitter::before {
    content: 'SHARE BID';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .popUpContainer.user-bid .social_list div.twitter::after {
    background: url(${icons.twitter_icon_blue}) center center / 20px auto no-repeat;
    width: 20px;
    height: 20px;
    position: absolute;
    content: '';
    top: 10px;
  }
  .popUpContainer.user-bid .social_list div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .popUpContainer.user-bid .social_list .twitter {
    background: url(${icons.twitter_icon_blue}) center center / 18px auto no-repeat;
  }
  .popUpContainer.user-bid .social_list .telegram {
    background: url(${icons.telegram_icon}) center center / 18px auto no-repeat;
  }
  .popUpContainer.user-bid .social_list .discord {
    background: url(${icons.discord_icon}) center center / 18px auto no-repeat;
    margin: 0;
  }
  .popUpContainer.user-bid .social_list div:hover {
    color: hsl(0, 0%, 100%);
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  .popUpContainer.user-bid button.clone_bid {
    text-transform: uppercase;
    width: 100%;
    border-radius: 10px;
    padding: 14px 20px;
    font-weight: 600;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/res.css */
  @media (max-width: 600px) {
    .popup header {
      padding: 20px;
    }
    .popup article {
      height: 80vh;
      max-height: 80vh;
      overflow: auto;
      flex-direction: column;
    }
  }
`
const developerCSS = css`
  .asset .asset_icon {
    background: ${({ assetIcon }) => `url(${assetIcon})`};
    transform: translate(0, 2px);
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`

export const OrderModalCss = styled.div`
  ${designerCSS}
  ${developerCSS}
`
