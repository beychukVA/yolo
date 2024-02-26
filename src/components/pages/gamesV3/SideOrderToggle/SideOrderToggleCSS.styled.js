import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game_v3/resources/css/games_panel.css */

  .row {
    flex-flow: row;
    justify-content: space-between;
    margin: 0;
    padding: 0 20px;
    display: flex;
  }
  .row.subtitle {
    font-weight: 600;
    font-size: 0.8rem;
    margin: 0 0 14px 0;
    text-transform: uppercase;
  }
  .subtitle {
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  details.perpetual_futures .subtitle {
    align-items: flex-start;
  }
  .pd_switch_wrapper {
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 20px;
  }
  .pd_switch_wrapper .pd_bg {
    position: relative;
    width: 100%;
    background-color: hsla(126, 100%, 38%, 0.2);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.1s;
    border-radius: 15px;
  }
  .pd_switch_wrapper .pd_content {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    transform: translateY(5%);
  }
  .pd_switch_wrapper label,
  .pd_switch_wrapper .pd_toggle {
    height: 35px;
    border-radius: 15px;
  }
  .pd_switch_wrapper label {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: relative;
    padding: 0;
    cursor: pointer;
  }
  .pd_switch_wrapper .pd_toggle {
    position: absolute;
    width: 50%;
    background-color: hsla(126, 100%, 38%, 1);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .pd_switch_wrapper .names {
    width: 100%;
    padding: 0 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    user-select: none;
  }
  .pd_switch_wrapper .names p {
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .pd_switch_wrapper p.down {
    opacity: 0.5;
    font-weight: 300;
  }
  .pd_switch_wrapper [type='checkbox'] {
    display: none;
  }
  .pd_switch_wrapper [type='checkbox']:checked + .price_direction_switch .pd_toggle {
    transform: translateX(100%);
    background-color: hsla(340, 88%, 46%, 1);
  }
  .pd_switch_wrapper [type='checkbox']:checked + .price_direction_switch .down {
    opacity: 1;
    font-weight: 700;
  }
  .pd_switch_wrapper [type='checkbox']:checked + .price_direction_switch .up {
    opacity: 0.5;
    font-weight: 300;
  }
  .pd_switch_wrapper [type='checkbox']:checked + .price_direction_switch .pd_bg {
    background-color: hsla(340, 88%, 46%, 0.2);
    color: #fff;
  }

  .price_direction_icon {
    -webkit-mask-size: auto 14px;
    width: 14px;
    height: 14px;
  }
  .pd_switch_wrapper .price_direction_icon.down {
    background: #fff;
  }
  .pd_switch_wrapper .price_direction_icon.up {
    background: #fff;
    transform: rotate(180deg);
  }
`
const devCSS = css`
  .pd_switch_wrapper .pd_bg,
  .pd_switch_wrapper .pd_toggle,
  p {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`

export const SideOrderToggleCSS = styled.div`
  width: 100%;
  ${({ context }) => `.${context} ${designerCSS}`}
  ${({ context }) => `.${context} ${devCSS}`}
    .price_direction_icon {
    mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
    margin: 0 5px 0 0;
  }
`
