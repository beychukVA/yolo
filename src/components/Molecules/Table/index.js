import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { DataCell, DataCellWrapper } from './DataCell'
import { HeaderCell } from './HeaderCell'

export const Table = ({ className, sortBy, columns, data, onSort, maxHeight }) => {
  const [loading, setLoading] = useState(true)
  const onSortClick = ({ fieldId, isSortUp }) => {
    onSort({ fieldId, isSortUp })
  }
  const nColumns = useMemo(() => columns.length, [columns])
  const headerRow = columns.map((columnsData) => (
    <HeaderCell key={`hCell-${columnsData.id}`} hData={columnsData} sortBy={sortBy} onSortClick={onSortClick} />
  ))

  const dataRows = useCallback(() => {
    data.sort((a, b) => {
      const itemA = a[sortBy.fieldId]
      const itemB = b[sortBy.fieldId]
      if (itemA < itemB) return sortBy.isSortUp ? 1 : -1
      if (itemA > itemB) return sortBy.isSortUp ? -1 : 1
      return 0
    })
    return data.map((row, rIdx) =>
      columns.map((item, cIdx) => (
        <DataCell
          key={`dCell-${item.id}`}
          sortBy={sortBy}
          data={item.formatter ? item.formatter(row[item.id]) : row[item.id]}
          ranking={row.ranking}
          fieldId={item.id}
          beforeContent={item.caption}
          options={item.options}
          columnId={cIdx}
          rowId={rIdx}
        />
      ))
    )
  }, [sortBy, columns, data])

  const Loading = () => (
    <LoadingWrapper>
      <LoadingMoon id='loadingMoon' collection='yolorekt' name='LoadingMoon' masking />
    </LoadingWrapper>
  )

  useEffect(() => {
    if (data.length) {
      setLoading(false)
    }
  }, [data])

  return useMemo(
    () => (
      <TableWrapper className={className} id='tableWrapper' nColumns={nColumns} maxHeight={maxHeight}>
        {headerRow}
        {!loading ? dataRows() : <Loading />}
      </TableWrapper>
    ),
    [dataRows, headerRow, loading, nColumns, className, maxHeight]
  )
}

const scrollOption = css`
  overflow-y: auto !important;
  max-height: ${({ maxHeight }) => maxHeight};
  .headerCell {
    position: sticky;
    top: -1px;
    z-index: 1;
  }
`

const TableWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: grid !important;
  grid-template-columns: ${({ nColumns }) => `repeat(${nColumns}, auto)`};
  justify-items: stretch;
  align-content: start;
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.breakPoints['1200px']} {
    grid-template-columns: 1fr;
    & ${DataCellWrapper}:nth-child(${({ nColumns }) => `${nColumns}n`}) {
      margin:  0 0 15px  0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    & ${DataCellWrapper}:nth-child(${({ nColumns }) => `${nColumns}n+1`}) {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
}
${({ maxHeight }) => (maxHeight ? scrollOption : '')}
`

const LoadingWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingMoon = styled(IconLib)`
  background: white;
  width: 50%;
  height: 50%;
  z-index: 9;
`
