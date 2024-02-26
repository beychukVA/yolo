import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  flex-flow: row;
  overflow: hidden;
  align-items: center;
  position: absolute;
  height: 60px;
  width: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`

const devCSS = css``

export const ChatHeaderMenu = styled.div`
  ${designerCSS}
  ${devCSS}
`
