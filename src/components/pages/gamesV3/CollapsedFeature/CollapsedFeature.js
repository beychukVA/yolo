import styled, { css } from 'styled-components'

const designerCSS = css`
  height: 59px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`

const devCSS = css`
  display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
`

export const CollapsedFeature = styled.div`
  ${designerCSS}
  ${devCSS}
`
