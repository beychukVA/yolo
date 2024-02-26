import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  width: 17px;
  height: 17px;
  padding: 20px 40px 20px 10px;
  cursor: pointer;
  -webkit-mask: url(${icons.panel_collapse_icon}) center center / 17px 15px no-repeat;
  mask: url(${icons.panel_collapse_icon}) center center / 17px 15px no-repeat;
  background: rgb(99, 104, 109);
  position: sticky;
  right: 360px;
  top: 10px;
  z-index: 2;

  @media (max-width: 1600px) {
    z-index: 3;
  }

  @media (max-width: 800px) {
    width: 30px;
    left: 0;
    padding: 20px 0;
  }
`

export const TogRightButton = styled.label`
  ${designerCSS}
`
