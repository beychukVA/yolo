import { useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'

import { ChatWindow } from 'components/Organisms/Message/ChatWindow'
import { useGameEngineSocket } from 'hooks/gameEngine/useGameEngineSocket'
import { useState } from 'react'
import { icons, images } from 'common'
import { PageWrapper } from './PageWrapper/PageWrapper'
import { Main } from './Main/Main'
import { Content } from './Content/Content'
import { GameMainArea } from './GameMainArea/GameMainArea'
import { LeftPanel } from './LeftPanel/LeftPanel'
import { LeftHeader } from './LeftHeader/LeftHeader'
import { YolorektLogo } from './YolorektLogo/YolorektLogo'
import { GamesPanel } from './GamesPanel/GamesPanel'
import { TogButton } from './TogButton/TogButton'
import { TogContent } from './TogContent/TogContent'
import { ProfileWrapper } from './Profile/ProfileWrapper'
import { StaticSummary } from './StaticSummary/StaticSummary'
import { SummaryS } from './StaticSummary/SummaryS'
import { Icon } from './StaticSummary/Icon'
import { SummaryStatic } from './StaticSummary/SummaryStatic/SummaryStatic'
import { CollapsedFeature } from './CollapsedFeature/CollapsedFeature'
import { CollapsedSummary } from './CollapsedSummary/CollapsedSummary'
import { Details } from './Details/Details'
import { SummaryIcon } from './SummaryIcon/SummaryIcon'
import ShortTermCollapsedContent from './ShortTermCollapsedContent/ShortTermCollapsedContent'
import { Summary } from './Summary/Summary'
import { DetailsContent } from './DetailsContent/DetailsContent'
import { DetailsSection } from './DetailsSection/DetailsSection'
import YoloDaysCollapsedContent from './YoloDaysCollapsedContent/YoloDaysCollapsedContent'
import InfinitteWinningCollapsedContent from './InfinitteWinningCollapsedContent/InfinitteWinningCollapsedContent'
import InfiniteWinningCard from './InfiniteWinningCard/InfiniteWinningCard'
import { RightPanel } from './RightPanel/RightPanel'
import { RightHeader } from './RightHeader/RightHeader'
import { Chat } from './Chat/Chat'
import { TogRightButton } from './TogRightButton/TogRightButton'
import { TogRightContent } from './TogRightContent/TogRightContent'
import Gameplay from './Gameplay/Gameplay'
import Menu from './Menu/Menu'
import DepositButton from './DepositButton/DepositButton'
import { WalletManager } from './Wallet/WalletManager/WalletManager'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import { Profile } from './Profile/Profile'
import { useLvgBetaCode } from 'hooks/betaPrograms/useLvgBetaCode'
import { GAME_TYPES } from 'constants/games/gameTypes'
import { useUrlQueryParam } from 'utils/hooks/useUrlQueryParam'
import { useUser } from 'hooks/user/useUser'
import { WelcomeBonus } from './EventsContestCards/WelcomeBonus'
import { InviteBeta } from './EventsContestCards/InviteBeta'
import { WeeklyRewards } from './EventsContestCards/WeeklyRewards'
import { ChatHeaderMenu } from './Chat/ChatHeaderMenu/ChatHeaderMenu'
import { ChatHeaderMenuItem } from './Chat/ChatHeaderMenu/ChatHeaderMenuItem/ChatHeaderMenuItem'
import { MarketTimeline } from './Chat/MarketTimeline'

const details = [
  {
    id: 'SHORT_THERM_PREDICTION',
    title: '3 MIN GAME',
    gameType: GAME_TYPES.G_3MIN,
    icon: icons.short_term_prediction_icon,
    content: [
      {
        subtitle: 'Coming up',
        sortTitle: 'Time until start',
        rounds: [
          {
            time: '3 min',
            icon: icons.MaticIcon,
            number: '6451',
            name: 'Matic',
            timer: '3:00',
            price: '$159.07',
            bidNow: true,
            completed: false
          },
          {
            time: '3 min',
            icon: icons.eth_icon,
            number: '6451',
            name: 'ETH',
            timer: '3:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          },
          {
            time: '3 min',
            icon: icons.doge_icon,
            number: '6451',
            name: 'Doge',
            timer: '3:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          },
          {
            time: '3 min',
            icon: icons.btc_icon,
            number: '6451',
            name: 'BTC',
            timer: '3:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          }
        ]
      },
      {
        subtitle: 'Live',
        sortTitle: 'Time remaining',
        rounds: [
          {
            time: '5 min',
            icon: icons.MaticIcon,
            number: '6451',
            name: 'Matic',
            timer: '5:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          },
          {
            time: '5 min',
            icon: icons.eth_icon,
            number: '6451',
            name: 'ETH',
            timer: '5:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          },
          {
            time: '5 min',
            icon: icons.doge_icon,
            number: '6451',
            name: 'Doge',
            timer: '5:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          },
          {
            time: '5 min',
            icon: icons.btc_icon,
            number: '6451',
            name: 'BTC',
            timer: '5:00',
            price: '$159.07',
            bidNow: false,
            completed: false
          }
        ]
      },
      {
        subtitle: 'Settled',
        sortTitle: 'Time ended',
        rounds: [
          {
            time: '3 min',
            icon: icons.MaticIcon,
            number: '14',
            name: 'Matic',
            timer: '',
            price: '$36.66',
            bidNow: false,
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: 'YOLO_DAYS',
    title: 'YOLO DAYS',
    gameType: GAME_TYPES.G_24HR,

    icon: icons.yolo_days_icon,
    content: [
      {
        subtitle: 'Coming up',
        sortTitle: 'Time until start',
        rounds: [
          {
            time: '3 min',
            icon: icons.MaticIcon,
            number: '6451',
            name: 'Matic',
            timer: '3:00',
            price: '$159.07',
            bidNow: true
          },
          {
            time: '3 min',
            icon: icons.eth_icon,
            number: '6451',
            name: 'ETH',
            timer: '3:00',
            price: '$159.07',
            bidNow: false
          }
        ]
      }
    ],
    statistics: [
      {
        subtitle: 'Live',
        stats: [
          {
            hrs: '6.5',
            atTime: '1:30PM',
            date: 'Sept 29',
            icon: icons.spy_icon,
            number: '6450',
            timer: '3:00',
            bgImage: images.temp_24hr_graph_small
          },
          {
            hrs: '24',
            atTime: '1:30PM',
            date: 'Sept 29',
            icon: icons.MaticIcon,
            number: '6450',
            timer: '3:00',
            bgImage: images.temp_24hr_graph_small
          }
        ]
      }
    ]
  },
  {
    id: 'INFINITE_WINNING',
    title: 'FUTURE$',
    gameType: GAME_TYPES.G_LVG,
    icon: icons.perpetual_futures_icon,
    infinite: [
      {
        coins: LVG_ASSETS
      }
    ]
  }
]

const chatHeaderMenu = {
  ALL: 'All',
  DMUser: '@DMUser'
}

export const GamePageV3 = () => {
  const {
    isOpenLeftPanel,
    isOpenRightPanel,
    hideRightPanel,
    currentGame,
    setOpenLeftPanel,
    setOpenRightPanel,
    setCurrentGame
  } = useLayoutV3State()
  const { connect: socketConnect, disconnect: socketDisconnect } = useGameEngineSocket()
  const [isOpenProfileDropdown, setOpenProfileDropdown] = useState(false)
  const [leftPanelID, setLeftPanelID] = useState(Math.random())
  const { account } = useUser('wallet')
  const [selectedChatHeaderMenuItem, setSelectedChatHeaderMenuItem] = useState(chatHeaderMenu.ALL)

  // Beta code checker
  useLvgBetaCode()

  // URL Query params checker
  const gameSelection = useUrlQueryParam('gametype')
  useLayoutEffect(() => {
    if (gameSelection) {
      const validGameType = GAME_TYPES[gameSelection]
      if (validGameType) setCurrentGame(validGameType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Connect
  useEffect(() => {
    socketConnect()
    return () => {
      socketDisconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleLeftPanel = () => {
    setOpenLeftPanel(!isOpenLeftPanel)
  }

  const toggleRightPanel = () => {
    setOpenRightPanel(!isOpenRightPanel)
  }

  const onGameSelected = (gameType) => {
    if (isOpenLeftPanel && gameType === currentGame) {
      setOpenLeftPanel(false)
      setCurrentGame(GAME_TYPES.G_NONE)
    } else {
      setOpenLeftPanel(true)
      setCurrentGame(gameType)
    }
    setLeftPanelID(Math.random())
  }

  const onCloseProfileDropdown = () => setOpenProfileDropdown(false)
  const toggleProfileDropdown = () => setOpenProfileDropdown(!isOpenProfileDropdown)

  const checkDetailOpen = (gameType) => {
    return isOpenLeftPanel && gameType === currentGame
  }

  return (
    <PageWrapper>
      <Main>
        <Content>
          <LeftHeader>
            <YolorektLogo href='/game' />
          </LeftHeader>
          <RightHeader>
            <WalletManager />
            {account && <DepositButton />}
            <Menu />
          </RightHeader>
          <GameMainArea>
            <LeftPanel key={leftPanelID}>
              <GamesPanel isOpen={isOpenLeftPanel}>
                <TogButton isOpen={isOpenLeftPanel} onClick={() => toggleLeftPanel()} />
                <TogContent isOpen={isOpenLeftPanel}>
                  <ProfileWrapper isOpen={isOpenLeftPanel}>
                    <Profile
                      toggleDropdown={toggleProfileDropdown}
                      isOpen={isOpenLeftPanel}
                      isOpenDropdown={isOpenProfileDropdown}
                      closeMenu={onCloseProfileDropdown}
                    />
                  </ProfileWrapper>
                  <StaticSummary isOpen={isOpenLeftPanel}>
                    <SummaryS>
                      <h1>
                        <Icon />
                        Events & Contests
                      </h1>
                    </SummaryS>
                    <SummaryStatic>
                      <WeeklyRewards />
                      <InviteBeta />
                      <WelcomeBonus />
                    </SummaryStatic>
                  </StaticSummary>
                  {details.map((detail, index) => (
                    <Details
                      key={`${index}${detail?.id}`}
                      isOpen={isOpenLeftPanel}
                      open={checkDetailOpen(detail?.gameType)}
                      onClick={(e) => onGameSelected(detail?.gameType)}
                    >
                      <Summary index={index} isOpen={isOpenLeftPanel}>
                        <CollapsedSummary status={detail.gameType === currentGame} isOpen={isOpenLeftPanel}>
                          <h1>
                            <SummaryIcon status={detail.gameType === currentGame} icon={detail.icon} />
                            {detail.title}
                          </h1>
                          <svg className='plus' viewBox='0 0 16 16'>
                            <path d='M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z' />
                          </svg>
                        </CollapsedSummary>
                        <CollapsedFeature isOpen={isOpenLeftPanel}>
                          {detail.gameType === GAME_TYPES.G_3MIN && (
                            <ShortTermCollapsedContent status={detail.gameType === currentGame} />
                          )}
                          {detail.gameType === GAME_TYPES.G_24HR && (
                            <YoloDaysCollapsedContent status={detail.gameType === currentGame} />
                          )}
                          {detail.gameType === GAME_TYPES.G_LVG && (
                            <InfinitteWinningCollapsedContent status={detail.gameType === currentGame} />
                          )}
                        </CollapsedFeature>
                      </Summary>
                      <DetailsContent onClick={(e) => e.stopPropagation()}>
                        <DetailsSection>
                          {(detail?.content || detail?.statistics) && <Button href='/game/v2'>Play Now</Button>}
                          {detail?.infinite && <InfiniteWinningCard />}
                        </DetailsSection>
                      </DetailsContent>
                    </Details>
                  ))}
                </TogContent>
              </GamesPanel>
            </LeftPanel>
            <Gameplay />
            {!hideRightPanel && (
              <RightPanel>
                <Chat isOpen={isOpenRightPanel}>
                  <ChatHeaderMenu>
                    <TogRightButton onClick={() => toggleRightPanel()} />
                    <ChatHeaderMenuItem
                      selected={selectedChatHeaderMenuItem === chatHeaderMenu.ALL}
                      onClick={() => setSelectedChatHeaderMenuItem(chatHeaderMenu.ALL)}
                    >
                      Social Feed
                    </ChatHeaderMenuItem>
                    <ChatHeaderMenuItem
                      selected={selectedChatHeaderMenuItem === chatHeaderMenu.DMUser}
                      onClick={() => setSelectedChatHeaderMenuItem(chatHeaderMenu.DMUser)}
                    >
                      Market Timeline
                    </ChatHeaderMenuItem>
                  </ChatHeaderMenu>
                  <TogRightContent isOpen={isOpenRightPanel}>
                    {selectedChatHeaderMenuItem === chatHeaderMenu.ALL && <ChatWindow isOpen={isOpenRightPanel} />}
                    {selectedChatHeaderMenuItem === chatHeaderMenu.DMUser && (
                      <MarketTimeline isOpen={isOpenRightPanel} />
                    )}
                  </TogRightContent>
                </Chat>
              </RightPanel>
            )}
          </GameMainArea>
        </Content>
      </Main>
    </PageWrapper>
  )
}

const Button = styled.a`
  outline: none;
  border: none;
  background: linear-gradient(
    180deg,
    #2159d1,
    #2159d0,
    #2158cf,
    #2057cd,
    #2056ca,
    #1f55c7,
    #1f53c3,
    #1e52c0,
    #1e51bd,
    #1d50bb,
    #1d4fba,
    #1d4fb9
  );
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  padding: 12px 20px 10px 20px;
  border-radius: 10px;
  line-height: 100%;
  font-size: 0.75rem;
`
