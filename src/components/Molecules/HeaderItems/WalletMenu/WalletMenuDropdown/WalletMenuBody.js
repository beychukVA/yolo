import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { WalletAccount } from 'components/Molecules/WalletAccount'

import { images } from 'common'
import { IconLib } from 'components/Atoms/IconLib'

export const WalletMenuBody = ({ closeMenu }) => {
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  return (
    <StyledMenu onClick={stopPropagation}>
      <Close masking onClick={() => closeMenu()}>
        &times;
      </Close>
      <WalletAccount closeModal={closeMenu} />
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 15px;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  width: 370px;
  box-shadow: 0 0 45px 20px rgb(33 38 47 / 90%);

  &:after {
    content: '';
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(80px);
    filter: blur(80px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  ${({ theme }) => theme.breakPoints['1200px']} {
    overflow-y: visible;
    min-width: 370px;
    z-index: 4;
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 1) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
`

const ModalTitle = styled(Typography)`
  font-weight: 600;
  padding: 7px 15px 10px 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.1rem;
  white-space: nowrap;
`
const Close = styled(IconLib).attrs(() => ({ collection: 'general', name: 'closeOutline', dimension: '25px' }))`
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: absolute;
  left: -8px;
  top: -8px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  z-index: 1;
  background: rgba(255, 255, 255, 1);
  display: none;

  ${({ theme }) => theme.breakPoints['1200px']} {
    display: flex;
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    display: flex;
    left: 8px;
    top: 8px;
  }
`
