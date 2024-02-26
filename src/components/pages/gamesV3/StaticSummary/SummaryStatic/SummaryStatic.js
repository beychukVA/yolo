import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  flex-direction: column;
  cursor: default;
  padding: 15px 20px;
  height: auto;
  background: hsl(216, 16%, 22%);
`

export const SummaryStatic = styled.div`
  ${designerCSS}
`
