import styled, { css } from 'styled-components'

const designerCSS = css`
  /* height: calc(100% - 70px); */
  /* padding: 20px 10px 90px 0; */
  /* overflow: hidden; */
  font-size: 0.8rem;
  margin: 20px 10px 0 0;
  border-radius: 0 10px 0 0;

  @media (min-width: 1601px) {
    /* height: calc(100% - 70px); */
    /* height: 100%; */
  }
`

const devCSS = css`
  -webkit-box-shadow: ${({ isOpen }) => (isOpen ? '0 10px 40px 0 rgb(0 0 0 / 35%)' : 'none')};
  box-shadow: ${({ isOpen }) => (isOpen ? '0 10px 40px 0 rgb(0 0 0 / 35%)' : 'none')};
  width: ${({ isOpen }) => (isOpen ? '350px' : '90px')};
`

export const TogContent = styled.div`
  ${designerCSS}
  ${devCSS}
`
