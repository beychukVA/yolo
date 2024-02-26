import styled, { css } from 'styled-components'

const designerCSS = css`
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  z-index: 2;
  overflow-y: hidden;
`

export const Main = styled.div`
  ${designerCSS}
`
