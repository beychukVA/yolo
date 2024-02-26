import styled, { css } from 'styled-components'
import { images } from 'common'

const contentCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/styles.css */
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
  ul,
  li {
    list-style: none;
  }
  #default-page .content {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 60px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 30px;
    position: relative;
  }
  #default-page h1 {
    font-size: 2rem;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 100%;
    padding: 0 0 5px 0;
  }
  #default-page h2 {
    font-size: 0.9rem;
    font-weight: 300;
  }
  #default-page h2 strong {
    font-weight: 600;
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
  #main {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 0 0 0;
    flex: 1 1 auto;
    z-index: 2;
    overflow-y: hidden;
  }
  .content {
    height: calc(100% + 15px);
    height: 100%;
    transition: width 300ms ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: #443875;
    padding: 15px 0 0 0;
    overflow: hidden;
  }
  .panel {
    background: rgba(0, 0, 0, 0.1);
    float: left;
    width: 20%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .dashboard_sort_menu {
    border-radius: 10px;
    margin: 0 0 0 5px;
    position: relative;
  }
  .triangle.up {
    -webkit-mask: url('http://yolo.tino.me/game-omega-staging/resources/images/arrow_up.svg') no-repeat;
  }
  .triangle.up.white {
    width: 10px;
    height: 10px;
    -webkit-mask: url('http://yolo.tino.me/game-omega-staging/resources/images/arrow_up.svg') no-repeat;
    -webkit-mask-size: 10px 10px;
    background: rgba(255, 255, 255, 1);
  }
  .triangle.button.white {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 6px;
  }
  .banner-container {
    width: 150px;
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
  }
  .banner {
    width: 230px;
    padding: 15px;
    background-color: #222;
    color: #fff;
    font-size: 0.9rem;
    text-align: center;
    transform: rotate(45deg) translate(4%, 80%);
    text-transform: uppercase;
    box-shadow: 0px 5px 5px rgb(0 0 0 / 20%);
  }
  .banner.active {
    width: 230px;
    padding: 15px;
    background-color: #2159d1;
    color: #fff;
    font-size: 0.9rem;
    text-align: center;
    transform: rotate(45deg) translate(4%, 80%);
    text-transform: uppercase;
    box-shadow: 0px 5px 5px rgb(0 0 0 / 20%);
  }
  .dashboard_menus_wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 15px 0;
  }
  .dashboard_sort_menu {
    border-radius: 10px;
    margin: 0 0 0 5px;
  }
  .dashboard_sort_menu select {
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    z-index: 1;
    outline: none;
    color: #fff;
    position: relative;
    padding: 6px 30px 6px 15px;
    border-radius: 10px;
  }
  .dashboard_sort_menu .select {
    display: grid;
    grid-template-areas: 'select';
    align-items: center;
    position: relative;
    border-radius: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    margin: 0 0 0 0;
    justify-content: flex-start;
  }
  .dashboard_sort_menu .select select,
  .dashboard_sort_menu .select::after {
    grid-area: select;
  }
  .dashboard_startend_menu {
    padding: 8px 10px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    margin: 0 0 0 5px;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
  }
  .dashboard_startend_menu .sort_icon {
    width: 12px;
    height: 8px;
    -webkit-mask: url('http://yolo.tino.me/game-omega-staging/resources/images/arrow_expand_icon.svg') center center /
      auto 8px no-repeat;
    background: #fff;
  }
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/dashboard.css */
  .triangle.up.white {
    width: 10px;
    height: 10px;
    -webkit-mask: url('http://yolo.tino.me/game-omega-staging/resources/images/arrow_up.svg') no-repeat;
    -webkit-mask-size: 10px 10px;
    background: rgba(255, 255, 255, 1);
  }
  .triangle.button.white {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 6px;
  }
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/res.css */
  @media (max-width: 1200px) {
    .content {
      height: 100%;
      padding: 15px 0 0 0;
      justify-content: flex-start;
    }
  }
  @media (max-width: 600px) {
    #default-page .content {
      padding: 30px;
    }
  }
  @media (max-width: 480px) {
    #main {
      padding: 50px 0 0 0;
    }
    .content {
      padding: 8px 0 0 0;
    }
    #default-page h1 {
      font-size: 1.7rem;
    }
    #default-page h2 {
      font-size: 0.8rem;
    }
    #default-page .content {
      padding: 30px;
    }
  }
