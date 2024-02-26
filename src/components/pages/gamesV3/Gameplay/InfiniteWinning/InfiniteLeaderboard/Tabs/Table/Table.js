import styled, { css } from 'styled-components'

const scroll = css`
  /* ::-webkit-scrollbar {
    width: 7px;
    opacity: 0;
  }
  *:hover ::-webkit-scrollbar {
    opacity: 1;
  }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 20px;
    opacity: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(21, 26, 34, 0.4);
    border-radius: 20px;
  } */
`

export const Table = styled.div`
  display: grid;
  grid-template-columns: ${({ gridTemplate }) =>
    gridTemplate ? gridTemplate : '.25fr 1fr .75fr 1fr 1fr 1fr 1fr 1.5fr 1fr .50fr 1fr'};
  overflow-y: auto;
  width: 100%;

  ${scroll}
`
