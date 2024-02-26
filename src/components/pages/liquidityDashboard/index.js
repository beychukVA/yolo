import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Overview } from 'components/Organisms/LiquidityDashboard/Overview'
import { Charts } from 'components/Organisms/LiquidityDashboard/Charts'
// import { YoloTable } from 'components/Organisms/LiquidityDashboard/YoloTable'
import { Tokens } from 'components/Organisms/LiquidityDashboard/Tokens'
// import { YLPStake } from 'components/Organisms/LiquidityDashboard/YLPStake'

import { images } from 'common'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import { YlpBalanceUpdater } from 'hooks/ylp/useYlpBalance'
import { YlpStakedBalanceUpdater } from 'hooks/ylp/useYlpStakedBalance'
import { useToken } from 'utils/hooks/useToken'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUser } from 'hooks/user/useUser'

export const LiquidityDashboardPage = () => {
  const { isProxy } = useUser()
  const { gaEvent } = useReactGA4()
  const { tokenId } = useToken()

  //External event logger
  useEffect(() => {
    gaEvent('liquidity_dashboard_visit', { pathId: 'dashboard.liquidity.visit' })
    return () => {
      gaEvent('liquidity_dashboard_leave', { pathId: 'dashboard.liquidity.leave' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContestLayout>
      <YlpBalanceUpdater />
      <YlpStakedBalanceUpdater />
      <Container>
        <Title>Liquidity Analytics</Title>
        <Description>
          All currencies are <strong>{tokenId}</strong> unless otherwise specified
        </Description>
        <Content>
          {isProxy && (
            <HelperBar className='helper_bar pulse'>
              At the moment, liquidity providing is not enabled for the new YOLO Wallet system. Please check back soon.
            </HelperBar>
          )}
          <GridContainer>
            <Main>
              <Tokens />
              {/* <YLPStake /> */}
              <Overview />
              <Charts />
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
              {/* <YoloTable /> */}
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
              {/** ACZ - Review this component and use our table component it is responsive, lets see with Tino */}
            </Main>
          </GridContainer>
        </Content>
      </Container>
    </ContestLayout>
  )
}

const HelperBar = styled.div`
  /*! CSS Used from: http://yolo.tino.me/game/resources/css/dashboard.css */
  width: 100%;
  background: rgba(0, 194, 19, 0.2);
  border: 1px solid #00c213;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  display: flex;
  margin: 30px 0 30px 0;
  position: relative;
  font-size: 0.8rem;
  box-shadow: 0px 0px 1px 1px #00c213;
  animation: pulse-animation 2s infinite;
  /*! CSS Used keyframes */
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 15px 0px rgba(0, 194, 19, 0.35);
    }
    100% {
      box-shadow: 0 0 15px 30px rgba(0, 194, 19, 0);
    }
  }
`

const Container = styled.div`
  grid-area: 'content';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  transition: width 300ms ease-in-out;

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

  @media (max-width: 1200px) {
    height: 100%;
    padding: 60px;
  }

  @media (max-width: 576px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 30px;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  letter-spacing: -0.03em;
  line-height: 100%;
  padding: 0 0 5px 0;

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`

const Description = styled.h2`
  font-size: 0.9rem;
  font-weight: 300;
  text-transform: none;
  letter-spacing: 0;
  & strong {
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const Content = styled.div`
  width: calc(100% + 10px);
  margin: 20px 0 0 0;

  @media (max-width: 480px) {
    margin: 10px 0 0 0;
    width: 100%;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas: 'main';
  height: 100vh;

  @media only screen and (min-width: 750px) {
    display: grid;
    grid-template-columns: 0 1fr;
    grid-template-rows: 0 1fr 50px;
    grid-template-areas: 'aside main';
    left: -5px;
    position: relative;
  }
`

const Main = styled.main`
  grid-area: main;
`
