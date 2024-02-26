import styled, { css } from 'styled-components'
import { icons } from 'common'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/gameplay_top.css */
  .live_game_data_left {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
  }
  .live_game_data_left .round_number {
    font-size: 1.2rem;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 200;
    line-height: 110%;
    margin: 4px 0 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-flow: row;
  }
  .live_game_data_left .round_number div {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 110%;
    padding: 0 0 0 6px;
  }
  .live_game_data_left .round_date_span {
    font-size: 1rem;
    font-weight: 300;
  }
  @media (max-width: 600px) {
    .live_game_data_left {
      order: 3;
    }
    .live_game_data_left {
      flex-flow: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 20px;
    }
    .live_game_data_left .round_number {
      flex-flow: column;
      font-size: 0.85rem;
    }
    .live_game_data_left .round_number div {
      padding: 0;
      font-size: 1rem;
    }
    .live_game_data_left .round_date_span {
      font-size: 0.8rem;
      width: 55px;
      line-height: 120%;
      text-align: right;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/res.css */
  @media (max-width: 480px) {
    .live_game_data_left .round_number {
      font-size: 0.9rem;
      margin: 0;
    }
  }
`
const customAdjustments = css``
export const CssPageWrapper = styled.div`
  ${designerCSS}
  ${customAdjustments}
`
