import styled, { css } from 'styled-components'

const designerCSS = css`
  overflow: auto;
  display: flex;
  height: 100%;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  margin-left: auto;
  cursor: pointer;
  opacity: 0.4;
  transition: all 500ms ease;

  &:hover {
    opacity: 1;
  }
`

export const CardSort = styled.div`
  ${designerCSS}
`
