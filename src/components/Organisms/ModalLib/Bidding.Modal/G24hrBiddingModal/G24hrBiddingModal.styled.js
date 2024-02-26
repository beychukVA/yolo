import { icons } from 'common'
import styled from 'styled-components'

export const G24hrBiddingModalStyled = styled.div`
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
    color: #fff;
  }
  .triangle.down {
    -webkit-mask: url(${icons.arrow_up}) no-repeat;
    transform: rotate(180deg);
  }
  .window_heading {
    font-weight: 600;
    padding: 7px 15px 10px 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 1.1rem;
    white-space: nowrap;
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 480px) {
    .window_heading {
      font-size: 1.3rem;
    }
    .window_heading .title {
      margin: 0 0 0 0;
      padding-top: 6px;
    }
    .window_heading .round_number .round {
      font-size: 1.3rem;
      padding: 6px;
      /* border: 1px solid rgba(255, 255, 255, 0.3); */
    }
    /* .window_heading .round_number:hover .round {
      border: 1px solid rgba(255, 255, 255, 0.6);
    } */
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/place_bid.css */
  .window_heading {
    display: flex;
    text-align: left;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    flex-direction: row;
    line-height: 100%;
    padding: 0;
  }
  .window_heading .title {
    display: flex;
    flex-direction: row;
    align-self: center;
    line-height: 100%;
    font-weight: 300;
  }
  .window_heading .round_number {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .window_heading .round_number span {
    font-weight: 700;
    line-height: 100%;
    padding: 0 0 0 8px;
  }
  .window_heading .round_number .round {
    display: flex;
    line-height: 100%;
    font-weight: 700;
    border-radius: 10px;
    margin: 0 0 0 5px;
    padding: 6px 8px;
    margin: -6px 0 0 4px;
    font-size: 1.6rem;
    border: 1px solid transparent;
    position: relative;
  }
  .window_heading .round_number:hover .round {
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    cursor: default;
  }
  .window_heading .round_number .selection_icon {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    align-self: center;
    margin: 0 0 0 5px;
  }
  .window_heading .round_number .triangle.down {
    -webkit-mask-size: auto 12px;
    width: 12px;
    height: 12px;
    background: #fff;
  }

  // ----------------------------------------------------------------------

  /*! CSS Used from: http://yolo.tino.me/game/resources/css/styles.css */
  @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
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
  }
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
  input[type='tel'] {
    border: 0;
    outline: 0;
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
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 480px) {
    .bid_form .input_wrap {
      width: 190px;
    }
    .bid_form .currency_wrap {
      left: 200px;
      font-size: 1.1rem;
    }
    .bid_form .button_row .pg {
      font-size: 0.75rem;
      flex-flow: column;
    }
    .bid_form .button_row .pg div {
      display: flex;
      flex-flow: row;
    }
    .bid_form .button_row .pg strong {
      padding-right: 2px;
      padding-bottom: 2px;
    }
    .bid_form .button_row .bid_button_modal_wrap .payout {
      font-size: 0.7rem;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/place_bid.css */
  .bid_form * {
    font-weight: 300;
  }
  .bid_form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0 0 0;
    width: 100%;
  }
  .bid_form fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .bid_form label {
    font-size: 0.8rem;
    padding: 0 0 5px 0;
    text-align: center;
  }
  .bid_form .input_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .alerts_option_input {
    flex-flow: column;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    padding: 15px 0;
  }
  .alerts_option_input input[type='tel'] {
    background: rgba(55, 69, 96, 0.5);
    padding: 8px 16px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 300;
    width: 100%;
    line-height: 100%;
    text-align: center;
  }
  .alerts_option_input input[type='tel']:focus {
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
    outline: 0;
  }
  .bid_form .input_wrap input[type='tel'] {
    background: rgba(55, 69, 96, 0.5);
    padding: 10px 16px;
    color: #fff;
    border: 1px solid rgba(42, 109, 255, 0.9);
    border-radius: 10px;
    font-size: 1.9rem;
    font-weight: 300;
    width: 100%;
    line-height: 100%;
    text-align: center;
  }
  .alerts_option_input input[type='text'] {
    background: rgba(55, 69, 96, 0.5);
    padding: 8px 16px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 300;
    width: 100%;
    line-height: 100%;
    text-align: center;
  }
  .alerts_option_input input[type='text']:focus {
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
    outline: 0;
  }
  .bid_form .input_wrap input[type='text'] {
    background: rgba(55, 69, 96, 0.5);
    padding: 10px 16px;
    color: #fff;
    border: 1px solid rgba(42, 109, 255, 0.9);
    border-radius: 10px;
    font-size: 1.9rem;
    font-weight: 300;
    width: 100%;
    line-height: 100%;
    text-align: center;
  }
  .bid_form input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    text-align: center;
  }
  .bid_form input:focus {
    -webkit-box-shadow: 0 0 60px 0 rgba(42, 109, 255, 1);
    outline: 0;
  }
  .bid_form .bid_balance_remainder {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    width: 100%;
    margin: 0 0 15px 0;
  }
  .bid_form .bid_balance_remainder strong {
    padding: 0 0 0 5px;
    font-weight: 700;
  }
  .bid_form fieldset {
    position: relative;
  }
  .bid_form fieldset .currency_wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    justify-content: flex-start;
    position: absolute;
    right: 15px;
    top: 55px;
    transform: translateY(-50%);
    color: #2671c4;
  }
  .bid_form .button_row {
    display: flex;
    flex-direction: column;
    padding: 5px 0 0 0;
    width: 100%;
  }
  .bid_button_modal_wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bid_button_modal_wrap button {
    border-radius: 15px;
    width: 100%;
    padding: 15px 15px;
    font-size: 1rem;
    margin: 0 2px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .bid_button_modal_wrap button .bid_copy {
    font-weight: 500;
  }
  .bid_form .button_row .pg {
    font-weight: 300;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  .bid_form .button_row .pg strong {
    padding-right: 9px;
    opacity: 0.9;
    font-size: 0.8rem;
  }
  .bid_form .button_row .bid_button_modal_wrap .payout {
    padding: 2px 4px;
    border-radius: 5px;
    font-size: 0.8rem;
    margin: 0 0 0 3px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.15);
  }
  .button_row_wrapper {
    width: 100%;
    background-image: linear-gradient(#00870d, #238b48, #275e64, #005f09, #333843, #680023, #66386f, #923267, #af0b42);
    background-image: linear-gradient(
      180deg,
      rgba(0, 135, 13, 1) 0%,
      rgba(0, 113, 11, 1) 14%,
      rgba(0, 96, 9, 1) 23%,
      rgba(0, 82, 8, 1) 38%,
      rgba(51, 56, 67, 1) 50%,
      rgba(104, 0, 35, 1) 62%,
      rgba(119, 7, 45, 1) 78%,
      rgba(150, 9, 57, 1) 89%,
      rgba(175, 11, 66, 1) 100%
    );
    clip-path: polygon(
      0 0,
      100% 0,
      100% 19%,
      0 19%,
      0 20%,
      100% 20%,
      100% 39%,
      0 39%,
      0 40%,
      100% 40%,
      100% 60%,
      0 60%,
      0 61%,
      100% 61%,
      100% 80%,
      0 80%,
      0 81%,
      100% 81%,
      100% 100%,
      0 100%
    );
    border-radius: 15px;
  }
  .bid_form .button_row_wrapper .button_row {
    padding: 0;
  }
  .bid_form .button_row_wrapper .button_row button:hover {
    -webkit-box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
    box-shadow: 0 0 30px 0 rgb(0 0 0 / 30%);
    border-radius: 0;
  }
  /*! CSS Used from: Embedded */
  .bid_button_modal_wrap button {
    opacity: 0.5;
    cursor: not-allowed;
    opacity: 1;
    cursor: pointer;
  }
  /*! CSS Used from: Embedded */
  .bid_button_modal_wrap button {
    opacity: 0.5;
    cursor: not-allowed;
    opacity: 1;
    cursor: pointer;
  }
  .field_error {
    margin: 0 auto 5px auto;
    color: rgb(255, 0, 0);
    font-size: 0.8rem;
    font-weight: 600;
  }
`
