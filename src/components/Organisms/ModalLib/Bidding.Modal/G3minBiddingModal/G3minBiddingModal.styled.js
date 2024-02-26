import { icons } from 'common'
import styled, { css } from 'styled-components'

const biddingModalDesignCSS = css`
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
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .window_heading .round_number:hover .round {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
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
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
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
  .amount_suggestions {
    display: flex;
    margin: 5px 0 20px 0;
  }
  .amount_suggestions a {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0 3px 0 0;
    text-align: center;
    width: 100%;
    height: 36px;
  }
  .amount_suggestions a:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .amount_suggestions a:nth-child(2) {
    border-radius: 0;
  }
  .amount_suggestions a:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
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
  .bid_button_modal_wrap.down button {
    background: linear-gradient(0deg, rgba(175, 11, 66, 1) 0%, rgba(226, 14, 85, 1) 100%);
    background: #af0b42;
  }
  .bid_button_modal_wrap.up button {
    background: linear-gradient(0deg, rgba(0, 135, 13, 1) 0%, rgba(1, 168, 17, 1) 100%);
    background: #00870d;
  }
  .bid_button_modal_wrap.down button:hover {
    background: rgba(226, 14, 85, 1);
  }
  .bid_button_modal_wrap.up button:hover {
    background: rgba(1, 168, 17, 1);
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
  .bid_form .button_row .bid_button_modal_wrap.down .payout {
    background: linear-gradient(0deg, rgba(175, 11, 66, 0.5) 0%, rgba(226, 14, 85, 0.5) 100%);
    background: rgba(255, 255, 255, 0.2);
  }
  .bid_form .button_row .bid_button_modal_wrap.up .payout {
    background: linear-gradient(0deg, rgba(0, 135, 13, 0.5) 0%, rgba(1, 168, 17, 0.5) 100%);
    background: rgba(255, 255, 255, 0.2);
  }
  /*! CSS Used from: Embedded */
  .bid_button_modal_wrap button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .bid_button_modal_wrap button {
    opacity: 1;
    cursor: pointer;
  }
`

const biddingModalCustomCSS = css`
  .amount_suggestions div {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0 3px 0 0;
    text-align: center;
    width: 100%;
    height: 36px;
    cursor: pointer;
  }
  .amount_suggestions div:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .amount_suggestions div:nth-child(2) {
    border-radius: 0;
  }
  .amount_suggestions div:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
  }
  .field_error {
    margin: 0 auto;
    color: rgb(255, 0, 0);
    font-size: 0.8rem;
    font-weight: 600;
  }
`

export const G3minBiddingModalStyled = styled.div`
  width: 100%;

  ${biddingModalDesignCSS}
  ${biddingModalCustomCSS}
`
