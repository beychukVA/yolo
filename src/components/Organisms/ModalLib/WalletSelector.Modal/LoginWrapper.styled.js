import { images } from 'common'
import styled, { css } from 'styled-components'

const loginInUpPanelCSS = css`
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

  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  .signin_modal_tabs_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .signin_modal_tabs_wrapper .tab {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0 2px;
    background: transparent;
    border-bottom: 0;
    display: inline-block;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
  }
  .signin_modal_tabs_wrapper .panels {
    width: 100%;
    overflow: hidden;
    margin: 15px 0 0 0;
  }
  .signin_modal_tabs_wrapper .panel {
    display: none;
    animation: fadein 0.8s;
    width: 100%;
    padding: 0;
    background: transparent;
    flex-flow: row;
  }
  .signin_modal_tabs_wrapper .radio {
    display: none;
  }
  .signin_modal_tabs_wrapper #one:checked ~ .panels #one-panel,
  .signin_modal_tabs_wrapper #two:checked ~ .panels #two-panel {
    display: flex;
    align-items: flex-start;
  }
  .signin_modal_tabs_wrapper #one:checked ~ .tabs #one-tab,
  .signin_modal_tabs_wrapper #two:checked ~ .tabs #two-tab {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    margin-left: -1px;
    color: #b3cbff;
    text-shadow: 0 0 10px rgba(42, 109, 255, 1);
  }
  .signin_wrapper {
    flex-flow: column;
    display: flex;
    margin: 0 10px 0 0;
    padding: 0 400px 0 0;
  }

  .signin_wrapper form {
    flex-flow: column;
  }
  .signin_wrapper form fieldset {
    flex-flow: column;
    border: 0;
    min-width: 300px;
    margin: 15px 0 0 0;
  }
  .signin_wrapper form label,
  .connect_crypto_network_wrapper label {
    font-weight: 600;
    display: flex;
    margin: 0 0 0 0;
    font-size: 0.8rem;
  }
  .connect_crypto_network_wrapper label {
    margin: 0 0 10px 0;
  }
  .signin_wrapper .forgot_password {
    margin: 5px 0 0 0;
    font-size: 0.75rem;
  }
  .signin_wrapper form input[type='text'],
  .signin_wrapper form input[type='password'] {
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    width: 100%;
    color: #000;
    line-height: 100%;
    outline: 0;
    border: 1px solid #fff;
    position: relative;
    z-index: 0;
  }
  .signin_wrapper form input[type='text']:focus,
  .signin_wrapper form input[type='password']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  .signin_wrapper label .required_ast {
    color: rgb(255, 0, 0);
    font-size: 1rem;
    line-height: 150%;
    padding: 0 0 0 0.3em;
  }
  .signin_wrapper form .field_error {
    color: rgb(255, 0, 0);
    margin: 5px 0 0 0;
    font-size: 0.8rem;
  }
  .signin_wrapper form button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-size: 0.9rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  .signin_marketing_panel {
    background: url(${images.signin_bg}) center center / auto auto no-repeat;
    background-position: -90px -250px;
    height: 100%;
    width: 400px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 10px 10px 0;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: space-between;
    padding: 60px 30px 20px 30px;
  }
  .signin_marketing_panel .yolorekt_logo {
    width: 75%;
  }
  .signin_marketing_panel .access_statement {
    font-size: 0.75rem;
    text-align: center;
  }
  .wallet_list {
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    white-space: wrap;
    align-items: center;
    justify-content: flex-start;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    -webkit-box-shadow: 0 1px 49px 0px rgb(0 0 0 / 50%);
    box-shadow: 0 1px 49px 0px rgb(0 0 0 / 50%);
  }
  .single_wallet {
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    margin: 0 0 3px 0;
  }
  .single_wallet:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  .connect_crypto_network_wrapper {
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin: 20px 0 0 0;
    padding: 20px 0 0 0;
    width: 300px;
  }
  @media (max-width: 980px) {
    .signin_wrapper {
      padding: 0;
      margin: 0;
    }
    .signin_marketing_panel {
      display: none;
    }
  }
  @media (max-width: 375px) {
    .modaloverlay .close {
      left: 4px !important;
      top: 4px !important;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 480px) {
    .modaloverlay .close {
      left: -8px;
      top: -8px;
    }
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
`
const forgotPswPanelCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/wallet_menu.css */
  /* .signin_modal_tabs_wrapper .panel {
    display: flex;
    animation: fadein 0.8s;
    width: 100%;
    padding: 0;
    background: transparent;
    flex-flow: row;
  } */
  .signin_modal_tabs_wrapper #hidden_pr:checked ~ .panels #hidden_pr-panel {
    display: flex;
    align-items: flex-start;
  }
  .password_reset_content {
    flex-flow: column;
    display: flex;
    margin: 0 10px 0 0;
    padding: 0 400px 0 0;
    width: 400px;
  }
  .password_reset_content form {
    flex-flow: column;
  }
  .password_reset_content .section_title {
    padding: 0 0 10px 0;
    color: rgba(255, 255, 255, 1);
    font-size: 1.2rem;
    font-weight: 600;
  }
  .password_reset_content .page_instructions,
  .password_reset_content .page_instructions div {
    display: block;
  }
  .password_reset_content .page_instructions div {
    padding: 0;
  }
  .password_reset_content .page_instructions a {
    display: inline-block;
  }
  fieldset.digit_6_confirmation {
    width: fit-content;
    min-width: 350px;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 10px;
    outline: 0;
    border: 0;
    margin: 15px 0;
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
    width: 46px;
    line-height: 100%;
    text-align: center;
    border-radius: 10px;
  }
  fieldset.digit_6_confirmation .field_error {
    width: 100%;
    font-size: 0.8rem;
    color: #de0e54;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  form.new_password {
    margin: 0;
  }
  form.new_password fieldset {
    flex-flow: column;
    border: 0;
    width: fit-content;
    margin: 15px 0 0 0;
  }
  form.new_password fieldset label {
    padding: 0 0 6px 0;
  }
  form.new_password fieldset label {
    font-weight: 600;
    display: flex;
    margin: 0;
  }
  form.new_password fieldset input[type='text'] {
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    width: 100%;
    color: #000;
    line-height: 100%;
    outline: 0;
    border: 1px solid #fff;
    position: relative;
    z-index: 0;
    max-width: 400px;
    min-width: 350px;
  }
  form.new_password fieldset input[type='text']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  form.new_password fieldset label .required_ast {
    color: #de0e54;
    font-size: 1rem;
    line-height: 150%;
    padding: 0 0 0 0.3em;
  }
  form.new_password .field_error {
    color: #de0e54;
    margin: 5px 0 0 0;
  }
  form.new_password fieldset button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-size: 0.9rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }
  form.new_password .return_to_signin {
    display: block;
    margin: 10px 0 0 0;
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
    form.new_password fieldset input[type='text'] {
      min-width: 320px;
    }
  }
