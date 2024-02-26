import React from 'react'
import styled from 'styled-components'

import { WalletManager } from 'components/Molecules/WalletManager'

export const WalletFooter = ({ gridArea }) => {
  return (
    <FooterWrapper id='footer' gridArea={gridArea}>
      <Content>
        <WalletManager />
      </Content>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
  display: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  background: rgba(25, 30, 39, 1);
  z-index: 2;
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: flex;
  }
  ${({ gridArea }) => ({ gridArea })}
`
const Content = styled.div`
  padding: 10px 20px;
  justify-content: center;
  width: 100%;
  align-items: center;
`
