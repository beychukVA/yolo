import styled, { css } from 'styled-components'

const designerCSS = css`
  display: flex;
  flex-flow: row;
  /* overflow: hidden; */
  padding: 0 0 0 15px;
  align-items: center;
  position: fixed;
  height: 60px;
  width: 100%;
  z-index: 2;
  top: 70px;
  left: 0;

  & * {
    display: flex;
  }

  #connectButton {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const devCSS = css`
  max-width: ${({ isOpen }) => (isOpen ? '350px' : '85px')};
  background: ${({ isOpen }) => (isOpen ? 'hsl(214, 18%, 15%)' : '')};
`

export const ProfileWrapper = styled.div`
  ${designerCSS}
  ${devCSS}
`
