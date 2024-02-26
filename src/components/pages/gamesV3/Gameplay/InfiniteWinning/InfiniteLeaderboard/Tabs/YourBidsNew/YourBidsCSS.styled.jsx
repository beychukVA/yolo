import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
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
  a {
    color: #fff;
    text-decoration: none;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  a:hover {
    text-decoration: none;
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
  .menu_select {
    width: 18px;
    height: 18px;
    background: hsla(0, 0%, 0%, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
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
  .stats_tabs_wrapper #stats_tabs_one:checked ~ .panels #one-panel {
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
  .table_wrapper .grid-body.your_bids_iw {
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.75fr 1fr 1fr 1fr 1fr 1.5fr 1fr 0.5fr 0.25fr 1fr;
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
  .table_wrapper .grid-header label.status {
    padding-left: 30px;
  }
  .table_wrapper .grid-content label {
    z-index: 0;
    position: relative;
    min-height: 45px;
  }
  .table_wrapper .grid-content .asset .asset_icon {
    margin: 0 5px 0 0;
  }
  .table_wrapper .grid-content label.asset span {
    padding-top: 3px;
  }
  .table_wrapper .grid-content label.status {
    color: hsl(221, 73%, 47%);
    color: #fff;
    padding-left: 30px;
  }
  .table_wrapper .grid-content label.open.profit {
    color: #fff;
    background: hsla(126, 100%, 38%, 0.1);
    border-bottom: 1px solid hsla(126, 100%, 38%, 0.1);
    opacity: 1;
  }
  .table_wrapper .grid-content label.open.loss {
    color: #fff;
    background: hsla(340, 88%, 46%, 0.15);
    border-bottom: 1px solid hsla(340, 88%, 46%, 0.1);
    opacity: 1;
  }
  .table_wrapper .grid-content label.status.open.profit span {
    color: hsla(126, 100%, 38%, 1);
  }
  .table_wrapper .grid-content label.status.open.loss span {
    color: hsla(340, 88%, 46%, 1);
  }
  .table_wrapper .grid-content label.action_status .cashout {
    border-radius: 8px;
    padding: 10px 10px 9px 30px;
    font-size: 0.75rem;
    white-space: nowrap;
    text-transform: uppercase;
    line-height: 100%;
    display: flex;
  }
  .table_wrapper .grid-content label.action_status.open.profit .cashout {
    background: hsla(126, 100%, 28%, 0.2)
      url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-green.svg') 10px center / 12px auto no-repeat;
    border: 1px solid hsla(126, 100%, 28%, 0.5);
  }
  .table_wrapper .grid-content label.action_status.open.profit button.cashout_icon {
    background: hsla(126, 100%, 28%, 0.2)
      url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-green.svg') center center / 16px auto
      no-repeat;
    border-radius: 8px;
    width: 32px;
    padding: 14px 0 12px 0;
    font-size: 0.75rem;
    display: none;
  }
  .table_wrapper .grid-content label.action_status.open.loss .cashout {
    background: hsla(340, 88%, 46%, 0.2) url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-red.svg')
      10px center / 12px auto no-repeat;
    border: 1px solid hsla(340, 88%, 46%, 0.5);
  }
  .table_wrapper .grid-content label.action_status.open.loss button.cashout_icon {
    background: hsla(340, 88%, 46%, 0.2) url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-red.svg')
      center center / 16px auto no-repeat;
    border-radius: 8px;
    width: 32px;
    padding: 14px 0 12px 0;
    font-size: 0.75rem;
    display: none;
  }
  .table_wrapper .grid-content label.action_status.open.profit .cashout:hover {
    background: hsla(126, 100%, 28%, 0.5)
      url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-green.svg') 10px center / 12px auto no-repeat;
  }
  .table_wrapper .grid-content label.action_status.open.loss .cashout:hover {
    background: hsla(340, 88%, 46%, 0.5) url('http://yolo.tino.me/app_v3/resources/images/icons/cashout_icon-red.svg')
      10px center / 12px auto no-repeat;
  }
  .table_wrapper .grid-content label.share_bid button {
    background: linear-gradient(
      0deg,
      hsla(203, 85%, 39%, 0.4),
      hsla(203, 84%, 41%, 0.4),
      hsla(203, 82%, 43%, 0.4),
      hsla(203, 81%, 45%, 0.4),
      hsla(203, 80%, 47%, 0.4),
      hsla(203, 79%, 49%, 0.4),
      hsla(203, 82%, 51%, 0.4),
      hsla(203, 88%, 53%, 0.4)
    );
    height: 24px;
    width: 28px;
    border-radius: 8px;
    position: relative;
  }
  .table_wrapper .grid-content label.share_bid button:before {
    -webkit-mask: url(${icons.twitter_icon}) center center / 12px auto no-repeat;
    background: #fff;
    width: 12px;
    height: 12px;
    position: absolute;
    content: '';
    top: 50%;
    left: calc(50% + 1px);
    transform: translate(-50%, -50%);
  }
  .table_wrapper .grid-content label.status.closed span {
    color: hsla(0, 0%, 100%, 1);
    line-height: 140%;
  }
  .table_wrapper .grid-content label.status.closed img {
    width: 10px;
    height: 10px;
    margin: 0 5px 0 0;
  }
  .table_wrapper .grid-content label.status.open img {
    width: 16px;
    height: 16px;
    margin: 0 5px 0 0;
  }
  .table_wrapper .grid-content label.action_status {
    padding-top: 6px;
    padding-bottom: 5px;
    padding-right: 30px;
  }
  .table_wrapper .grid-content label.result.busted {
    color: hsl(340, 88%, 46%);
    padding-left: 26px;
    text-transform: uppercase;
    font-size: 0.7rem;
    background-image: url('http://yolo.tino.me/app_v3/resources/images/icons/busted_icon.svg');
    background-position: 6px center;
    background-size: 15px auto;
    background-repeat: no-repeat;
  }
  .table_wrapper .grid-content label.result.busted span {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.result.cashed_out.profit {
    color: hsl(126, 100%, 38%);
    padding-left: 26px;
    text-transform: uppercase;
    font-size: 0.7rem;
    background-image: url('http://yolo.tino.me/app_v3/resources/images/icons/cashed_out_icon-profit.svg');
    background-position: 6px center;
    background-size: 15px auto;
    background-repeat: no-repeat;
  }
  .table_wrapper .grid-content label.result.cashed_out.profit span {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.result.cashed_out.loss {
    color: hsl(340, 88%, 46%);
    padding-left: 26px;
    text-transform: uppercase;
    font-size: 0.7rem;
    background-image: url('http://yolo.tino.me/app_v3/resources/images/icons/cashed_out_icon-loss.svg');
    background-position: 6px center;
    background-size: 15px auto;
    background-repeat: no-repeat;
  }
  .table_wrapper .grid-content label.result.cashed_out.loss span {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.pandl.down,
  .table_wrapper .grid-content label.roi.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.pandl.up,
  .table_wrapper .grid-content label.roi.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.up {
    color: hsl(126, 100%, 38%);
  }
  .table_wrapper .grid-content label.down {
    color: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.tpsl {
    font-size: 0.7rem;
    line-height: 120%;
    padding: 8px 10px 6px 10px;
  }
  .table_wrapper .grid-content label.tpsl button.edit_tpsl {
    background: hsla(0, 0%, 100%, 0.1) url('http://yolo.tino.me/app_v3/resources/images/icons/edit_icon.svg') center
      center / 9px auto no-repeat;
    margin: 0 0 0 5px;
    padding: 10px;
    border-radius: 6px;
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
  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .asset .asset_icon img {
    height: 14px;
  }
  .bid_direction {
    mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
    width: 14px;
    height: 14px;
    margin: 0 3px 0 0;
  }
  .bid_direction.above {
    background: hsl(126, 100%, 38%);
    transform: rotate(180deg);
  }
  .table_wrapper .yourbids_table_row {
    display: contents;
  }
  .table_wrapper .yourbids_table_row:hover > label {
    background-color: hsla(0, 0%, 100%, 0.05);
    cursor: pointer;
    opacity: 1;
  }
  .table_wrapper .yourbids_table_row:hover > label.open.profit {
    background-color: hsla(126, 100%, 38%, 0.15);
  }
  .table_wrapper .yourbids_table_row:hover > label.open.loss {
    background-color: hsla(340, 88%, 46%, 0.2);
  }
  @media (max-width: 1200px) {
    .table_wrapper .grid-body label {
      padding: 12px 4px 10px 4px;
    }
    .table_wrapper .grid-header label.status {
      padding-left: 15px;
    }
    .table_wrapper .grid-content label.status {
      padding-left: 15px;
    }
    .table_wrapper .grid-content label.action_status {
      padding-right: 15px;
    }
    .table_wrapper .grid-body.your_bids_iw {
      grid-template-columns: 0.25fr 1fr 0.75fr 1fr 1fr 1fr 1fr 1fr 0.5fr 0.25fr 1fr;
    }
    .table_wrapper .grid-body label.tpsl {
      display: none;
    }
  }
  @media (max-width: 1000px) {
    .table_wrapper .grid-body.your_bids_iw {
      grid-template-columns: 0.25fr 1fr 0.75fr 1fr 1fr 0.5fr 0.25fr 1fr;
    }
    .table_wrapper .grid-body label.tpsl,
    .table_wrapper .grid-body label.bust,
    .table_wrapper .grid-body label.exit,
    .table_wrapper .grid-body label.multiplier {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .table_wrapper {
      height: calc(35vh - 67px);
    }
    .table_wrapper .grid-body.your_bids_iw {
      grid-template-columns: 0.25fr 0.75fr 1fr 1fr 0.5fr 0.25fr 1fr;
    }
    .table_wrapper .grid-body label.tpsl,
    .table_wrapper .grid-body label.entry,
    .table_wrapper .grid-body label.bust,
    .table_wrapper .grid-body label.exit,
    .table_wrapper .grid-body label.multiplier {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .table_wrapper .grid-body.your_bids_iw {
      grid-template-columns: 0.25fr 0.25fr 1fr 0.5fr 0.5fr 0.25fr 0.25fr;
    }
    .table_wrapper .grid-content label.action_status.open.profit button.cashout,
    .table_wrapper .grid-content label.action_status.open.loss button.cashout,
    .table_wrapper .grid-content label.result.cashed_out span,
    .table_wrapper .grid-content label.result.busted span {
      display: none;
    }
    .table_wrapper .grid-content label.result.busted,
    .table_wrapper .grid-content label.result.cashed_out.profit,
    .table_wrapper .grid-content label.result.cashed_out.loss {
      padding-left: 0;
      background-position: center center;
      background-size: 18px auto;
    }
    .table_wrapper .grid-content label.action_status.open.profit button.cashout_icon,
    .table_wrapper .grid-content label.action_status.open.loss button.cashout_icon {
      display: flex;
    }
    .table_wrapper .grid-content label.status span {
      display: none;
    }
    .table_wrapper .grid-content label.status.open img {
      margin: 0;
    }
    .table_wrapper .grid-header label.status {
      padding-left: 10px;
    }
    .table_wrapper .grid-content label.action_status {
      padding-right: 10px;
      justify-content: center;
    }
    .table_wrapper .grid-header label.status span,
    .table_wrapper .grid-header label.asset span {
      display: none;
    }
    .table_wrapper .grid-header label.status .menu_select,
    .table_wrapper .grid-header label.asset .menu_select {
      margin: 0;
    }
    .table_wrapper .grid-content label.asset span {
      display: none;
    }
    .asset .asset_icon img {
      height: 18px;
    }
  }
  @media (max-width: 430px) {
    .table_wrapper .grid-content label.status {
      padding-left: 5px;
    }
    .table_wrapper .grid-content label.action_status {
      padding-right: 5px;
    }
    .table_wrapper .grid-body.your_bids_iw {
      grid-template-columns: 0.25fr 0.25fr 0.25fr 0.5fr 0.5fr 0.25fr 0.25fr;
    }
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
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const developerCSS = css`
  .bid_direction.below {
    background: hsl(340, 88%, 46%);
  }
  .table_wrapper .grid-content label.action_status .cashout {
    min-width: 103px;
  }
  .table_wrapper .grid-content label.action_status.pending {
    color: hsl(340, 88%, 46%);
    padding-left: 6px;
    text-transform: uppercase;
    font-size: 0.7rem;
  }
  .table_wrapper .grid-content label.action_status.pending span {
    color: hsl(340, 88%, 46%);
  }
    @media (max-width: 600px) {

    .table_wrapper .grid-content label.action_status.pending span {
      display: none;
    }
    .table_wrapper .grid-content label.action_status.pending,
      padding-left: 0;
      background-position: center center;
      background-size: 18px auto;
    }
`

export const YourBidsCSS = styled.div`
  ${designerCSS}
  ${developerCSS}
`
