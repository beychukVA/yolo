import styled, { css } from 'styled-components'

const designerCSS = css`
  padding: 0 0 0 10px;
  line-height: 100%;
  font-size: 0.9rem;
  font-weight: 600;
`

const devCSS = css`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

export const ProfileName = styled.div`
  ${designerCSS}
  ${devCSS}
`
