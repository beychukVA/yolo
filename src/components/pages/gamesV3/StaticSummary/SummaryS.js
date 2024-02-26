import styled, { css } from 'styled-components'

const designerCSS = css`
  border-bottom: 1px solid rgb(45, 52, 62);
  display: flex;
  background-color: hsl(213, 19%, 11%);
  z-index: 1;
  position: relative;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px 20px;
  transition-property: color, background-color;

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
    width: 100%;
  }
`

export const SummaryS = styled.summary`
  ${designerCSS}
`
