import React from 'react'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'

import { Typography } from 'components/Atoms/Typography'
import { Checkbox } from 'components/Atoms/Checkbox'
import { BidChip } from 'components/Atoms/BidChip'

import { getGameParameters } from 'constants/games'

import { GAME_TYPES, LONG_DASH } from 'constants/index'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useToken } from 'utils/hooks/useToken'
import { useCurrentPrice } from 'hooks/gameEngine/usePriceFeed'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'

export const AssetInfoRow = ({ className, gameId, onChange, checked = false, gameTypeFilter }) => {
  const longDash = LONG_DASH + '\u0010\u0010'

  const { formatToken: formatUSDC } = useToken('USDC')

  const {
    gameLabel,
    icon,
    FIAT_DECIMAL_SHOW_DIGITS: decimalDigits,
    gameTypeLabel,
    gameType,
    isNew
  } = getGameParameters(gameId)
  const { liveRoundData } = useLiveRoundData(gameId)
  const { currentPrice: currPrice } = useCurrentPrice(gameId)
  const currentPrice = currPrice?.value

  const strikePrice = liveRoundData.strikePrice
    ? typeof liveRoundData.strikePrice === 'number'
      ? liveRoundData.strikePrice
      : formatUSDC(liveRoundData.strikePrice)
    : 0
  const priceDelta = strikePrice && currentPrice ? currentPrice - strikePrice : 0
  const direction = priceDelta >= 0 ? 'up' : 'down'

  const duration = gameTypeLabel
  const currentPriceDisplay = currentPrice ? currencyFormatter(currentPrice, { decimalDigits }) : longDash

  return gameType === gameTypeFilter ? (
    <li className='asset_row' onClick={onChange}>
      <input type='checkbox' id='single_asset_to_select_3min_eth' checked={checked} readOnly />
      <label className='select_game' htmlFor='single_asset_to_select_eth'>
        <div className='asset_icon_container'>
          <CurrencyIcon icon={icon} />
        </div>
        <div className='asset_name'>{gameLabel.toUpperCase()}</div>
      </label>
      <div className='asset_current_price'>
        <SingleContentToggle toggle={isNew} trueContent={<div className='new_24'>NEW</div>} falseContent={null} />

        <PriceDelta direction={direction} amount={currentPriceDisplay} decimalDigits={decimalDigits} isCrypto />
      </div>
      <div className='gametime'>
        <div className='game_block_value'>{duration}</div>
      </div>
    </li>
  ) : null
}

const ListRow = styled.li`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2px 0;
  padding: 5px 20px 10px 20px;
  border: 0;
  min-width: 420px;
  font-size: 0.9rem;
  height: 38px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
    min-width: 100vw;
  }
`
const CurrentPrice = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PriceDelta = styled(BidChip).attrs((props) => ({ formatOptions: { fontSize: 0.7 } }))`
  margin-left: 10px;
  min-width: 83px;
  background: ${({ direction }) => (direction === 'up' ? 'rgba(1, 168, 18, 0.2)' : 'rgba(197,0,60,.2)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 3px 6px;
  border-radius: 5px;
`
const CheckBoxCaption = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding-left: 3px;
  min-width: 170px;
`
const CurrencyIcon = styled.div`
  background: ${({ icon }) => `url(${icon}) center center / auto 22px no-repeat`};
  height: 22px;
  width: 22px;
`
const GameLength = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  padding: 1px 4px;
  line-height: 100%;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 6px;
  margin: 0 0 0 10px;
  min-width: 46px;
`
