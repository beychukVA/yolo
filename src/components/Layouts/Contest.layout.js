import styled from 'styled-components'
import { findDOMNode } from 'react-dom'

import { WalletFooter } from 'components/Organisms/Footers/WalletFooter'

import { images } from 'common'
import { useState, useEffect } from 'react'
import { GameHeader } from 'components/Organisms/Headers/GameHeader'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

export const ContestLayout = ({ children }) => {
  const [bannerHeight, setBannerHeight] = useState(0)
  const { setActivePanel } = useActiveGameData()
  const node = document.getElementById('banner')
  const componentDOM = findDOMNode(node)

  useEffect(() => {
    componentDOM && setBannerHeight(componentDOM?.clientHeight)
  }, [componentDOM])

  return (
    <PageLayout bannerHeight={bannerHeight}>
      <GameHeader gridArea='header' onItemClick={(activePanel) => setActivePanel(activePanel.id)} />
      {children}
      <WalletFooter gridArea='footer' />
    </PageLayout>
  )
}
const PageLayout = styled.div`
  display: grid;
  grid-template:
    'header' auto
    'content' 1fr
    'footer' auto
    / 1fr;
  height: 100vh;
  ${({ theme }) => theme.breakPoints['1200px']} {
    grid-template:
      'header' auto
      'content' 1fr
      'footer' calc(56px + ${({ bannerHeight }) => bannerHeight}px)
      / 1fr;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #212530 url(${images.ReferralContestBgImg}) left top / 100% auto no-repeat;
    z-index: -7;
    @-moz-document url-prefix() {
      background: url(${images.ReferralContestBgImg});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }
`
