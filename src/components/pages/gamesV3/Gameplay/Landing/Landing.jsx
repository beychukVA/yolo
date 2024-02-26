import { useLvgState } from 'hooks/games/lvg/useLvgState'
import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Announcements } from './Announcements/Announcements'
import { Information } from './Information/Information'
import { MostPopularGames } from './MostPopularGames/MostPopularGames'
import { TopAssets } from './TopAssets/TopAssets'
import { TopBidders } from './TopBidders/TopBidders'

const Landing = () => {
  const { setActiveAsset } = useLvgState()

  useEffect(() => {
    setActiveAsset({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <LandingContainer>
      <Announcements />
      {/* <TopBidders /> */}
      <MostPopularGames />
      <TopAssets />
      <Information />
    </LandingContainer>
  )
}

export default Landing

const scroll = css`
  /* ::-webkit-scrollbar {
    width: 7px;
    opacity: 0;
  }
  *:hover ::-webkit-scrollbar {
    opacity: 1;
  }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 20px;
    opacity: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(21, 26, 34, 0.4);
    border-radius: 20px;
  } */
`

const LandingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-y: auto;
  margin: 80px 0;

  #pageWrapper {
    width: 80%;
  }

  ${scroll}
`
