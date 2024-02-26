import React from 'react'
import styled from 'styled-components'
import { EndedRibbon, LiveRibbon, NextRibbon } from './RibbonCards'

export const RibbonColumn = ({ data, onClick }) => {
  const columnRoundOffset = data[0].cardRoundOffset
  const ColumnCard = columnRoundOffset < 0 ? <EndedRibbon /> : columnRoundOffset > 0 ? <NextRibbon /> : <LiveRibbon />

  return (
    <ColumnWrapper onClick={onClick}>
      {data.map((props, index) => React.cloneElement(ColumnCard, { key: index, className: 'ribbon', ...props }))}
    </ColumnWrapper>
  )
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
