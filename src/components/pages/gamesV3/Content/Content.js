import styled, { css } from 'styled-components'

const designerCSS = css`
  height: calc(100% + 15px);
  height: 100%;
  transition: width 300ms ease-in-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: #443875;
  padding: 0 0 0 0;
  overflow: hidden;
`

export const Content = styled.div`
  ${designerCSS}
`
