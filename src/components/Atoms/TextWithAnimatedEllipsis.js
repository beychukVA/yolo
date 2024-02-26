import styled, { keyframes } from 'styled-components'

const ellipsis = keyframes`
    to {
      width: 1.25em;
    }
  `

export const TextWithAnimatedEllipsis = styled.div`
  font-weight: 700;
  text-align: center;
  text-align: left;
  padding: 0 0 0 1.5em;
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(5, end) 1900ms infinite;
    content: '\\2026';
    width: 0;
    margin-left: 5px;
  }
`
