import { icons } from 'common'
import styled from 'styled-components'

export const G24hrSumUpStyled = styled.div`
  width: 100%;

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
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/bidders_panel.css */
  .module_boxes {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 0 6px 0;
  }
  .module_boxes .box {
    width: 50%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 1.7rem;
    font-weight: 200;
    margin: 0 6px 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    line-height: 100%;
    letter-spacing: -0.03em;
  }
  .module_boxes .box {
    width: 40%;
    border-radius: 10px 0 0 10px;
    padding: 12px 20px;
    font-size: 2.1rem;
    margin: 0 0 0 0;
    justify-content: center;
    flex-flow: column;
  }
  .module_boxes .box .bid_types_wrapper {
    display: flex;
    flex-flow: row;
    width: 100%;
  }
  .module_boxes .box .bid_types_wrapper .item_bid_total_wrapper,
  .module_boxes .box .bid_types_wrapper .item_bid_type_wrapper {
    display: flex;
    flex-flow: column;
    font-size: 0.9rem;
    letter-spacing: 0;
  }
  .module_boxes .box .bid_types_wrapper .item_bid_total_wrapper {
    width: 15%;
    align-items: flex-end;
    margin: 0 5px 0 0;
  }
  .module_boxes .box .bid_types_wrapper .item_bid_type_wrapper {
    background: linear-gradient(#00c213, #747f95, #de0e54);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent !important;
    align-items: flex-start;
    width: 85%;
    margin: 0 0 0 5px;
  }
  .module_boxes .box .bid_types_wrapper .item_bid_type_wrapper .item_bid_type {
    color: transparent !important;
    flex-flow: row;
    display: flex;
    white-space: nowrap;
    font-weight: 600;
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
  .module_boxes .box strong {
    font-weight: 600;
    font-size: 0.8rem;
    opacity: 0.4;
    margin: 3px 0 0 0;
    text-transform: uppercase;
    letter-spacing: 0;
    line-height: 100%;
  }
  .module_boxes .box:last-child {
    margin-right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 60%;
  }
`
