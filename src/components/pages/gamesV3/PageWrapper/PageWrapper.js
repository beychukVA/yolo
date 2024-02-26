import styled, { css } from 'styled-components'

const designerCSS = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: hsl(222, 17%, 10%);
`

export const PageWrapper = styled.div`
  ${designerCSS}
`
