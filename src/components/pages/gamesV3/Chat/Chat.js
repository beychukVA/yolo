import styled, { css } from 'styled-components'

const designerCSS = css`
  position: relative;
  border-radius: 10px 0 0 0;
  top: 70px;
  right: 0;
  overflow: auto;
  width: 100%;
  padding: 56px 0 0 0;
  height: calc(100% - 70px);
  transition: all 500ms ease-in;
  background: hsla(214, 18%, 25%, 0.5);
  backdrop-filter: blur(10px);

  @media (max-width: 1600px) {
    position: absolute;
    top: 70px;
    right: 0;
    height: calc(100% - 70px);
    z-index: 1;
    /* background: hsla(214, 18%, 16%, 0.9); */
    background: hsla(214, 18%, 25%, 0.5);
    backdrop-filter: blur(10px);

    &::after {
      /* background: hsla(214, 18%, 16%, 0.9); */
      /* backdrop-filter: blur(30px);
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -1; */
    }
  }

  @media (min-width: 1601px) {
    background: hsla(214, 18%, 16%, 1);
  }
`

const devCSS = css`
  max-width: ${({ isOpen }) => (isOpen ? '300px' : '50px')};

  @media (max-width: 800px) {
    max-width: ${({ isOpen }) => (isOpen ? '300px' : '30px')};
  }
`

export const Chat = styled.div`
  ${designerCSS}
  ${devCSS}
`
