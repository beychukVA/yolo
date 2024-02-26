import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { currencyFormatter } from 'utils'
import { priceFeedActions } from 'redux/actions'

import { getGameParameters } from 'constants/games'

import { PUSH } from 'constants/index'

import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

import { BidGameButton, Close, ResultModalCss } from './ResultModalCss.styled'
import { IconLib } from 'components/Atoms/IconLib'
import { BigNumber } from 'ethers'
import { useToken } from 'utils/hooks/useToken'

export const YouPushed = ({ closeModal, variant = PUSH, resultObj }) => {
  const dispatch = useDispatch()
  const { bidOnNext } = useActiveGameData()
  const { formatToken: formatUSDC } = useToken('USDC')

  const { gameId, roundIndex, strikePrice, settlementPrice } = resultObj
  const { iconProps, gameLabel } = getGameParameters(gameId)

  const onBidNextClick = () => {
    bidOnNext()
    closeModal({ unupdatePriceScale: true })
  }

  useEffect(() => {
    dispatch(priceFeedActions.pauseUpdate(true))
    return () => {
      dispatch(priceFeedActions.pauseUpdate(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  return (
    <ResultModalCss>
      <div className='window_page_overlay you_won'>
        <div className='close'></div>
        <Close masking onClick={closeModal}>
          &times;
        </Close>
        <h2>You Pushed</h2>
        <div className='round_asset_used asset_row eth'>
          <div className='result_round_length'>3 MIN</div>
          <div className='asset_icon_container'>
            <IconLib {...iconProps} />
          </div>
          <div className='asset_name'>{gameLabel}</div>
        </div>
        <div className='round'>Round {roundIndex}</div>

        <div className='which_rounds'>
          <div className='settlement_price'>
            <strong>Strike</strong> {currencyFormatter(formatUSDC(BigNumber.from(strikePrice)))}
          </div>
          <div className='settlement_price'>
            <strong>Settlement</strong> {currencyFormatter(formatUSDC(BigNumber.from(settlementPrice)))}
          </div>
        </div>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>
      </div>
    </ResultModalCss>
  )
}
