import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import React from 'react'

import { G3minPlayerItem } from './G3minPlayerItem'
import { G24hrPlayerItem } from './G24hrPlayerItem'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const PlayerItem = React.memo(({ playerItem, gameType }) => {
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={gameType}
      stateObject={{
        [GAME_TYPES.G_3MIN]: <G3minPlayerItem playerItem={playerItem} />,
        [GAME_TYPES.G_24HR]: <G24hrPlayerItem playerItem={playerItem} />
      }}
    />
  )
})
