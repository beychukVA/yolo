import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  -webkit-mask: url(${icons.events_icon}) center center / 16px 16px no-repeat;
  mask: url(${icons.events_icon}) center center / 16px 16px no-repeat;
  background: rgb(255, 255, 255);
  width: 16px;
  height: 16px;
  position: absolute;
  left: 20px;
  z-index: 1;
`

export const Icon = styled.div`
  ${designerCSS}
`
