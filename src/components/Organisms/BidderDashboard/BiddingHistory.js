import React, { useState } from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { Header1 } from './sharedComponent'
import { capitalizeFirst } from 'utils'
import { Table } from 'components/Molecules/Table'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

const tableHeader = [
  { id: 'date', caption: 'Date' },
  { id: 'roundNumber', caption: 'Round number' },
  { id: 'asset', caption: 'Asset' },
  { id: 'roundLength', caption: 'Round length' },
  { id: 'bidAmount', caption: 'Bid amount' },
  {
    id: 'bidDirection',
    caption: 'Bid direction',
    formatter: (data) => (
      <>
        <IconArrow masking rotate={data === 'up' ? 'down' : 'up'} isUp={data === 'up'}></IconArrow>
        {capitalizeFirst(data)}
      </>
    )
  },
  { id: 'roundResult', caption: 'Round result' }
]

export const BiddingHistory = ({ isPending, data }) => {
  const { tableData = [] } = data
  const [sortBy, setSortBy] = useState({ fieldId: tableHeader[0].id, isSortUp: true })
  return (
    <Container>
      <Title>Bidding history</Title>
      <SingleDataLoader
        loading={isPending}
        data={
          <HistoryTable sortBy={sortBy} columns={tableHeader} data={tableData} onSort={setSortBy} maxHeight='400px' />
        }
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0 0 0;
  width: 100%;

  @media only screen and (min-width: 750px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin-top: 10px;
  }

  @media (max-width: 576px) {
    margin: 5px 0;
  }
`

const Title = styled.div`
  ${Header1}
`
const HistoryTable = styled(Table)`
  border-radius: 10px;
  overflow: hidden;
  background: rgba(129, 170, 255, 0.06);
  .headerCell {
    //background: rgba(0, 0, 0, 0.3);
    background: rgb(31, 38, 52);
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
  .dataCell {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
  .dataCell.date {
    background: rgba(129, 170, 255, 0.15);
  }
  ${({ theme }) => theme.breakPoints['1200px']} {
    border-top: none;
    .dataCell.date {
      background: rgba(0, 0, 0, 0.3);
      padding: 5px;
      :before {
        content: none;
      }
    }
    .dataCell {
      &:nth-child(${({ columns }) => `${columns.length}n`}) {
        margin: 0 0 15px 0;
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      }
      :before {
        width: 190px;
      }
    }
  }
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp', dimension: '12px' })`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
