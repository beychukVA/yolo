import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  #stats .bidders_list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    height: 100%;
  }
  #stats #all_bids .bids_down .bidders_list {
    padding: 0 15px 0 30px;
  }
  #stats #bids_panel.hr24 #all_bids .bids_down .bidders_list {
    padding: 0 30px 0 30px;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/bidders_panel.css */
  .single_transaction * {
    display: flex;
  }
  .single_transaction {
    margin: 0 0 2px 0;
    padding: 7px 25px;
    text-align: left;
  }
  .single_transaction .status_wrap {
    justify-content: space-between;
    margin: 0;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
  }
  .single_transaction .status_wrap .status {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 200;
    font-size: 0.8rem;
    max-width: 85%;
  }
  #bids_panel.hr24 .single_transaction .status_wrap .status {
    max-width: 100%;
  }
  #bids_panel.hr24 .single_transaction .bid_type_24 {
    font-weight: 600;
    margin: 0 0 0 6px;
  }
  #bids_panel.hr24 .single_transaction .bid_type_24 .level_ind {
    margin: 0 0 0 0;
  }
  .single_transaction .value {
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  #stats .bidder .single_transaction {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    white-space: nowrap;
    padding: 3px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  }
  #stats .bidder .single_transaction:last-child {
    border-bottom: 0;
  }
  #stats .bidder .single_transaction .value {
    align-items: center;
  }
  #stats .bidder .single_transaction .value {
    font-size: 0.8rem;
  }
  .level_ind {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    line-height: 0;
    font-size: 0.7rem;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 6px 0 0;
    padding: 0 0 0 0;
  }
  .level_ind.fifth {
    background: #0dbb21;
  }
  .level_ind.fourth {
    background: #3ba055;
  }
  .level_ind.third {
    background: #698688;
  }
  .level_ind.second {
    background: #a54976;
  }
  .level_ind.first {
    background: #ca1c5a;
  }
  .bids_down {
    width: 50%;
    height: 100%;
    height: calc(100% - 385px);
    margin-top: 20px;
    overflow: hidden;
  }
  #bids_panel.hr24 .bids_down {
    width: 100%;
    height: 100%;
    height: calc(100% - 435px);
    margin-top: 20px;
    overflow: hidden;
  }
  .all_bidders_list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: rgba(152, 183, 253, 0.1);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    -webkit-box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
    box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
  }
`

const developerCSS = css``

export const G24hrBiddersListStyled = styled.div`
  width: 100%;
  ${designerCSS}
  ${developerCSS}
`
