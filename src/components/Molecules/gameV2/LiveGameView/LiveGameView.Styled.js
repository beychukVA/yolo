import { icons } from 'common'

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
  .asset_row.eth .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/eth_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/gameplay_top.css */
  .asset_row {
    padding: 0;
    margin: 0;
    border-bottom: 0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    width: 100%;
    display: flex;
  }
  .game_type_wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .round_length.live {
    flex-flow: row;
    display: flex;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 100%;
    justify-content: flex-end;
    align-items: center;
    border-radius: 10px;
    padding: 10px 18px 10px 8px;
    margin-left: -10px;
    line-height: 100%;
    border-right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 45px;
    min-width: 85px;
  }
  .game_asset.live {
    flex-flow: row;
    display: flex;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 100%;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 10px 22px 10px 12px;
    margin-right: -10px;
    line-height: 100%;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 45px;
    min-width: 85px;
  }
  .game_asset.live .asset_icon {
    background-position: center center;
    background-size: auto 20px;
    background-repeat: no-repeat;
    height: 20px;
    width: 20px;
    margin: 0 5px 0 0;
  }
  .game_asset.live.matic,
  .round_length.live.matic {
    background: rgba(130, 71, 229, 0.3);
  }
  .game_asset.live.matic .asset_icon {
    background-image: url('http://yolo.tino.me/game/resources/images/currencies/matic_currency.svg');
  }
  .game_type.live {
    background: #1f2531;
  }
  .game_type.live:before,
  .game_type.live:after {
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
  .game_type {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
    justify-content: center;
    position: relative;
    background: #1f2531;
    border-radius: 10px;
    padding: 26px 14px 24px 14px;
    line-height: 0;
    margin: 0;
    z-index: 1;
    letter-spacing: -0.02em;
  }
  .game_type:before,
  .game_type:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
  }
  @media (max-width: 600px) {
    .game_asset.live {
      font-size: 0.8rem;
      padding: 4px 20px 2px 10px;
      height: 35px;
    }
    .game_asset.live .asset_icon {
      background-size: auto 16px;
      height: 16px;
      width: 16px;
      margin: 0 5px 0 0;
    }
    .game_type {
      font-size: 1.3rem;
      letter-spacing: 0;
      padding: 20px 12px 20px 12px;
    }
    .round_length.live {
      font-size: 0.8rem;
      padding: 4px 12px 2px 12px;
      margin-left: -10px;
      height: 35px;
    }
  }
`

const developerCSS = css`
  .game_asset.live,
  .round_length.live {
    background: ${({ tokenColor, theme }) => theme.utils.addOpacityToHexColor(tokenColor, 30)};
  }
`
export const LiveGameViewStyled = styled.div`
  ${designerCSS}
  ${developerCSS}
`
