import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 300px;
  height: 70px;
  /* box-shadow: inset 0 0 0 2px hsla(340, 88%, 24%, 1); */
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px 0 0;
  z-index: 3;

  @media (max-width: 800px) {
    width: 275px;
  }
`

export const RightHeader = styled.div`
  ${designerCSS}
`
