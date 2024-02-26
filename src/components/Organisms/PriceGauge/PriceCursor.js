import React from 'react'
import styled, { css } from 'styled-components'

import { getGameParameters } from 'constants/games'
import { currencyFormatter } from 'utils'
import { IconLib } from 'components/Atoms/IconLib'

const CURSOR_Y_TRIMMER = 18 // in px

export const PriceCursor = React.memo(({ gameGraphData }) => {
  const { gameId, currentPrice, strikePrice, isRoundSettled, priceCursorY } = gameGraphData
  const position = priceCursorY ? `${priceCursorY + CURSOR_Y_TRIMMER}px` : '50%'
  const isUp = currentPrice - strikePrice >= 0
  const { iconProps, FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, gameLabel } = getGameParameters(gameId)
  return (
    <CursorWrapper id='cursorWrapper' position={position}>
      <Line isUp={isUp} />
      <TokenIcon {...iconProps} isUp={isUp} dimension='40px' masking />
      <Title>{isRoundSettled ? 'Settled Price' : 'Current Price'}</Title>
      <PriceText isUp={isUp}>{currencyFormatter(currentPrice || 0, { decimalDigits })}</PriceText>
      <GameIdText isUp={isUp}>{gameLabel}</GameIdText>
    </CursorWrapper>
  )
})

const cssUp = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px 1px 0 ${theme.themeColors.priceGraphGlowUp}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
  background: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px 1px 0 ${theme.themeColors.priceGraphGlowDown}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
  background: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`
const cssLineUp = css`
  background: ${({ theme }) => theme.themeColors.priceGraphUpGradient};
`
const cssLineDown = css`
  background: ${({ theme }) => theme.themeColors.priceGraphDownGradient};
`

const CursorWrapper = styled.div.attrs((props) => {
  return {
    style: {
      top: `${props.position}`
    }
  }
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  right: 0;
  padding: 0px 10px;
  transform: translateY(-58%);
  transition: top 0.1s ease 0s;
  z-index: 1;
  width: 100%;
  transition: all 0.3s ease-in-out;
`
const TokenIcon = styled(IconLib)`
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
`

const Line = styled.div`
  ${({ isUp }) => (isUp ? cssLineUp : cssLineDown)}
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  top: 50%;
  bottom: 0;
  border-bottom: none;
  height: 4px;
  display: block;
  ::after {
    content: '';
    width: 100%;
    position: absolute;
  }
`
const Title = styled.label`
  font-family: 'Inter';
  font-size: 0.9rem;
  font-weight: 500;
`
const PriceText = styled.div`
  position: relative;
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  background: none;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 3px 0 0 0;
  letter-spacing: -0.02em;
  line-height: 1em;
  color: rgba(255, 255, 255, 1);
  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.4rem;
  }
`
const GameIdText = styled.label`
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  text-shadow: none;
  margin: 5px 0 0 0;
  font-size: 0.7rem;
  font-weight: 600;
  background: none;
`
