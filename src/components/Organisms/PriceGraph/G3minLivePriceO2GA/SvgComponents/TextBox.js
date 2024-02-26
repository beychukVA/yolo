import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { isEqual } from 'lodash'

import { useViewport } from 'contexts/viewport/useViewport'

const LINE_BASE_Y_POSITION = 1

const BREAK_POINTS = { '480px': 480 }

export const TextBox = ({ id, title, price, gameLabel, textCss, textJustify }) => {
  const { width } = useViewport()
  const [offsets, setOffsets] = useState({ title: -22, gameId: 19 })
  useEffect(() => {
    let newOffsets
    if (width < BREAK_POINTS['480px']) {
      newOffsets = { title: -17, gameId: 15 }
    }
    if (width > BREAK_POINTS['480px']) {
      newOffsets = { title: -22, gameId: 19 }
    }
    if (!isEqual(offsets, newOffsets)) {
      setOffsets({ ...offsets, ...newOffsets })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <TextBoxG id={id} textJustify={textJustify}>
      <Title x='0' y={LINE_BASE_Y_POSITION + offsets?.title}>
        {title}
      </Title>
      <PriceText x='0' y={LINE_BASE_Y_POSITION} textCss={textCss}>
        {price}
      </PriceText>
      <GameIdText x='0' y={LINE_BASE_Y_POSITION + offsets?.gameId} textCss={textCss}>
        {gameLabel}
      </GameIdText>
    </TextBoxG>
  )
}

const leftCss = css``
const rightCss = css`
  text-anchor: end;
`

const TextBoxG = styled.g`
  ${({ textJustify }) => ({ left: leftCss, right: rightCss }[textJustify])}
`
const Title = styled.text`
  top: 200px;
  fill: ${({ theme }) => theme.themeColors.white};
  alignment-baseline: after-edge;
  font-family: 'Inter';
  font-size: 13px;
  font-weight: 500;
`
const PriceText = styled.text`
  ${({ textCss }) => textCss}
  alignment-baseline: middle;
  fill: ${({ theme }) => theme.themeColors.white};
  font-size: 1.8rem;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
  line-height: 1em;
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.4rem;
  }
`
const GameIdText = styled.text`
  ${({ textCss }) => textCss}
  alignment-baseline: before-edge;
  text-shadow: none;
  font-size: 0.7rem;
  font-weight: 600;
`
