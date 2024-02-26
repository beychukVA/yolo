import { LONG_DASH } from 'constants/index'
import { usePriceFeed, usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useLvgResult } from 'hooks/games/lvg/uselvgResult'
import React from 'react'
import styled from 'styled-components'

const Statement = ({ isLive, statementKey, isPending = false, children, order }) => {
  const { priceFeed } = usePriceFeed2(order['Asset'])
  const { getLvgResult } = useLvgResult()

  const currentPrice =
    order['Exit'] && order['Exit'] !== '-' && Number(order['Exit']) !== 0 ? order['Exit'] : priceFeed?.value
  const status = getLvgResult(currentPrice, order['Entry'], order['Side'])

  return isNaN(order['ROI']) ? (
    <StatementContainer isPending={isPending} status={status}>
      {isLive ? (statementKey === 'P&L' ? order['P&L'] : `${order['ROI']}`) : children}
    </StatementContainer>
  ) : (
    LONG_DASH
  )
}

export default Statement

const StatementContainer = styled.span`
  color: ${({ isPending, status }) =>
    isPending ? '#fff' : status === 'win' ? '#00c213' : status === 'lost' ? '#dd0e53' : '#fff'};
`
