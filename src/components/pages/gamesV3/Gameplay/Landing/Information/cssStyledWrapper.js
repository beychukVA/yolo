import { landingAssets } from 'assets/landing'

import styled, { css } from 'styled-components'

const CssVars = css`
  --button-background: transparent;
  --button-color: rgba(255, 255, 255, 1);
  --wallet-dropdown-width: auto;
  --dropdown-background: rgba(255, 255, 255, 0.2);
  --dropdown-backdrop-filter: blur(40px);
  --dropdown-color: rgba(255, 255, 255, 1);
  --dropdown-width: 370px;
  --hamburger-color: rgba(255, 255, 255, 1);
  --hamburger-arrow-position-right: 15px;
  --wallet-color: rgba(255, 255, 255, 1);
`

const walletSectionCSS = css`
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/styles.css */

  .content {
    position: relative;
    padding: 60px 10%;
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  #wallet_level .content h4 {
    font-size: 2.1rem;
    line-height: 125%;
    font-weight: 700;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 7;
    padding-left: 30px;
    padding-right: 30px;
  }
  #wallet_level {
    position: relative;
  }
  #wallet_level .content {
    padding: 60px 30px;
  }
  #wallet_level .content h4 {
    padding-left: 6%;
    padding-right: 6%;
  }
  #wallet_level.wallet .content.shading {
    background: rgba(34, 62, 114, 0.4);
    background: rgba(0, 0, 0, 0.15);
  }
  #wallet_level.wallet .content {
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    padding-top: 60px;
  }
  #wallet_level.wallet .content .features_wrapper {
    display: flex;
    flex-flow: column;
    width: 100vw;
    align-items: center;
  }
  #wallet_level.wallet .content .features_wrapper h4 {
    padding-left: 20%;
    padding-right: 20%;
    line-height: 120%;
  }
  #wallet_level.wallet .content .features_wrapper p {
    font-size: 0.9rem;
    width: 75%;
    padding: 5px 0;
    line-height: 140%;
  }
  .wallet .wallet_feature {
    display: flex;
    justify-content: center;
  }
  #wallet_level .screenshots {
    position: relative;
    display: flex;
    flex-flow: row;
    margin: 30px 0 0 0;
  }
  #wallet_level .screenshots .wallet_ss {
    width: 50vw;
    margin: 0;
  }
  #wallet_level .screenshots .wallet_ss img {
    width: 50vw;
    box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/res.css */
  @media (max-width: 980px) {
    #wallet_level .screenshots {
      flex-flow: column;
      margin: 15px 0 0 0;
      align-items: center;
    }
    #wallet_level .screenshots .wallet_ss {
      width: 80%;
      margin: 0 5px;
    }
    #wallet_level .screenshots .wallet_ss img {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    #wallet_level .screenshots .wallet_ss {
      width: 90%;
    }
  }
  @media (max-width: 600px) {
    #wallet_level .screenshots .wallet_ss {
      width: 95%;
    }
  }
  @media (max-width: 480px) {
    #wallet_level .screenshots .wallet_ss {
      width: 95%;
    }
  }
`
const accountSectionCSS = css`
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/styles.css */
  .content {
    position: relative;
    padding: 60px 10%;
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  #level_4 .content h4 {
    font-size: 2.1rem;
    line-height: 125%;
    font-weight: 700;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 7;
    padding-left: 30px;
    padding-right: 30px;
  }
  #level_4 .content h4 div.normal {
    font-weight: 300;
  }
  #level_4 .content p {
    padding: 30px 5% 0 5%;
    font-size: 1.1rem;
    line-height: 170%;
    font-weight: 300;
  }
  #level_4 {
    position: relative;
  }
  #level_4 .content {
    padding: 60px 30px;
  }
  #level_4.account .content {
    padding: 60px 30px 0 30px;
    flex-direction: row;
    align-items: flex-start;
  }
  #level_4 .content h4 {
    padding-left: 6%;
    padding-right: 6%;
  }
  #level_4 .content .features_wrapper {
    display: flex;
    flex-flow: column;
    width: 50vw;
    align-items: center;
  }
  #level_4 .content .features_wrapper h4 {
    padding-left: 20%;
    padding-right: 20%;
    line-height: 120%;
  }
  #level_4 .content .features_wrapper p {
    font-size: 0.9rem;
    width: 75%;
    padding: 5px 0 30px 0;
    line-height: 140%;
  }
  .account .account_feature {
    display: flex;
    justify-content: center;
  }
  .account .nft_feature {
    background: rgba(152, 183, 253, 0.2);
    border-radius: 10px;
    width: 370px;
    padding: 20px 15px;
    display: flex;
    align-items: center;
    flex-flow: column;
    display: grid;
    grid-template-columns: (1fr, 0.25fr, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-bottom: 40px;
  }
  .account .nft_feature .cell {
    font-size: 1rem;
    padding: 2px;
  }
  .account .nft_feature .cell img {
    width: 40px;
    height: 40px;
  }
  .account .nft_feature .left {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
  }
  .account .nft_feature .silver {
    color: #eee;
  }
  .account .nft_feature .orchid {
    color: #9f64ff;
  }
  .account .nft_feature .emerald {
    color: #24f019;
  }
  .account .nft_feature .gold {
    color: #efb80f;
  }
  .account .nft_feature .ruby {
    color: #ee0000;
  }
  .account .nft_feature .diamond {
    color: #8adbf7;
  }
  .account .nft_feature .silver1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .account .nft_feature .silver2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .account .nft_feature .silver3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .account .nft_feature .orchid1 {
    grid-area: 2 / 1 / 3 / 2;
  }
  .account .nft_feature .orchid2 {
    grid-area: 2 / 2 / 3 / 3;
  }
  .account .nft_feature .orchid3 {
    grid-area: 2 / 3 / 3 / 4;
  }
  .account .nft_feature .emerald1 {
    grid-area: 3 / 1 / 4 / 2;
  }
  .account .nft_feature .emerald2 {
    grid-area: 3 / 2 / 4 / 3;
  }
  .account .nft_feature .emerald3 {
    grid-area: 3 / 3 / 4 / 4;
  }
  .account .nft_feature .gold1 {
    grid-area: 4 / 1 / 5 / 2;
  }
  .account .nft_feature .gold2 {
    grid-area: 4 / 2 / 5 / 3;
  }
  .account .nft_feature .gold3 {
    grid-area: 4 / 3 / 5 / 4;
  }
  .account .nft_feature .ruby1 {
    grid-area: 5 / 1 / 6 / 2;
  }
  .account .nft_feature .ruby2 {
    grid-area: 5 / 2 / 6 / 3;
  }
  .account .nft_feature .ruby3 {
    grid-area: 5 / 3 / 6 / 4;
  }
  .account .nft_feature .diamond1 {
    grid-area: 6 / 1 / 7 / 2;
  }
  .account .nft_feature .diamond2 {
    grid-area: 6 / 2 / 7 / 3;
  }
  .account .nft_feature .diamond3 {
    grid-area: 6 / 3 / 7 / 4;
  }
  .nft_icon.emerald {
    background-image: url('http://yolo.tino.me/www/resources/images/nft/yolo_nft-emerald-512.png');
    background-repeat: no-repeat;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/wallet.css */
  .window_account {
    flex-direction: column;
  }
  .bottom_links {
    display: flex;
    justify-content: center;
    padding: 10px 10px 0 10px;
    list-style: none;
    flex-direction: column;
    text-align: center;
  }
  .bottom_links li {
    text-align: center;
    justify-content: center;
  }
  .bottom_links button {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    margin: 10px 0 0 0;
    font-size: 0.7rem;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/nav.css */
  .right {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/account.css */
  #account_menu {
    display: flex;
    position: relative;
    margin: 0 5px 0 15px;
  }
  #account_menu .dropdown * {
    display: flex;
  }
  #account_menu .dropdown {
    position: relative;
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  #account_menu .dropdown menu {
    position: relative;
    margin: 0 0 0 0;
    padding: 20px 0;
    width: var(--wallet-dropdown-width);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    background: var(--dropdown-background);
    border-radius: 10px;
    list-style: none;
    color: var(--dropdown-color);
    -webkit-backdrop-filter: var(--dropdown-backdrop-filter);
    backdrop-filter: var(--dropdown-backdrop-filter);
    display: flex;
    flex-direction: column;
    cursor: default;
    justify-content: center;
    width: var(--dropdown-width);
    -webkit-box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
    box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
  }
  #account_menu .dropdown menu:after {
    content: '';
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(80px);
    filter: blur(80px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .window_account {
    flex-direction: column;
  }
  .window_user-id {
    padding: 0;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
    width: 100%;
  }
  #account_menu .window_user-id {
    padding: 0 20px;
  }
  .window_user-id input {
    padding: 8px 15px;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
    width: 100%;
    font-size: 0.8rem;
    color: #000;
    line-height: 100%;
  }
  #account_menu .window_user-id input {
    margin: 0 0 0 10px;
  }
  .window_user-id button.save {
    margin: 0;
    background: #1d4baf;
    padding: 6px 15px;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 0.8rem;
  }
  .window_user-id button.save:hover {
    background: rgb(42, 109, 255);
  }
  .window_user-id button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .nft_level * {
    display: flex;
  }
  .nft_level {
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 0 0 0;
    margin: 20px 0 10px 0;
    flex-direction: column;
  }
  .nft_level .nft_row {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
  .nft_level .nft_row:first-child {
    padding-bottom: 8px;
  }
  .nft_level .nft_row:last-child {
    padding: 0 0 8px 0;
  }
  .nft_level.emerald .nft_row:last-child {
    background: #13aa09;
  }
  #account_menu .nft_icon {
    background-position: left center;
    background-size: auto 32px;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
  }
  #account_menu .nft_level .nft_icon {
    background-position: left center;
    background-size: auto 52px;
    background-repeat: no-repeat;
    width: 58px;
    height: 58px;
  }
  .nft_level .nft_details_wrap {
    flex-direction: column;
    justify-content: center;
    margin: 0 0 0 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: calc(100% - 42px);
  }
  .nft_level .nft_details_wrap {
    border-bottom: 0;
  }
  .nft_level .nft_details_wrap .nft_title {
    font-size: 0.9rem;
    font-weight: 700;
  }
  .nft_level .empty {
    width: 0;
  }
  .nft_level .feature {
    flex-direction: column;
    align-items: center;
    padding: 8px 0 0 0;
    font-size: 0.7rem;
    width: 33.3%;
  }
  .nft_level .feature {
    font-size: 0.8rem;
    width: 50%;
  }
  .nft_level .feature .title {
    justify-content: center;
  }
  .nft_level .feature .title {
    font-weight: 600;
  }
  .nft_level .feature .value {
    font-size: 0.9rem;
  }
  .nft_level .feature .value {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .nft_level.emerald .nft_title,
  .nft_level.emerald .value {
    color: #24f019;
    font-size: 1rem;
    line-height: 140%;
  }
  .nft_level.emerald .value {
    color: #24f019;
  }
  .nft_level .nft_details_wrap .nft_description {
    font-size: 0.7rem;
    opacity: 0.6;
    padding: 6px 0 6px 0;
    text-align: left;
  }
  .bidder_stats_wrapper {
    width: 100%;
    flex-direction: row;
  }
  .bidder_stats_wrapper .section {
    width: 33.3%;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
  }
  .bidder_stats_wrapper .section {
    width: 50%;
    font-size: 0.8rem;
  }
  .bidder_stats_wrapper .section:last-child {
    border: 0;
  }
  .bidder_stats_wrapper .section .title {
    justify-content: center;
  }
  .bidder_stats_wrapper .section .value {
    font-weight: 700;
    font-size: 0.9rem;
  }
  .bottom_links {
    display: flex;
    justify-content: center;
    padding: 10px 10px 0 10px;
    list-style: none;
    flex-direction: column;
    text-align: center;
  }
  .bottom_links li {
    text-align: center;
    justify-content: center;
  }
  .bottom_links button.dashboard {
    border-radius: 10px;
    padding: 8px 14px;
    line-height: 100%;
    margin: 10px 0 0 0;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
  }
  .bottom_links.emerald button.dashboard {
    background: #13aa09;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/res.css */
  @media (max-width: 980px) {
    #level_4.account .content {
      flex-direction: column;
      align-items: center;
    }
    #level_4 .content .features_wrapper {
      width: 80vw;
    }
  }
  @media (max-width: 768px) {
    #level_4 .content h4 {
      font-size: 1.8rem;
      line-height: 140%;
    }
  }
  @media (max-width: 768px) {
    footer {
      padding: 30px 0;
    }
  }
  @media (max-width: 600px) {
    #level_4 .content {
      padding: 60px 30px;
    }
  }
  @media (max-width: 480px) {
    #level_4 .content {
      padding: 30px;
    }
    #level_4 .content h4 {
      font-size: 1.4rem;
      line-height: 130%;
    }
    #account_menu .dropdown menu {
      zoom: 0.9;
    }
  }
`

