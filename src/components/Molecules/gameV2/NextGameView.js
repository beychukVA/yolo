import React, { useMemo } from 'react'
import styled from 'styled-components'

import { getGameParameters } from 'constants/games'
import { IconLib } from 'components/Atoms/IconLib'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

export const NextGameView = () => {
  const { activeGameId } = useActiveGameData()

  const { gameLabel, iconProps, tokenColor, formattedDuration } = getGameParameters(activeGameId)
  const assetName = gameLabel.split('/')[0]

  return useMemo(
    () => (
      <Container>
        <AssetArea tokenColor={tokenColor}>
          <AssetIcon {...iconProps} />
          {assetName}
        </AssetArea>
        <ComingUp> COMING UP </ComingUp>
        <GameDuration tokenColor={tokenColor}>{formattedDuration.toUpperCase()}</GameDuration>
      </Container>
    ),
    [assetName, iconProps, tokenColor]
  )
}

const Container = styled.div`
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const GameDuration = styled.div`
  flex-flow: row;
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 0px 10px 8px;
  margin-left: -20px;
  line-height: 100%;
  border-right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  min-height: 45px;
  min-width: 100px;
  background: ${({ tokenColor, theme }) => theme.utils.addOpacityToHexColor(tokenColor, 20)};
`

const AssetIcon = styled(IconLib)`
  height: 22px;
  width: 22px;
  margin: 0 5px 0 0;
  display: block;
  ${({ theme }) => theme.breakPoints['480px']} {
    height: 18px;
    width: 18px;
    margin: 0 3px 0 0;
  }
`

const AssetArea = styled.div`
  flex-flow: row;
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 10px 22px 10px 12px;
  margin-right: -8px;
  line-height: 100%;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  min-height: 45px;
  min-width: 100px;
  background: ${({ tokenColor, theme }) => theme.utils.addOpacityToHexColor(tokenColor, 20)};
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.9rem;
    padding: 8px 18px 8px 6px;
  }
`

const ComingUp = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #fff;
  font-weight: 700;
  justify-content: center;
  position: relative;
  background: #1f2531;
  border-radius: 10px;
  padding: 8px 16px;
  margin: 0 12px 0 0;
  z-index: 1;
  border: 2px solid #2a6dff;
  line-height: 100%;

  &:before {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
  }
  &:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0;
    font-size: 1.6rem;
  }
`
