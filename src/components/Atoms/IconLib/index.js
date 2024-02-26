import React from 'react'
import styled, { css } from 'styled-components'

import { collections } from './collections'

const DIRECTION_DICT = {
  up: '180',
  down: '0',
  left: '90',
  right: '270'
}

const PLACEHOLDER_ICON = collections.yolorekt.moon

export const IconLib = ({
  className,
  collection,
  name,
  dimension,
  width,
  height,
  direction,
  rotate,
  masking,
  maskingColor,
  id,
  onClick
}) => {
  const iconUrl = collections?.[collection]?.[name] || PLACEHOLDER_ICON

  return (
    <Icon
      id={`icon-${name}`}
      className={className}
      masking={masking}
      maskingColor={maskingColor}
      iconUrl={iconUrl}
      dimension={dimension || '22px'}
      wdth={width}
      hght={height}
      onClick={onClick}
      rot={rotate || DIRECTION_DICT.left}
    />
  )
}

const maskCss = css`
  mask: url(${({ iconUrl }) => iconUrl}) no-repeat;
  mask-position: center center;
  mask-size: contain;
  background: ${({ theme, maskingColor }) => (!!maskingColor ? maskingColor : theme.themeColors.white)};
`
const originalCss = css`
  background-image: url(${({ iconUrl }) => iconUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`

const Icon = styled.div`
  width: ${({ wdth, dimension }) => wdth || dimension};
  height: ${({ hght, dimension }) => hght || dimension};
  ${({ masking }) => (!!masking ? maskCss : originalCss)}
  transition: all 0.3s;
  transform: ${({ rot }) => `rotate(${DIRECTION_DICT[rot]}deg)`};
`
