import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import { getGameParameters } from 'constants/games'
import { IconLib } from 'components/Atoms/IconLib'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { LiveGameViewStyled } from './LiveGameView.Styled'

export const LiveGameView = () => {
  const { activeGameId } = useActiveGameData()

  const { gameLabel, iconProps, tokenColor, formattedDuration } = getGameParameters(activeGameId)
  const assetName = gameLabel?.split('/')[0]

  return (
    <LiveGameViewStyled tokenColor={tokenColor}>
      <div className='eth asset_row'>
        <div className='game_type_wrap'>
          <div className='game_asset live'>
            {!!iconProps && <AssetIcon {...iconProps} />}
            {assetName}
          </div>
          <div className='game_type live'>LIVE</div>
          <div className='round_length live'>{formattedDuration.toUpperCase()}</div>
        </div>
      </div>
    </LiveGameViewStyled>
  )
}

const AssetIcon = styled(IconLib)`
  height: 22px;
  width: 22px;
  margin: 0 5px 0 0;
  display: block;
  ${({ theme }) => theme.breakPoints['480px']} {
    height: 18px;
    width: 18px;
  }
`
