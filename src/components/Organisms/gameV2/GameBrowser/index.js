import React, { useState, useEffect, useRef, useMemo } from 'react'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Slider from 'react-slick'

import { selectGameIdCurrentRoundIndex } from 'redux/selectors'

import { usePrevious, useWindowSize } from 'utils/hooks'
import { CARDS_ROUND_OFFSET } from 'constants/games'

import { GameBrowserHeader } from './GameBrowserHeader'
import { SliderArrow } from './SliderArrow'
import { RibbonColumn } from './RibbonColumn'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useGamesList } from 'hooks/games/useGamesList'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { GameBrowserStyled } from './GameBrowser.styled'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 3,
  focusOnSelect: true,
  variableWidth: true,
  prevArrow: <SliderArrow direction='prev' />,
  nextArrow: <SliderArrow direction='next' />
}

const cardsRoundOffset = (showPastRounds) => {
  if (showPastRounds) return CARDS_ROUND_OFFSET
  return CARDS_ROUND_OFFSET.filter((item) => item >= 0)
}

const getGamesToShow = (sortedArray, selectedArray) => sortedArray.filter((gameId) => selectedArray?.includes(gameId))

export const GameBrowser = ({ gridArea, onTap }) => {
  const { sortedGamesList, showPastGames, selectedGames } = useGamesList()

  const { gameId } = useActiveGameData()
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex(gameId))

  const [slidesToShow, setSlidesToShow] = useState(1)
  const { width } = useWindowSize()
  const [ribbonCardsData, setRibbonCardsData] = useState([])
  const [sliderWidth, setSliderWidth] = useState(0)
  const [centerMode, setCenterMode] = useState(true)

  const ribbonRef = useRef()
  const sliderRef = useRef()
  const wrapperRef = useRef()

  const gamesToShow = getGamesToShow(sortedGamesList, selectedGames)
  const prevGamesToShow = usePrevious(gamesToShow)
  const hasGamesToShowChange = isEqual(gamesToShow, prevGamesToShow)

  useEffect(() => {
    if (sliderRef?.current) {
      sliderRef.current.slickGoTo(1, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef?.current])

  useEffect(() => {
    const slider = sliderRef.current
    const liveCardIndex = cardsRoundOffset(showPastGames).findIndex((item) => item === 0)
    slider.slickGoTo(liveCardIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIdCurrentRoundIndex])

  useEffect(() => {
    setSlidesToShow(width / 300)
  }, [width])

  useEffect(() => {
    const sortedArray = []
    const bigArray = []
    gamesToShow.forEach((selectedGameId) => {
      cardsRoundOffset(showPastGames).forEach((cardRoundOffset) => {
        bigArray.push({ cardRoundOffset, gId: selectedGameId })
      })
      bigArray.sort((a, b) => {
        const aRoundOffset = a.cardRoundOffset
        const bRoundOffset = b.cardRoundOffset
        return aRoundOffset - bRoundOffset
      })
    })
    for (let i = 0; i < bigArray.length; i += gamesToShow.length) {
      const myChunk = bigArray.slice(i, i + gamesToShow.length)
      sortedArray.push(myChunk)
    }
    setRibbonCardsData(sortedArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedGamesList, showPastGames, selectedGames, hasGamesToShowChange])

  useEffect(() => {
    if (wrapperRef.current?.clientWidth) {
      const magicOffset = width > 480 ? 15 : 0
      setSliderWidth(width - wrapperRef.current?.clientWidth - magicOffset)
    }
  }, [width])

  const onContainerClick = () => {
    onTap && onTap({ id: 'game' })
  }

  const onColumnClick = (index) => {
    setCenterMode(index >= 1)
  }

  return useMemo(
    () => (
      <GameBrowserStyled>
        <Container id='gameBrowser' gridArea={gridArea} onClick={onContainerClick} ref={ribbonRef}>
          <HeaderWrapper ref={wrapperRef}>
            <GameBrowserHeader selectedGamesIds={gamesToShow} />
          </HeaderWrapper>
          <SliderWrapper id='sliderWrapper'>
            <Slider
              {...settings}
              style={{ width: sliderWidth }}
              slidesToShow={slidesToShow}
              initialSlide={0}
              ref={sliderRef}
              centerMode={width > 767 ? centerMode : false}
            >
              {ribbonCardsData.map((columnData, index) => (
                <RibbonColumn data={columnData} key={index} onClick={() => onColumnClick(index)} />
              ))}
            </Slider>
          </SliderWrapper>
        </Container>
      </GameBrowserStyled>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ribbonCardsData]
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //width: 100%;
  position: relative;
  &:hover #ribbonCardBase {
    opacity: 0.75;
  }
  &:hover #ribbonCardBase:hover {
    opacity: 1;
  }
  &:hover .currency-icon,
  &:hover .asset-name,
  &:hover .game-time {
    -webkit-filter: grayscale(0%) brightness(100%);
  }
  ${({ gridArea }) => ({ gridArea })}
`
const HeaderWrapper = styled.div`
  display: flex;
`
export const SliderWrapper = styled.div`
  flex-grow: 1;
  .slick-track {
    display: flex;
  }
  .slick-list {
    overflow-x: clip;
  }
  padding-left: 15px;
  ${({ theme }) => theme.breakPoints['sm']} {
    padding-left: 0;
  }
`
