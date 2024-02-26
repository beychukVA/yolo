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
  top: 10px;
  z-index: 3;

  @media (max-width: 1600px) {
    z-index: 3;
  }
  @media (max-width: 800px) {
    z-index: 3;
    width: 30px;
    padding: 20px 0;
  }
`

const devCSS = css`
  left: ${({ isOpen }) => (isOpen ? '350px' : '40px')};

  @media (max-width: 800px) {
    left: ${({ isOpen }) => (isOpen ? '350px' : '0')};
  }
`

export const TogButton = styled.label`
  ${designerCSS}
  ${devCSS}
`
