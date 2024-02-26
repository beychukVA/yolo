import styled, { css } from 'styled-components'

const designerCSS = css`
  .round_length {
    font-size: 0.65rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    padding: 3px 4px 1px 4px;
    line-height: 100%;
    margin: 0 0 0 4px;
  }
`
const developerCSS = css``

export const YourBidsStyled = styled.div`
  ${designerCSS}
  ${developerCSS}
`
