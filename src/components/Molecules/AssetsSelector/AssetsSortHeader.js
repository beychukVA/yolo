import React, { useState } from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { useGamesList } from 'hooks/games/useGamesList'

const DURATION_OPTION = {
  asc: '3 min',
  desc: '24 hrs'
}

export const AssertsSortHeader = () => {
  const { sortBy } = useGamesList()
  const [priceDirection, setPriceDirection] = useState(true)
  const [durationDirection, setDurationDirection] = useState(true)

  const onSortByPrice = () => {
    sortBy('price', priceDirection ? 'asc' : 'desc')
    setPriceDirection(!priceDirection)
  }

  const onSortByDuration = () => {
    sortBy('roundLength', durationDirection ? 'asc' : 'desc')
    setDurationDirection(!durationDirection)
  }

  return (
    <AssetsMenuHeader id='show_sort_placeholder_future_feature'>
      <SortForm>
        <SortFieldWrapper>
          <strong>Sort by</strong>
          <DropDown id='sort_dropdown_placeholder_future_feature' onClick={onSortByPrice}>
            {priceDirection ? `Highest price` : `Lowest price`}
            <ArrowIcon rotate={priceDirection ? 'up' : 'down'} />
          </DropDown>
        </SortFieldWrapper>
        <SortFieldWrapper>
          <strong>Round length</strong>
          <DropDown id='sort_dropdown_placeholder_future_feature' onClick={onSortByDuration}>
            {DURATION_OPTION[durationDirection ? 'asc' : 'desc']}
            <ArrowIcon rotate={durationDirection ? 'up' : 'down'} />
          </DropDown>
        </SortFieldWrapper>
      </SortForm>
    </AssetsMenuHeader>
  )
}

const AssetsMenuHeader = styled.div`
  padding: 15px 20px 15px 20px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
  }
`
const SortForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
`
const SortFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
  &:first-child {
    padding: 0 10px 0 0;
  }
  strong {
    padding: 0 10px 0 0;
    display: flex;
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    flex-direction: column;
    align-items: flex-start;
    strong {
      padding: 0 5px;
    }
  }
`
const DropDown = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`
const ArrowIcon = styled(IconLib).attrs((props) => ({
  collection: 'general',
  name: 'arrow',
  dimension: '10px',
  masking: true
}))`
  margin: 0 0 0 15px;
`
