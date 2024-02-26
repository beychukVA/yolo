import { images } from 'common'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import styled from 'styled-components'
import { WalletPageWrapper } from './WalletPage.styled'
import { WalletBalances } from 'components/Organisms/walletPage/WalletBalance'
import { WalletOperation } from 'components/Organisms/walletPage/WalletOperation'
import { useState } from 'react'
import { VerifiedEmailBar } from 'components/Molecules/VerifiedEmailBar'

export const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('deposit')

  return (
    <ContestLayout>
      <Container>
        <WalletPageWrapper id='pageWrapper'>
          <div className='content'>
            <VerifiedEmailBar />
            <div className='h1_wrap nonft'>
              <h1>Wallet</h1>
            </div>
            <div className='wallet_content'>
              <WalletBalances setActiveTab={setActiveTab} />
              <WalletOperation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </WalletPageWrapper>
      </Container>
    </ContestLayout>
  )
}
const NoEarningsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  width: 100%;

  @media only screen and (max-width: 750px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  @media (max-width: 576px) {
  }
  .header_1 {
    margin: 0 0 10px 0;
  }
`

const Container = styled.div`
  grid-area: 'content';
  justify-content: flex-start;
  align-items: center;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  height: 100%;
  transition: width 300ms ease-in-out;
  display: flex;
  flex-direction: column;

  &::before {
    background: rgba(45, 51, 65, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImgBlur}) center center / cover no-repeat;
    z-index: -2;
    @-moz-document url-prefix() {
      background: url(${images.HomePageBgImgBlur});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    padding: 30px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 30px;
  }
`
