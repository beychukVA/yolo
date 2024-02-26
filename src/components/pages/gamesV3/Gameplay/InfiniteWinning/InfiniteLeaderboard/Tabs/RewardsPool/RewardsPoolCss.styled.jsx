import styled, { css } from 'styled-components'
import { icons, logos } from 'common'

const designerCss = css`
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
  ul,
  li {
    list-style: none;
  }
  .asset .asset_icon {
    background: url(${({ featuredAsset }) => featuredAsset.icon});
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
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
      background-color: hsla(0, 0%, 100%, 0.5);
      border-radius: 20px;
    }
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  }
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
    background: hsla(0, 0%, 0%, 0.2) url('http://yolo.tino.me/app_v3/resources/images/arrow_up.svg') center 4px / auto
      9px no-repeat;
    filter: invert(1);
    border-radius: 3px;
    cursor: pointer;
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
  .stats_tabs_wrapper #stats_tabs_five:checked ~ .panels #five-panel {
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
    height: calc(35vh - 130px);
  }
  .table_wrapper .grid-body.rewards_iw {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr; // 1fr;
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
    padding: 12px 6px 10px 30px; //6px;
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
  .table_wrapper .grid-header label span {
    color: hsl(214, 5%, 30%);
    font-weight: 600;
    font-size: 0.75rem;
  }
  .table_wrapper .grid-header label:hover {
    border-top: 1px solid hsla(221, 73%, 47%, 0.5);
    color: hsl(214, 5%, 80%);
    color: hsl(0, 0%, 100%);
  }
  .table_wrapper .grid-header label:hover span {
    color: hsl(0, 0%, 100%);
  }
  .table_wrapper .grid-body.rewards_iw .grid-header label.bidder,
  .table_wrapper .grid-body.rewards_iw .grid-content label.bidder {
    padding-left: 30px;
  }
  .table_wrapper .grid-content label {
    z-index: 0;
    position: relative;
    min-height: 45px;
  }
  .table_wrapper .grid-content label.bidder {
    font-weight: 700;
  }
  .table_wrapper .grid-content label.pandl.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.pandl.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-header label .menu_select {
    width: 17px;
    height: 17px;
    background: hsla(0, 0%, 0%, 0.2) url('http://yolo.tino.me/app_v3/resources/images/arrow_up.svg') center 3px / auto
      10px no-repeat;
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
  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .countdown_container * {
    display: flex;
  }
  .countdown_container {
    margin: 0;
    flex-flow: column;
    align-items: center;
    display: flex;
    width: 100%;
  }
  #countdown li {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
  }
  #countdown .timenumbers {
    font-size: 1.1rem;
    line-height: 0;
    padding: 15px 10px;
    background: hsla(210, 18%, 11%, 1);
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: -0.03em;
    text-align: center;
    justify-content: center;
  }
  .rewards_feature_wrapper {
    width: calc(100% - 60px);
    padding: 5px 5px 5px 10px;
    display: flex;
    margin: 20px 0 0 30px;
    border: 1px solid ${({ theme, featuredAsset }) => theme.utils.addOpacityToHexColor(featuredAsset.color, 30)};
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
  }
  .rewards_feature_wrapper .asset .asset_icon {
    background-size: 22px auto;
    background-position: center center;
    background-repeat: no-repeat;
    width: 22px;
    height: 22px;
  }
  .rewards_feature_wrapper .left,
  .rewards_feature_wrapper .right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .rewards_feature_wrapper .length_dates {
    display: flex;
    white-space: nowrap;
    font-size: 0.75rem;
    margin: 0 10px 0 0;
    font-weight: 600;
  }
  .rewards_feature_wrapper p {
    font-size: 0.8rem;
    margin: 0 0 0 10px;
  }
  .rewards_feature_wrapper p strong {
    font-weight: 600;
  }
  .rewards_feature_wrapper #countdown .timenumbers {
    background: hsla(0, 0%, 100%, 0.1);
    font-size: 1rem;
    padding: 12px 8px;
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
  @media (max-width: 430px) {
    .table_wrapper .grid-header label.bidamount span,
    .table_wrapper .grid-content label.bidamount span {
      display: none;
    }
    .table_wrapper .grid-header label.bidamount .menu_select {
      margin: 0;
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
`
const developerCSS = css``

export const RewardsPoolCss = styled.div`
  ${designerCss}
  ${developerCSS}
`
