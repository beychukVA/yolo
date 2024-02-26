import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 0 0;
  font-size: 0.6rem;
  font-weight: 600;
  padding-left: 7px;

  & label {
    padding: 2px 0 0 0;
  }
`

export const ComingUpDetails = styled.div`
  ${designerCSS}
`
