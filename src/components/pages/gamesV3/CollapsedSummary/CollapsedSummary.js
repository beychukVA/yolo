import styled, { css } from 'styled-components'

const designerCSS = css`
  & > h1 {
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row;
    display: flex;
    margin: 1px 0 0 0;
    padding: 0 0 0 26px;
    overflow: hidden;
    white-space: nowrap;
  }
`

const devCSS = css`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  & > h1 {
    color: ${({ status }) => (status ? '#9343e0' : 'rgb(255, 255, 255)')};
  }
`

export const CollapsedSummary = styled.div`
  ${designerCSS}
  ${devCSS}
`
