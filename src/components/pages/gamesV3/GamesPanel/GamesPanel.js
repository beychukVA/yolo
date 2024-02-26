import styled, { css } from 'styled-components'

const designerCSS = css`
  position: relative;
  border-radius: 0 10px 0 0;
  top: 70px;
  overflow: auto;
  height: calc(100% - 70px);
  transition: all 500ms ease-in;
  scrollbar-gutter: stable;

  /* @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
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
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:vertical,
    ::-webkit-scrollbar-thumb:horizontal {
      background-color: rgba(21, 26, 34, 0.4);
      border-radius: 20px;
    }
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  }
  @-moz-document url-prefix() {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
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
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:vertical,
    ::-webkit-scrollbar-thumb:horizontal {
      background-color: rgba(21, 26, 34, 0.4);
      border-radius: 20px;
    }
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  } */

  @media (max-width: 1600px) {
    position: absolute;
    top: 70px;
    left: 0;
    border-radius: 0 10px 0 0;
    height: calc(100% - 70px);
    background: hsla(214, 18%, 16%, 0.9);
    z-index: 1;

    &::after {
      /* background: hsla(214, 18%, 16%, 0.9); */
      backdrop-filter: blur(30px);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }

  @media (min-width: 1601px) {
    height: calc(100% - 70px);
    background: hsla(214, 18%, 16%, 1);
    border-radius: 0 10px 0 0;
  }
`

const devCSS = css`
  max-width: ${({ isOpen }) => (isOpen ? '366px' : '90px')};

  @media (max-width: 800px) {
    max-width: ${({ isOpen }) => (isOpen ? '366px' : '30px')};
  }
`

export const GamesPanel = styled.div`
  ${designerCSS}
  ${devCSS}
`
