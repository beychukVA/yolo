import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  height: 100%;
  /* background: hsl(212, 30%, 22%); */
  border-bottom: 1px solid hsl(220, 11%, 21%);
  transition: all 500ms ease;
`

export const DetailsSection = styled.div`
  ${designerCSS}
`
