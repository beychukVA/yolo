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
  .countdown_container * {
    display: flex;
  }
  .countdown_container {
    margin: 0;
    flex-flow: column;
    align-items: center;
    display: flex;
  }
  #countdown li {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
  }
  #countdown .timenumbers {
    font-size: 1rem;
    line-height: 0;
    padding: 15px 10px;
    background: hsla(210, 18%, 11%, 1);
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: -0.03em;
    text-align: center;
    justify-content: center;
  }
  #countdown .timedescription {
    text-transform: capitalize;
    font-size: 0.6rem;
    margin: 5px 0 0 0;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/games_panel.css */
  .games_panel summary.static ul {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 5px 0;
    align-items: flex-start;
    cursor: pointer;
  }
  ul.rewards_pool {
    padding: 0 0 10px 0;
    margin: 0 0 10px 0;
    border-bottom: 1px dotted hsla(0, 0%, 100%, 0.2);
    font-weight: 800;
    align-items: center;
    width: 100%;
  }
  ul.rewards_pool .rewards_pool_details {
    width: 100%;
    padding: 8px 10px 7px 10px;
    display: flex;
    margin: 10px 0;
    background: ${({ theme, featuredAsset }) => theme.utils.addOpacityToHexColor(featuredAsset.color, 10)};

    border-radius: 10px;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.8rem;
    flex-direction: row;
  }
  ul.rewards_pool .rewards_pool_details .asset .asset_icon {
    background-size: 22px auto;
    background-position: center center;
    width: 22px;
    height: 22px;
  }
  ul.rewards_pool .rewards_pool_details p {
    font-size: 0.8rem;
    margin: 0 0 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .countdown_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .countdown_container .length_dates {
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: -10px;
  }
  ul span {
    display: block;
    line-height: 130%;
    font-size: 0.8rem;
  }
  ul.rewards_pool .event_title span {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  li {
    font-weight: 300;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  ul.rewards_pool li {
    width: 100%;
  }
  button.invite-games_panel {
    padding: 8px 14px 7px 14px;
    font-weight: 400;
    background: hsla(0, 0%, 0%, 0.3);
    border: 1px solid hsla(0, 0%, 100%, 0.2);
    font-size: 0.75rem;
    margin: 0 0 0 10px;
    white-space: nowrap;
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
`
const developerCSS = css``

export const WeeklyRewardsCss = styled.div`
  ${designerCss}
  ${developerCSS}
`