export const PageWrapper = styled.div`
  ${CssVars}

  /*! CSS Used from: http://yolo.tino.me/www/resources/css/styles.css */

  a {
    color: #fff;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
  }
  a:hover {
    text-decoration: none;
  }
  input[type='text'] {
    border: 0;
    outline: 0;
  }
  button {
    outline: none;
    border: none;
    background: #1d4baf;
    text-decoration: none;
    cursor: pointer !important;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 160%;
  }
  button:hover {
    background: rgb(42, 109, 255);
  }
  ul {
    list-style: none;
  }
  .triangle.up {
    -webkit-mask: url(${landingAssets.arrow_up}) no-repeat;
  }
  .triangle.down {
    -webkit-mask: url(${landingAssets.arrow_up}) no-repeat;
    transform: rotate(180deg);
  }
  .triangle.up.huge {
    width: 16px;
    height: 16px;
    -webkit-mask-size: 16px 16px;
    mask-size: 16px 16px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.down.huge {
    width: 16px;
    height: 16px;
    -webkit-mask-size: 16px 16px;
    mask-size: 16px 16px;
    background: rgba(226, 14, 85, 1);
    margin-right: 5px;
  }
  .triangle.up.large {
    width: 12px;
    height: 12px;
    -webkit-mask-size: 12px 12px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.down.large {
    width: 12px;
    height: 12px;
    -webkit-mask-size: 12px 12px;
    background: rgba(226, 14, 85, 1);
    margin-right: 5px;
  }
  .triangle.up.small {
    width: 10px;
    height: 10px;
    -webkit-mask-size: 10px 10px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.down.small {
    width: 10px;
    height: 10px;
    -webkit-mask-size: 10px 10px;
    background: rgba(226, 14, 85, 1);
    margin-right: 5px;
  }
  nav {
    position: relative;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    min-width: 320px;
    width: 100%;
    z-index: 9;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
  }
  nav .nav_right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  nav .nav_right button.enter_app {
    padding: 10px 18px;
    border-radius: 15px;
    white-space: nowrap;
    line-height: 100%;
    position: relative;
    z-index: 3;
    height: 38px;
    transition: 0.5s;
    font-size: inherit;
  }
  nav .nav_left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  nav .nav_left a.home_litepaper {
    display: flex;
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 3;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 10px 15px;
    white-space: nowrap;
    cursor: pointer;
    height: 38px;
  }
  nav .nav_left a:hover.home_litepaper {
    background: rgba(255, 255, 255, 0.2);
  }
  nav .nav_left a.home_litepaper .litepaper_icon {
    background: url(${landingAssets.litepaper_icon}) center center / 18px auto no-repeat;
    width: 18px;
    height: 18px;
    margin: 0 7px 0 0;
  }
  nav .nav_left a.yolo_icon {
    -webkit-mask: url(${landingAssets.yolorekt_moon_white}) center center / 34px 34px no-repeat;
    mask: url(${landingAssets.yolorekt_moon_white}) center center / 34px 34px no-repeat;
    background: rgba(255, 255, 255, 1);
    width: 34px;
    height: 34px;
    margin: 0 20px 0 0;
  }
  #main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0 0;
  }
  #main #yolorekt-logo-home {
    min-width: 300px;
    max-width: 380px;
    min-height: 170px;
    transform: scale(0.9);
    /* height: auto; */
    width: 23vw;
    margin: 0 0 30px 0;
    -webkit-animation: scale-up-center 1.4s cubic-bezier(0.39, 0.575, 0.565, 1.1) both;
    animation: scale-up-center 1.4s cubic-bezier(0.39, 0.575, 0.565, 1.1) both;
  }
  body:before {
    background: rgba(38, 59, 105, 0.6);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: 1;
    opacity: 1;
    height: 100%;
  }
  body:after {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    /* background: url('home_main_bg_dark_glitter_2'); */
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 250%;
    opacity: 0.9;
    z-index: 0;
    height: 100%;
  }
  .content {
    position: relative;
    padding: 60px 10%;
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  #main .content {
    padding: 0 30px;
  }
  h1 {
    font-weight: 400;
    font-size: 3.2rem;
    text-align: center;
    letter-spacing: -0.04em;
    z-index: 1;
    padding: 0 15px 5px 15px;
    line-height: 105%;
    white-space: nowrap;
    transform: scale(0.94);
    animation: h1_fade 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
  }
  h1 span {
    filter: blur(4px);
    opacity: 0;
    letter-spacing: -0.04em;

  }
  h1 span.blue {
    color: rgba(42, 109, 255, 1);
  }
  h1 span.pink {
    color: rgba(222, 14, 84, 1);
    font-weight: 200;
  }
  h1 span.blue {
    animation: h1_fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }
  h1 span.pink {
    animation: h1_fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }
  h1 span.white {
    animation: h1_fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
  }
  h2 {
    font-size: 1.3rem;
    font-weight: 200;
    text-align: center;
    max-width: 930px;
    padding: 0 15px 15px 15px;
    line-height: 150%;
    letter-spacing: -0.01em;
    z-index: 1;
    -webkit-animation: scale-up-center 1.4s cubic-bezier(0.39, 0.575, 0.565, 1.1) both;
    animation: scale-up-center 1.4s cubic-bezier(0.39, 0.575, 0.565, 1.1) both;
  }
  #main .main_cta_area {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  a.btn-liquid {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 60px;
    border-radius: 30px;
    text-align: center;
    text-decoration: none;
    margin: 0;
  }
  a.btn-liquid:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: 'Play now';
    font-size: 1.2rem;
    font-weight: 500;
    z-index: 999;
    display: block;
  }
  a.btn-liquid canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  a.xft_sale_link {
    font-size: 13px;
    position: relative;
    z-index: 999;
    margin: 7px 0 0 0;
  }
  a:hover.xft_sale_link {
    text-decoration: none;
  }
  #level_2 {
    position: relative;
  }
  #level_2 .content h4,
  #level_3 .content h4,
  #level_4 .content h4,
  #level_5 .content h4,
  #level_6 .content h4,
  #level_7 .content h4 {
    line-height: 125%;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 7;
    font-size: 1.1rem;
    font-weight: 300;
    text-transform: uppercase;
    width: 90%;
    padding: 5px 30px 10px 0;
    text-align: center;
  }
  #level_2 .content h5 {
    font-size: 1.5rem;
    font-weight: 800;
    max-width: 980px;
    line-height: 140%;
    padding: 15px 5%;
    position: relative;
    z-index: 1;
  }
  #level_2 .content {
    padding-bottom: 60px;
    z-index: 1;
  }
  #level_4 .content p,
  #level_7 .content p {
    padding: 30px 5% 0 5%;
    font-size: 1.1rem;
    line-height: 170%;
    font-weight: 300;
  }
  #level_7 .content p {
    padding: 10px 5% 0 5%;
  }
  #level_2 .content h4 strong {
    font-weight: 700;
  }
  #level_2 .app_experiences {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 60px 0;
    flex-flow: column;
    width: calc(100% + 25%);
    padding: 60px 30px;
    background: rgba(32, 37, 47, 0.4);
  }
  #level_2 .app_experiences h4 {
    padding-bottom: 5px;
    max-width: 900px;
  }
  #level_2 .app_experiences h5 {
    padding-bottom: 30px;
    max-width: 900px;
    font-size: 1.7rem;
    font-weight: 300;
    padding: 0 5% 30px 5%;
  }
  #level_2 .app_experiences .tpe {
    margin: 0 0 30px 0;
  }
  #level_2 .app_experiences .tpe img {
    max-width: 790px;
    min-width: 200px;
    width: 100%;
  }
  #level_2 .app_experiences .tme img {
    max-width: 840px;
    min-width: 200px;
    width: 100%;
  }
  #level_2 .bidding_feature {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin: 60px 0 0 0;
  }
  #level_2 .bidding_feature_callouts {
    width: 100vw;
    position: absolute;
    bottom: 0;
    height: 100%;
  }
  #level_2 .bidding_feature_callouts .callout {
    position: absolute;
    width: 180px;
    line-height: 160%;
    color: #afb2ba;
    color: #fff;
    font-size: 0.85rem;
  }
  #level_2 .bidding_feature_callouts .callout .callout_arrow {
    mask: url(${landingAssets.arrow_up}) center center / auto 16px no-repeat;
    background: #2a6dff;
    width: 16px;
    height: 16px;
    position: absolute;
  }
  #level_2 .bidding_feature_callouts .one {
    left: calc(50% - 290px);
    transform: translateX(-50%);
    top: 15px;
    text-align: right;
    padding: 0 30px 0 0;
  }
  #level_2 .bidding_feature_callouts .callout.one .callout_arrow {
    transform: translateY(-50%) rotate(90deg);
    right: 0;
    top: 50%;
  }
  #level_2 .bidding_feature_callouts .two {
    left: calc(50% - 290px);
    transform: translate(-50%);
    bottom: calc(50% - 35px);
    text-align: right;
    padding: 0 30px 0 0;
  }
  #level_2 .bidding_feature_callouts .callout.two .callout_arrow {
    transform: translateY(-50%) rotate(90deg);
    right: 0;
    top: 50%;
  }
  #level_2 .bidding_feature_callouts .three {
    right: calc(50% - 470px);
    transform: translateX(-50%);
    top: 15px;
    text-align: left;
    padding: 0 0 0 30px;
  }
  #level_2 .bidding_feature_callouts .callout.three .callout_arrow {
    transform: translateY(-50%) rotate(270deg);
    left: 0;
    top: 50%;
  }
  #level_2 .bidding_feature_callouts .four {
    right: calc(50% - 470px);
    transform: translateX(-50%);
    bottom: 15px;
    text-align: left;
    padding: 0 0 0 30px;
  }
  #level_2 .bidding_feature_callouts .callout.four .callout_arrow {
    transform: translateY(-50%) rotate(270deg);
    left: 0;
    top: 50%;
  }
  #level_2 .live_area {
    margin: 30px 0 60px 0;
    display: flex;
    align-items: center;
    flex-flow: column;
    padding: 0 0 60px 0;
    width: 100vw;
  }
  #level_2 .live_area h4 {
    font-weight: 300;
    max-width: 850px;
  }
  #level_2 .live_area .game_type.live {
    display: flex;
    align-items: center;
    font-size: 3rem;
    color: #fff;
    font-weight: 700;
    justify-content: center;
    position: relative;
    background: #243b72;
    border-radius: 15px;
    padding: 14px 16px;
    line-height: 100%;
    margin: 20px 0 0 0;
    width: 136px;
  }
  #level_2 .live_area .game_type.live:before,
  #level_2 .live_area .game_type.live:after {
    content: '';
    position: absolute;
    left: -3px;
    top: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 15px;
    background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(54, 199, 255, 1) 15%,
        rgba(116, 109, 255, 1) 31%,
        #e20e55 47%,
        rgba(42, 109, 255, 1) 62%,
        rgba(0, 212, 255, 1) 79%,
        rgba(171, 212, 255, 1)
      )
      center center / 400% 400%;
  }
  #level_3 .content {
    padding: 30px;
  }
  #level_3 .content.shading {
    background: rgba(34, 62, 114, 0.4);
    background: rgba(32, 37, 47, 0.4);
  }
  #level_3 .content h4 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30%;
    text-shadow: 0 0 20px rgba(28, 39, 60, 0.9);
    z-index: 2;
    width: 100vw;
  }
  #level_4 {
    position: relative;
  }
  #level_4 .content {
    padding: 60px 30px;
  }
  #level_4 .content h4 {
    padding-left: 6%;
    padding-right: 6%;
  }
  #level_4.wallet .content.shading {
    background: rgba(34, 62, 114, 0.4);
    background: rgba(0, 0, 0, 0.15);
  }
  #level_4.wallet .content {
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    padding-top: 60px;
  }
  #level_4.wallet .content .features_wrapper {
    display: flex;
    flex-flow: column;
    width: 50vw;
    align-items: center;
  }
  #level_4.wallet .content .features_wrapper h4 {
    padding-left: 20%;
    padding-right: 20%;
    line-height: 120%;
  }
  #level_4.wallet .content .features_wrapper #wallet_menu .transaction_list h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
    padding-left: 25px;
    display: flex;
    letter-spacing: 0;
  }
  #level_4.wallet .content .features_wrapper p {
    font-size: 0.9rem;
    width: 75%;
    padding: 5px 0 30px 0;
    line-height: 140%;
  }
  .wallet .wallet_feature,
  .wallet .account_feature {
    display: flex;
    justify-content: center;
  }
  .wallet .nft_feature {
    background: rgba(152, 183, 253, 0.2);
    border-radius: 10px;
    width: 370px;
    padding: 20px 15px;
    display: flex;
    align-items: center;
    flex-flow: column;
    display: grid;
    grid-template-columns: (1fr, 0.25fr, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-bottom: 40px;
  }
  .wallet .nft_feature .cell {
    font-size: 1rem;
    padding: 2px;
  }
  .wallet .nft_feature .cell img {
    width: 40px;
    height: 40px;
  }
  .wallet .nft_feature .left {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
  }
  .wallet .nft_feature .silver {
    color: #eee;
  }
  .wallet .nft_feature .orchid {
    color: #9f64ff;
  }
  .wallet .nft_feature .emerald {
    color: #24f019;
  }
  .wallet .nft_feature .gold {
    color: #efb80f;
  }
  .wallet .nft_feature .ruby {
    color: #ee0000;
  }
  .wallet .nft_feature .diamond {
    color: #8adbf7;
  }
  .wallet .nft_feature .silver1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .wallet .nft_feature .silver2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .wallet .nft_feature .silver3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .wallet .nft_feature .orchid1 {
    grid-area: 2 / 1 / 3 / 2;
  }
  .wallet .nft_feature .orchid2 {
    grid-area: 2 / 2 / 3 / 3;
  }
  .wallet .nft_feature .orchid3 {
    grid-area: 2 / 3 / 3 / 4;
  }
  .wallet .nft_feature .emerald1 {
    grid-area: 3 / 1 / 4 / 2;
  }
  .wallet .nft_feature .emerald2 {
    grid-area: 3 / 2 / 4 / 3;
  }
  .wallet .nft_feature .emerald3 {
    grid-area: 3 / 3 / 4 / 4;
  }
  .wallet .nft_feature .gold1 {
    grid-area: 4 / 1 / 5 / 2;
  }
  .wallet .nft_feature .gold2 {
    grid-area: 4 / 2 / 5 / 3;
  }
  .wallet .nft_feature .gold3 {
    grid-area: 4 / 3 / 5 / 4;
  }
  .wallet .nft_feature .ruby1 {
    grid-area: 5 / 1 / 6 / 2;
  }
  .wallet .nft_feature .ruby2 {
    grid-area: 5 / 2 / 6 / 3;
  }
  .wallet .nft_feature .ruby3 {
    grid-area: 5 / 3 / 6 / 4;
  }
  .wallet .nft_feature .diamond1 {
    grid-area: 6 / 1 / 7 / 2;
  }
  .wallet .nft_feature .diamond2 {
    grid-area: 6 / 2 / 7 / 3;
  }
  .wallet .nft_feature .diamond3 {
    grid-area: 6 / 3 / 7 / 4;
  }
  .wallet .account_feature {
    
  }
  #level_4 #stats {
    max-height: 900px;
  }
  #level_4 .stats_feature {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin: 40px 0 0 0;
  }
  #level_4 .stats_feature_callouts {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 100%;
  }
  #level_4 .stats_feature_callouts .callout {
    position: absolute;
    width: 180px;
    line-height: 160%;
    color: #fff;
    font-size: 0.85rem;
  }
  #level_4 .stats_feature_callouts .callout .callout_arrow {
    -webkit-mask: url(${landingAssets.arrow_up}) center center / auto 16px no-repeat;
    background: #2a6dff;
    width: 16px;
    height: 16px;
    position: absolute;
  }
  #level_4 .stats_feature_callouts .one {
    left: calc(50% - 355px);
    transform: translateX(-50%);
    top: 70px;
    text-align: right;
    padding: 0 30px 0 0;
  }
  #level_4 .stats_feature_callouts .callout.one .callout_arrow {
    transform: translateY(-50%) rotate(90deg);
    right: 0;
    top: 50%;
  }
  #level_4 .stats_feature_callouts .two {
    left: calc(50% - 355px);
    transform: translate(-50%);
    bottom: calc(50% - 25px);
    text-align: right;
    padding: 0 30px 0 0;
  }
  #level_4 .stats_feature_callouts .callout.two .callout_arrow {
    transform: translateY(-50%) rotate(90deg);
    right: 0;
    top: 50%;
  }
  #level_4 .stats_feature_callouts .three {
    right: calc(50% - 540px);
    transform: translateX(-50%);
    top: 120px;
    text-align: left;
    padding: 0 0 0 30px;
  }
  #level_4 .stats_feature_callouts .callout.three .callout_arrow {
    transform: translateY(-50%) rotate(270deg);
    left: 0;
    top: 50%;
  }
  #level_4 .stats_feature_callouts .four {
    right: calc(50% - 540px);
    transform: translateX(-50%);
    bottom: 90px;
    text-align: left;
    padding: 0 0 0 30px;
  }
  #level_4 .stats_feature_callouts .callout.four .callout_arrow {
    transform: translateY(-50%) rotate(270deg);
    left: 0;
    top: 50%;
  }
  #level_5 .content.shading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    padding: 0;
    position: relative;
    z-index: 1;
    width: 80%;
  }
  #level_5 {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 0;
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #level_5 form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    position: relative;
    z-index: 1;
    width: 80%;
  }
  #level_5 form input {
    padding: 10px 20px;
    max-width: 300px;
    width: 100%;
    font-size: .9rem;
    min-height: 40px;
    border-radius: 10px 0 0 10px;
    background: rgba(255,255,255,.1);
    text-align: left;
    position: relative;
    z-index: 2;
  }
  #level_5 form input:focus {
    box-shadow: 0 0 25px 5px rgba(42, 109, 255, 0.7);
    background: rgba(255, 255, 255, 0.5);
  }
  #level_5 form input::-webkit-input-placeholder {
    /* color: #fff; */
  }
  #level_5 form input::-moz-placeholder {
    /* color: #fff; */
  }
  #level_5 form input:-ms-input-placeholder {
    color: #fff;
  }
  #level_5 form input:-moz-placeholder {
    color: #fff;
  }
  #level_5 form input:focus::-webkit-input-placeholder {
    visibility: hidden;
  }
  #level_5 form button {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    outline: none;
    border: none;
    background: linear-gradient(180deg, #2159d1, #2159d0, #2158cf, #2057cd, #2056ca, #1f55c7, #1f53c3, #1e52c0, #1e51bd, #1d50bb, #1d4fba, #1d4fb9);
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    padding: 10px 20px;
    font-size: .9rem;
    min-height: 40px;
    border-radius: 0 10px 10px 0;
    white-space: nowrap;
    position: relative;
    z-index: 3;


  }
  #level_5 form button:hover {
    background: #2a6dff;
  }
  #level_6 .content.shading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: hsla(0,0%,0%,.3);
    border-top: 0;
    margin: 50px 0 0 0;
    border-radius: 10px;
    padding: 30px;
    width: 100%;
  }
  #level_6 ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  #level_6 ul li {
    padding: 5px;
  }
  #level_6 ul li .logo {
    height: 50px;
  }
  #level_6 ul li a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
    margin: 10px 0 0 0;
  }
  #level_6 ul li.pantera .logo {
    background: url(${landingAssets.pantera_cap_logo_color_circle}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 ul li.pantera:hover .logo {
    background: url(${landingAssets.pantera_cap_logo_color_circle}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 ul li.cluster .logo {
    background: url(${landingAssets.cluster_color_circle}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 ul li.cluster:hover .logo {
    background: url(${landingAssets.cluster_color_circle}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 ul li.lemniscap .logo {
    background: url(${landingAssets.lemniscap_logo_color}) center center/auto 30px no-repeat;
    width: 150px;
  }
  #level_6 ul li.lemniscap:hover .logo {
    background: url(${landingAssets.lemniscap_logo_color}) center center/auto 30px no-repeat;
    width: 150px;
  }
  #level_6 ul li.deepventures .logo {
    background: url(${landingAssets.deepventures_color_circle}) center center/auto 50px no-repeat;
    width: 50px;
  }
  #level_6 ul li.deepventures:hover .logo {
    background: url(${landingAssets.deepventures_color_circle}) center center/auto 50px no-repeat;
    width: 50px;
  }
  #level_6 ul li.angeldao .logo {
    background: url(${landingAssets.angeldao_logo_color}) center center/auto 35px no-repeat;
    width: 140px;
  }
  #level_6 ul li.angeldao:hover .logo {
    background: url(${landingAssets.angeldao_logo_color}) center center/auto 35px no-repeat;
    width: 140px;
  }
  #level_6 ul li.kretos {
    /* margin-left: -20px; */
  }
  #level_6 ul li.kretos .logo {
    background: url(${landingAssets.kretos_logo}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 ul li.kretos:hover .logo {
    background: url(${landingAssets.kretos_logo}) center center/auto 40px no-repeat;
    width: 40px;
  }
  #level_6 li a .logo {
    /* transition: all 0.2s ease-in-out;
    width: auto; */
  }
  #level_6 li a:hover .logo {
    /* transform: scale(1); */
  }
  #level_6 ul li a span {
    visibility: hidden;
    text-align: center;
    width: 100%;
    font-size: .8rem;
    line-height: 130%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  #level_6 ul li:hover a span {
    /* visibility: visible; */
  }
  #level_7 .screenshots {
    position: relative;
    display: flex;
    flex-flow: row;
    margin: 30px 0 0 0;
  }
  #level_7 .screenshots .bidders_ss,
  #level_7 .screenshots .liquidity_ss {
    width: 40vw;
    margin: 0 5px;
  }
  #level_7 .screenshots .bidders_ss img,
  #level_7 .screenshots .liquidity_ss img {
    width: 40vw;
    box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 0 45px 0px rgba(0, 0, 0, 0.25);
  }
  .content .heading {
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0 0 30px 0;
  }
  footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: .75rem;
    padding: 30px 60px;
    margin: 30px 0 0 0;
    align-items: center;
    position: relative;
    bottom: 0;
    z-index: 11;
    width: 100%;
    flex-wrap: nowrap;
  }
  footer #landing-details {
    display: flex;
    flex-direction: row;
    min-width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  footer a {
    color: rgba(255, 255, 255, 1);
  }
  footer a:hover {
    color: #2e68eb;
  }
  footer #made-with {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 5px 15px;
  }
  footer a.etherium_logo {
    background-color: #fff;
    -webkit-mask: url(${landingAssets.etherium_icon}) no-repeat;
    -webkit-mask-size: auto 21px;
    -webkit-mask-position: center center;
    width: 13px;
    height: 21px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 0 12px;
  }
  footer a.etherium_logo:hover {
    background-color: #2e68eb;
  }
  footer a.polygon_logo {
    background-color: #fff;
    -webkit-mask: url(${landingAssets.polygon_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 23px;
    height: 21px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 0 6px;
  }
  footer a.polygon_logo:hover {
    background-color: #8247e5;
  }
  footer #copyright,
  footer #priv-terms {
    white-space: nowrap;
  }
  footer #copyright {
    padding: 5px 15px;
  }
  footer #landing-social {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
  }
  footer #landing-social a.icon {
    background-color: #fff;
    -webkit-mask-position: center center;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 0 15px;
    display: block;
  }
  footer #landing-social a.twitter {
    -webkit-mask: url(${landingAssets.twitter_icon}) no-repeat;
    -webkit-mask-size: auto 20px;
    width: 24px;
    height: 22px;
  }
  footer #landing-social a.tiktok {
    -webkit-mask: url(${landingAssets.tiktok_icon}) no-repeat;
    -webkit-mask-size: auto 20px;
    width: 24px;
    height: 22px;
  }
  footer #landing-social a.medium {
    -webkit-mask: url(${landingAssets.medium_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    width: 22px;
    height: 18px;
  }
  footer #landing-social a.telegram {
    -webkit-mask: url(${landingAssets.telegram_icon}) no-repeat;
    -webkit-mask-size: auto 20px;
    width: 23px;
    height: 20px;
  }
  footer #landing-social a.discord {
    -webkit-mask: url(${landingAssets.discord_icon}) no-repeat;
    -webkit-mask-size: auto 20px;
    width: 26px;
    height: 20px;
  }
  footer #landing-social a.email {
    -webkit-mask: url(${landingAssets.email_icon}) no-repeat;
    -webkit-mask-size: auto 22px;
    width: 32px;
    height: 22px;
  }
  footer #landing-social a.icon:hover {
    background-color: #2e68eb;
  }
  .tooltip {
    display: inline-block;
    position: relative;
  }
  .nft_icon.emerald {
    background-image: url(${landingAssets.yolo_nft_emerald_512});
    background-repeat: no-repeat;
  }
  .nft_icon.blue {
    background-image: url(${landingAssets.yolo_nft_blue_512});
    background-repeat: no-repeat;
  }
  .nft_icon.silver {
    background-image: url(${landingAssets.yolo_nft_silver_512});
    background-repeat: no-repeat;
  }
  .nft_icon.orchid {
    background-image: url(${landingAssets.yolo_nft_orchid_512});
    background-repeat: no-repeat;
  }
  .nft_icon.diamond {
    background-image: url(${landingAssets.yolo_nft_diamond_512});
    background-repeat: no-repeat;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/particles.css */
  #particle-container {
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100%;
    left: 0;
    opacity: 0.15;
  }
  .particle {
    position: absolute;
    border-radius: 50%;
  }
  .particle:nth-child(1) {
    animation: particle-animation-1 60s infinite;
    opacity: 0.87;
    height: 6px;
    width: 6px;
    animation-delay: -0.2s;
    transform: translate3d(54vw, 24vh, 75px);
    background: #fff;
  }
  .particle:nth-child(2) {
    animation: particle-animation-2 60s infinite;
    opacity: 0.08;
    height: 8px;
    width: 8px;
    animation-delay: -0.4s;
    transform: translate3d(1vw, 22vh, 79px);
    background: #fff;
  }
  .particle:nth-child(3) {
    animation: particle-animation-3 60s infinite;
    opacity: 0.1;
    height: 9px;
    width: 9px;
    animation-delay: -0.6s;
    transform: translate3d(31vw, 67vh, 47px);
    background: #fff;
  }
  .particle:nth-child(4) {
    animation: particle-animation-4 60s infinite;
    opacity: 0.35;
    height: 6px;
    width: 6px;
    animation-delay: -0.8s;
    transform: translate3d(26vw, 20vh, 95px);
    background: #fff;
  }
  .particle:nth-child(5) {
    animation: particle-animation-5 60s infinite;
    opacity: 0.58;
    height: 7px;
    width: 7px;
    animation-delay: -1s;
    transform: translate3d(59vw, 72vh, 89px);
    background: #fff;
  }
  .particle:nth-child(6) {
    animation: particle-animation-6 60s infinite;
    opacity: 0.72;
    height: 8px;
    width: 8px;
    animation-delay: -1.2s;
    transform: translate3d(90vw, 35vh, 65px);
    background: #fff;
  }
  .particle:nth-child(7) {
    animation: particle-animation-7 60s infinite;
    opacity: 0.82;
    height: 9px;
    width: 9px;
    animation-delay: -1.4s;
    transform: translate3d(41vw, 76vh, 85px);
    background: #fff;
  }
  .particle:nth-child(8) {
    animation: particle-animation-8 60s infinite;
    opacity: 0.26;
    height: 9px;
    width: 9px;
    animation-delay: -1.6s;
    transform: translate3d(2vw, 53vh, 63px);
    background: #fff;
  }
  .particle:nth-child(9) {
    animation: particle-animation-9 60s infinite;
    opacity: 0.43;
    height: 10px;
    width: 10px;
    animation-delay: -1.8s;
    transform: translate3d(50vw, 40vh, 54px);
    background: #fff;
  }
  .particle:nth-child(10) {
    animation: particle-animation-10 60s infinite;
    opacity: 0.98;
    height: 9px;
    width: 9px;
    animation-delay: -2s;
    transform: translate3d(64vw, 24vh, 4px);
    background: #fff;
  }
  .particle:nth-child(11) {
    animation: particle-animation-11 60s infinite;
    opacity: 0.85;
    height: 6px;
    width: 6px;
    animation-delay: -2.2s;
    transform: translate3d(34vw, 64vh, 90px);
    background: #fff;
  }
  .particle:nth-child(12) {
    animation: particle-animation-12 60s infinite;
    opacity: 0.82;
    height: 6px;
    width: 6px;
    animation-delay: -2.4s;
    transform: translate3d(27vw, 34vh, 18px);
    background: #fff;
  }
  .particle:nth-child(13) {
    animation: particle-animation-13 60s infinite;
    opacity: 0.55;
    height: 8px;
    width: 8px;
    animation-delay: -2.6s;
    transform: translate3d(13vw, 16vh, 19px);
    background: #fff;
  }
  .particle:nth-child(14) {
    animation: particle-animation-14 60s infinite;
    opacity: 0.4;
    height: 6px;
    width: 6px;
    animation-delay: -2.8s;
    transform: translate3d(25vw, 16vh, 36px);
    background: #fff;
  }
  .particle:nth-child(15) {
    animation: particle-animation-15 60s infinite;
    opacity: 0.49;
    height: 7px;
    width: 7px;
    animation-delay: -3s;
    transform: translate3d(19vw, 55vh, 20px);
    background: #fff;
  }
  .particle:nth-child(16) {
    animation: particle-animation-16 60s infinite;
    opacity: 0.57;
    height: 8px;
    width: 8px;
    animation-delay: -3.2s;
    transform: translate3d(63vw, 33vh, 74px);
    background: #fff;
  }
  .particle:nth-child(17) {
    animation: particle-animation-17 60s infinite;
    opacity: 0.29;
    height: 8px;
    width: 8px;
    animation-delay: -3.4s;
    transform: translate3d(52vw, 9vh, 84px);
    background: #fff;
  }
  .particle:nth-child(18) {
    animation: particle-animation-18 60s infinite;
    opacity: 0.31;
    height: 7px;
    width: 7px;
    animation-delay: -3.6s;
    transform: translate3d(53vw, 86vh, 75px);
    background: #fff;
  }
  .particle:nth-child(19) {
    animation: particle-animation-19 60s infinite;
    opacity: 0.93;
    height: 7px;
    width: 7px;
    animation-delay: -3.8s;
    transform: translate3d(85vw, 39vh, 89px);
    background: #fff;
  }
  .particle:nth-child(20) {
    animation: particle-animation-20 60s infinite;
    opacity: 0.08;
    height: 7px;
    width: 7px;
    animation-delay: -4s;
    transform: translate3d(81vw, 88vh, 47px);
    background: #fff;
  }
  .particle:nth-child(21) {
    animation: particle-animation-21 60s infinite;
    opacity: 0.73;
    height: 8px;
    width: 8px;
    animation-delay: -4.2s;
    transform: translate3d(63vw, 23vh, 3px);
    background: #fff;
  }
  .particle:nth-child(22) {
    animation: particle-animation-22 60s infinite;
    opacity: 0.9;
    height: 6px;
    width: 6px;
    animation-delay: -4.4s;
    transform: translate3d(87vw, 65vh, 6px);
    background: #fff;
  }
  .particle:nth-child(23) {
    animation: particle-animation-23 60s infinite;
    opacity: 0.87;
    height: 6px;
    width: 6px;
    animation-delay: -4.6s;
    transform: translate3d(10vw, 20vh, 59px);
    background: #fff;
  }
  .particle:nth-child(24) {
    animation: particle-animation-24 60s infinite;
    opacity: 0.32;
    height: 9px;
    width: 9px;
    animation-delay: -4.8s;
    transform: translate3d(24vw, 81vh, 62px);
    background: #fff;
  }
  .particle:nth-child(25) {
    animation: particle-animation-25 60s infinite;
    opacity: 0.9;
    height: 10px;
    width: 10px;
    animation-delay: -5s;
    transform: translate3d(68vw, 5vh, 85px);
    background: #fff;
  }
  .particle:nth-child(26) {
    animation: particle-animation-26 60s infinite;
    opacity: 0.06;
    height: 10px;
    width: 10px;
    animation-delay: -5.2s;
    transform: translate3d(35vw, 19vh, 61px);
    background: #fff;
  }
  .particle:nth-child(27) {
    animation: particle-animation-27 60s infinite;
    opacity: 0.74;
    height: 9px;
    width: 9px;
    animation-delay: -5.4s;
    transform: translate3d(43vw, 77vh, 38px);
    background: #fff;
  }
  .particle:nth-child(28) {
    animation: particle-animation-28 60s infinite;
    opacity: 0.58;
    height: 7px;
    width: 7px;
    animation-delay: -5.6s;
    transform: translate3d(2vw, 28vh, 6px);
    background: #fff;
  }
  .particle:nth-child(29) {
    animation: particle-animation-29 60s infinite;
    opacity: 0.81;
    height: 8px;
    width: 8px;
    animation-delay: -5.8s;
    transform: translate3d(60vw, 65vh, 14px);
    background: #fff;
  }
  .particle:nth-child(30) {
    animation: particle-animation-30 60s infinite;
    opacity: 0.51;
    height: 9px;
    width: 9px;
    animation-delay: -6s;
    transform: translate3d(73vw, 25vh, 48px);
    background: #fff;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/hamburger_menu.css */
  #hamburger_menu {
    display: flex;
    position: relative;
    margin: 0 5px 0 15px;
  }
  #hamburger_menu .dropdown * {
    display: flex;
  }
  #hamburger_menu .dropdown {
    position: relative;
  }
  #hamburger_menu .dropdown summary {
    list-style: none;
    list-style-type: none;
    cursor: pointer;
    color: var(--dropdown-color);
    width: 20px;
    height: 14px;
    position: relative;
  }
  #hamburger_menu .dropdown summary span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--hamburger-color);
    border-radius: 1px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
  #hamburger_menu .dropdown summary span:nth-child(1) {
    top: 0;
  }
  #hamburger_menu .dropdown summary span:nth-child(2),
  .dropdown summary span:nth-child(3) {
    top: 6px;
  }
  #hamburger_menu .dropdown summary span:nth-child(4) {
    top: 12px;
  }
  #hamburger_menu .dropdown > summary::-webkit-details-marker {
    display: none;
  }
  #hamburger_menu .dropdown menu {
    position: absolute;
    margin: 23px 0 0 0;
    padding: 15px 0;
    width: var(--hamburger-dropdown-width);
    right: -15px;
    box-sizing: border-box;
    z-index: 2;
    background: var(--dropdown-background);
    border-radius: 10px;
    list-style: none;
    color: var(--dropdown-color);
    -webkit-backdrop-filter: var(--dropdown-backdrop-filter);
    backdrop-filter: var(--dropdown-backdrop-filter);
    display: flex;
    flex-direction: column;
    cursor: default;
    justify-content: flex-start;
    -webkit-box-shadow: 0 0 45px 20px rgba(33, 38, 47, 90%);
    box-shadow: 0 0 45px 20px rgba(33, 38, 47, 90%);
  }
  #hamburger_menu .dropdown > summary::before {
    display: none;
  }
  menuitem {
    white-space: nowrap;
  }
  menuitem a {
    text-decoration: none;
    padding: 5px 24px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: 0.5s;
  }
  menuitem a:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  menuitem a .icon {
    background: rgba(255, 255, 255, 1);
    width: 16px;
    height: 16px;
    margin: 0 10px 0 0;
  }
  menuitem a:hover .icon {
    background: #2a6dff;
  }
  menuitem a.referral_program .icon {
    -webkit-mask: url(${landingAssets.referral_icon}) center center / auto 16px no-repeat;
  }
  menuitem a.tour .icon {
    -webkit-mask: url(${landingAssets.tour_icon}) center center / auto 16px no-repeat;
  }
  menuitem a .support_icon {
    -webkit-mask: url(${landingAssets.support_icon}) center center / auto 16px no-repeat;
  }
  menuitem.section {
    padding: 0 0 10px 0;
    margin: 0 0 10px 0;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
  }
  menuitem a .xft_icon {
    -webkit-mask: url(${landingAssets.xft_icon_only}) no-repeat;
    -webkit-mask-size: auto 12px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 12px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .about_icon {
    -webkit-mask: url(${landingAssets.about_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .docs_icon {
    -webkit-mask: url(${landingAssets.docs_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .press_icon {
    -webkit-mask: url(${landingAssets.press_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .careers_icon {
    -webkit-mask: url(${landingAssets.careers_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .support_icon {
    -webkit-mask: url(${landingAssets.support_icon}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  menuitem a .home_icon {
    -webkit-mask: url(${landingAssets.yolorekt_moon_white}) no-repeat;
    -webkit-mask-size: auto 18px;
    -webkit-mask-position: center center;
    width: 22px;
    height: 22px;
    background: #fff;
    margin-right: 7px;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/games_browser.css */
  #games_browser {
    display: flex;
    flex-direction: row;
    overflow: auto;
    position: relative;
    height: 124px;
    margin: 60px 0 0 0;
    z-index: 2;
  }
  #games_browser .triangle {
    margin-right: 0;
  }
  /* #games_browser::-webkit-scrollbar {
    display: none;
  } */
  .gametime {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    padding: 3px 4px;
  }
  .gametime .game_block_value {
    font-weight: 700;
    line-height: 100%;
    font-size: 0.75rem;
  }
  .bidders_list.eth .asset_icon {
    background: url(${landingAssets.eth_icon}) center center / auto 16px no-repeat;
    height: 16px;
    width: 16px;
    margin: 0 5px 0 0;
  }
  .bidders_list.tesla .asset_icon {
    background: url(${landingAssets.tesla_icon}) center center / auto 16px no-repeat;
    height: 16px;
    width: 16px;
    margin: 0 5px 0 0;
  }
  #games_browser .games_tiles_wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  #games_browser .games_tiles_wrapper .games_row {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 4px;
    margin-left: -10px;
  }
  #games_browser .games_tiles_wrapper .games_row:nth-child(1) {
    -webkit-animation: slide-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  #games_browser .games_tiles_wrapper .games_row:nth-child(2) {
    -webkit-animation: slide-left 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-left 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  #games_browser .games_tiles_wrapper .games_row:nth-child(3) {
    -webkit-animation: slide-left 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-left 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  #games_browser .games_tiles_wrapper .games_row a {
    text-decoration: none;
    cursor: default;
  }
  #games_browser .game {
    min-width: 300px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    display: flex;
    margin: 0 4px 0 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: default;
    height: 38px;
    position: relative;
    font-size: 0.75rem;
    font-weight: 300;
    opacity: 0.6;
  }
  #games_browser .game.live {
    opacity: 1;
  }
  #games_browser .game.next {
    opacity: 0.6;
  }
  #games_browser .game.past {
    opacity: 0.7;
  }
  #games_browser .game .q1,
  #games_browser .game .q2,
  #games_browser .game .q3 {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
  }
  #games_browser .game .q1 {
    justify-content: center;
    width: 22%;
    padding: 2px 0 0 0;
  }
  #games_browser .game.next .q1 {
    padding: 0 0 0 5px;
  }
  #games_browser .game.past .q1 {
    font-weight: 600;
  }
  #games_browser .game .q1 .block_time_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  #games_browser .game .q1 .block_time_wrap #real_time_value {
    margin: 0 4px 0 0;
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 0;
  }
  #games_browser .game .q2 {
    justify-content: center;
    white-space: nowrap;
    width: 46%;
  }
  #games_browser .game.live .q2 {
    font-weight: 600;
    line-height: 0;
  }
  #games_browser .game.live .q2 strong {
    font-weight: 600;
    margin: 0 5px 0 0;
    line-height: 0;
  }
  #games_browser .game.past .q2 {
    color: rgba(255, 255, 255, 1);
    text-transform: uppercase;
    font-size: 0.7rem;
  }
  #games_browser .games_row .game .predict_now {
    padding: 12px 10px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    display: inline-block;
    line-height: 0;
  }
  #games_browser .games_row .game .predict_now strong {
    font-weight: 800;
    padding-left: 4px;
    line-height: 0;
  }
  #games_browser .game .q3 {
    justify-content: center;
    width: 22%;
  }
  #games_browser .game .game_status {
    justify-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 100%;
    align-items: center;
    display: flex;
  }
  #games_browser .game .q3 .game_status {
    display: flex;
    align-items: center;
  }
  #games_browser .game .game_status.yolo {
    line-height: 140%;
    font-weight: 600;
  }
  #games_browser .game .game_status.yolo {
    color: #00ea16;
    white-space: nowrap;
    flex-direction: row;
    display: flex;
    align-items: center;
    line-height: 0;
  }
  #games_browser .game .game_status strong {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 120%;
    white-space: nowrap;
  }
  #games_browser .game.past.yolo .q1 .game_status strong {
    margin-left: 0;
    font-weight: 600;
  }
  #games_browser .game.past.yolo .q1 .game_status .gs_data_wrap .amount {
    color: rgba(0, 194, 19, 1);
  }
  #games_browser .game.next .game_status strong {
    margin-left: 0;
  }
  #games_browser .game.next .gametime {
    border: 0;
  }
  #games_browser .game.next .gametime .game_block_value {
    font-size: 0.7rem;
  }
  #games_browser .game .game_status.yolo strong {
    font-size: 0.75rem;
    color: #01a812;
    color: #fff;
    font-weight: 800;
    margin-right: 5px;
    line-height: 0;
    white-space: nowrap;
  }
  #games_browser .game .game_status.yolo.rekt strong {
    color: #e20e55;
    color: #fff;
  }
  #games_browser .game.past .q1 .game_status strong {
    margin-left: 0;
  }
  #games_browser .game .game_status .amount {
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 100%;
    padding-top: 1px;
  }
  #games_browser .game .game_status.yolo .amount {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 0;
  }
  #games_browser .game .q3 .game_status .amount {
    line-height: 100%;
    padding: 2px 0 0 0;
  }
  #games_browser .game.live .q3 .game_status .amount {
    line-height: 100%;
    padding: 2px 0 0 0;
  }
  #games_browser .game .game_status .gs_data_wrap {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  #games_browser .game .q1 .game_status .gs_data_wrap {
    padding: 0 0 0 0;
  }
  #games_browser .game .q3 .game_status .gs_data_wrap {
    justify-content: flex-start;
  }
  #games_browser .game.live .q3 .game_status .gs_data_wrap {
    justify-content: center;
    padding: 0;
  }
  #games_browser .game.past .q3 .game_status .gs_data_wrap {
    justify-content: center;
  }
  #games_browser .game.live {
    background: rgba(0, 0, 0, 0.3);
    position: relative;
  }
  #games_browser .game.live:after {
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
  #games_browser .games_row.eth_row .game.past,
  #games_browser .games_row.tesla_row .game.past,
  #games_browser .games_row.matic_row .game.past {
    background: rgba(39, 46, 59, 1);
  }
  #games_browser .games_row.eth_row .game.next,
  #games_browser .games_row.tesla_row .game.next,
  #games_browser .games_row.matic_row .game.next {
    background: rgba(32, 42, 63, 0.7);
  }
  #games_browser .games_row.eth_row .game .predict_now,
  #games_browser .games_row.tesla_row .game .predict_now,
  #games_browser .games_row.matic_row .game .predict_now {
    background: rgba(135, 187, 250, 0.15);
    display: flex;
    flex-direction: row;
  }
  #games_browser .game.live.current {
    animation: pulse 1s linear 0s infinite alternate none running;
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.7);
    position: relative;
    z-index: 2;
  }
  #games_browser .game.live.current:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(135, 92, 255, 1) 20%, rgba(42, 109, 255, 1) 88%);
    border-radius: 9px;
    z-index: -1;
  }
  #games_browser .game.live.current .q2 {
    color: #fff;
    font-weight: 400;
  }
  #games_browser .game.live.current .q2 strong {
    font-weight: 600;
    margin: 0 5px 0 0;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/place_bid.css */
  .place_bid-wrapper {
    min-width: 370px;
  }
  .place_bid-wrapper .bid_form * {
    font-weight: 300;
  }
  .place_bid-wrapper .modal_window_wrapper {
    background: rgba(152, 183, 253, 0.2);
    border-radius: 15px;
    padding: 30px;
    min-width: 370px;
    white-space: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    -webkit-box-shadow: 0 1px 60px 0px rgba(30, 41, 62, 0.2);
    box-shadow: 0 1px 60px 0px rgba(30, 41, 62, 0.2);
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading {
    display: flex;
    text-align: left;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.6rem;
    flex-direction: row;
    line-height: 100%;
    padding: 0;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .title {
    display: flex;
    flex-direction: row;
    align-self: center;
    line-height: 100%;
    font-weight: 300;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number span {
    font-weight: 700;
    line-height: 100%;
    padding: 0 0 0 8px;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number .round {
    display: flex;
    line-height: 100%;
    font-weight: 700;
    border-radius: 10px;
    margin: 0 0 0 5px;
    padding: 6px 8px;
    margin: -6px 0 0 4px;
    font-size: 1.6rem;
    border: 1px solid transparent;
    position: relative;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number:hover .round {
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number .selection_icon {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    align-self: center;
    margin: 0 0 0 5px;
  }
  .place_bid-wrapper .modal_window_wrapper .window_heading .round_number .triangle.down {
    -webkit-mask-size: auto 12px;
    width: 12px;
    height: 12px;
    background: #fff;
  }
  .place_bid-wrapper .bid_form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0 0 0;
    width: 100%;
  }
  .place_bid-wrapper .bid_form fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .place_bid-wrapper .bid_form label {
    font-size: 0.8rem;
    padding: 0 0 5px 0;
    text-align: left;
  }
  .place_bid-wrapper .bid_form .input_wrap {
    display: flex;
    flex-direction: column;
    width: 240px;
  }
  .place_bid-wrapper .bid_form input {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 16px;
    color: #fff;
    border: 1px solid rgba(42, 109, 255, 0.5);
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 300;
    width: 100%;
    line-height: 100%;
  }
  .place_bid-wrapper .bid_form input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  .place_bid-wrapper .bid_form input:focus {
    -webkit-box-shadow: 0 0 60px 0 rgba(42, 109, 255, 1);
    outline: 0;
  }
  .place_bid-wrapper .bid_form .bid_balance_remainder {
    font-size: 0.9rem;
  }
  .place_bid-wrapper .bid_form .bid_balance_remainder strong {
    padding: 0 0 0 5px;
    font-weight: 700;
  }
  .place_bid-wrapper .bid_form .currency_wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    justify-content: flex-start;
    position: absolute;
    left: 255px;
    top: calc(50% - 18px);
    transform: translateY(-50%);
  }
  .place_bid-wrapper .currency_wrap .usd_icon {
    background: url(${landingAssets.usd_icon_2}) center center / auto 20px no-repeat;
    width: 14px;
    height: 20px;
    margin: 0 3px 0 0;
  }
  .place_bid-wrapper .amount_suggestions {
    display: flex;
    margin: 5px 0 20px 0;
  }
  .place_bid-wrapper .amount_suggestions a {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0 3px 0 0;
    text-align: center;
    width: 100%;
    height: 36px;
  }
  .place_bid-wrapper .amount_suggestions a:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .place_bid-wrapper .amount_suggestions a:nth-child(2) {
    border-radius: 0;
  }
  .place_bid-wrapper .amount_suggestions a:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
  }
  .place_bid-wrapper .bid_form .button_row {
    display: flex;
    flex-direction: row;
    padding: 20px 0 0 0;
  }
  .place_bid-wrapper .bid_button_modal_wrap {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .place_bid-wrapper .bid_button_modal_wrap button {
    border-radius: 10px;
    width: calc(100% - 4px);
    padding: 10px;
    font-weight: 500;
    font-size: 1rem;
    margin: 0 2px;
  }
  .place_bid-wrapper .bid_button_modal_wrap.down button {
    background: linear-gradient(0deg, rgba(175, 11, 66, 1) 0%, rgba(226, 14, 85, 1) 100%);
  }
  .place_bid-wrapper .bid_button_modal_wrap.up button {
    background: linear-gradient(0deg, rgba(0, 135, 13, 1) 0%, rgba(1, 168, 17, 1) 100%);
  }
  .place_bid-wrapper .bid_button_modal_wrap.down button:hover {
    background: rgba(226, 14, 85, 1);
  }
  .place_bid-wrapper .bid_button_modal_wrap.up button:hover {
    background: rgba(1, 168, 17, 1);
  }
  .place_bid-wrapper .bid_form .button_row .pg {
    font-weight: 300;
    margin: 8px 0 0 0;
    display: flex;
    align-items: center;
  }
  .place_bid-wrapper .bid_form .button_row .pg strong {
    padding-right: 9px;
    opacity: 0.5;
    font-size: 0.75;
  }
  .place_bid-wrapper .bid_form .button_row .bid_button_modal_wrap .payout {
    padding: 2px 4px;
    border-radius: 5px;
    font-size: 0.8rem;
    margin: 0 0 0 3px;
    font-weight: 600;
  }
  .place_bid-wrapper .bid_form .button_row .bid_button_modal_wrap.down .payout {
    background: linear-gradient(0deg, rgba(175, 11, 66, 0.5) 0%, rgba(226, 14, 85, 0.5) 100%);
  }
  .place_bid-wrapper .bid_form .button_row .bid_button_modal_wrap.up .payout {
    background: linear-gradient(0deg, rgba(0, 135, 13, 0.5) 0%, rgba(1, 168, 17, 0.5) 100%);
  }
  .triangle.down {
    -webkit-mask: url(${landingAssets.arrow_up}) no-repeat;
    transform: rotate(180deg);
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/chat.css */
  #chat {
    min-width: 250px;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: transparent;
    border-radius: 10px;
    left: 0;
    position: relative;
    align-items: center;
    flex-direction: row;
    position: relative;
  }
  #chat:before {
    position: absolute;
    top: calc(50% + 7px);
    left: 0;
    transform: translateY(-50%);
    content: '';
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  #chat .column_1 {
    left: 0;
    position: relative;
    display: flex;
    flex-flow: column;
    width: 45vw;
    justify-content: center;
  }
  #chat .column_2 {
    right: 0;
    position: relative;
    display: flex;
    flex-flow: column;
    width: 45vw;
    justify-content: center;
    align-items: flex-end;
  }
  #chat .msg {
    display: flex;
  }
  #chat .activity {
    padding: 10px 20px;
    border-radius: 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    display: inline-flex;
    flex-flow: row;
    align-items: center;
    left: 0;
    position: relative;
    margin: 2px 0;
    width: fit-content;
  }
  #chat .column_2 .activity {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  #chat .activity * {
    display: flex;
  }
  #chat .activity.bid.up {
    background: rgba(1, 168, 17, 0.1);
    background-color: rgba(152, 183, 253, 0.06);
    background: rgba(42, 109, 255, 0.2);
  }
  #chat .activity.bid.down {
    background: rgba(226, 14, 85, 0.1);
    background-color: rgba(152, 183, 253, 0.06);
    background: rgba(42, 109, 255, 0.2);
  }
  #chat .activity.won {
    background: rgba(42, 109, 255, 0.2);
  }
  #chat .activity .activity_data {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
    padding: 4px 0 0 0;
    white-space: nowrap;
  }
  #chat .activity .activity_data strong {
    font-weight: 600;
    padding-right: 5px;
  }
  #chat .activity.bid.up .activity_data strong {
    color: rgba(0, 194, 19, 1);
  }
  #chat .activity.bid.down .activity_data strong {
    color: rgba(226, 14, 85, 1);
  }
  #chat .activity.won .activity_data strong {
    color: rgba(42, 109, 255, 1);
  }
  #chat .activity .activity_inside {
    flex-flow: column;
    width: 100%;
    font-size: 0.75rem;
  }
  #chat .activity .activity_inside .username_ts {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  #chat .activity .username {
    font-size: 0.8rem;
    font-weight: 700;
    margin-right: 10px;
  }
  #chat .activity .ts {
    font-size: 0.6rem;
    color: #999;
    white-space: nowrap;
    display: none;
  }
  #chat .messages {
    flex: 1;
    overflow: hidden;
    flex-flow: row;
    display: flex;
    justify-content: space-between;
  }
  #chat .message {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin-right: 0;
    max-width: 180px;
  }
  #chat .column_1 .message {
    margin: 0 0 0 30px;
  }
  #chat .column_2 .message {
    margin: 0 30px 0 0;
  }
  #chat .message .msg_top_wrap,
  #chat .message .msg_mid_wrap {
    display: flex;
    flex-direction: row;
  }
  #chat .message .msg_mid_wrap {
    position: relative;
    align-items: center;
  }
  #chat .message.them .msg_mid_wrap {
    position: relative;
    align-items: center;
    justify-content: flex-end;
  }
  #chat .message.me .msg_name {
    color: #fff;
    font-weight: 600;
    margin-right: 10px;
  }
  #chat .message.them .msg_name {
    color: #fff;
    font-weight: 600;
    margin-left: 10px;
  }
  #chat .message .msg_top_wrap {
    font-size: 0.8rem;
    display: flex;
    position: relative;
  }
  #chat .message.me .msg_top_wrap {
    padding: 0 0 1px 0;
    justify-content: flex-start;
    align-items: center;
  }
  #chat .message.them .msg_top_wrap {
    padding: 0 0 1px 0;
    justify-content: flex-end;
    align-items: center;
  }
  #chat .msg {
    position: relative;
  }
  #chat .msg_date {
    display: flex;
    justify-content: flex-end;
    font-size: 0.6rem;
    color: #999;
    white-space: nowrap;
    display: none;
  }
  #chat blockquote {
    border-radius: 15px;
    position: relative;
    margin: 0;
    padding: 8px 14px;
    color: rgba(255, 255, 255, 1);
    font-size: 0.8rem;
  }
  #chat .msg--them blockquote::after,
  #chat .msg--me blockquote::before {
    position: absolute;
    display: block;
    content: '';
    width: 0;
    height: 0;
  }
  #chat .msg--them {
    justify-content: flex-end;
  }
  #chat .msg--them blockquote {
    background: rgba(0, 0, 0, 0.25);
    border-bottom-right-radius: 0;
    order: -1;
    text-align: right;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }
  #chat .msg--me blockquote {
    background-color: rgba(152, 183, 253, 0.1);
    border-bottom-left-radius: 0;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    text-align: left;
  }
  #chat .message.me .msg_avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  #chat .message.them .msg_avatar {
    width: 24px;
    height: 24px;
    margin-left: 8px;
  }
  #chat .message .msg_avatar .nft_icon {
    width: 24px;
    height: 24px;
    background-size: 24px 24px;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/stats_panel.css */
  #stats {
    display: flex;
    justify-content: flex-start;
    background: transparent;
    border-radius: 10px;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    max-height: 1100px;
    width: 500px;
  }
  #stats .bidders_list {
    overflow-y: visible;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    height: 100%;
  }
  #stats #your_bids .bidders_list {
    padding: 10px 0 5px 20px;
    background: rgba(152, 183, 253, 0.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
    box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
    margin: 10px 0 0 0;
  }
  #stats #your_bids .bidders_list:last-child {
    margin: 6px 0;
  }
  #stats #your_bids .bidders_list input[type='checkbox'] {
    display: none;
    visibility: hidden;
  }
  #stats #your_bids .bidders_list label.currency_wrap {
    display: flex;
    flex-flow: row;
    align-items: center;
    margin: 0 0 0 -20px;
    padding: 5px 15px 10px 15px;
    cursor: pointer;
  }
  #stats #your_bids .bidders_list label.currency_wrap::before {
    -webkit-mask: url(${landingAssets.plus_icon}) center center / 10px 10px no-repeat;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: 18px;
    content: '';
  }
  #stats #your_bids .bidders_list.eth #toggle_eth:checked ~ label.currency_wrap::before {
    -webkit-mask: url(${landingAssets.minus_icon}) center center / 10px 10px no-repeat;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: 18px;
    content: '';
  }
  #stats #your_bids .bidders_list label.currency_wrap .currency_type {
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 1;
    line-height: 100%;
  }
  #stats #your_bids .bidders_list.eth #bidders_expand_eth,
  #stats #your_bids .bidders_list.tesla #bidders_expand_tesla {
    max-height: 0;
    width: calc(100% - 22px);
    overflow-y: hidden;
    transition: max-height 0.3s;
  }
  #stats #your_bids .bidders_list.eth #toggle_eth:checked ~ #bidders_expand_eth {
    max-height: 95px;
    overflow-y: hidden;
    width: calc(100% - 15px);
  }
  #stats #all_bids .bids_up .bidders_list {
    padding: 0 15px 0 15px;
    margin: 0 15px 0 0;
  }
  #stats #all_bids .bids_down .bidders_list {
    padding: 0 15px 0 30px;
  }
  #stats #all_bids .bidders_list .triangle {
    display: none;
  }
  #stats #all_bids .heading {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    line-height: 100%;
    flex-direction: row;
    width: 100%;
  }
  #stats #all_bids .bids_up .heading {
    padding: 0 45px 0 15px;
  }
  #stats #all_bids .bids_down .heading {
    padding: 0 30px;
  }
  #stats #your_bids a.clear_action {
    width: 10px;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    mask: url('landingAssets.icons / clear_icon') center center / auto 10px no-repeat; */
    background: rgba(255, 255, 255, 0.3);
    margin: -2px 6px 0 6px;
  }
  #stats #your_bids a:hover.clear_action {
    background: rgba(255, 255, 255, 1);
  }
  #stats #your_bids .single_transaction.pending a.clear_action,
  #stats #your_bids .single_transaction.confirmed a.clear_action {
    visibility: hidden;
  }
  #stats #your_bids .single_transaction.failed a.clear_action {
    visibility: visible;
  }
  #your_bids .single_transaction {
    margin: 0 0 2px 0;
    padding: 7px 25px;
    text-align: left;
    flex-direction: column;
  }
  #your_bids .single_transaction:hover {
    background: rgba(0, 0, 0, 0.15);
  }
  #your_bids .single_transaction .status_wrap {
    justify-content: space-between;
    padding: 0 0 0 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    position: relative;
    align-items: center;
  }
  #your_bids .single_transaction .status_wrap .status {
    display: flex;
    opacity: 1;
    font-weight: 400;
    font-size: 0.75rem;
    width: auto;
  }
  #your_bids .single_transaction .status_wrap .status strong {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    display: block;
    padding: 0 0 0 5px;
  }
  #your_bids .single_transaction .status_wrap .right {
    flex-flow: row;
  }
  #your_bids .single_transaction.pending .status,
  #your_bids .single_transaction.pending .status strong {
    color: #e5c247;
  }
  #your_bids .single_transaction.confirmed .status {
    color: #2a6dff;
  }
  #your_bids .single_transaction.failed .status {
    color: #ff0000;
  }
  #your_bids .single_transaction.pending .status_icon {
    background: url(${landingAssets.pending_icon_yellow}) center center / 16px 16px no-repeat;
    -webkit-mask: none;
    mask: none;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
  }
  #your_bids .single_transaction.confirmed .status_icon {
    background: url(${landingAssets.check_icon_blue}) center center / 16px 16px no-repeat;
    -webkit-mask: none;
    mask: none;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
  }
  #your_bids .single_transaction.failed .status_icon {
    background: url(${landingAssets.alert_icon_red}) center center / 14px 14px no-repeat;
    -webkit-mask: none;
    mask: none;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
  }
  #your_bids .single_transaction .value {
    justify-content: flex-end;
    margin: 0 0 0 0;
    font-weight: 200;
    font-size: 0.8rem;
  }
  #your_bids .single_transaction.failed .value {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    color: red;
  }
  #your_bids .single_transaction.failed .value span {
    color: #fff !important;
  }
  #your_bids .triangle.up.large,
  #your_bids .triangle.down.large {
    margin-right: 5px;
    width: 10px;
    height: 10px;
    -webkit-mask-size: 10px 10px;
  }
  .single_transaction * {
    display: flex;
  }
  .single_transaction {
    margin: 0 0 2px 0;
    padding: 7px 25px;
    text-align: left;
  }
  .single_transaction.win_loss {
    margin: 0;
    padding: 3px 25px 0 25px;
    cursor: default;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
  }
  .single_transaction .status_wrap {
    justify-content: space-between;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
  }
  .single_transaction .status_wrap .status {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 200;
    font-size: 0.8rem;
    max-width: 85%;
  }
  .single_transaction.win_loss .status {
    color: #fff;
    opacity: 1;
    display: flex;
  }
  .single_transaction.confirmed .status strong,
  .single_transaction.pending .status strong {
    padding: 0 5px 0 0;
  }
  .single_transaction.pending .status_icon {
    -webkit-mask: url(${landingAssets.pending_icon}) center center/16px 16px no-repeat;
    mask: url(${landingAssets.pending_icon}) center center/16px 16px no-repeat;
    background: #e5c247;
    width: 16px;
    height: 16px;
    margin: 0 10px 0 0;
  }
  .single_transaction.confirmed .status_icon {
    -webkit-mask: url(${landingAssets.check_icon}) center center/16px 16px no-repeat;
    mask: url(${landingAssets.check_icon}) center center/16px 16px no-repeat;
    background: #2a6dff;
    width: 16px;
    height: 16px;
    margin: 0 10px 0 0;
  }
  .single_transaction .status_wrap .timestamp {
    font-size: 0.7rem;
  }
  .single_transaction .transaction_info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .single_transaction.win_loss .transaction_info {
    width: auto;
  }
  .single_transaction .hash {
    left: 25px;
    position: relative;
    width: calc(100% - 25px);
  }
  .single_transaction .hash span {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
  .single_transaction .hash span:first-child {
    width: 100px;
    text-overflow: ellipsis;
  }
  .single_transaction .hash .copy_icon {
    -webkit-mask-size: auto 12px;
    -webkit-mask-position: center center;
    mask-size: auto 12px;
    mask-position: center center;
    width: 12px;
    height: 12px;
    margin: 3px 0 0 7px;
  }
  .single_transaction .value {
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .single_transaction .value .currency_type {
    margin-left: 7px;
    opacity: 0.5;
    font-size: 0.7rem;
    padding: 2px 0 0 0;
    line-height: 130%;
  }
  #stats .bidder.you .single_transaction,
  #stats .bidder .single_transaction {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    white-space: nowrap;
    padding: 3px 0;
  }
  #stats .bidder.you .single_transaction {
    margin: 0;
    padding: 3px 0 3px 15px;
  }
  #stats .bidder.you .single_transaction:hover {
    background: transparent;
  }
  #stats .bidder.you .single_transaction .value,
  #stats .bidder .single_transaction .value {
    align-items: center;
  }
  #stats .bidder .single_transaction .value {
    font-size: 0.8rem;
  }
  #stats .bidder .single_transaction .value .round_type.live {
    background: url(${landingAssets.live_text}) center center / auto 10px no-repeat;
    width: 34px;
    height: 10px;
    margin: 0 0 0 5px;
  }
  .currency_type {
    opacity: 0.5;
    font-size: 0.7rem;
    padding: 2px 0 0 0;
    line-height: 160%;
  }
  #stats #all_bids .currency_type {
    display: none;
  }
  #stats .bidder.you .single_transaction.pending .status_icon,
  #stats .bidder .single_transaction.pending .status_icon,
  #stats .bidder.you .single_transaction.confirmed .status_icon,
  #stats .bidder .single_transaction.confirmed .status_icon {
    margin: 0 7px 0 0;
  }
  #stats .total {
    position: relative;
    padding: 6px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 1rem;
    align-items: center;
    height: 210px;
  }
  #stats .total .live_bets_heading {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
    position: absolute;
    top: 15px;
    left: 20px;
    line-height: 100%;
  }
  #stats .total .total_bid_amount {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    padding: 20px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: 200;
    letter-spacing: -0.01em;
  }
  #stats .total .total_bid_amount strong {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    opacity: 0.4;
  }
  #stats .total_bids {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    padding: 15px 30px 0 30px;
  }
  #bids_panel {
    width: 100%;
    height: calc(100% - 210px);
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  #bids_panel #all_bids {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
    overflow: hidden;
  }
  #all_bids .module_boxes {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 0 6px 0;
  }
  #all_bids .module_boxes .box {
    width: 50%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 1.7rem;
    font-weight: 200;
    margin: 0 6px 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    line-height: 100%;
    letter-spacing: -0.03em;
  }
  #all_bids .module_boxes .box strong {
    font-weight: 600;
    font-size: 0.75rem;
    opacity: 0.4;
    text-transform: uppercase;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    line-height: 120%;
  }
  #all_bids .module_boxes .box:last-child {
    margin-right: 0;
  }
  #bids_panel .bids_up,
  #bids_panel .bids_down {
    width: 50%;
    height: 100%;
    height: calc(100% - 385px);
    margin-top: 20px;
    overflow: hidden;
  }
  #bids_panel #all_bids .all_bidders_list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: rgba(152, 183, 253, 0.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
    box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
  }
  #bids_panel .all_bids_heading {
    padding: 0 20px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.9rem;
    text-align: center;
    border-radius: 10px;
  }
  #bids_panel .all_bids_heading strong {
    font-weight: 600;
    padding-left: 5px;
  }
  #bids_panel .your_bids_heading {
    flex-direction: row;
    padding: 10px 20px 0 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.9rem;
    text-align: center;
    border-radius: 10px;
    font-weight: 700;
  }
  #live_bets_meter {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0 0 6px 0;
    flex-direction: column;
    background: rgba(152, 183, 253, 0.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: 10px;
  }
  #live_bets_meter .meter_wrapper {
    display: flex;
    position: relative;
    width: 100%;
    padding: 0;
    margin: 15px 0 0 0;
    height: 70px;
    justify-content: center;
  }
  #live_bets_meter .meter_wrapper .meter {
    background: url(${landingAssets.live_bids_meter}) center center / 250px auto no-repeat;
    width: 100%;
    height: 70px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  #live_bets_meter .meter_wrapper .needle_wrapper {
    width: 250px;
    height: 80px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  }
  #live_bets_meter .meter_wrapper .needle {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%) rotate(40deg);
    transform-origin: bottom center;
    transform-style: preserve-3D;
    transition: transform 1s linear;
    -webkit-mask: url(${landingAssets.meter_needle}) no-repeat;
    -webkit-mask-size: auto 140px;
    -webkit-mask-position: center center;
    background: rgba(255, 255, 255, 0.8);
    width: 5px;
    height: 140px;
    z-index: 1;
  }
  #live_bets_meter ul {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
  }
  #live_bets_meter .value {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  #live_bets_meter .value .live_bid_value {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 5px 0;
    font-weight: 700;
  }
  #all_bids .number {
    font-weight: 600;
    padding: 0 10px 0 0;
    font-size: 0.9rem;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/wallet.css */
  #wallet_menu {
    display: flex;
    position: relative;
    margin: 0;
    left: 0;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  #wallet_menu .dropdown * {
    display: flex;
  }
  #wallet_menu .dropdown {
    position: relative;
    flex-direction: column;
  }
  #wallet_menu .dropdown menu {
    position: relative;
    margin: 0 0 0 0;
    padding: 15px;
    width: var(--wallet-dropdown-width);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    background: var(--dropdown-background);
    border-radius: 10px;
    list-style: none;
    color: var(--dropdown-color);
    -webkit-backdrop-filter: var(--dropdown-backdrop-filter);
    backdrop-filter: var(--dropdown-backdrop-filter);
    display: flex;
    flex-direction: column;
    cursor: default;
    justify-content: flex-start;
    width: var(--dropdown-width);
    -webkit-box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
    box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
  }
  #wallet_menu .dropdown menu:after {
    content: '';
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(80px);
    filter: blur(80px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  #wallet_menu .window_heading {
    font-weight: 600;
    padding: 7px 15px 10px 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    white-space: nowrap;
    font-size: 1.1rem;
  }
  .window_top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 5px 5px 5px;
    flex-wrap: wrap;
  }
  .window_top div {
    align-items: center;
  }
  .connected_with {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    font-size:13px;
    margin: 0 5px 0 0;
  }
  .connected_with img {
    width: 20px;
    display: flex;
    align-self: center;
    margin: 0 0 0 10px;
  }
  .window_top button {
    font-size: 0.7rem;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
  }
  .history_button_wrap button {
    font-size: 0.7rem;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    display: block !important;
    margin: 10px 20px;
  }
  .wallet_id_full {
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 0 5px;
  }
  .wallet_id_full span {
    font-size: 0.8rem;
    white-space: nowrap;
    flex-direction: row;
    text-overflow: ellipsis;
    width: 274px;
    overflow: hidden;
    display: block !important;
  }
  .copy_icon {
    background-color: #fff;
    -webkit-mask: url(${landingAssets.copy_icon}) no-repeat;
    -webkit-mask-size: auto 16px;
    -webkit-mask-position: center center;
    width: 16px;
    height: 16px;
    margin: 0 0 0 10px;
  }
  .window_account {
    flex-direction: column;
  }
  .window_account .wallet_balance {
    font-size: 1rem;
    padding: 15px 25px;
    margin: 0 -15px 0 -15px;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    cursor: default;
  }
  .window_account .wallet_balance .balance_wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  button.withdraw_all {
    background: linear-gradient(180deg, rgba(42, 109, 255, 1) 0%, rgba(32, 83, 195, 1) 100%);
    background: #1d4baf;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 0.8rem;
    width: 100%;
    margin: 8px 0 0 0;
  }
  button.withdraw_all:hover {
    background: rgb(42, 109, 255);
  }
  .transaction_list {
    padding: 20px 0 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin: 0 -15px;
    flex-direction: column;
  }
  .transaction_list .transaction_list_overflow {
    max-height: 280px;
    overflow-y: hidden;
    margin-top: 5px;
    flex-direction: column;
  }
  #wallet_menu .transaction_list .transaction_list_overflow.win_loss {
    max-height: 190px;
    overflow-y: hidden;
    margin-top: 5px;
  }
  #wallet_menu .transaction_list h4,
  #wallet_menu .wallet_balance h4 {
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  #wallet_menu .transaction_list h4 {
    margin: 0;
  }
  #wallet_menu .wallet_balance h4 {
    font-size: 0.9rem;
  }
  .wallet_balance .currency_wrap {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 0.9rem;
    flex-direction: column;
  }
  .transaction_list h4 {
    padding-left: 25px;
  }
  #wallet_menu .dropdown .single_transaction * {
    display: flex;
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap {
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 2px 2px 8px;
    border-radius: 10px;
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap .tx_speed_label {
    font-size: 0.7rem;
    margin: 0 4px 0 0;
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap button {
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: 0.7rem;
    margin: 0 0 0 4px;
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap button.speedup.low {
    background: rgba(0, 194, 19, 0.2);
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap button.speedup.med {
    background: rgba(0, 194, 19, 0.4);
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap button.speedup.high {
    background: rgba(0, 194, 19, 0.6);
  }
  #wallet_menu .dropdown .single_transaction .tx_speed_button_wrap button.speedup:hover {
    background: rgba(0, 194, 19, 0.9);
  }
  #wallet_menu .dropdown .single_transaction .wallet_bids_button_row {
    justify-content: space-between;
    align-items: center;
    margin: 4px 0 0 0;
  }
  #wallet_menu .dropdown .single_transaction .wallet_bids_button_row button.cancel {
    background: rgba(0, 0, 0, 0.15);
    font-weight: 300;
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: 0.7rem;
  }
  #wallet_menu .dropdown .single_transaction {
    margin: 0 0 5px 0;
    padding: 6px 25px;
    text-align: left;
    flex-direction: column;
  }
  #wallet_menu .dropdown .single_transaction.win_loss {
    margin: 0;
    padding: 3px 25px 0 25px;
    cursor: default;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
  }
  #wallet_menu .dropdown .single_transaction .status_wrap {
    justify-content: space-between;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
  }
  #wallet_menu .dropdown .single_transaction .status_wrap .status {
    display: flex;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 0.8rem;
  }
  #wallet_menu .dropdown .single_transaction.pending .status {
    opacity: 1;
    display: flex;
  }
  #wallet_menu .dropdown .single_transaction.win_loss .status {
    color: #fff;
    opacity: 1;
    display: flex;
  }
  #wallet_menu .dropdown .single_transaction.pending .status strong {
    padding: 0 0 0 5px;
    font-weight: 600;
  }
  #wallet_menu .dropdown .single_transaction.confirmed .status strong {
    padding: 0 0 0 2px;
    font-weight: 600;
  }
  #wallet_menu .dropdown .single_transaction.pending .status {
    color: #e5c247;
  }
  #wallet_menu .dropdown .single_transaction.pending .status_icon {
    -webkit-mask: url(${landingAssets.pending_icon}) center center/16px 16px no-repeat;
    mask: url(${landingAssets.pending_icon}) center center/16px 16px no-repeat;
    background: #e5c247;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
  }
  #wallet_menu .dropdown .single_transaction.confirmed .status_icon {
    background: url(${landingAssets.check_icon_blue}) center center/16px 16px no-repeat;
    -webkit-mask: none;
    mask: none;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
    position: relative;
  }
  #wallet_menu .dropdown .single_transaction.confirmed .status_icon:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    z-index: -1;
    content: '';
  }
  #wallet_menu .dropdown .single_transaction .status_wrap .timestamp {
    font-size: 0.65rem;
    font-weight: 200;
  }
  #wallet_menu .dropdown .single_transaction .transaction_info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #wallet_menu .dropdown .single_transaction.win_loss .transaction_info {
    width: auto;
  }
  #wallet_menu .dropdown .single_transaction .hash {
    position: relative;
    width: 100%;
    left: 0;
    font-weight: 300;
  }
  #wallet_menu .dropdown .single_transaction .hash a {
    text-decoration: none;
  }
  #wallet_menu .dropdown .single_transaction .hash span {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    opacity: 0.8;
  }
  #wallet_menu .dropdown .single_transaction .hash span:first-child {
    width: 220px;
    text-overflow: ellipsis;
    font-weight: 200;
  }
  #wallet_menu .dropdown .single_transaction .hash .copy_icon {
    -webkit-mask-size: auto 12px;
    -webkit-mask-position: center center;
    mask-size: auto 12px;
    mask-position: center center;
    width: 12px;
    height: 12px;
    margin: 3px 0 0 4px;
  }
  #wallet_menu .dropdown .single_transaction .value {
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 500;
    font-size: 0.8rem;
    white-space: nowrap;
    letter-spacing: -0.01em;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
    line-height: 100%;
  }
  .bottom_links {
    display: flex;
    justify-content: center;
    padding: 10px 10px 0 10px;
    list-style: none;
    flex-direction: column;
    text-align: center;
  }
  .bottom_links li {
    text-align: center;
    justify-content: center;
  }
  .bottom_links button {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    margin: 10px 0 0 0;
    font-size: 0.7rem;
  }
  .bottom_links .denote {
    font-size: 0.7rem;
    padding: 0 20px;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/nav.css */
  nav .yolo_icon {
    -webkit-mask: url(${landingAssets.yolorekt_moon_white}) center center / 34px 34px no-repeat;
    mask: url(${landingAssets.yolorekt_moon_white}) center center / 34px 34px no-repeat;
    background: rgba(255, 255, 255, 1);
    width: 34px;
    height: 34px !important;
  }
  .right {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
  }
  nav {
    display: flex;
    flex-direction: row;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 20px;
    background: rgba(25, 30, 39, 1);
    background: rgba(25, 30, 39, 0.4);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    -webkit-transition: all ease-out 0.5s;
    -moz-transition: all ease-out 0.5s;
    -o-transition: all ease-out 0.5s;
    transition: all ease-out 0.5s;
    flex-wrap: wrap;
    z-index: 3;
    width: 100%;
  }
  .modal_window_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 15px;
    position: relative;
  }
  .modal_window_wrapper:before {
    position: absolute;
    top: 50%;
    left: calc(50% - 2vw);
    transform: translate(-50%, -50%);
    -webkit-filter: blur(200px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: 15px;
  }
  .network_area,
  .network_type {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    display: none;
  }
  .network_type {
    padding: 0 10px;
    height: 34px;
    cursor: pointer;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    text-decoration: none;
  }
  .network_type.polygon {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .polygon_network .network_type {
    background: rgba(19, 24, 31, 1);
    border: 1px solid rgba(91, 47, 169, 1);
  }
  .polygon_network .network_type .icon {
    -webkit-mask: url(${landingAssets.polygon_icon}) left center / auto 12px no-repeat;
    mask: url(${landingAssets.polygon_icon}) left center / auto 12px no-repeat;
    background: #9a71e4;
    width: 14px;
    height: 14px;
    margin: 0;
  }
  .network_type:hover {
    -webkit-filter: brightness(1.5);
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/account.css */
  #account_menu {
    display: flex;
    position: relative;
    margin: 0 5px 0 15px;
  }
  #account_menu .dropdown * {
    display: flex;
  }
  #account_menu .dropdown {
    position: relative;
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  #account_menu .dropdown menu {
    position: relative;
    margin: 0 0 0 0;
    padding: 20px 0;
    width: var(--wallet-dropdown-width);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    background: var(--dropdown-background);
    border-radius: 10px;
    list-style: none;
    color: var(--dropdown-color);
    -webkit-backdrop-filter: var(--dropdown-backdrop-filter);
    backdrop-filter: var(--dropdown-backdrop-filter);
    display: flex;
    flex-direction: column;
    cursor: default;
    justify-content: center;
    width: var(--dropdown-width);
    -webkit-box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
    box-shadow: 0 0 45px 20px rgba(33, 38, 47, 40%);
  }
  #account_menu .dropdown menu:after {
    content: '';
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(80px);
    filter: blur(80px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .window_account {
    flex-direction: column;
  }
  .window_user-id {
    padding: 0;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
    width: 100%;
  }
  #account_menu .window_user-id {
    padding: 0 20px;
  }
  .window_user-id input {
    padding: 8px 15px;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
    width: 100%;
    font-size: 0.8rem;
    color: #000;
    line-height: 100%;
  }
  #account_menu .window_user-id input {
    margin: 0 0 0 10px;
  }
  .window_user-id button.save {
    margin: 0;
    background: #1d4baf;
    padding: 6px 15px;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 0.8rem;
  }
  .window_user-id button.save:hover {
    background: rgb(42, 109, 255);
  }
  .window_user-id button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .nft_level * {
    display: flex;
  }
  .nft_level {
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 0 0 0;
    margin: 20px 0 10px 0;
    flex-direction: column;
  }
  .nft_level .nft_row {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
  .nft_level .nft_row:first-child {
    padding-bottom: 8px;
  }
  .nft_level .nft_row:last-child {
    padding: 0 0 8px 0;
  }
  .nft_level.emerald .nft_row:last-child {
    background: #13aa09;
  }
  #account_menu .nft_icon {
    background-position: left center;
    background-size: auto 32px;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
  }
  #account_menu .nft_level .nft_icon {
    background-position: left center;
    background-size: auto 52px;
    background-repeat: no-repeat;
    width: 58px;
    height: 58px;
  }
  .nft_level .nft_details_wrap {
    flex-direction: column;
    justify-content: center;
    margin: 0 0 0 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: calc(100% - 42px);
  }
  .nft_level .nft_details_wrap {
    border-bottom: 0;
  }
  .nft_level .nft_details_wrap .nft_title {
    font-size: 0.9rem;
    font-weight: 700;
  }
  .nft_level .empty {
    width: 0;
  }
  .nft_level .feature {
    flex-direction: column;
    align-items: center;
    padding: 8px 0 0 0;
    font-size: 0.7rem;
    width: 33.3%;
  }
  .nft_level .feature {
    font-size: 0.8rem;
    width: 50%;
  }
  .nft_level .feature .title {
    justify-content: center;
  }
  .nft_level .feature .title {
    font-weight: 600;
  }
  .nft_level .feature .value {
    font-size: 0.9rem;
  }
  .nft_level .feature .value {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .nft_level.emerald .nft_title,
  .nft_level.emerald .value {
    color: #24f019;
    font-size: 1rem;
    line-height: 140%;
  }
  .nft_level.emerald .value {
    color: #24f019;
  }
  .nft_level .nft_details_wrap .nft_description {
    font-size: 0.7rem;
    opacity: 0.6;
    padding: 6px 0 6px 0;
    text-align: left;
  }
  .bidder_stats_wrapper {
    width: 100%;
    flex-direction: row;
  }
  .bidder_stats_wrapper .section {
    width: 33.3%;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
  }
  .bidder_stats_wrapper .section {
    width: 50%;
    font-size: 0.8rem;
  }
  .bidder_stats_wrapper .section:last-child {
    border: 0;
  }
  .bidder_stats_wrapper .section .title {
    justify-content: center;
  }
  .bidder_stats_wrapper .section .value {
    font-weight: 700;
    font-size: 0.9rem;
  }
  .bottom_links {
    display: flex;
    justify-content: center;
    padding: 10px 10px 0 10px;
    list-style: none;
    flex-direction: column;
    text-align: center;
  }
  .bottom_links li {
    text-align: center;
    justify-content: center;
  }
  .bottom_links button.dashboard {
    border-radius: 10px;
    padding: 8px 14px;
    line-height: 100%;
    margin: 10px 0 0 0;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 30px 0px rgba(0, 0, 0, 0.2);
  }
  .bottom_links.emerald button.dashboard {
    background: #13aa09;
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/res.css */
  @media (max-width: 980px) {
    h1 {
      font-size: calc(5.2vw + 40%);
    }
    #main .content {
      padding-left: 30px;
      padding-right: 30px;
    }
    #level_2 .bidding_feature_callouts .callout {
      width: 140px;
      font-size: 0.8rem;
    }
    #level_2 .bidding_feature_callouts .one {
      top: -5px;
      left: calc(50% - 270px);
    }
    #level_2 .bidding_feature_callouts .two {
      left: calc(50% - 270px);
    }
    #level_2 .bidding_feature_callouts .three {
      top: -5px;
      right: calc(50% - 410px);
    }
    #level_2 .bidding_feature_callouts .four {
      right: calc(50% - 410px);
    }
    #level_4 .stats_feature_callouts .callout {
      width: 140px;
      font-size: 0.8rem;
    }
    #level_4 .stats_feature_callouts .one {
      left: calc(50% - 305px);
    }
    #level_4 .stats_feature_callouts .two {
      left: calc(50% - 305px);
    }
    #level_4 .stats_feature_callouts .three {
      right: calc(50% - 446px);
    }
    #level_4 .stats_feature_callouts .four {
      right: calc(50% - 446px);
    }
    #level_4.wallet .content {
      flex-flow: column;
    }
    #level_4.wallet .content .features_wrapper {
      width: 100%;
      margin: 0;
    }
    #level_4.wallet .content .features_wrapper:nth-child(2) {
      margin-top: 40px;
    }
    #wallet_menu {
      border: 0;
      left: 0;
    }
    #wallet_menu .dropdown menu {
      position: relative;
      left: auto;
      transform: none;
    }
    #stats {
      width: 440px;
    }
    #level_7 .screenshots {
      flex-flow: column;
      margin: 15px 0 0 0;
      align-items: center;
    }
    #level_7 .screenshots .bidders_ss,
    #level_7 .screenshots .liquidity_ss {
      width: 80%;
      margin: 0 5px;
    }
    #level_7 .screenshots .liquidity_ss {
      margin-top: 15px;
    }
    #level_7 .screenshots .bidders_ss img,
    #level_7 .screenshots .liquidity_ss img {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    #main {
      padding: 45px 0 0 0;
    }
    h1 {
      font-size: calc(8.5vw + 10%);
      letter-spacing: -0.5vw;
      padding-bottom: 15px;
    }
    h1 span {
      line-height: 110%;
    }
    h1 span.white {
      display: block;
    }
    h2 {
      font-size: 1.1rem;
    }
    .bidding_feature_callouts,
    .stats_feature_callouts {
      zoom: 1;
    }
    #level_2 .bidding_feature {
      margin-top: 140px;
      margin-bottom: 60px;
    }
    #level_2 .bidding_feature_callouts .callout {
      width: 150px;
      line-height: 140%;
      font-size: 0.8rem;
      padding: 0;
    }
    #level_2 .bidding_feature_callouts .one {
      left: calc(50% - 90px);
      bottom: 390px;
      top: auto;
      text-align: center;
    }
    #level_2 .bidding_feature_callouts .callout.one .callout_arrow {
      transform: translate(-50%, 0) rotate(180deg);
      left: 50%;
      top: auto;
      bottom: -20px;
    }
    #level_2 .bidding_feature_callouts .two {
      left: calc(50% - 90px);
      bottom: auto;
      top: 390px;
      text-align: center;
    }
    #level_2 .bidding_feature_callouts .callout.two .callout_arrow {
      transform: translate(-50%, 0) rotate(0deg);
      left: 50%;
      top: -20px;
    }
    #level_2 .bidding_feature_callouts .three {
      right: calc(50% - 240px);
      bottom: 390px;
      top: auto;
      text-align: center;
    }
    #level_2 .bidding_feature_callouts .callout.three .callout_arrow {
      transform: translate(-50%, 0) rotate(180deg);
      left: 50%;
      top: auto;
      bottom: -20px;
    }
    #level_2 .bidding_feature_callouts .four {
      right: calc(50% - 240px);
      top: 390px;
      bottom: auto;
      text-align: center;
    }
    #level_2 .bidding_feature_callouts .callout.four .callout_arrow {
      transform: translate(-50%, 0) rotate(0deg);
      left: 50%;
      top: -20px;
    }
    #level_2 .content h4,
    #level_3 .content h4,
    #level_4 .content h4,
    #level_7 .content h4,
    #level_5 .content h4,
    #level_6 .content h4 {
      width: 95%;
    }
    #level_2 .content {
      width: 100vw;
      padding: 0 0 100px 0;
    }
    #level_2 .app_experiences h5 {
      font-size: 1.2rem;
    }
    #level_2 .app_experiences .tpe img {
      max-width: auto;
      width: 80%;
    }
    #level_2 .app_experiences .tme img {
      max-width: auto;
      width: 80%;
    }
    #level_3 #chat {
      zoom: 1.1;
    }
    #level_3 .content.shading {
      padding: 240px 0 60px 0;
    }
    #level_3 .content h4 {
      margin-top: -180px;
      transform: translate(-50%, 0);
      padding: 0 30px 40px 30px;
      text-shadow: none;
      width: 100%;
      position: relative;
    }
    #chat .message {
      max-width: 280px;
    }
    #chat .column_2 .message {
      margin: 0 10px 0 0;
    }
    #chat .column_1 .message {
      margin: 0 0 0 10px;
    }
    #stats {
      width: 370px;
    }
    #level_4 .stats_feature_callouts .callout {
      width: 120px;
    }
    #level_4 .stats_feature_callouts .one {
      left: calc(50% - 260px);
    }
    #level_4 .stats_feature_callouts .two {
      left: calc(50% - 260px);
    }
    #level_4 .stats_feature_callouts .three {
      right: calc(50% - 380px);
    }
    #level_4 .stats_feature_callouts .four {
      right: calc(50% - 380px);
    }
    #level_7 .screenshots .bidders_ss,
    #level_7 .screenshots .liquidity_ss {
      width: 90%;
    }
  }
  @media (max-width: 600px) {
    #main {
      padding: 45px 0 0 0;
    }
    #main #yolorekt-logo-home {
      min-width: 200px;
      width: 46vw;
      margin: 0 0 20px 0;
    }
    h2 {
      font-size: 0.9rem;
      padding-left: 0;
      padding-right: 0;
    }
    #level_4 .content {
      padding: 60px 30px;
    }
    #level_4 .stats_feature {
      margin: 30px 0 0 0;
    }
    .stats_feature_callouts {
      display: none;
    }
    .transaction_list .transaction_list_overflow {
      max-height: 135px;
    }
    #level_7 .screenshots .bidders_ss,
    #level_7 .screenshots .liquidity_ss {
      width: 95%;
    }
  }
  @media (max-width: 480px) {
    #main {
      padding: 25px 0 0 0;
    }
    #main .content {
      padding-left: 20px;
      padding-right: 20px;
    }
    #main .main_cta_area {
      zoom: 0.9;
      flex-flow: column;
    }
    #main .main_cta_area .btn-liquid {
      margin-right: 0;
    }
    #main #yolorekt-logo-home {
      margin: 0 0 10px 0;
      min-width: 180px;
    }
    #games_browser {
      margin: 15px 0 0 0;
      zoom: 0.8;
    }
    .bidding_feature_callouts,
    .stats_feature_callouts {
      display: none;
    }
    #games_browser .games_tiles_wrapper .games_row {
      margin-left: -220px;
    }
    #level_3 .content.shading {
      padding: 210px 0 30px 0;
    }
    #level_3 .content h4 {
      padding-bottom: 15px;
    }
    #level_4 .content,
    #level_4.wallet .content,
    #level_7 .content,
    /* #level_5 .content.shading, */
    #level_6 .content.shading {
      padding: 30px;
    }
    #level_5 {
      padding: 30px 0 15px 0;
    }
    #level_5 .content.shading {
      width: 100%;
    }
    #level_5 .content.shading form {
      width: 100%;
    }
    /* #level_6 .content.shading {
      padding: 30px 30px 10px 30px;
    } */
    #level_2 .content h4,
    #level_3 .content h4,
    #level_4 .content h4,
    #level_7 .content h4,
    #level_5 .content h4,
    #level_6 .content h4 {
      font-size: 1.4rem;
      line-height: 130%;
      text-align: center;
      padding: 5px 0 10px 0;
    }
    #level_2 .content {
      padding: 0 30px 0 30px;
    }
    #level_2 .app_experiences h5 {
      font-size: 1rem;
    }
    #level_7 .content p {
      font-size: 0.9rem;
      line-height: 150%;
    }
    #level_2 .live_area {
      margin: 30px 0 135px 0;
      padding-bottom: 40px;
      padding-left: 30px;
      padding-right: 30px;
    }
    #level_2 .live_area .game_type.live {
      zoom: 0.8;
    }
    #level_2 .bidding_feature {
      margin: 140px 0 60px 0;
      margin: 20px 0 40px 0;
    }
    #stats {
      max-height: 800px;
    }
    #level_4 .stats_feature {
      margin: 15px 0 0 0;
    }
    #level_4.wallet .content .features_wrapper p {
      font-size: 0.9rem;
      width: 100vw;
      padding: 10px 30px 15px 30px;
      line-height: 150%;
    }
    .place_bid-wrapper {
      zoom: 0.9;
    }
    #level_3 #chat {
      zoom: 0.9;
    }
    #level_7 .screenshots .bidders_ss,
    #level_7 .screenshots .liquidity_ss {
      width: 95%;
    }
    #level_4 #stats {
      max-height: 785px;
      zoom: 0.9;
    }
    #wallet_menu .dropdown menu,
    #account_menu .dropdown menu,
    .wallet .nft_feature {
      zoom: 0.9;
    }
    /* #level_6 ul {
      zoom: 0.85;
    } */
    #level_6 ul li {
      padding: 0;
    }
    #level_6 ul li a span {
      visibility: hidden;
      opacity: 0;
    }
    #level_6 ul li .logo {
      height: 60px;
    }
  }
  /*! CSS Used keyframes */
  @keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }
  @-webkit-keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }
  @-webkit-keyframes scale-up-center {
    0% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes scale-up-center {
    0% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes h1_fade {
    100% {
      transform: scale(1);
    }
  }
  @keyframes h1_fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
  @keyframes steam {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
  @keyframes particle-animation-1 {
    100% {
      transform: translate3d(28vw, 62vh, 42px);
    }
  }
  @keyframes particle-animation-2 {
    100% {
      transform: translate3d(37vw, 81vh, 57px);
    }
  }
  @keyframes particle-animation-3 {
    100% {
      transform: translate3d(43vw, 90vh, 46px);
    }
  }
  @keyframes particle-animation-4 {
    100% {
      transform: translate3d(82vw, 34vh, 13px);
    }
  }
  @keyframes particle-animation-5 {
    100% {
      transform: translate3d(54vw, 38vh, 13px);
    }
  }
  @keyframes particle-animation-6 {
    100% {
      transform: translate3d(57vw, 75vh, 52px);
    }
  }
  @keyframes particle-animation-7 {
    100% {
      transform: translate3d(76vw, 43vh, 48px);
    }
  }
  @keyframes particle-animation-8 {
    100% {
      transform: translate3d(21vw, 18vh, 12px);
    }
  }
  @keyframes particle-animation-9 {
    100% {
      transform: translate3d(67vw, 25vh, 99px);
    }
  }
  @keyframes particle-animation-10 {
    100% {
      transform: translate3d(1vw, 50vh, 9px);
    }
  }
  @keyframes particle-animation-11 {
    100% {
      transform: translate3d(81vw, 22vh, 33px);
    }
  }
  @keyframes particle-animation-12 {
    100% {
      transform: translate3d(82vw, 2vh, 47px);
    }
  }
  @keyframes particle-animation-13 {
    100% {
      transform: translate3d(81vw, 88vh, 56px);
    }
  }
  @keyframes particle-animation-14 {
    100% {
      transform: translate3d(38vw, 68vh, 49px);
    }
  }
  @keyframes particle-animation-15 {
    100% {
      transform: translate3d(60vw, 24vh, 11px);
    }
  }
  @keyframes particle-animation-16 {
    100% {
      transform: translate3d(44vw, 55vh, 86px);
    }
  }
  @keyframes particle-animation-17 {
    100% {
      transform: translate3d(33vw, 74vh, 40px);
    }
  }
  @keyframes particle-animation-18 {
    100% {
      transform: translate3d(10vw, 38vh, 16px);
    }
  }
  @keyframes particle-animation-19 {
    100% {
      transform: translate3d(28vw, 58vh, 20px);
    }
  }
  @keyframes particle-animation-20 {
    100% {
      transform: translate3d(69vw, 76vh, 28px);
    }
  }
  @keyframes particle-animation-21 {
    100% {
      transform: translate3d(68vw, 40vh, 60px);
    }
  }
  @keyframes particle-animation-22 {
    100% {
      transform: translate3d(46vw, 9vh, 95px);
    }
  }
  @keyframes particle-animation-23 {
    100% {
      transform: translate3d(32vw, 61vh, 36px);
    }
  }
  @keyframes particle-animation-24 {
    100% {
      transform: translate3d(27vw, 54vh, 19px);
    }
  }
  @keyframes particle-animation-25 {
    100% {
      transform: translate3d(26vw, 61vh, 61px);
    }
  }
  @keyframes particle-animation-26 {
    100% {
      transform: translate3d(14vw, 9vh, 84px);
    }
  }
  @keyframes particle-animation-27 {
    100% {
      transform: translate3d(78vw, 83vh, 66px);
    }
  }
  @keyframes particle-animation-28 {
    100% {
      transform: translate3d(56vw, 4vh, 35px);
    }
  }
  @keyframes particle-animation-29 {
    100% {
      transform: translate3d(34vw, 8vh, 35px);
    }
  }
  @keyframes particle-animation-30 {
    100% {
      transform: translate3d(80vw, 15vh, 75px);
    }
  }
  @-webkit-keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(-170px);
      transform: translateX(-170px);
    }
  }
  @keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(-170px);
      transform: translateX(-170px);
    }
  }
  @keyframes pulse {
    50% {
      border-color: rgba(42, 109, 255, 0.8);
      box-shadow: rgb(42 109 255 / 90%) 0px 1px 19px 0px;
      opacity: 1;
    }
  }

  /*! CSS Used fontfaces */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  #immunefi_bug_bounty {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    margin: 0 auto;
  }
  #immunefi_bug_bounty a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px 60px;
  }
  #immunefi_bug_bounty a:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  #immunefi_bug_bounty .immunefi_logo {
    margin: 4px 0 0 0;
  }
  #immunefi_bug_bounty .immunefi_logo img {
    width: 160px;
  }
  #immunefi_bug_bounty .plus {
    font-size: 2.1rem;
    font-weight: 800;
    line-height: 100%;
    padding: 0 15px;
    margin: -2px 0 0 0;
  }
  #immunefi_bug_bounty .yolo_bug_bounty_text {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -.03em;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    #immunefi_bug_bounty a {
      flex-flow: column;
    }
    #immunefi_bug_bounty .plus {
      margin: -6px 0 0 0;
    }
  }
  ${walletSectionCSS}
  ${accountSectionCSS}
`
