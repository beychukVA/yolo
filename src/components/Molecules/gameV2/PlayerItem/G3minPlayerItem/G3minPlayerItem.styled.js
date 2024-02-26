import { icons } from 'common'

const { default: styled } = require('styled-components')

export const G3minPlayerItemStyled = styled.div`
  // ---- vvvv ---- CSS from designer ---- vvvv ----

  /*! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css */
  .green.light {
    color: rgba(0, 194, 19, 1) !important;
    color: #00c213 !important;
  }

  .red.light {
    color: rgba(226, 14, 85, 1) !important;
    color: #e20e55 !important;
  }

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

  .triangle.up {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
  }
  .triangle.down {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
    transform: rotate(180deg);
  }
  .triangle.up.large {
    width: 12px;
    height: 12px;
    -webkit-mask-size: 12px 12px;
    background: rgba(0, 194, 19, 1);
    margin-right: 5px;
  }
  .triangle.down.large {
    width: 12px;
    height: 12px;
    -webkit-mask-size: 12px 12px;
    background: rgba(226, 14, 85, 1);
    margin-right: 5px;
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
  .single_transaction .bid_type_3 {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .single_transaction .value {
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .single_transaction .value .currency_type {
    margin-left: 7px;
    opacity: 0.5;
    font-size: 0.7rem;
    padding: 2px 0 0 0;
    line-height: 130%;
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
  .currency_type {
    opacity: 0.5;
    font-size: 0.7rem;
    padding: 2px 0 0 0;
    line-height: 160%;
  }
  .currency_type {
    display: none;
  }
  /*! CSS Used from: Embedded */
  .currency_type {
    font-size: 1rem;
    margin: 0 0 0 7px;
  }
`
