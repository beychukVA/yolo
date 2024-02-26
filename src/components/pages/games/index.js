import { useCallback, useEffect, useLayoutEffect } from 'react'
import qs from 'qs'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { onBoardingActions } from 'redux/actions'

import { GameLayout } from 'components/Layouts/Game.layout'

import { WalletFooter } from 'components/Organisms/Footers/WalletFooter'
import { ChatWindow } from 'components/Organisms/Message/ChatWindow'
import { BiddersPanel } from 'components/Organisms/gameV2/BiddersPanel'
import { GameBrowser } from 'components/Organisms/gameV2/GameBrowser'
import { GamePlayArea } from 'components/Organisms/gameV2/GamePlayArea'

import { OnBoarding } from 'components/Organisms/OnBoarding'
import { getLocalOnBoardingViewed } from 'utils/localStorage/onBoarding'
import { useGameEngineSocket } from 'hooks/gameEngine/useGameEngineSocket'
import { GameHeader } from 'components/Organisms/Headers/GameHeader'
import { useGamesList } from 'hooks/games/useGamesList'
import { isEmpty } from 'lodash'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useBanner } from 'components/Organisms/BannerFramework/hook/useBanner'

export const GamePage = () => {
  const { connect: socketConnect, disconnect: socketDisconnect } = useGameEngineSocket()
  const { gamesList, selectedGames } = useGamesList()
  const dispatch = useDispatch()
  const { activePanel, setActiveGame, setActivePanel } = useActiveGameData()
  const location = useLocation()
  const { show: showBanner, hide: hideBanner } = useBanner()

  const startTour = useCallback(() => {
    dispatch(onBoardingActions.start())
  }, [dispatch])

  //url actions
  useEffect(() => {
    hideBanner()
    const { action } = qs.parse(location.search, { ignoreQueryPrefix: true })
    let activeCardRoundOffset = 0
    switch (action) {
      case 'bidOnNext':
        activeCardRoundOffset = 1
        break
      case 'showLive':
        activeCardRoundOffset = 0
        break
      default:
        break
    }
    const firstSelectedGameId = selectedGames[0]
    setActiveGame({
      gameId: firstSelectedGameId,
      activeCardRoundOffset
    })
    return showBanner

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Connect
  useEffect(() => {
    socketConnect()
    return () => {
      socketDisconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      if (isEmpty(gamesList)) return
      const firstSelectedGameId = selectedGames[0]
      // const firstListedGameId = gamesList[0]

      setActiveGame({
        gameId: firstSelectedGameId,
        activeCardRoundOffset: 0
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gamesList]
  )

  useEffect(() => {
    const isOnBoardingViewed = getLocalOnBoardingViewed()
    !isOnBoardingViewed && startTour()
  }, [startTour])

  return (
    <GameLayout>
      <OnBoarding />
      <GameHeader gridArea='header' onItemClick={(activePanel) => setActivePanel(activePanel.id)} />
      <GameBrowser gridArea='gameSelector' onTap={(activePanel) => setActivePanel(activePanel.id)} />
      <PlayLayout id='playArea' gridArea='playArea'>
        <ChatWrapper id='chatWrapper' isActive={activePanel === 'chat'}>
          <ChatWindow />
        </ChatWrapper>
        <GameWrapper id='gameWrapper' isActive={activePanel === 'game'}>
          <GamePlayArea />
        </GameWrapper>
        <StatWrapper id='statWrapper' isActive={activePanel === 'stats'}>
          <BiddersPanel />
        </StatWrapper>
      </PlayLayout>
      <WalletFooter gridArea='footer' />
    </GameLayout>
  )
}

const showOnePanel = css`
  grid-template: 1fr /100vw;
`
const panelsWrappers = css`
  display: block;
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  }
`

const PlayLayout = styled.div`
  ${({ gridArea }) => ({ gridArea })}
  display: grid;
  grid-template: 1fr /20vw 55vw 25vw;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.breakPoints['1200px']} {
    ${showOnePanel}
  }
`
const ChatWrapper = styled.div`
  ${panelsWrappers}
  z-index: 1;
`
const GameWrapper = styled.div`
  ${panelsWrappers}
  padding: 15px 30px 0 30px;
  //z-index: 0;

  ${({ theme }) => theme.breakPoints['1200px']} {
    padding-left: 0px;
    padding-right: 0px;
  }
`
const StatWrapper = styled.div`
  ${panelsWrappers}
  z-index: 1;
`
