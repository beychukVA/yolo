import React, { useMemo } from 'react'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'
import { UP } from 'constants/index'

import { GAME_FEE } from 'constants/index'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { getGameParameters } from 'constants/games'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const TotalWonLost = React.memo(({ data, winDirection, winBucket }) => {
  const { activeGameId } = useActiveGameData()
  const { gameType } = getGameParameters(activeGameId)
  const { up, down, totalBids, totalBucketWon, totalBucketLost } = useMemo(() => data, [data])
  const totalWon = gameType === GAME_TYPES.G_3MIN ? totalBids * GAME_FEE : totalBucketWon * GAME_FEE
  const totalLost = gameType === GAME_TYPES.G_3MIN ? (winDirection === UP ? down : up) : totalBucketLost

  return (
    <Container>
      <TotalBids>
        {currencyFormatter(totalWon || 0)}
        <strong>TOTAL WON</strong>
      </TotalBids>
      <TotalBids>
        {currencyFormatter(totalLost || 0)}
        <strong>TOTAL LOST</strong>
      </TotalBids>
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  padding: 10px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  font-size: 1rem;
  align-items: center;

  ${({ theme }) => theme.breakPoints['1200px']} {
    padding-top: 6px;
  }
`
const TotalBids = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  font-size: 1.4rem;
  font-weight: 200;
  letter-spacing: -0.01rem;
  width: 50%;
  margin: 0 6px 0 0;
  border-top-right-radius: 10px;

  &:last-child {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & strong {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    opacity: 0.4;
    ${({ theme }) => theme.breakPoints['1200px']} {
      line-height: 100%;
      font-size: 0.7rem;
    }
  }

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 1.3rem;
    padding: 12px 20px 10px 20px;
    margin: 6px 6px 20px 0;
    border-radius: 10px;
    &:last-child {
      margin-right: 0;
      border-radius: 10px;
    }
  }
`
