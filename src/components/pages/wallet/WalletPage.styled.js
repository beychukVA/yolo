import styled, { css } from 'styled-components'
import { icons } from 'common'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css */
  .green.light {
    color: rgba(0, 194, 19, 1) !important;
    color: #00c213 !important;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    /* ::-webkit-scrollbar {
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
    color: #fff;
  }
  .content {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 60px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 30px;
    position: relative;
  }
  h1 {
    font-size: 2rem;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 100%;
    padding: 0 0 5px 0;
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
  input[type='text'] {
    border: 0;
    outline: 0;
  }
  button {
    outline: none;
    border: none;
    background: transparent;
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 160%;
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
  .tooltip {
    display: inline-block;
    position: relative;
  }
  .tooltip .bottom {
    top: 15px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    border-radius: 8px;
    position: absolute;
    z-index: 9999999;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.8s;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }
  .tooltip:hover .bottom {
    visibility: visible;
    opacity: 1;
  }
  .tooltip .bottom i {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 12px;
    overflow: hidden;
  }
  .tooltip .bottom i::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, 50%) rotate(45deg);
    background: rgba(255, 255, 255, 0.1);
    display: none;
  }
  .triangle.up {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
  }
  .triangle.up.large {
    width: 12px;
    height: 10px;
    -webkit-mask-size: 12px 12px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.up.white {
    width: 10px;
    height: 10px;
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
    -webkit-mask-size: 10px 10px;
    background: rgba(255, 255, 255, 1);
  }
  .triangle.button.white {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 6px;
  }
  .tooltip .info_blocks {
    -webkit-mask: url(${icons.info_icon}) center center / auto 12px no-repeat;
    mask: url(${icons.info_icon}) center center / auto 12px no-repeat;
    background: #797f8c;
    width: 12px;
    height: 12px;
    position: relative;
    margin: 0 0 0 4px;
    display: block;
    cursor: pointer;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/bidders_panel.css */
  .currency_type {
    opacity: 0.5;
    font-size: 0.7rem;
    padding: 2px 0 0 0;
    line-height: 160%;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .connected_with {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin: 0 5px 0 0;
  }
  .wallet_id_full {
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 0 5px 0 15px;
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
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/dashboard.css */
  #my-dashboard-grid {
    width: 100%;
    margin: 20px 0 0 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .content .h1_wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
  }
  .main_cards {
    margin: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 'card1 card2';
    grid-gap: 10px;
  }
  .main_cards.full {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin-top: 10px;
  }
  .card {
    padding: 30px;
    background: rgba(129, 170, 255, 0.06);
    border-radius: 15px;
    display: flex;
    position: relative;
    align-items: flex-start;
  }
  .main_cards.full.user_dashboard .card {
    padding: 0;
  }
  .card:nth-child(2) {
    grid-area: card2;
  }
  .main_cards.full .card {
    display: flex;
    flex-direction: column;
  }
  .main_cards.full.user_dashboard {
    display: flex;
    flex-direction: column;
    margin: 60px 0 0 0;
    width: 100%;
  }
  #my-dashboard-grid .main_cards.full .grid_unclaimed_earnings {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-size: 0.8rem;
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
  }
  .main_cards.full .grid_unclaimed_earnings > span {
    padding: 12px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main_cards.full .grid_unclaimed_earnings > span.head {
    background: rgba(0, 0, 0, 0.3);
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .main_cards.full .grid_unclaimed_earnings > span.head:first-child {
    border-top-left-radius: 10px;
  }
  .main_cards.full .grid_unclaimed_earnings > span.head:nth-child(4) {
    border-top-right-radius: 10px;
  }
  .main_cards.full .grid_unclaimed_earnings > span.head strong {
    font-weight: 600;
    margin: 0 3px 0 0;
  }
  .triangle.up.white {
    width: 10px;
    height: 10px;
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
    -webkit-mask-size: 10px 10px;
    background: rgba(255, 255, 255, 1);
  }
  .triangle.button.white {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 6px;
  }
  .tabs_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .tabs_wrapper .total_unclaimed_earnings {
    padding: 30px 30px 15px 30px;
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  .tabs_wrapper .total_unclaimed_earnings strong {
    font-size: 1.6rem;
    color: #2a6dff;
    letter-spacing: -0.03em;
    font-weight: 400;
  }
  .tabs_wrapper .total_unclaimed_earnings button {
    padding: 10px 30px;
    line-height: 100%;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 15px;
    width: fit-content;
    background: rgba(29, 75, 175, 1);
    margin: 0 0 0 20px;
  }
  .tabs_wrapper .tab {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0 2px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 0;
    display: inline-block;
    border-radius: 10px 10px 0 0;
    color: rgba(255, 255, 255, 0.5);
  }
  .tabs_wrapper .panels {
    width: 100%;
    overflow: hidden;
  }
  .tabs_wrapper .panel {
    display: none;
    animation: fadein 0.8s;
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    padding: 0 15px 15px 15px;
  }
  .tabs_wrapper .radio {
    display: none;
  }
  .card * {
    display: flex;
  }

  .tabbed_section form .withdraw_assistance {
    color: #fff;
    width: 100%;
    font-size: 0.8rem;
    opacity: 0.5;
    padding: 0 0 15px 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    .content .h1_wrap {
      align-items: flex-start;
      flex-flow: column;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 1200px) {
    .content {
      height: 100%;
      padding: 15px 0 0 0;
      justify-content: flex-start;
    }
  }
  @media (max-width: 980px) {
    #my-dashboard-grid {
      flex-direction: column;
    }
    .main_cards.full.user_dashboard {
      margin: 30px 0 0 0;
    }
  }
  @media (max-width: 600px) {
    .content {
      padding: 30px;
    }
    .main_cards {
      margin: 5px 0;
    }
  }
  @media (max-width: 480px) {
    .content {
      padding: 8px 0 0 0;
    }
    h1 {
      font-size: 1.7rem;
    }
    .content {
      padding: 30px;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet.css */
  .content {
    padding: 0 180px 60px 180px;
  }
  .wallet_content {
    width: 100%;
  }
  .wallet_content * {
    display: flex;
  }
  .wallet_content .tooltip {
    display: flex;
    align-items: center;
  }
  .wallet_level_1 {
    width: 100%;
    flex-flow: column;
    align-items: flex-start;
    padding: 30px 0 0 0;
  }
  .wallet_level_1 h4 {
    font-weight: 600;
    font-size: 0.9rem;
  }
  .wallet_page_balance_wrapper {
    align-items: center;
    justify-content: flex-start;
    flex-flow: row;
    width: 100%;
  }
  .wallet_page_balance {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    margin: 0 30px 0 0;
    padding: 15px 35px 15px 0;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 470px;
  }
  .wallet_page_balance .total_balance_wrapper {
    border-top: 1px dotted rgba(255, 255, 255, 0.3);
    padding: 5px 0;
    margin: 5px 0 0 0;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row;
  }
  .wallet_page_balance .total_balance_value {
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    justify-content: center;
    align-items: center;
  }
  .wallet_level_1 .wallet_top_instr {
    flex-flow: column;
    font-size: 0.8rem;
  }
  .wallet_level_1 .wallet_top_instr strong {
    font-weight: 600;
    font-size: 1.4rem;
    color: #fff;
  }
  .sub_balance_wrapper {
    font-size: 1.1rem;
  }
  .sub_balance_wrapper strong,
  .total_balance_wrapper strong {
    font-weight: 300;
    text-transform: uppercase;
    font-size: 0.8rem;
    opacity: 0.7;
    min-width: 200px;
    display: flex;
    align-items: center;
  }
  .sub_balance_wrapper button {
    background: rgba(29, 75, 175, 1);
    border-radius: 8px;
    font-size: 0.7rem;
    line-height: 100%;
    padding: 0 8px;
    margin: 0 0 0 5px;
  }
  .wallet_tabs_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 40px 0 0 0;
  }
  .wallet_tab_1 {
    cursor: pointer;
    padding: 10px 30px;
    margin: 0;
    display: inline-block;
    border-radius: 0 5px 5px 0;
    font-size: 1rem;
    border: 1px solid rgba(29, 75, 175, 0.7);
    width: 50%;
    text-align: center;
  }
  .wallet_tabs_wrapper .tabs {
    width: 100%;
  }
  .wallet_panels_1 {
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-flow: column;
  }
  .helper_bar {
    width: 100%;
    background: rgba(0, 194, 19, 0.2);
    border: 1px solid #00c213;
    padding: 10px 30px;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    display: flex;
    margin: 30px 0 30px 0;
    position: relative;
    font-size: 0.8rem;
    box-shadow: 0px 0px 1px 1px #00c213;
  }
  .helper_bar .close {
    line-height: 100%;
    position: absolute;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    cursor: pointer;
    -webkit-mask: url(${icons.close}) center center / auto 18px no-repeat;
    mask: url(${icons.close}) center center / auto 18px no-repeat;
    background: rgba(255, 255, 255, 0.6);
  }
  .helper_bar .close:hover {
    background: rgba(255, 255, 255, 1);
  }
  .helper_bar a {
    display: inline-block;
    margin-left: 5px;
  }
  .helper_bar .deposit_icon {
    -webkit-mask: url(${icons.deposit_icon});
    mask: url(${icons.deposit_icon});
    background: #fff;
    content: '';
    width: 24px;
    height: 24px;
    -webkit-mask-size: 24px 24px;
    mask-size: 24px 24px;
    margin: 0 10px 0 0;
  }
  .helper_bar .withdraw_icon {
    -webkit-mask: url(${icons.withdraw_icon});
    mask: url(${icons.withdraw_icon});
    background: #fff;
    content: '';
    width: 24px;
    height: 24px;
    -webkit-mask-size: 24px 24px;
    mask-size: 24px 24px;
    margin: 0 10px 0 0;
  }
  .pulse {
    animation: pulse-animation 2s infinite;
  }
  .wallet_tabs_panel {
    display: none;
    animation: fadein 0.8s;
    width: 100%;
  }
  .panel_title {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 0 5px 0;
    display: flex;
    align-items: center;
    flex-flow: column;
  }



  .panel_desc {
    font-size: 0.8rem;
    opacity: 0.7;
    margin: 0 0 20px 0;
    padding: 0 0 20px 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    display: inline;
    justify-content: center;
    align-items: center;
  }
  .panel_desc a {
    display: inline;
  }
  .radio {
    display: none;
  }
  #deposit_tab_one:checked ~ .wallet_panels_1 #deposit_panel,
  #withdraw_tab_two:checked ~ .wallet_panels_1 #withdraw_panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  #deposit_tab_one:checked ~ .tabs #deposit_tab,
  #withdraw_tab_two:checked ~ .tabs #withdraw_tab {
    background: rgba(29, 75, 175, 1);
  }
  .tabs #deposit_tab {
    border-radius: 5px 0 0 5px;
  }
  .wallet_tabs_panel .tabbed_section {
    width: calc(33.3% - 5px);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 30px;
    float: left;
    margin: 0 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .wallet_tabs_panel .tabbed_section:nth-child(3) {
    margin: 0 !important;
    /* width: 50%; */
  }
  .tabbed_section {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
  .tabbed_section form {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .tabbed_section form input[type='text'] {
    width: 100%;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(42, 109, 255, 0.5);
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 100%;
  }
  .tabbed_section form .label_row {
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    width: 100%;
    margin: 0 0 5px 0;
  }
  .tabbed_section form label.max_amount {
    opacity: 0.5;
  }
  .tabbed_section form input[type='text']::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  .tabbed_section form input[type='text']:focus {
    outline: 0;
    border: 1px solid rgba(42, 109, 255, 1);
  }
  .tabbed_section form button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 16px;
    font-size: 1rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  .tabbed_section form button:hover {
    background: rgb(42, 109, 255, 1);
  }
  .tabbed_section form button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .tabbed_section form button:hover[disabled] {
    background: rgba(29, 75, 175, 1);
  }
  .tabbed_section form.polygon button {
    background: rgba(123, 63, 228, 0.2);
  }
  .tabbed_section form.polygon button:hover {
    background: rgba(123, 63, 228, 0.3);
  }
  #my-dashboard-grid {
    margin: 0;
  }
  .main_cards.full.user_dashboard {
    margin: 0;
  }
  .tabs_wrapper #ucw_one:checked ~ .panels #one-panel,
  .tabs_wrapper #ucw_two:checked ~ .panels #two-panel,
  .tabs_wrapper #ucw_three:checked ~ .panels #three-panel {
    display: block;
  }
  .tabs_wrapper #ucw_one:checked ~ .tabs #one-tab,
  .tabs_wrapper #ucw_two:checked ~ .tabs #two-tab,
  .tabs_wrapper #ucw_three:checked ~ .tabs #three-tab {
    background: #32415d;
    font-weight: 600;
    margin-left: -1px;
    color: #fff;
  }
  .no_earnings_available {
    display: flex;
    padding: 30px 0 15px 5px;
    font-weight: 600;
  }
  .withdraw_sections_wrapper .mm_address_wrapper {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
  }
  .mm_address_top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0 5px 0;
    flex-wrap: wrap;
  }
  .mm_address_top div {
    align-items: center;
  }
  .mm_address_top .connected_with {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin: 0 5px 0 0;
  }
  .mm_address_bottom {
    flex-direction: column;
  }
  .mm_address_bottom .wallet_id_full {
    padding: 10px 16px;
    border: 1px solid rgba(42, 109, 255, 0.5);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 0;
  }
  .mm_address_bottom .wallet_id_full span {
    font-size: 1rem;
    white-space: nowrap;
    flex-direction: row;
    text-overflow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    margin: 0 5px 0 0;
  }
  .mm_address_wrapper .withdraw_amount {
    margin: 15px 0 5px 0;
    display: flex;
    flex-flow: column;
  }
  .widthdraw_app_balance {
    font-size: 1.8rem;
    letter-spacing: -0.03em;
    font-weight: 300;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0 0 15px 0;
  }
  .widthdraw_app_balance label {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #888b92;
    letter-spacing: 0;
  }

  @media (max-width: 1200px) {
    .content {
      padding: 60px 80px;
    }
    .wallet_page_balance_wrapper {
      flex-flow: column;
    }
    .wallet_page_balance {
      width: 100%;
      border-right: 0;
      margin: 0 0 0 0;
    }
    .wallet_top_instr {
      width: 100%;
      padding: 30px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
    }
    .wallet_level_1 .wallet_top_instr strong {
      font-size: 1.2rem;
    }
    .wallet_tabs_wrapper {
      margin: 30px 0 0 0;
    }
    #deposit_tab_one:checked ~ .wallet_panels_1 #deposit_panel,
    #withdraw_tab_two:checked ~ .wallet_panels_1 #withdraw_panel {
      flex-flow: column;
    }
    .wallet_tabs_panel .tabbed_section {
      width: 100%;
      margin: 0 0 5px 0;
    }
    .wallet_tabs_panel .tabbed_section:nth-child(3) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .content {
      padding: 60px 60px;
    }
  }
  @media (max-width: 600px) {
    .content {
      padding: 30px;
    }
    .wallet_page_balance {
      min-width: 300px;
    }
    .wallet_top_instr {
      padding: 15px 20px;
    }
    .wallet_level_1 .wallet_top_instr strong {
      font-size: 1rem;
    }
    .helper_bar {
      flex-flow: column;
      font-size: 0.75rem;
    }
    .helper_bar .withdraw_icon {
      margin: 0;
      width: 20px;
      height: 20px;
      -webkit-mask-size: 20px 20px;
      mask-size: 20px 20px;
    }
    .wallet_page_balance .total_balance_value {
      font-size: 1.3rem;
    }
    .widthdraw_app_balance {
      font-size: 1.3rem;
    }
    .earnings_balance_value {
      font-size: 0.9rem;
    }
    .currency_type {
      font-size: 0.8rem !important;
      padding: 4px 0 0 0;
    }
    .tabs_wrapper .total_unclaimed_earnings {
      padding: 30px 0 15px 0;
    }
  }
  @media (max-width: 480px) {
    .sub_balance_wrapper strong,
    .total_balance_wrapper strong {
      min-width: 160px;
    }
    .wallet_tabs_wrapper {
      margin: 15px 0 0 0;
    }
    .wallet_level_1 {
      padding: 15px 0 0 0;
    }
    .helper_bar {
      margin: 15px 0;
    }
    .wallet_level_1 .wallet_top_instr strong {
      font-size: 0.9rem;
    }
    .wallet_level_1 .wallet_top_instr {
      font-size: 0.75rem;
    }
    .wallet_tab_1 {
      font-size: 0.9rem;
    }
    .tabbed_section form button {
      font-size: 0.9rem;
    }
    .wallet_page_balance .total_balance_value {
      font-size: 1.2rem;
    }
    .widthdraw_app_balance {
      font-size: 1.2rem;
    }
    .mm_address_bottom .wallet_id_full span {
      font-size: 0.9rem;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .connected_with {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin: 0 5px 0 0;
  }
  .wallet_id_full {
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 0 5px 0 15px;
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
  /*! CSS Used keyframes */
  @-webkit-keyframes fadein {
    from {
      top: -80px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
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
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 15px 0px rgba(0, 194, 19, 0.35);
    }
    100% {
      box-shadow: 0 0 15px 30px rgba(0, 194, 19, 0);
    }
  }
`
const customAdjustments = css`
  .content {
    padding: 0 120px;
  }
  .currency_type {
    padding: 2px 0 0 7px;
  }
  .tabbed_section form.polygon {
    justify-content: space-between;
  }
  .wallet_tabs_panel .tabbed_section.fullWidth {
    width: 100% !important;
  }
  input[type='tel'] {
    border: 0;
    outline: 0;
  }
  .tabbed_section {
    justify-content: space-between;
    flex: 1 0 auto;
  }
  .tabbed_section form input[type='tel'] {
    width: 100%;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(42, 109, 255, 0.5);
    border-radius: 10px;
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 100%;
  }
  .tabbed_section form input[type='tel']::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  .tabbed_section form input[type='tel']:focus {
    outline: 0;
    border: 1px solid rgba(42, 109, 255, 1);
  }
  label {
    font-size: 0.8rem;
  }
  .mm_address_top .connected_with {
    font-size: 0.8rem;
  }
  .tabbed_section form button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 16px;
    font-size: 1rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }

  .mm_address_bottom .wallet_id_full {
    border: 0;
    background: #111722;
  }
  .mm_address_bottom {
    width: 100%;
  }

  @media (max-width: 600px) {
    .content {
      padding: 0 !important;
    }
  }

  #usdc_deposit_amount {
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 30px;
  }

  #deposit_panel .mm_address_bottom .information_message {
    width: 100%;
    font-size: 0.7rem;
    opacity: 0.6;
    padding: 5px 30px 0 0;
  }
`
export const WalletPageWrapper = styled.div`
  width: 100%;

  ${designerCSS}
  ${customAdjustments}
`
