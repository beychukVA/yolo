import styled, { css } from 'styled-components'
import { icons, logos } from 'common'

const designerCss = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/games_panel.css */
  .menu_select {
    width: 18px;
    height: 18px;
    background: hsla(0, 0%, 0%, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
    filter: invert(1);
    border-radius: 3px;
    cursor: pointer;
  }

  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */

  .leaderboard_menus {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .leaderboard_menus h1 {
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    align-self: center;
  }
  .filter_by_time {
    position: relative;
    z-index: 2;
    margin: 0 0 0 10px;
  }
  .filter_by_time .select-box {
    position: relative;
    display: block;
    font-size: 0.8rem;
    height: 30px;
    width: 100px;
    border-radius: 5px;
  }
  .filter_by_time .select-box__current {
    position: relative;
    cursor: pointer;
    height: 30px;
    width: 100px;
    border-radius: 5px;
  }
  .filter_by_time .select-box__input-text:hover {
    background: hsl(218, 23%, 25%);
  }
  .filter_by_time .select-box__current:focus + .select-box__list {
    opacity: 1;
    animation-name: none;
  }
  .filter_by_time .select-box__current:focus + .select-box__list .select-box__option {
    cursor: pointer;
  }
  .filter_by_time .select-box__current:focus .menu_select {
    transform: translateY(-50%) rotate(0);
  }
  .filter_by_time .menu_select {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) rotate(180deg);
    width: 20px;
    opacity: 1;
    transition: 0.5s ease;
    /* background: #fff; */
  }
  .filter_by_time .select-box__value {
    display: flex;
  }
  .filter_by_time .select-box__input {
    display: none;
  }
  .filter_by_time .select-box__input:checked + .select-box__input-text {
    display: flex;
    align-items: center;
  }
  .filter_by_time .select-box__input-text {
    display: none;
    width: 130px;
    padding: 0 15px;
    height: 30px;
    background: hsl(218, 23%, 15%);
    border-radius: 5px;
  }
  .filter_by_time .select-box__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;
    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
  .filter_by_time .select-box__option {
    display: block;
    padding: 10px 15px;
    background: hsla(218, 23%, 15%, 0.7);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
  .filter_by_time li:last-child .select-box__option {
    border-radius: 0 0 5px 5px;
  }
  .filter_by_time .select-box__option:hover,
  .filter_by_time .select-box__option:focus {
    background: hsla(221, 16%, 85%, 0.2);
    backdrop-filter: blur(20px);
  }
  @media (max-width: 1200px) {
    .table_wrapper .grid-body label {
      padding: 12px 4px 10px 4px;
    }
  }
  @media (max-width: 800px) {
    .table_wrapper {
      height: calc(35vh - 67px);
    }
  }
  /*! CSS Used keyframes */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes HideList {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }
`
const developerCSS = css`
  .highlight label {
    color: #2159d1 !important;
  }

  .select-box__list {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    /* width: fit-content !important; */
  }
  .select {
    border: 1px solid red;
  }
  .new_badge {
    font-size: 0.65rem;
    background: hsl(219, 68%, 24%);
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-contents: center;
    align-items: center;
    padding: 8px 10px 5px 15px;

    transform: translate(-5px, 0);
  }
`

export const ChartSelectorCss = styled.div`
  position: absolute;
  z-index: 7;
  ${designerCss}
  ${developerCSS}
`
