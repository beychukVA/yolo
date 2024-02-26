import styled from 'styled-components'

export const ModalOverlay = styled.div.attrs((props) => ({
  id: 'modalOverlay'
}))`
  position: relative;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  background: rgba(25, 30, 39, 0.8);
  ${({ theme }) => theme.breakPoints['480px']} {
    //background: rgba(25, 30, 39, 0.8);
    &:before {
      position: absolute;
      filter: blur(350px);
      width: 100vw;
      height: 100vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -2;
      content: '';
      border-radius: 50%;
    }
  }
`
