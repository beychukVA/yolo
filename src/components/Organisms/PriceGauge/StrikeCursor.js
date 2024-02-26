import React from 'react'
import styled, { css } from 'styled-components'

import { getGameParameters } from 'constants/games'
import { currencyFormatter } from 'utils'
import { IconLib } from 'components/Atoms/IconLib'

const CURSOR_Y_TRIMMER = 18 // in px

export const StrikeCursor = React.memo(({ gameGraphData }) => {
  const { gameId, strikePrice, strikeCursorY } = gameGraphData
  const position = strikeCursorY ? `${strikeCursorY + CURSOR_Y_TRIMMER}px` : '50%'

  const { iconProps, FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, gameLabel } = getGameParameters(gameId)
  return (
    <CursorWrapper id='newStrikeCirsor' position={position}>
      <Line />
      <TokenIcon {...iconProps} dimension='40px' masking />
      <Title>Strike Price</Title>
      <PriceText>{currencyFormatter(strikePrice || 0, { decimalDigits })}</PriceText>
      <GameIdText>{gameLabel}</GameIdText>
    </CursorWrapper>
  )
})

const cssStrike = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphStrike},
    1px -1px 0 ${theme.themeColors.priceGraphStrike},
    -1px 1px 0 ${theme.themeColors.priceGraphStrike},
    1px 1px 0 ${theme.themeColors.priceGraphStrike}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphStrike};
`

const CursorWrapper = styled.div.attrs((props) => {
  return {
    style: {
      top: `${props.position}`
    }
  }
})`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transform: translateY(-67%);
  margin: 0 0 0 30px;
  z-index: 1;
`
const TokenIcon = styled(IconLib)`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
  background: ${({ theme }) => theme.themeColors.priceGraphStrike};
`

const Line = styled.div`
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  top: 50%;
  bottom: 0;
  border-bottom: none;
  background: ${({ theme }) => theme.themeColors.priceGraphStrikeGradient};
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
  ${cssStrike}
  color: ${({ theme }) => theme.themeColors.white};
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 10px;
  letter-spacing: -0.02em;
  line-height: 1em;
  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.4rem;
  }
`
const GameIdText = styled.label`
  ${cssStrike}
  text-shadow: none;
  margin: 5px 0 0 0;
  font-size: 0.7rem;
  font-weight: 600;
`
