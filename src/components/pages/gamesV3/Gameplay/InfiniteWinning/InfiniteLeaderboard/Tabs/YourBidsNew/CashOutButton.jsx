import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASSETS_TYPES } from 'constants/assets'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { isStockMarketOpen, throttle } from 'utils'
import { useDebouncedCallback } from 'utils/hooks/useDebounceCallback'

export const CashOutButton = ({ children, order, isWinning, onCloseOrder, assetType }) => {
  const isMarketOpen = assetType !== ASSETS_TYPES.STOCK || isStockMarketOpen().state
  const [closing, setClosing] = useState(false)

  const onCloseRaw = () => {
    onCloseOrder(order)
    setClosing(true)
  }

  const onClose = useDebouncedCallback(onCloseRaw, 500)

  useEffect(() => {
    setClosing(false)
  }, [order.uuid])

  return (
    <CashOut isMarketOpen={isMarketOpen} isWinning={isWinning} onClick={onClose} closing={closing}>
      <SingleDataLoader loading={closing} data={children} />
    </CashOut>
  )
}

const disabled = css`
  opacity: 0.5;
  cursor: not-allowed !important;
  &:hover {
    color: ${({ isWinning }) => (isWinning ? 'hsl(126,100%,38%)' : 'hsl(340,88%,56%)')};
    background: ${({ isWinning }) => (isWinning ? 'hsla(126,100%,28%,.2)' : 'hsl(340,88%,46%, .2)')};
  }
`
const CashOut = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  outline: none;
  border-radius: 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ isWinning }) => (isWinning ? 'hsl(126,100%,38%)' : 'hsl(340,88%,56%)')};
  background: ${({ isWinning }) => (isWinning ? 'hsla(126,100%,28%,.2)' : 'hsl(340,88%,46%, .2)')};
  padding: 10px 14px;
  font-size: 0.75rem;
  white-space: nowrap;
  text-transform: uppercase;

  &:hover {
    color: ${({ isWinning }) => (isWinning ? 'hsl(126,100%,38%)' : 'hsl(340,88%,56%)')};
    background: ${({ isWinning }) => (isWinning ? 'hsla(126,100%,28%,.5)' : 'hsl(340,88%,46%, .5)')};
  }
  ${({ isMarketOpen }) => (isMarketOpen ? '' : disabled)}
  ${({ closing }) => (closing ? disabled : '')}
`
