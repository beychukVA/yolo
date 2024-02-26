import { icons } from 'common'

const { default: styled } = require('styled-components')

export const G24hrPlayerItemStyled = styled.div`
  // ---- vvvv ---- CSS from designer ---- vvvv ----
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
  .single_transaction .status_wrap .status {
    max-width: 100%;
  }
  .single_transaction .bid_type_24 {
    font-weight: 600;
    margin: 0 0 0 6px;
  }
  .single_transaction .bid_type_24 .level_ind {
    margin: 0 0 0 0;
  }
  .single_transaction .value {
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .single_transaction {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    white-space: nowrap;
    padding: 3px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  }
  .single_transaction .value {
    align-items: center;
  }
  .single_transaction .value {
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
`
