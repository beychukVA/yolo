import styled, { css } from 'styled-components'
import { icons, logos } from 'common'

const designerCss = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/games_panel.css */
  .profile_avatar img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 8px;
  }
  .menu_select {
    width: 18px;
    height: 18px;
    background: hsla(0, 0%, 0%, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
    filter: invert(1);
    border-radius: 3px;
    cursor: pointer;
  }
  .leaderboard_menus {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 10px;
    width: 100%;
  }
  .leaderboard_menus h1 {
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    align-self: center;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */
  .stats_tabs_wrapper .panel {
    display: none;
    animation: fadein 0.8s;
    width: 100%;
    padding: 0;
    background: transparent;
    flex-flow: row;
  }
  .stats_tabs_wrapper #stats_tabs_four:checked ~ .panels #four-panel {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .table_wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 15px 0 0 0;
    height: calc(35vh - 70px);
  }
  #four-panel .table_wrapper {
    height: calc(35vh - 120px);
  }
  .table_wrapper .grid-body.rankings_iw {
    display: grid;
    grid-template-columns: 0.15fr 2fr 0.25fr;
    overflow: auto;
    width: 100%;
  }
  .table_wrapper .grid-header {
    display: contents;
  }
  .table_wrapper .grid-content {
    display: contents;
  }
  .table_wrapper .grid-body label {
    padding: 12px 6px 10px 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.8rem;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 500;
    opacity: 1;
  }
  .table_wrapper .grid-header label {
    position: sticky;
    top: 0%;
    font-size: 0.75rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    border-top: 1px solid transparent;
    cursor: pointer;
    color: hsl(214, 5%, 30%);
    font-weight: 600;
    background: hsl(223, 17%, 8%);
    z-index: 1;
    opacity: 1;
  }
  .table_wrapper .grid-header label:hover {
    border-top: 1px solid hsla(221, 73%, 47%, 0.5);
    color: hsl(214, 5%, 80%);
  }
  .table_wrapper .grid-content label {
    z-index: 0;
    position: relative;
    min-height: 45px;
  }
  .table_wrapper .grid-body label.rank {
    padding-left: 30px;
  }
  .table_wrapper .grid-body label.leader {
    color: #ffcb29;
  }
  .table_wrapper .grid-body .rank_1_icon {
    background: url(${icons.rank_1_icon}) center center / auto 15px no-repeat;
    width: 15px;
    height: 15px;
    margin: 0 0 0 5px;
  }
  .table_wrapper .grid-body.rankings_iw label.pandl {
    padding-right: 30px;
  }
  .table_wrapper .grid-content label.bidder {
    font-weight: 700;
  }
  .table_wrapper .grid-content label.pandl.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.pandl.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-header label .menu_select {
    width: 17px;
    height: 17px;
    background: hsla(0, 0%, 0%, 0.2) url(${icons.arrow_up}) center 3px / auto 10px no-repeat;
    filter: invert(1) brightness(0.4);
    margin: 0 0 0 6px;
  }
  .table_wrapper .grid-header label:hover .menu_select {
    filter: invert(1) brightness(1);
  }
  .table_wrapper .profile_avatar {
    margin: 0 5px 0 0;
    display: flex;
  }
  .table_wrapper .profile_avatar img {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  .leaderboard_menus {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 30px;
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
    width: 130px;
    border-radius: 5px;
  }
  .filter_by_time .select-box__current {
    position: relative;
    cursor: pointer;
    height: 30px;
    width: 130px;
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
    right: 15px;
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
  .filter_by_time li:nth-child(3) .select-box__option {
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
const developerCSS = css``

export const RankingCss = styled.div`
  ${designerCss}
  ${developerCSS}
`