`

const forgotPasswordPanelCSS = css`
  .password_reset_content {
    width: 100%;
  }
  .password_reset_content * {
    display: flex;
  }
  .password_reset_content form {
    flex-flow: column;
  }
  .password_reset_content .page_instructions,
  .password_reset_content .page_instructions div {
    display: block;
  }
  .password_reset_content .page_instructions div {
    padding: 5px 0;
  }
  .password_reset_content .page_instructions a {
    display: inline-block;
  }
  fieldset.digit_6_confirmation {
    width: fit-content;
    min-width: 350px;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 10px;
    outline: 0;
    border: 0;
    margin: 15px 0;
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
    width: 46px;
    line-height: 100%;
    text-align: center;
    border-radius: 10px;
  }
  fieldset.digit_6_confirmation .field_error {
    width: 100%;
    font-size: 0.8rem;
    color: #de0e54;
    margin: 10px 0 0 0;
    line-height: 100%;
  }

  form.new_password {
    margin: 15px 0 0 0;
  }
  form.new_password fieldset {
    flex-flow: column;
    border: 0;
    width: fit-content;
    margin: 15px 0 0 0;
  }
  form.new_password fieldset label {
    padding: 0 0 6px 0;
  }
  form.new_password fieldset .required label {
    padding: 0;
  }
  form.new_password fieldset label {
    font-weight: 600;
    display: flex;
    margin: 0;
  }
  form.new_password fieldset .forgot_password {
    margin: 5px 0 0 0;
    font-size: 0.75rem;
  }
  form.new_password fieldset input[type='text'] {
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    width: 100%;
    color: #000;
    line-height: 100%;
    outline: 0;
    border: 1px solid #fff;
    position: relative;
    z-index: 0;
    max-width: 400px;
    min-width: 350px;
  }
  form.new_password fieldset input[type='text']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  form.new_password fieldset label .required_ast {
    color: #de0e54;
    font-size: 1rem;
    line-height: 150%;
    padding: 0 0 0 0.3em;
  }
  form.new_password .field_error {
    color: #de0e54;
    margin: 5px 0 0 0;
  }
  form.new_password fieldset button {
    background: rgba(29, 75, 175, 1);
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-size: 0.9rem;
    margin: 10px 0 0 0;
    line-height: 100%;
  }

  @media (max-width: 1200px) {
    body#default-page .content {
      padding: 60px 80px;
    }
  }
  @media (max-width: 600px) {
    body#default-page .content {
      padding: 30px;
    }
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
    form.new_password fieldset input[type='text'] {
      min-width: 320px;
    }
  }
`
const customAdjustmentCSS = css`
  .signin_modal_tabs_wrapper .panel {
    display: flex;
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
    border: 1px solid transparent;
  }
  fieldset.digit_6_confirmation input[type='text']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  form.new_password fieldset input[type='password'] {
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    width: 100%;
    color: #000;
    line-height: 100%;
    outline: 0;
    border: 1px solid #fff;
    position: relative;
    z-index: 0;
    max-width: 400px;
    min-width: 350px;
  }
  form.new_password fieldset input[type='password']:focus {
    border: 1px solid #2a6dff;
    outline: 0;
    -webkit-box-shadow: 0 0 20px 0 rgba(42, 109, 255, 0.3);
  }
  /* password */
  .return_to_signin {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  .forgot_password {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  .resendCode {
    display: inline;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 480px) {
    fieldset.digit_6_confirmation input[type='text'] {
      font-size: 1.4rem;
      font-weight: 500;
      color: #000;
      padding: 10px;
      width: 40px;
    }
  }
  .connect_crypto_network_wrapper {
    height: 192px;
    border: none;
  }
`
export const LoginWrapperStyled = styled.div`
  // ---- vvvv ---- CSS from designer ---- vvvv ----
  ${loginInUpPanelCSS}
  ${forgotPswPanelCSS}
  ${forgotPasswordPanelCSS} 
  ${customAdjustmentCSS}
`
