import styled, { css } from 'styled-components'

const designerCSS = css`
  ! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css
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

  ul,
  li {
    list-style: none;
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
  .asset_row .asset_name {
    text-align: left;
    margin: 0 5px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 80px;
    text-overflow: ellipsis;
  }
  .asset_row .asset_current_price {
    text-align: right;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .asset_row .asset_current_price strong {
    margin: 0 5px 0 0;
  }
  .gametime {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
  }
  .gametime .game_block_value {
    font-weight: 700;
    line-height: 100%;
    font-size: 0.75rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .asset_row.eth .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/eth_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  .asset_row.tesla .asset_icon {
    background: #e82127 url('http://yolo.tino.me/game/resources/images/tesla_icon.svg') center center / auto 22px
      no-repeat;
    width: 22px;
    height: 22px;
  }
  .asset_row.tesla .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/tesla_icon.svg') center center / auto 22px no-repeat;
    width: 22px;
    height: 22px;
  }
  .asset_row.bitcoin .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/bitcoin_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  .asset_row.dogecoin .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/dogecoin_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  .asset_row.matic .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/currencies/matic_currency.svg') center center / auto 22px
      no-repeat;
    height: 22px;
    width: 22px;
  }
  .asset_row.gamestop .asset_icon {
    background: url('http://yolo.tino.me/game/resources/images/gamestop_icon.svg') center center / auto 22px no-repeat;
    height: 22px;
    width: 22px;
  }
  .triangle.up {
    -webkit-mask: url('http://yolo.tino.me/game/resources/images/arrow_up.svg') no-repeat;
  }
  .triangle.down {
    -webkit-mask: url('http://yolo.tino.me/game/resources/images/arrow_up.svg') no-repeat;
    transform: rotate(180deg);
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
  .asset_price_change {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 3px 6px;
    border-radius: 5px;
    font-size: 0.7rem;
    margin: 0 0 0 3px;
  }
  .asset_price_change strong {
    margin: 2px 0 0 0;
  }
  .asset_price_change.up {
    background: rgba(1, 168, 18, 0.2);
  }
  .asset_price_change.down {
    background: rgba(197, 0, 60, 0.2);
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/dashboard.css */
  .radio {
    display: none;
  }
  .tabs {
    display: flex;
    flex-flow: row;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 600px) {
    .asset_row .asset_name {
      display: none;
    }
    .gametime {
      margin: 0 5px;
      padding: 8px 4px;
    }
    .gametime .game_block_value {
      font-weight: 600;
      font-size: 0.65rem;
      line-height: 0;
      top: 0.1em;
      position: relative;
    }
  }
  @media (max-width: 480px) {
    .assets_menu_content {
      position: fixed;
      left: 0;
      border-radius: 0;
    }
    .asset_price_change {
      font-size: 0.7rem;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/games_menu.css */
  .assets_menu_content {
    position: absolute;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.5s;
    left: 24px;
    top: 35px;
    pointer-events: auto;
    margin-top: 15px;
    margin-left: 0;
    background: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    display: flex;
    justify-content: center;
    align-items: top;
    flex-direction: column;
    border-radius: 10px;
    padding: 0;
  }
  .assets_menu_content {
    opacity: 1;
    visibility: visible;
  }
  .assets_menu_content:before {
    content: '';
    background: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    width: 30px;
    height: 12px;
    -webkit-clip-path: polygon(50% 0, 0 100%, 100% 100%);
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
    -moz-clip-path: polygon(50% 0, 0 100%, 100% 100%);
    position: absolute;
    top: -11px;
    right: 75px;
    display: none;
  }
  .assets_menu_content:before {
    left: 23px;
  }
  .show_past_games_selection {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 15px;
    margin: 10px 0 0 0;
    width: 100%;
  }
  .assets_menu_content .show_past_games_selection label {
    display: flex;
    padding: 3px 0 0 30px;
  }
  form#assets_to_select {
    padding: 0 0 5px 0;
  }
  form#assets_to_select .asset_row {
    padding: 5px 15px 10px 15px;
    border: 0;
    min-width: 320px;
    font-size: 0.9rem;
    height: 38px;
  }
  form#assets_to_select .asset_row:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  form#assets_to_select .asset_row .gametime {
    margin: 0 0 0 10px;
  }
  form#assets_to_select .header.asset_row {
    padding: 0 10px 10px 0;
    border: 0;
    font-size: 0.9rem;
    height: 38px;
    background: rgba(0, 0, 0, 0.1);
    margin: 0 0 0 -15px;
    width: calc(100% + 30px);
    display: none;
  }
  form#assets_to_select .header.asset_row .asset_name {
    margin-left: 60px;
  }
  form#assets_to_select .header.asset_row .asset_current_price {
    text-align: left;
    justify-content: flex-start;
  }
  form#assets_to_select .asset_row .asset_icon_container {
    width: 34px;
    display: flex;
    justify-content: center;
  }
  form#assets_to_select .asset_row .asset_name {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.8rem;
  }
  form#assets_to_select .asset_row label {
    display: flex;
    justify-content: flex-start;
  }
  form#assets_to_select .asset_row .asset_current_price strong {
    font-weight: 600;
    font-size: 0.8rem;
  }
  form#assets_to_select .asset_row .asset_current_price .asset_price_change {
    margin: 0 0 0 5px;
  }
  form#assets_to_select .asset_row .asset_current_price .asset_price_change strong {
    font-size: 0.7rem;
    font-weight: inherit;
    margin-right: 0;
  }
  .asset_row .asset_name {
    text-align: left;
    margin: 0 5px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 110px;
    text-overflow: ellipsis;
  }
  .asset_row .asset_current_price {
    text-align: right;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .asset_row .asset_current_price strong {
    margin: 0 5px 0 0;
  }
  .asset_row .asset_current_price strong:nth-child(1) {
    display: none;
  }
  input[type='checkbox'] {
    opacity: 0;
    display: none;
  }
  label.select_game {
    position: relative;
    display: inline-block;
    padding-left: 22px;
  }
  label.select_game::before,
  label.select_game::after {
    position: absolute;
    content: '';
    display: inline-block;
  }
  label.select_game::before {
    height: 18px;
    width: 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    left: 0;
    top: 3px;
    border-radius: 5px;
    cursor: pointer;
  }
  label.select_game::after {
    height: 3px;
    width: 8px;
    border-left: 2px solid rgba(255, 255, 255, 1);
    border-bottom: 2px solid rgba(255, 255, 255, 1);
    transform: rotate(-45deg);
    left: 5px;
    top: 9px;
  }
  input[type='checkbox'] + label.select_game::after {
    content: none;
  }
  input[type='checkbox']:checked + label.select_game::before {
    content: '';
    border-color: transparent;
    background: rgba(42, 109, 255, 0.6);
  }
  input[type='checkbox']:checked + label.select_game::after {
    content: '';
  }
  input[type='checkbox']:focus + label.select_game::before {
    outline: rgb(59, 153, 252) auto 5px;
    outline: 0;
  }
  .games_menu_tabs_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
  }
  .games_menu_tabs_wrapper label.rl {
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
    margin: 0 0 10px 0;
    line-height: 100%;
  }
  .games_menu_tabs_wrapper .tab_wrapper {
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: flex-start;
  }
  .games_menu_tabs_wrapper .tab {
    cursor: pointer;
    padding: 6px 14px;
    margin: 0 2px;
    background: transparent;
    border-bottom: 0;
    display: inline-block;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }
  .games_menu_tabs_wrapper .panels {
    width: 100%;
    overflow: hidden;
    margin: 15px 0 0 0;
  }
  .games_menu_tabs_wrapper .panel {
    display: none;
    animation: fadein 0.8s;
    width: 100%;
    padding: 0;
    background: transparent;
    flex-flow: column;
  }
  .games_menu_tabs_wrapper .tabs {
    display: flex;
    flex-flow: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px 10px 0 0;
    width: 100%;
    padding: 15px;
    margin: 0;
    justify-content: space-between;
  }
  .games_menu_tabs_wrapper .radio {
    display: none;
  }
  .games_menu_tabs_wrapper #game_menu_tab_one:checked ~ .panels #one-panel,
  .games_menu_tabs_wrapper #game_menu_tab_two:checked ~ .panels #two-panel {
    display: flex;
    align-items: flex-start;
  }
  .games_menu_tabs_wrapper #game_menu_tab_one:checked ~ .tabs #one-tab,
  .games_menu_tabs_wrapper #game_menu_tab_two:checked ~ .tabs #two-tab {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    color: #b3cbff;
    text-shadow: 0 0 10px rgba(42, 109, 255, 1);
  }
  /*! CSS Used keyframes */
  @keyframes fadein {
    from {
      top: -80px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`
const developerCSS = css`
  .assets_menu_content {
    top: 0;
    min-width: 320px;
  }
  .gametime {
    padding: 3px 4px;
  }
  .asset_row .new_24 {
    font-size: 0.5rem;
    background: #2a6dff;
    padding: 3px 3px 3px 3px;
    line-height: 100%;
    border-radius: 3px;
    text-transform: normal;
    font-weight: 600;
    margin: 0 0 0 25px;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/games_menu.css */
  .futures_link {
    text-decoration: none;
    background: #5a1998;
    width: 100%;
    padding: 10px 15px !important;
    font-weight: 300;
  }
  .futures_link:hover {
    background: #6e1fba;
    color: white;
  }
  .futures_link strong {
    font-weight: 800;
    padding: 0 4px 0 0;
  }
  .futures_link .new_game {
    background: #9443e0;
    border-radius: 0.4em;
    padding: 4px 5px 2px 5px;
    margin: 0 0 0 10px;
    line-height: 100%;
    font-size: 0.6rem;
    font-weight: 600;
  }
`

export const AssetsMenuStyled = styled.div`
  ${designerCSS}
  ${developerCSS}
`
