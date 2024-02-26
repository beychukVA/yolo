import styled, { css } from 'styled-components'

const designerCSS = css`
  margin-top: 20px;

  & li {
    font-weight: 300;
    display: flex;
    align-items: center;
  }
`

const devCSS = css`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

export const StaticSummary = styled.div`
  ${designerCSS}
  ${devCSS}
`
