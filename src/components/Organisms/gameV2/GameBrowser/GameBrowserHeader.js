import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import { Tooltip } from 'components/Atoms/Tooltip'
import { IconLib } from 'components/Atoms/IconLib'

import { selectCurrentPrice, selectStrikePrice } from 'redux/selectors'
import { currencyFormatter } from 'utils'

import { getGameParameters } from 'constants/games'
import { LONG_DASH } from 'constants/index'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { memoThis } from 'utils/react'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { findByLabelText } from '@testing-library/react'

const RenderGameHeaderRow = ({ selectedGameId }) => {
  const currentPrice = useSelector(selectCurrentPrice(selectedGameId))
  const strikePrice = useSelector(selectStrikePrice(selectedGameId))
  const { activeGameId } = useActiveGameData()
  const gameParameters = getGameParameters(selectedGameId)
  const { gameLabel, icon, brightness, FIAT_DECIMAL_SHOW_DIGITS, gameTypeLabel, isNew } = gameParameters
  const priceDelta = strikePrice && currentPrice ? currentPrice - strikePrice : 0
  const isUp = priceDelta >= 0
  const priceDeltaAbs = strikePrice ? `${((Math.abs(priceDelta) / strikePrice) * 100).toFixed(2)}%` : LONG_DASH
  const isActive = selectedGameId === activeGameId
  const currentPriceDisplay = currentPrice ? currencyFormatter(currentPrice, { FIAT_DECIMAL_SHOW_DIGITS }) : LONG_DASH

  const duration = gameTypeLabel

  const Asset = () => (
    <AssetContainer>
      <CurrencyIcon icon={icon} isActive={isActive} brightness={brightness} className='currency-icon' />
      <AssetName isActive={isActive} className='asset-name'>
        {gameLabel?.toUpperCase()}
      </AssetName>
    </AssetContainer>
  )

  return useMemo(() => {
    if (isEmpty(gameParameters)) return null
    return (
      <GameHeaderRow className='asset_row'>
        <GameTooltip container={<Asset />}>
          <AssetPrice>
            <Price>
              <p>{currentPriceDisplay}</p>
            </Price>
            {strikePrice ? (
              <Change>
                <IconArrow masking isUp={isUp} rotate={!isUp ? 'up' : 'down'} />
                <PriceDiff isUp={isUp}>{priceDeltaAbs}</PriceDiff>
              </Change>
            ) : (
              LONG_DASH
            )}
          </AssetPrice>
        </GameTooltip>
        <GameTypeWrapper>
          <SingleContentToggle toggle={isNew} trueContent={<div className='new_24'>NEW</div>} falseContent={null} />
          <GameTime isActive={isActive} className='game-time'>
            <BlockValue>{duration}</BlockValue>
          </GameTime>
        </GameTypeWrapper>
      </GameHeaderRow>
    )
  }, [currentPriceDisplay, duration, isActive, isUp, priceDeltaAbs, strikePrice])
}

export const GameBrowserHeader = ({ selectedGamesIds }) => {
  return (
    <Container>
      <Overview>
        {selectedGamesIds.slice(0, selectedGamesIds.length).map((selectedGameId) => (
          <RenderGameHeaderRow selectedGameId={selectedGameId} key={selectedGameId} />
        ))}
      </Overview>
    </Container>
  )
}

const Container = styled.div`
  z-index: 0;
  min-width: 230px;
  ${({ theme }) => theme.breakPoints['1200px']} {
    min-width: 180px;
    padding-right: 10px;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    min-width: 55px;
    padding-right: 0px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    min-width: 45px;
  }
`
const Overview = styled.ul`
  list-style: none;
`
const GameHeaderRow = styled.li`
  display: flex;
  padding: 0 0 0 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 0 2px 0;
  height: 40px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    justify-content: space-between;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    border-bottom: 0;
    padding: 0 0 0 20px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    border-bottom: 0;
    padding: 0 0 0 10px;
    height: 34px;
  }
`
const CurrencyIcon = styled.div`
  background: ${({ icon }) => `url(${icon}) center / 22px 22px no-repeat`};
  -webkit-filter: ${({ isActive, brightness }) =>
    isActive ? `grayscale(0%)` : `grayscale(100%) ${brightness ? brightness : ''}`};
  min-width: 22px;
  height: 22px;
  width: 22px;
`
const GameTooltip = styled(Tooltip)`
  & .bottom {
    left: 0;
    transform: translate(0);
  }
`
const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
`
const AssetName = styled.div`
  text-align: left;
  margin: 0 5px 0 10px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 80px;
  text-overflow: ellipsis;
  -webkit-filter: ${({ isActive }) => (isActive ? `brightness(100%)` : `brightness(60%)`)};

  ${({ theme }) => theme.breakPoints['600px']} {
    display: none;
  }
`
const AssetPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & p {
    padding: 0 10px 0 0;
  }
`
const Change = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp' })`
  width: 10px;
  height: 10px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const PriceDiff = styled.div`
  font-weight: 700;
  padding: 0 0 0 3px;
  color: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const GameTime = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  padding: 3px 4px;
  margin: 0 0 0 5px;
  -webkit-filter: ${({ isActive }) => (isActive ? `brightness(100%)` : `brightness(60%)`)};

  ${({ theme }) => theme.breakPoints['600px']} {
    margin: 0 5px;
  }
`
const BlockValue = styled.div`
  font-weight: 700;
  line-height: 100%;
  font-size: 0.75rem;
  white-space: nowrap;

  ${({ theme }) => theme.breakPoints['600px']} {
    font-weight: 600;
    line-height: 100%;
    font-size: 0.65rem;
    top: 0.1em;
    position: relative;
  }
`
const GameTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
