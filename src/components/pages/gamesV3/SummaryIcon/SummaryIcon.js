import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 20px;
  z-index: 1;
`

const devCSS = css`
  -webkit-mask: url(${({ icon }) => icon}) center center / 16px 16px no-repeat;
  mask: url(${({ icon }) => icon}) center center / 16px 16px no-repeat;
  background: ${({ status }) => (status ? '#9343e0' : 'rgb(255, 255, 255)')};
`

export const SummaryIcon = styled.div`
  ${designerCSS}
  ${devCSS}
`
