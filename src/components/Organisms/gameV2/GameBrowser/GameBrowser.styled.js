import styled, { css } from 'styled-components'

const designerCSS = css`
  .asset_row .new_24 {
    font-size: 0.5rem;
    background: #2a6dff;
    padding: 3px 3px 3px 3px;
    line-height: 100%;
    border-radius: 3px;
    text-transform: normal;
    font-weight: 600;
    margin: 0 0 0 25px;
  }
`
const developerCSS = css``
export const GameBrowserStyled = styled.div`
  ${designerCSS}
  ${developerCSS}
`
