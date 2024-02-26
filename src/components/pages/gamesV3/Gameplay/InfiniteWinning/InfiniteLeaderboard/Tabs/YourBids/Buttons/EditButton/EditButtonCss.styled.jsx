import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */
  button.edit_tpsl {
    background: hsla(0, 0%, 100%, 0.1) url(${icons.edit_icon}) center center / 9px auto no-repeat;
    margin: 0 0 0 5px;
    padding: 10px;
    border-radius: 6px;
  }
`

export const EditButtonCss = styled.div`
  ${designerCSS}
`
