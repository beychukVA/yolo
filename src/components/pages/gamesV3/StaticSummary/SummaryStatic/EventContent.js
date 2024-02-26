import styled, { css } from 'styled-components'

const designerCSS = css`
  display: block;

  & > ul {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    white-space: nowrap;
    padding: 5px 0;
    align-items: flex-start;
    cursor: pointer;
  }

  /* & > ul:hover {
    & li {
      text-decoration: underline;
    }
  } */

  & > ul .now {
    color: hsl(221, 75%, 47%);
    font-weight: 800;
  }

  & ul span {
    display: block;
    font-weight: 800;
  }

  & > ul > a {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 5px 0 0 0;
    font-size: 0.7rem;
    border-bottom: 1px dotted hsla(0, 0%, 100%, 0.4);
  }

  & .event_title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`

export const EventContent = styled.div`
  ${designerCSS}
`
