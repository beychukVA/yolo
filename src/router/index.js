import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'

import { NotificationLayout } from 'components/Layouts/Notification.layout'
import { RestrictPage } from 'components/pages/restrict'
import { AboutPage } from 'components/pages/about'
import { GamePage } from 'components/pages/games'
import { GamePageV3 } from 'components/pages/gamesV3'
import { Leaderboard } from 'components/pages/leaderboard'
import { LiquidityDashboardPage } from 'components/pages/liquidityDashboard'
import { BidderDashboardPage } from 'components/pages/bidderDashboard'
import { ReferralContestPage } from 'components/pages/referralContest'
import { YoloXftPage } from 'components/pages/yoloXftPage'
import { WalletPage } from 'components/pages/wallet'

import { useGatewaySocket } from 'hooks/sockets/lvg/useGatewaySocket'

//Updaters
import { ConnectionUpdater } from 'redux/slices/wallet/Updaters/Connection.updater'
import { TransactionsUpdater } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { GamesProgressUpdater } from 'hooks/games/useGameProgress'
import { YlpRewardBalanceUpdater } from 'hooks/ylp/useYlpRewardBalance'
import { UnclaimedBalanceUpdater } from 'hooks/unclaimedEarning/useUnclaimedBalance'
import { OnLoad } from './OnLoad'

//Observer
import { useYoloBidsObserver } from 'hooks/useYoloBid'
import { useGamePoolObserver } from 'hooks/gamePool/useGamesPool'
import { useGameResultObserver } from 'hooks/games/useGameResultObserver'
import { useLvgOrderObserver } from 'hooks/games/lvg/useLvgOrders'

import { config } from 'config'
import { ToastContainer } from 'lib/yoloToasts/ToastsContainer'
import { ModalContainer } from 'lib/yoloModals/ModalContainer'
import { useUserObserver } from 'hooks/user/useUserObserver'
import { useStockMarketObserver } from 'hooks/games/lvg/useLvgState'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import { WIP3min } from './WIP3mins'

const { GATEWAY_SOCKET_URL } = config

const MainWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  position: relative;
  height: 100%;
  display: grid;
  grid-template:
    'content' 1fr
    /1fr;
  justify-items: stretch;
`

export const Routes = () => {
  return (
    <>
      <ToastContainer />
      <ModalContainer />
      <NotificationLayout />
      <OnLoad />
      <MainWrapper>
        <Switch>
          <Route path='/restricted' render={(props) => <RestrictPage {...props} />} />
          <Route path='/game' render={(props) => <GameV3Routes {...props} />} />
          <Route path='/about' render={(props) => <AboutPage {...props} />} />
          {/* <Route path='/' render={(props) => <HomePageV3 {...props} />} /> */}
          <Route path='/' render={(props) => <Redirect to='/game' />} />
          <Redirect to='/game' />
        </Switch>
      </MainWrapper>
    </>
  )
}

function Updaters() {
  //Observers
  return (
    <>
      <ConnectionUpdater />
      <TransactionsUpdater />
      <YlpRewardBalanceUpdater />
      <UnclaimedBalanceUpdater />
    </>
  )
}

const TimeBasedGamesPage = (props) => {
  //Observers
  // useGamePoolObserver()
  // useYoloBidsObserver()
  // useGameResultObserver()

  //Temporal 24h toast --------
  const { yToast } = useYoloToast()
  const hide24hToastObj = {
    id: 'warningToast',
    autoClose: false,
    props: {
      message: {
        title: 'Our 24-hour game is temporarily deactivated',
        subtitle: `Please enjoy our 3-min game or our new FUTURE$ experience`,
        showTable: true
      }
    }
  }
  // useEffect(() => {
  //   yToast(hide24hToastObj)
  // }, [])
  //Temporal 24h toast --------

  return (
    <>
      {/* <GamesProgressUpdater /> */}
      <GamePage {...props} />
      <WIP3min />
    </>
  )
}

const GameV3Routes = (props) => {
  const { path } = useRouteMatch()
  //SocketConnections
  useGatewaySocket(GATEWAY_SOCKET_URL)

  //Observers
  useUserObserver()
  useLvgOrderObserver()

  return (
    <>
      {/* <Updaters /> */}
      <Switch>
        {/* <Route path={`${path}/referral`} exact render={(props) => <ReferralContestPage />} /> */}
        <Route path={`${path}/yoloxft`} exact render={(props) => <YoloXftPage />} />
        <Route path={`${path}/liquidity-dashboard`} exact render={(props) => <LiquidityDashboardPage />} />
        <Route path={`${path}/bidder-dashboard`} exact render={(props) => <BidderDashboardPage />} />
        <Route path={`${path}/wallet`} exact render={(props) => <WalletPage />} />
        <Route path={`${path}/leaderboard`} render={(props) => <Leaderboard />} />
        {/* <GameWrapper> */}
        <Route path={`${path}/v2`} render={(props) => <TimeBasedGamesPage />} />
        {/* </GameWrapper> */}
        <Route path={`${path}`} render={(props) => <GamePageV3 />} />
        <Redirect to={`${path}`} />
      </Switch>
    </>
  )
}
