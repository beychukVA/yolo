import styled, { css } from 'styled-components'

const designerCSS = css`
  overflow-x: auto;
  user-select: none;
  display: inline-block;
  text-align: center;
  padding: 6px 14px;
  min-width: 60px;
  line-height: 100%;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.5s;
`

const devCSS = css`
  background: ${({ selected }) => (selected ? 'hsl(215, 18%, 8%)' : 'transparen')};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
  text-shadow: ${({ selected }) =>
    selected
      ? `0 0 10px rgb(255 255 255 / 10%),
    0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%),
    0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%)`
      : 'none'};

  &:hover {
    background: ${({ selected }) => (selected ? 'transparen' : '#d6d6d6')};
  }
`

export const ChatHeaderMenuItem = styled.div`
  ${designerCSS}
  ${devCSS}
`
