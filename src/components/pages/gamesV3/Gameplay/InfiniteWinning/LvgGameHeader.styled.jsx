import styled, { css } from 'styled-components'
import { icons } from 'common'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/global.css */
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    line-height: 100%;
    font-weight: 400;
    color: #fff;
    transition: all 0.5s;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/games_panel.css */
  .asset_menu {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .asset_name {
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0 15px 0 0;
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

  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/gameplay.css */
  .game_header.iw {
    height: 80px;
    width: 100%;
    margin-top: 20px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .game_header.iw .asset_display {
    background: hsla(0, 0%, 100%, 0.05);
    /* max-width: 180px;
    width: 180px; */
    width: 220px;
    height: fit-content;
    border-radius: 0 10px 10px 0;
    line-height: 100%;
    padding: 10px 20px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .game_header.iw .asset_name {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 1px 0 0 0;
  }
  .game_header.iw .asset_icon {
    height: 18px;
    width: 18px;
    margin: 0 8px 0 0;
  }
  .game_header.iw .current_price_display {
    border-radius: 10px;
    line-height: 100%;
    padding: 14px 18px;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 180px;
  }
  .game_header.iw .current_price_display label {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .game_header.iw .current_price_display .price_direction_icon {
    mask: url(${icons.bid_direction_icon}) center center / auto 18px no-repeat;
    width: 18px;
    height: 18px;
    margin: 0 5px 0 0;
  }
  /* UP */

  .game_header.iw .current_price_display.up {
    background: hsl(158, 29%, 16%);
  }
  .game_header.iw .current_price_display.up label {
    color: hsl(126, 100%, 38%);
  }
  .game_header.iw .current_price_display .price_direction_icon.up {
    background: hsl(126, 100%, 38%);
    transform: rotate(-180deg);
  }

  /* DOWN */

  .game_header.iw .current_price_display.down {
    background: hsl(342, 28%, 16%);
  }
  .game_header.iw .current_price_display.down label {
    color: hsl(340, 88%, 46%);
  }
  .game_header.iw .current_price_display .price_direction_icon.down {
    background: hsl(340, 88%, 46%);
    transform: rotate(0deg);
  }

  /* NEUTRAL */

  .game_header.iw .current_price_display.neutral {
    background: hsl(219, 29%, 15%);
  }
  .game_header.iw .current_price_display.neutral label {
    color: hsl(221, 73%, 47%);
  }
  .game_header.iw .current_price_display .price_direction_icon.neutral {
    background: hsl(221, 73%, 47%);
    -webkit-mask: url('../../resources/images/icons/bid_direction_neutral_icon.svg') center center / auto 22px no-repeat;
    mask: url(${icons.bid_direction_neutral_icon}) center center / auto 22px no-repeat;
    width: 22px;
    height: 22px;
    margin: 0 5px 0 0;
  }

  .game_header.iw .volume_display {
    background: hsla(0, 0%, 100%, 0.05);
    max-width: 180px;
    width: 180px;
    border-radius: 10px 0 0 10px;
    line-height: 100%;
    padding: 10px 20px;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .volume_display label {
    color: #9343e0;
    font-weight: 600;
  }
  .volume_display .icon {
    mask: url(${icons.perpetual_futures_icon}) center center / 16px 16px no-repeat;
    background: #9343e0;
    width: 16px;
    height: 16px;
    margin: 0 8px 0 0;
  }
  .volume_display .live_now {
    background: hsl(221, 73%, 47%);
    background: #fff;
    color: #9343e0;
    border-radius: 5px;
    padding: 3px 6px 2px 6px;
    line-height: 100%;
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 700;
    margin: 0 0 0 5px;
  }

  @media (max-width: 1200px) {
    @media (max-width: 1200px) {
      .game_header.iw {
        height: 80px;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 70px;
      }
      .game_header.iw .current_price_display {
        border-radius: 10px;
        line-height: 100%;
        padding: 14px 18px;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      .game_header.iw .asset_display {
        background: hsla(0, 0%, 100%, 0.05);
        max-width: 180px;
        width: 180px;
        height: fit-content;
        border-radius: 0 10px 10px 0;
        line-height: 100%;
        padding: 10px 15px;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .game_header.iw .asset_display.up {
      }
      .game_header.iw .asset_display.down {
      }
      .game_header.iw .asset_display.neutral {
      }
      .game_header.iw .asset_name {
        font-size: 0.8rem;
      }
      .game_header.iw .volume_display {
        background: hsla(0, 0%, 100%, 0.05);
        max-width: 180px;
        width: 180px;
        border-radius: 10px 0 0 10px;
        line-height: 100%;
        padding: 10px 20px;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }

      .game_header.iw .volume_display label {
        color: #9343e0;
        font-weight: 600;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }

  @media (max-width: 800px) {
    .game_header.iw {
      height: auto;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .game_header.iw .current_price_display {
      border-radius: 0 0 10px 10px;
      padding: 8px 15px;
      order: 2;
      width: 100%;
    }
    .game_header.iw .asset_display {
      border-radius: 0 10px 0 0;
      order: 1;
      width: 50%;
      max-width: 50%;
      padding: 7px 15px;
      min-height: 32px;
    }
    .game_header.iw .asset_display.up {
    }
    .game_header.iw .asset_display.down {
    }
    .game_header.iw .asset_display.neutral {
    }
    .game_header.iw .asset_name {
      font-size: 0.8rem;
    }
    .game_header.iw .volume_display {
      border-radius: 10px 0 0 0;
      border-right: 1px solid hsla(0, 0%, 100%, 0.2);
      padding: 7px 15px;
      order: 1;
      width: 50%;
      max-width: 50%;
      min-height: 32px;
    }

    .game_header.iw .volume_display label {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 600px) {
    .game_header.iw {
      flex-direction: column;
      width: 100%;
    }
    .game_header.iw .current_price_display {
      border-radius: 0 0 10px 10px;
      order: 3;
      width: 100%;
    }
    .game_header.iw .asset_display {
      border-radius: 0;
      order: 2;
      width: 100%;
      max-width: 100%;
    }
    .game_header.iw .asset_display.up {
    }
    .game_header.iw .asset_display.down {
    }
    .game_header.iw .asset_display.neutral {
    }
    .game_header.iw .asset_name {
      font-size: 0.8rem;
    }
    .game_header.iw .volume_display {
      border-radius: 10px 10px 0 0;
      order: 1;
      width: 100%;
      max-width: 100%;
      border-right: 0;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    }

    .game_header.iw .volume_display label {
      font-size: 0.75rem;
    }
  }
`
const devCSS = css``

export const LvgGameHeaderStyled = styled.div`
  @media (max-width: 600px) {
    width: 100%;
  }
  ${designerCSS}
  ${devCSS}
`
