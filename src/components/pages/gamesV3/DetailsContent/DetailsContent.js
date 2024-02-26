import styled, { css } from 'styled-components'

const designerCSS = css`
  position: relative;
  z-index: 0;
  height: 100%;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  transition: all 1s;
  /* -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  transition: all 0.2s linear; */
  padding: 5px 0;
  opacity: 1;
`

export const DetailsContent = styled.div`
  ${designerCSS}
`
