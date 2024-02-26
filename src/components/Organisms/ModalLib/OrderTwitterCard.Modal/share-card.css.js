import { icons, logos } from 'common'
import styled, { css } from 'styled-components'

export const designerCssShareCard = css`
  .card_wrapper {
    width: 1200px;
    height: 675px;
    /* background: url("../../resources/images/share-card/share-card_bg.jpg") center center / cover no-repeat; */
    background-image: url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QOBaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzUyMDhlY2EtNDMyNC00MWE3LThkOTAtNmJhNmNmNzI0MjU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQyMTc0NTdBOTZERTExRURBQzg4ODE4MkFBREJBMEZEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQyMTc0NTc5OTZERTExRURBQzg4ODE4MkFBREJBMEZEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4zIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzQ0M2JkZWItYjA4ZC00YmFkLWI1NmYtZTQ0NDM5YmNhZDA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM1MjA4ZWNhLTQzMjQtNDFhNy04ZDkwLTZiYTZjZjcyNDI1NSIvPiA8L3JkZjpEZXNjcmlwdGlv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');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
    display: flex;
    flex-direction: row;
  }
  .futures_logo svg {
    width: 100%;
    height: 90px;
  }
  .card_title {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px 15px 10px 0;
  }
  .card_wrapper .panel_left {
    width: 70%;
    width: 770px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 70px;
    background: hsla(0, 0%, 100%, 0.1);
  }
  .card_wrapper .panel_right {
    width: 30%;
    width: 430px;
    padding: 60px;
    /* border-left: 1px solid hsla(0,0%,100%,.4); */
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
  }
  .card_wrapper .panel_left .data_grid {
    display: flex;
    flex-direction: column;
  }
  .card_wrapper .panel_left .data_grid .row {
    display: flex;
    flex-direction: row;
    height: 60px;
  }
  .card_wrapper .panel_left .data_grid .row.main {
    padding: 0;
    height: 200px;
  }
  .card_wrapper .panel_left .data_grid .row label {
    width: 180px;
    padding: 0 20px 0 0;
    text-align: right;
    font-weight: 300;
    font-size: 2rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .card_wrapper .panel_left .data_grid .row .data {
    padding: 0 0 0 20px;
    text-align: left;
    font-weight: 700;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.9rem;
    font-weight: 600;
  }
  .card_wrapper .panel_left .data_grid .row .data .asset {
    flex-direction: row;
    display: flex;
    align-items: center;
    font-size: 1.9rem;
    font-weight: 600;
  }
  .card_wrapper .panel_left .data_grid .row .data .asset .asset_icon {
    width: 50px;
    height: 50px;
    margin: 0 10px 0 0;
  }
  .card_wrapper .panel_left .data_grid .row .data.roi {
    font-size: 5.5rem;
    letter-spacing: -0.05em;
    color: hsl(126, 100%, 45%);
    font-weight: 700;
  }
  .card_wrapper .panel_right .yolorekt_logo {
    background: url(${logos.yolorekt_logo_inline}) right center / auto 100% no-repeat;
    width: 100%;
    margin: 30px 0 0 0;
    height: 55px;
    display: block;
  }
  .card_wrapper .panel_right .referral_message {
    text-align: right;
    font-size: 1.5rem;
    line-height: 140%;
    font-weight: 300;
    padding: 40px 0 10px 0;
  }
  .card_wrapper .panel_right .referral_code {
    font-size: 2.8rem;
    font-weight: 700;
    padding: 15px 0 40px 0;
  }
  .card_wrapper .panel_right .qr_code img {
    width: 220px;
    height: 220px;
  }
  article.twitter_share .card_action_area {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0 0 0;
  }
  article.twitter_share button.post_to_twitter {
    width: fit-content;
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  @media (max-width: 1600px) {
  }

  @media (max-width: 1200px) {
    .popup article.full {
      margin: 0 30px;
    }
    /* .popup div.closePopUp {
      left: 25px;
    } */
    .card_wrapper {
      width: 100%;
      max-width: 1200px;
    }
    .card_wrapper .panel_left {
      width: 70%;
      padding: 45px;
    }
    .card_wrapper .panel_right {
      padding: 30px;
      width: 30%;
    }

    .card_wrapper .panel_left .data_grid .row .data.roi {
      font-size: 4.5rem;
      letter-spacing: -0.03em;
    }
    .card_wrapper .panel_right .qr_code img {
      width: 150px;
      height: 150px;
    }
    .card_wrapper .panel_right .referral_message {
      font-size: 1.2rem;
      line-height: 130%;
      padding: 40px 0 10px 0;
    }
    .card_wrapper .panel_right .referral_code {
      font-size: 2.3rem;
      padding: 15px 0 40px 0;
    }
    .card_wrapper .panel_right .yolorekt_logo {
      margin: 30px 0 0 0;
      height: 40px;
    }
  }
  @media (max-width: 1000px) {
    .card_wrapper {
      height: 500px;
    }
    .card_wrapper .panel_left .data_grid .row.main {
      height: 150px;
    }
    .futures_logo svg {
      height: 50px;
    }
    .card_wrapper .panel_left .data_grid .row {
      height: 50px;
    }
    .card_wrapper .panel_left .data_grid .row label {
      width: 140px;
      padding-right: 10px;
    }
    .card_wrapper .panel_left .data_grid .row .data {
      padding-left: 10px;
    }
    .card_wrapper .panel_left .data_grid .row label,
    .card_wrapper .panel_left .data_grid .row .data,
    .card_wrapper .panel_left .data_grid .row .data .asset {
      font-size: 1.6rem;
    }
    .card_wrapper .panel_left .data_grid .row .data .asset .asset_icon {
      width: 35px;
      height: 35px;
    }
    .card_wrapper .panel_left .data_grid .row .data {
    }
    .card_wrapper .panel_left {
      width: 60%;
      padding: 40px 30px;
    }
    .card_wrapper .panel_right {
      width: 40%;
    }
    .card_wrapper .panel_left .data_grid .row .data.roi {
      font-size: 3.2rem;
      letter-spacing: -0.03em;
    }
    .card_wrapper .panel_right .yolorekt_logo {
      margin: 10px 0 0 0;
    }
    .card_wrapper .panel_right .qr_code img {
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: 800px) {
    .card_wrapper {
      flex-direction: column;
      height: auto;
    }
    .futures_logo svg {
      height: 40px;
    }
    .card_wrapper .panel_left {
      width: 100%;
      position: relative;
      padding: 30px 30px 20px 30px;
    }
    .card_wrapper .panel_right {
      width: 100%;
      /* flex-direction: row;*/
      align-items: flex-start;
      position: relative;
    }
    .card_wrapper .panel_left .data_grid .row.main {
      height: auto;
    }
    .card_wrapper .panel_right .yolorekt_logo {
      margin: 0;
    }
    .card_wrapper .panel_right .yolorekt_logo {
      display: none;
    }
    .card_wrapper .panel_left .data_grid {
      width: 100%;
      flex-wrap: wrap;
      flex-direction: row;
      margin: 20px 0 0 0;
    }
    .card_wrapper .panel_left .data_grid .row.main {
      position: absolute;
      top: 30px;
      right: 30px;
    }
    .card_wrapper .panel_left .data_grid .row .data.roi {
      font-size: 2.4rem;
      letter-spacing: -0.01em;
    }
    .card_wrapper .panel_left .data_grid .row {
      width: 50%;
      height: 40px;
    }
    .card_wrapper .panel_left .data_grid .row label {
      width: 120px;
    }
    .card_wrapper .panel_left .data_grid .row label,
    .card_wrapper .panel_left .data_grid .row .data,
    .card_wrapper .panel_left .data_grid .row .data .asset {
      font-size: 1.2rem;
    }
    .card_wrapper .panel_right .referral_message {
      padding: 0;
      font-size: 1rem;
      text-align: left;
      margin-right: 120px;
    }
    .card_wrapper .panel_right .qr_code img {
      position: absolute;
      top: 30px;
      right: 30px;
    }
    .card_wrapper .panel_right .referral_code {
      font-size: 1.6rem;
      padding: 15px 0 0 0;
    }
    .card_wrapper .panel_right .qr_code img {
      width: 80px;
      height: 80px;
    }
  }
  @media (max-width: 600px) {
    .popup article {
      height: fit-content !important;
    }
    .card_wrapper .panel_left {
      align-items: center;
    }
    .card_wrapper .panel_left .data_grid .row label,
    .card_wrapper .panel_left .data_grid .row .data,
    .card_wrapper .panel_left .data_grid .row .data .asset {
      font-size: 1rem;
    }
    .card_wrapper .panel_left .data_grid {
      flex-direction: column;
      flex-wrap: nowrap;
      width: auto;
      margin: 10px 0 0 -10px;
    }
    .card_wrapper .panel_left .data_grid .row {
      height: 30px;
      width: 100%;
      justify-content: flex-start;
    }
    .card_wrapper .panel_left .data_grid .row label {
      width: 90px;
    }
    .card_wrapper .panel_left .data_grid .row label {
      padding-right: 5px;
    }
    .card_wrapper .panel_left .data_grid .row .data {
      padding-left: 5px;
    }
    .card_wrapper .panel_left .data_grid .row.main {
      position: relative;
      top: auto;
      right: auto;
      height: 30px;
    }
    .card_wrapper .panel_left .data_grid .row .data.roi {
      font-size: 1rem;
      letter-spacing: 0;
    }
    .card_wrapper .panel_left .data_grid .row .data .asset .asset_icon {
      width: 25px;
      height: 25px;
      margin: 0 5px 0 0;
    }
    .card_wrapper .panel_right .referral_message {
      font-size: 0.9rem;
      margin-right: 100px;
    }
    .card_wrapper .panel_right .referral_code {
      padding: 10px 0 0 0;
      font-size: 1.3rem;
    }
  }
`