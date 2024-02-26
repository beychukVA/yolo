import styled, { css } from 'styled-components'

const you = css`
  .you {
    background: hsla(255, 255%, 255%, 0.06);
    border-bottom: 0;
    text-shadow: 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%);
  }
`

const noShadow = css`
  .noShadow {
    background: hsla(255, 255%, 255%, 0.06);
    border-bottom: 0;
  }
`

export const TableContent = styled.div`
  display: contents;
  background: red;
  ${you}
  ${noShadow}
  &:hover {
    background: red;
  }
`
