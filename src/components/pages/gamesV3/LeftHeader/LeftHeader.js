import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 350px;
  height: 70px;
  /* box-shadow: inset 0 0 0 2px hsla(340, 88%, 24%, 1); */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 3;

  @media (max-width: 800px) {
    width: 140px;
  }

  @media (max-width: 1600px) {
    width: 180px;
  }
`

export const LeftHeader = styled.div`
  ${designerCSS}
`
