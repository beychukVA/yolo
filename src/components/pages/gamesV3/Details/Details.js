import styled, { css } from 'styled-components'

const designerCSS = css`
  overflow: hidden;

  &[open] summary h1 div::after {
    background: rgb(42, 109, 255);
    width: 16px;
    height: 16px;
    position: absolute;
    display: block;
    content: '';
    filter: blur(10px);
    z-index: 0;
  }

  &[open] summary h1 {
    filter: drop-shadow(0px 0px 0px #2a6dff);
  }

  &[open] summary div {
    left: 0;
  }

  &[open] summary {
    background-color: hsl(213, 19%, 11%);
  }

  & svg {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 1rem;
    height: 1rem;
    fill: white;
    transition: all 150ms ease-in;
    cursor: pointer;
  }

  &[open] svg {
    transform: rotate(45deg);
    transition-property: transform;
    filter: drop-shadow(0px 0px 3px #2a6dff);
  }

  &:hover {
    cursor: pointer;
  }

  &[open] {
    animation: slide 0.5s ease-in-out;
  }

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translate(0, -10px);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`

const devCSS = css`
  :not(:last-child) {
    margin: ${({ isOpen }) => (isOpen ? '0 0 5px 0' : '0')};
  }
`

export const Details = styled.details`
  ${designerCSS}
  ${devCSS}
`
