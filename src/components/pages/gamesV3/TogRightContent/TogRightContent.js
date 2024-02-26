import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 100%;
  /* height: calc(100% - 70px); */
  /* padding: 20px 10px 90px 0; */
  overflow: hidden;
  /* height: calc(100% - 70px); */
  height: 100%;
  font-size: 0.8rem;
`

const devCSS = css``

export const TogRightContent = styled.div`
  ${designerCSS}
  ${devCSS}
`
