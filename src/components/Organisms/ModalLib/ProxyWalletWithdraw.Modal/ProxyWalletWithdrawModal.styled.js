import styled, { css } from 'styled-components'

const modalWrapperCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/withdraw_code.css */
  .withdraw_code_content {
    flex-flow: column;
    display: flex;
  }
  .withdraw_code_content form {
    flex-flow: column;
  }
  .withdraw_code_content .section_title {
    padding: 0 0 10px 0;
    color: rgba(255, 255, 255, 1);
    font-size: 1.2rem;
    font-weight: 600;
  }
  .withdraw_code_content .page_instructions,
  .withdraw_code_content .page_instructions div {
    display: block;
  }
  .withdraw_code_content .page_instructions div {
    padding: 0;
  }
  .withdraw_code_content .page_instructions a {
    display: inline-block;
  }
  fieldset.digit_6_confirmation {
    width: fit-content;
    min-width: 350px;
    background: rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 10px;
    outline: 0;
    border: 0;
    margin: 15px 0 0 0;
    flex-flow: column;
    justify-content: center;
  }
  fieldset.digit_6_confirmation div {
    justify-content: space-between;
  }
  fieldset.digit_6_confirmation input[type='number'] {
    font-size: 1.6rem;
    font-weight: 500;
    color: #000;
    padding: 10px;
    width: 45px;
    line-height: 100%;
    text-align: center;
    border-radius: 10px;
    border: 0;
    margin-right: 2px;
  }
  fieldset.digit_6_confirmation input[type='number']:last-child {
    margin: 0;
  }
  fieldset.digit_6_confirmation .field_error {
    width: 100%;
    font-size: 0.8rem;
    text-wrap: space;
    color: #de0e54;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  .withdraw_code_content form button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-size: 0.9rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  @media (max-width: 480px) {
    fieldset.digit_6_confirmation {
      min-width: 320px;
    }
    fieldset.digit_6_confirmation input[type='number'] {
      font-size: 1.4rem;
      font-weight: 500;
      color: #000;
      padding: 10px;
      width: 40px;
    }
  }
`

const customAdjustmentCSS = css`
  fieldset.digit_6_confirmation {
    min-width: auto;
    width: 100%;
    display: flex;
    align-items: center;
  }
  fieldset.digit_6_confirmation.with_error {
    border-radius: 10px 10px 0 0;
    padding-bottom: 12px;
  }
  fieldset.digit_6_confirmation input[type='text'] {
    font-size: 1.6rem;
    font-weight: 500;
    color: #000;
    padding: 10px;
    width: 46px;
    line-height: 100%;
    text-align: center;
    border-radius: 10px;
  }
  fieldset.digit_6_confirmation input[type='text']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  .resendCode {
    display: inline;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }

  .error_banner {
    display: flex;
    justify-content: center;
    text-wrap: space;
    font-size: 0.8rem;
    color: #fff;
    background: #a10a3d;
    margin: 0;
    line-height: 130%;
    padding: 12px 25px 12px 25px;
    border-radius: 0 0 10px 10px;
    text-align: center;
  }
`

export const ProxyWalletWithdrawStyled = styled.div`
  // ---- vvvv ---- CSS from designer ---- vvvv ----
  ${modalWrapperCSS}
  ${customAdjustmentCSS}
`
