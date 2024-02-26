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
  fieldset {
    outline: 0;
    border: 0;
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
  input[type='text'] {
    border: 0;
    outline: 0;
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
  .content {
    height: calc(100% + 15px);
    height: 100%;
    transition: width 300ms ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 0 0 0 0;
    overflow: hidden;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/modal.css */
  .popUpContainer {
    width: 100%;
    min-width: 300px;
    max-width: 600px;
    position: fixed;
    left: 50%;
    top: -100vh;
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
    transform: translateX(-50%);
    -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    z-index: 99;
  }
  .popUpContainer.variable-width {
    width: fit-content;
    max-width: fit-content;
  }
  article {
    max-height: 800px;
    height: fit-content;
    background-color: hsla(214, 18%, 16%, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 0 0 10px 10px;
    padding: 0 30px 30px 0;
    display: flex;
    flex-direction: row;
  }
  header {
    z-index: 1;
    position: relative;
    top: 0;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    padding: 30px;
    background: hsla(214, 18%, 16%, 0.8);
    border-radius: 10px 10px 0 0;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    line-height: 130%;
  }
  a.closePopUp {
    top: -5px;
    left: -5px;
    mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    background: hsl(0, 0%, 100%);
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
    z-index: 1;
  }
  :target .popUpContainer {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transition: top 0.5s ease;
    -moz-transition: top 0.5s ease;
    -o-transition: top 0.5s ease;
    transition: top 0.5s ease;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/share-card.css */
  @media (max-width: 1200px) {
    a.closePopUp {
      left: 25px;
    }
  }
  @media (max-width: 600px) {
    article {
      height: fit-content !important;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/tpsl-edit.css */
  .popUpContainer.tpsl-edit article {
    padding: 0 0 15px 0;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
  .popUpContainer.tpsl-edit {
    width: fit-content;
  }
  .popUpContainer.tpsl-edit header {
    padding: 20px 30px 15px 30px;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    border: 0;
    text-align: center;
  }
  .popUpContainer.tpsl-edit .content {
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 0;
  }
  .popUpContainer.tpsl-edit .content.column {
    width: 100%;
    align-items: center;
    border-top: 0;
  }
  .popUpContainer.tpsl-edit .content.column.action_area {
    border-top: 1px solid hsla(0, 0%, 100%, 0.1);
    border-radius: 0 0 10px 10px;
    margin: 0;
    padding: 15px 30px;
    flex-direction: column;
    justify-content: center;
  }
  .popUpContainer.tpsl-edit button.save_profile {
    height: fit-content;
    padding: 12px 20px;
    font-size: 0.8rem;
    position: relative;
    margin: 0 0 5px 0;
    width: 100%;
  }
  .popUpContainer.tpsl-edit button.cancel_profile {
    height: fit-content;
    padding: 12px 20px;
    font-size: 0.8rem;
    position: relative;
    background: hsla(0, 0%, 100%, 0.2);
    width: 100%;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .switch_wrapper {
    display: flex;
    flex-flow: column;
    position: relative;
    padding: 0 30px;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option input[type='checkbox'] {
    margin: 0 8px 0 0;
    transform: scale(1.1);
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin {
    display: flex;
    margin: 0;
    padding-bottom: 0;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin {
    position: relative;
    flex-flow: column;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin .max,
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin .min {
    flex-direction: row;
    display: flex;
    margin: 0 0 10px 0;
    align-items: flex-start;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin fieldset {
    margin: 5px 15px 0 0;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin .max fieldset:nth-child(2),
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin .min fieldset:nth-child(2) {
    margin-right: 0;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin fieldset span {
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin strong {
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
    padding: 0 4px;
  }
  .popUpContainer.tpsl-edit .show_maxmin .cancel_check {
    margin: 0 0 10px 0;
    padding: 5px 0 15px 0;
    justify-content: flex-start;
    display: flex;
    font-size: 0.8rem;
    align-items: center;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  }
  .popUpContainer.tpsl-edit .show_maxmin .cancel_check:last-child {
    border: 0;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin input[type='text'] {
    background: hsl(217, 23%, 25%);
    padding: 10px 0 10px 16px;
    border-radius: 10px;
    font-size: 0.8rem;
    margin-top: 5px;
    width: fit-content;
    max-width: 150px;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin input[readonly] {
    background: transparent;
    padding-left: 0;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin input[readonly].tpsl_result_data {
    font-weight: 800;
    max-width: 70px;
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin input[readonly].tpsl_result_data.profit {
    color: hsl(126, 100%, 38%);
  }
  .popUpContainer.tpsl-edit .edit.pl_max-min_option .show_maxmin input[readonly].tpsl_result_data.loss {
    color: hsla(340, 88%, 46%, 1);
  }
`
const developerCSS = css`
  .popUpContainer {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .disabled {
    cursor: not-allowed !important;
    background: rgb(38, 60, 117);
  }
  div.closePopUp {
    top: -5px;
    left: -5px;
    mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
    background: hsl(0, 0%, 100%);
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
  }

  input.error {
    border: 1px solid hsla(360, 100%, 50%, 1);
  }
  .min_error {
    padding: 12px 15px 7px 15px;
    text-align: center;
    background: hsla(360, 100%, 16%, 1);
    margin: -10px 0 10px 0;
    border-radius: 0 0 10px 10px;
    line-height: 120%;
    position: relative;
    z-index: -1;
    font-size: 0.75rem;
    width: 100%;
    max-width: 240px;
  }
  @media (max-width: 1200px) {
    div.closePopUp {
      left: 25px;
    }
  }
`

export const OrderUpdateModalCss = styled.div`
  ${designerCSS}
  ${developerCSS}
`
