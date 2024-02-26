import styled, { css } from 'styled-components'

const designerCSS = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: auto;

  &:hover {
    background-color: hsl(213, 19%, 5%);
  }
`

const devCSS = css`
  /* margin-top: ${({ isOpen, index }) => (!isOpen && index === 0 ? '25px' : '0')}; */
  padding: ${({ isOpen }) => (isOpen ? '15px 20px' : '0')};
  border-bottom: ${({ isOpen }) => (isOpen ? 'none' : '1px solid hsla(0, 0%, 100%, 0.1)')};
  background-color: ${({ isOpen }) => (isOpen ? 'hsl(213, 19%, 11%)' : 'transparent')};

  @media (max-width: 800px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`

export const Summary = styled.summary`
  ${designerCSS}
  ${devCSS}
`
