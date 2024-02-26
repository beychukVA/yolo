import { icons, logos } from 'common'
import styled, { css } from 'styled-components'
import { designerCssShareCard } from './share-card.css'

const designerCssCommon = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/global.css */
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    font-synthesis: none;
    -moz-font-feature-settings: 'kern';
    shape-rendering: geometricPrecision;
    direction: ltr;
    line-height: 100%;
    font-weight: 400;
    color: #fff;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
  }
  a {
    color: #fff;
    text-decoration: none;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  a:hover {
    text-decoration: none;
  }
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
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  .asset.aapl .asset_icon {
    background: url('http://yolo.tino.me/app_v3/resources/images/assets/aapl_icon.svg');
  }

  .yolorekt_logo {
    width: 160px;
    margin: 2px 0 0 20px;
    height: 100%;
    display: block;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/modal.css */
  .popup {
    position: fixed;
    top: -100vh;
    left: 0;
    z-index: 99;
    background: radial-gradient(
      circle at 50% 50%,
      hsla(210, 19%, 16%, 0.6),
      hsla(214, 19%, 15%, 0.6),
      hsla(210, 18%, 13%, 0.6),
      hsla(213, 19%, 12%, 0.6),
      hsla(216, 19%, 10%, 0.6),
      hsla(210, 18%, 9%, 0.7),
      hsla(214, 19%, 7%, 0.7),
      hsla(204, 17%, 6%, 0.8),
      hsla(210, 18%, 4%, 0.9),
      hsla(220, 20%, 3%, 1),
      hsla(180, 14%, 1%, 1),
      hsla(0, 0%, 0%, 1)
    );
    width: 100vw;
    height: 100vh;
    opacity: 0;
    -webkit-transition: opacity 0.5s ease;
    -moz-transition: opacity 0.5s ease;
    -o-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;
  }
  .popup .popUpContainer {
    width: 100%;
    min-width: 300px;
    max-width: 600px;
    position: fixed;
    left: 50%;
    top: -100vh;
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
    transform: translateX(-50%);
    -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    z-index: 99;
  }
  .popup .popUpContainer.wide-1200 {
    width: 100%;
    max-width: 1230px;
  }
  .popup article {
    max-height: 800px;
    height: fit-content;
    background-color: hsla(214, 18%, 16%, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 0 0 10px 10px;
    padding: 0 30px 30px 0;
    display: flex;
    flex-direction: row;
  }
  .popup article.full {
    border-radius: 10px;
    padding: 15px;
    flex-direction: column;
  }
  .popup a.closePopUp {
    top: -5px;
    left: -5px;
    -webkit-mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    background: hsl(0, 0%, 100%);
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
    z-index: 1;
  }
  .popup:target {
    opacity: 1;
    top: 0;
  }
  .popup .closePopUpOutSide {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: default;
  }
  .popup:target .popUpContainer {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */
  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/share-card.css */
  .card_wrapper .panel_left .data_grid .row .data .asset .asset_icon {
    width: 50px;
    height: 50px;
    margin: 0 10px 0 0;
  }

  .card_wrapper .panel_left .yolorekt_logo_share {
    display: flex;
    margin: 0 0 10px 0;
  }
  .card_wrapper .panel_left .yolorekt_logo_share svg {
    height: 45px;
    width: 100%;
  }
  .card_wrapper .panel_left .futures_logo_share {
    display: flex;
  }
  .card_wrapper .panel_left .futures_logo_share svg {
    height: 80px;
    width: 100%;
  }

  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/res.css */
  @media (max-width: 600px) {
    .popup article {
      height: 80vh;
      max-height: 80vh;
      overflow: visible;
      flex-direction: column;
    }
  }
  /*! CSS Used from: Embedded ; media=all */
  @media all {
    .st0 {
      fill: #ffffff;
    }
  }
  article.twitter_share .card_action_area {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0 0 0;
  }
  article.twitter_share button.post_to_twitter {
    width: fit-content;
    padding: 10px 15px;
    font-size: 0.9rem;
    margin: 0 3px 0 0;
  }
  article.twitter_share button.copy_twitter_link {
    width: fit-content;
    padding: 10px 15px 10px 32px;
    font-size: 0.9rem;
    margin: 0 0 0 3px;
    position: relative;
  }
  article.twitter_share button.copy_twitter_link:before {
    background-image: url(${icons.copy_icon_white});
    background-position: left center;
    background-size: auto 14px;
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    z-index: 1;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  article.twitter_share .card_action_area .twitter_link_copied {
    width: fit-content;
    padding: 10px 15px 10px 34px;
    font-size: 0.9rem;
    margin: 0 0 0 3px;
    position: relative;
    background: transparent;
    border: 1px solid hsla(221, 73%, 47%, 0.7);
    border-radius: 10px;
  }
  article.twitter_share .card_action_area .twitter_link_copied:before {
    -webkit-mask: url(${icons.check_icon}) left center / auto 16px no-repeat;
    background-color: hsla(221, 73%, 47%, 1);
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    z-index: 1;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 600px) {
    article.twitter_share .card_action_area {
      flex-direction: column;
      align-items: center;
    }
    article.twitter_share button.post_to_twitter {
      margin: 0;
    }
    article.twitter_share button.copy_twitter_link {
      margin: 5px 0 0 0;
    }
  }
`

const qrCodeCss = css`
  .card_wrapper .panel_right .qr_code canvas#qrCode_default {
    display: block;
  }
  .card_wrapper .panel_right .qr_code canvas#qrCode_1200 {
    display: none;
  }
  .card_wrapper .panel_right .qr_code canvas#qrCode_1000 {
    display: none;
  }
  .card_wrapper .panel_right .qr_code canvas#qrCode_800 {
    display: none;
  }
  @media (max-width: 1200px) {
    .card_wrapper .panel_right .referral_message {
      padding: 100px 0 10px 0;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_default {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1200 {
      display: block;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1000 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_800 {
      display: none;
    }
  }
  @media (max-width: 1000px) {
    .card_wrapper .panel_left {
      width: 70%;
    }
    .card_wrapper .panel_left .data_grid .row.main {
      height: 120px;
    }
    .card_wrapper .panel_left .yolorekt_logo_share svg {
      height: 35px;
    }
    .card_wrapper .panel_left .futures_logo_share svg {
      height: 60px;
    }

    .card_wrapper .panel_right {
      width: 30%;
      padding: 40px;
    }
    .card_wrapper .panel_right .referral_message {
      padding: 0 0 10px 0;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_default {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1200 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1000 {
      display: block;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_800 {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .card_wrapper .panel_left {
      width: 100%;
    }
    .card_wrapper .panel_left .yolorekt_logo_share svg {
      height: 25px;
    }
    .card_wrapper .panel_left .futures_logo_share svg {
      height: 40px;
    }
    .card_wrapper .panel_right {
      width: 100%;
    }
    .card_wrapper .panel_right .qr_code {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translate(0, -50%);
      /* height: 100%; */
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_default {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1200 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1000 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_800 {
      display: block;
    }
  }
  @media (max-width: 600px) {
    .card_wrapper .panel_left .data_grid .row.main {
      height: 30px;
    }
    .card_wrapper .panel_right {
      align-items: flex-start;
    }
    .card_wrapper .panel_right .referral_message {
      margin-right: 0;
      width: 75%;
    }
    .card_wrapper .panel_right .qr_code {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translate(0, -50%);
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_default {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1200 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_1000 {
      display: none;
    }
    .card_wrapper .panel_right .qr_code canvas#qrCode_800 {
      display: block;
    }
  }
`
const ShareButtonMenu = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/share-card.css */
  article.twitter_share .card_action_area {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px 0 5px 0;
    position: relative;
  }
  article.twitter_share button.share_card_button {
    width: fit-content;
    padding: 13px 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  article.twitter_share button.post_to_twitter {
    position: relative;
    border-radius: 0;
  }
  article.twitter_share button.copy_link_button {
    position: relative;
    border-radius: 0;
  }
  article.twitter_share button.download_image_button {
    position: relative;
    border-radius: 0;
  }
  article.twitter_share button.copy_image_button {
    position: relative;
    border-radius: 10px 10px 0 0;
  }
  article.twitter_share button.post_to_twitter:before {
    -webkit-mask: url(${icons.twitter_icon}) left center / auto 14px no-repeat;
    background: #fff;
    position: absolute;
    content: '';
    width: 18px;
    height: 14px;
    z-index: 1;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  article.twitter_share button.copy_link_button:before {
    background-image: url(${icons.copy_icon_white});
    background-position: left center;
    background-size: auto 14px;
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    z-index: 1;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  article.twitter_share button.copy_image_button:before {
    background-image: url(${icons.copy_image_icon});
    background-position: left center;
    background-size: auto 16px;
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    z-index: 1;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  article.twitter_share button.download_image_button:before {
    background-image: url(${icons.download_icon});
    background-position: left center;
    background-size: auto 17px;
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    width: 17px;
    height: 17px;
    z-index: 1;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  article.twitter_share .card_action_area * {
    transition: none;
    -webkit-transition: none;
    -moz-transition: none;
  }
  article.twitter_share .card_action_area .menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
    background: hsla(0, 0%, 100%, 0.1);
    backdrop-filter: blur(30px);
    border-radius: 10px;
    padding: 3px;
    z-index: 2;
  }
  article.twitter_share .card_action_area .menu > ul {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    border-radius: 10px;
  }
  article.twitter_share .card_action_area .menu > ul > li {
    padding: 0;
  }
  article.twitter_share .card_action_area .menu > ul > li > button {
    padding: 15px 22px 15px 40px;
    margin: 0 0 2px 0;
    width: 100%;
    font-size: 0.9rem;
    -webkit-appearance: button;
    -moz-appearance: button;
    text-transform: none;
    overflow: visible;
    text-align: left;
    cursor: pointer;
    display: flex;
    font-weight: 400;
    justify-content: flex-start;
    background: hsla(0, 0%, 0%, 0.6);
  }
  article.twitter_share .card_action_area .menu > ul > li > button:hover {
    background: hsla(0, 0%, 0%, 1);
  }
  article.twitter_share .card_action_area .menu > ul > li > button:active,
  article.twitter_share .card_action_area .menu > ul > li > button:focus {
    background: rgba(0, 0, 0, 0.08);
  }
  article.twitter_share .card_action_area button.share_card_button + .menu {
    display: inline-block;
    position: absolute;
  }
  article.twitter_share .card_action_area button.share_card_button + .menu:hover {
    visibility: visible;
  }
  article.twitter_share .card_action_area button.share_card_button:hover + .menu {
    visibility: visible;
  }
  article.twitter_share button.share_in_chat {
    position: relative;
    border-radius: 0 0 10px 10px;
  }
  article.twitter_share button.share_in_chat:before {
    -webkit-mask: url(${icons.chat_icon}) left center / auto 16px no-repeat;
    background: #fff;
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    z-index: 1;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 600px) {
    article.twitter_share .card_action_area {
      flex-direction: column;
      align-items: center;
    }
    article.twitter_share button.post_to_twitter {
      margin: 0;
    }
  }
`

const developerCSS = css`
  .popup {
    top: 0;
    opacity: 1;
  }
  .popup .popUpContainer {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .popup div.closePopUp {
    position: absolute;
    top: -10px;
    left: -10px;
    mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    background: hsl(0, 0%, 100%);
    width: 22px;
    height: 22px;
    display: block;
    z-index: 1;
  }
  .popup div.closePopUp:hover {
    cursor: pointer;
    background: hsl(0, 76.05633802816901%, 27.84313725490196%);
  }
  .card_wrapper .panel_left .data_grid .row .data.roi.won {
    color: hsl(126, 100%, 45%);
  }
  .card_wrapper .panel_left .data_grid .row .data.roi.lost {
    color: hsla(340, 88%, 46%, 1);
  }
  .asset.aapl .asset_icon {
    background: url(${({ assetIcon }) => assetIcon}) center center / auto 100% no-repeat;
    width: 50px;
  }
  .card_wrapper .panel_right .qr_code canvas {
    /* width: 220px !important;
    height: 220px !important; */
    border-radius: 15px;
  }
  button:disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
  .hideActionMenu {
    visibility: hidden !important;
  }
`

export const OrderTwitterCardCss = styled.div`
  ${designerCssCommon}
  ${designerCssShareCard}
  ${qrCodeCss}
  ${ShareButtonMenu}
  ${developerCSS}
`
const kk = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/share-card.css */
  article.twitter_share button.share_in_chat {
    position: relative;
    border-radius: 0 0 10px 10px;
  }
  article.twitter_share button.share_in_chat:before {
    -webkit-mask: url(${icons.chat_icon}) left center / auto 16px no-repeat;
    background: #fff;
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    z-index: 1;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
`
