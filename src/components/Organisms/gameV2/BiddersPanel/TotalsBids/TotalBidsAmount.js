import React, { useMemo } from 'react'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'

export const TotalBidsAmount = React.memo(({ data }) => {
  const { totalBids } = useMemo(() => data, [data])

  return (
    <TotalBids>
      {currencyFormatter(totalBids || 0)}
      <strong>Total Bids Amount</strong>
    </TotalBids>
  )
})

const TotalBids = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  padding: 20px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  font-size: 1.4rem;
  font-weight: 200;
  letter-spacing: -0.01rem;

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
    margin: 6px 0 20px 0;
    border-radius: 10px;
  }

  @-moz-document url-prefix() {
    background: #191d25;
  }
`
