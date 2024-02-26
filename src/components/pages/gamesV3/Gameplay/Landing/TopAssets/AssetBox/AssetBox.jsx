import { icons } from 'common'
import { usePriceFeed, usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { usePriceDirection } from 'hooks/usePriceDirection'
import React from 'react'
import styled, { css } from 'styled-components'
import { currencyFormatter } from 'utils'

export const AssetBox = ({ coin }) => {
  const { priceFeed } = usePriceFeed2(coin.priceFeedSymbol)
  const { direction } = usePriceDirection(priceFeed?.price)

  return (
    <AssetBoxContainer>
      <Icon icon={coin.icon} />
      <Content>
        <Name>{coin.name}</Name>
        <div className={`current_price_display ${direction}`}>
          <div className={`price_direction_icon ${direction}`}></div>
          <label>
            {currencyFormatter(priceFeed?.price, { noCurrencySign: true, decimalDigits: coin.fiatDecimals })}
          </label>
        </div>
        <div className='volume_display'>
          <label>
            24 hr volume <span>35.2M</span>
          </label>
        </div>
      </Content>
    </AssetBoxContainer>
  )
}

const designerCSS = css`
  .current_price_display {
    line-height: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    margin: 0 0 10px 0;
    border-radius: 6px;
  }

  .current_price_display label {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .current_price_display .price_direction_icon {
    mask: url(${icons.bid_direction_icon}) center center / auto 12px no-repeat;
    width: 12px;
    height: 12px;
    margin: 0 2px 0 0;
  }

  .current_price_display.up {
    background: hsl(158, 29%, 16%);
  }

  .current_price_display.up label {
    color: hsl(126, 100%, 38%);
  }

  .current_price_display .price_direction_icon.up {
    background: hsl(126, 100%, 38%);
    transform: rotate(-180deg);
  }

  .current_price_display.down {
    background: hsl(342, 28%, 16%);
  }

  .current_price_display.down label {
    color: hsl(340, 88%, 46%);
  }

  .current_price_display .price_direction_icon.down {
    background: hsl(340, 88%, 46%);
    transform: rotate(0deg);
  }

  .current_price_display.neutral {
    background: hsl(219, 29%, 15%);
  }

  .current_price_display.neutral label {
    color: hsl(221, 73%, 47%);
  }

  .current_price_display .price_direction_icon.neutral {
    background: hsl(221, 73%, 47%);
    -webkit-mask: url('../../resources/images/icons/bid_direction_neutral_icon.svg') center center / auto 12px no-repeat;
    mask: url(${icons.bid_direction_neutral_icon}) center center / auto 12px no-repeat;
    width: 12px;
    height: 12px;
    margin: 0 2px 0 0;
  }

  .volume_display {
    opacity: 0;
    max-width: 180px;
    height: fit-content;
    border-radius: 0 10px 10px 0;
    line-height: 100%;
    white-space: nowrap;
    background: none;
    max-width: auto;
    width: auto;
    padding: 0;
    font-size: 0.7rem;
  }

  .volume_display span {
    color: hsl(221, 73%, 47%);
    font-weight: 600;
  }
`

const AssetBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 100%;
  padding: 15px 15px;
  height: fit-content;
  text-decoration: none;
  border-radius: 10px;

  ${designerCSS}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 5px;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 32px 32px;
  background-size: contain;
`
const Name = styled.span`
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0 8px 0;
`
