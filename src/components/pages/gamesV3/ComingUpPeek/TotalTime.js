import styled, { css } from 'styled-components'

const designerCSS = css`
  /* font-size: 0.65rem; */
  /* text-transform: uppercase; */
  /* background: rgb(20,39,77); */
  /* background: rgba(0, 0, 0, 0.2); */
  /* padding: 7px 6px 5px 6px; */
  /* line-height: 100%; */
  /* border-radius: 5px; */

  font-size: 0.55rem;
  font-weight: 500;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 5px 3px 5px;
  line-height: 100%;
  border-radius: 5px;
  display: flex;
  white-space: nowrap;
  margin: 1px 2px 0 0;
`

export const TotalTime = styled.div`
  ${designerCSS}
`