`
const contestCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/compete.css */
  .contests_wrapper {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    width: 100vw;
    margin: 30px 0 0 -60px;
    padding: 60px;
  }
  .contests_wrapper .title {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    margin: 30px 0 3px 0;
    line-height: 100%;
  }
  .hottest_contests_wrapper {
    width: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    margin: 20px 0 0 0;
  }
  .hottest_contests_wrapper .contest_box {
    width: 100%;
    min-width: 360px;
    text-align: left;
    justify-content: flex-start;
    align-items: left;
    display: flex;
    flex-flow: column;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgb(25, 30, 39);
    border-radius: 10px;
    margin: 0 20px 20px 0;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 30px 40px 0 40px;
    position: relative;
    max-height: 400px;
  }
  .hottest_contests_wrapper .contest_box.x2_deposit_bonus {
    background-image: url(${images.twoX_deposit_bonus});
  }
  .hottest_contests_wrapper .contest_box.contest_1 {
    background-image: url(${images.three_row_contest_bg});
  }
  .hottest_contests_wrapper .contest_box.contest_2 {
    background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/contests/contest_2_bg.jpg');
  }
  .hottest_contests_wrapper .contest_box.contest_3 {
    background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/contests/contest_3_bg.jpg');
  }
  .contests_wrapper .contest_content_overflow {
    overflow-y: auto;
    padding: 0 20px 80px 0;
  }
  .contests_wrapper .contest_kind {
    font-size: 1.8rem;
    font-weight: 200;
    margin: 0 0 15px 0;
  }
  .contests_wrapper .contest_title {
    font-size: 1.3rem;
    font-weight: 700;
  }
  .contests_wrapper .contest_section_title {
    font-size: 1rem;
    font-weight: 600;
  }
  .contests_wrapper .contest_section_detail {
    margin: 0 0 10px 0;
  }
  .contests_wrapper .contest_section_detail.large {
    font-size: 1rem;
    font-weight: 600;
  }
  .contests_wrapper .contest_section_detail strong {
    font-weight: 700;
    font-size: 0.9rem;
  }
  .contests_wrapper .contest_prize_list {
    display: flex;
    flex-flow: row;
    margin: 15px 0 0 15px;
  }
  .contests_wrapper .contest_prize_list .prize_levels {
    text-align: right;
    margin: 0 10px 0 0;
  }
  .contests_wrapper .contest_prize_list .rules_list {
    display: flex;
    flex-flow: column;
    margin: 0 0 0 0;
  }
  .contests_wrapper .contest_prize_list li {
    line-height: 150%;
  }
  .contests_wrapper .rules_list li {
    list-style-type: disc;
    margin: 0 0 5px 0;
  }
  .contests_wrapper .contest_prize_list li strong {
    font-weight: 700;
  }
  .contests_wrapper a.contest_conditions_list {
    position: absolute;
    bottom: -1px;
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    width: 100%;
    margin: 0 0 0 -40px;
    padding: 10px 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .contests_wrapper .cta_area {
    position: absolute;
    bottom: -1px;
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    width: 100%;
    margin: 0 0 0 -40px;
    padding: 10px 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
    justify-content: center;
    display: flex;
  }
  .contests_wrapper .cta_area button {
    background: #1d4baf;
    padding: 14px;
    line-height: 100%;
    border-radius: 15px;
    box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  }
`
export const Wrapper = styled.div`
  /* background: radial-gradient(
    circle at -10% -20%,
    #437499,
    #427297,
    #3e6b91,
    #396287,
    #33577c,
    #2c4a6f,
    #263e61,
    #1f3353,
    #1a2a47,
    #16223c,
    #131e36,
    #121c33
  ); */
  ${contentCSS}
  ${contestCSS}
  overflow: auto;
`
