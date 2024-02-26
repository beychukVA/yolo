import React from 'react'

import { WINNER, LOSER, PUSH } from 'constants/index'

import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { YouLost } from './YouLost'
import { YouWon } from './YouWon'
import { YouPushed } from './YouPushed'

export const G3minBidResultModal = ({ closeModal, variant = WINNER, resultObj }) => {
  return (
    <ContentSwitcherByState
      noWrapper
      activeState={variant}
      stateObject={{
        [PUSH]: <YouPushed closeModal={closeModal} resultObj={resultObj} />,
        [LOSER]: <YouLost closeModal={closeModal} resultObj={resultObj} />,
        [WINNER]: <YouWon closeModal={closeModal} resultObj={resultObj} />
      }}
    />
  )
}
