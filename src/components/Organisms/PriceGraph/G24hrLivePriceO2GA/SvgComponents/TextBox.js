import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { isEqual } from 'lodash'

import { useViewport } from 'contexts/viewport/useViewport'

const LINE_BASE_Y_POSITION = 1

const BREAK_POINTS = { '480px': 480 }

export const TextBox = ({ id, aboveLabel, label, belowLabel, textCss, textJustify, textSize, xOffset = 0, boxRef }) => {
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
    <TextBoxG id={id} textJustify={textJustify} xOffset={xOffset} ref={boxRef}>
      <Title x='0' y={LINE_BASE_Y_POSITION + offsets?.title}>
        {aboveLabel}
      </Title>
      <PriceText x='0' y={LINE_BASE_Y_POSITION} textCss={textCss} textSize={textSize}>
        {label}
      </PriceText>
      <GameIdText x='0' y={LINE_BASE_Y_POSITION + offsets?.gameId} textCss={textCss}>
        {belowLabel}
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
  transform: ${({ xOffset }) => `translate(${xOffset}px,0)`};
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
  font-size: ${({ textSize }) =>
    ({
      bigger: '1.6rem',
      big: '1.1rem ',
      small: '0.8rem'
    }[textSize] || '1rem')};
  font-weight: 700;
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
