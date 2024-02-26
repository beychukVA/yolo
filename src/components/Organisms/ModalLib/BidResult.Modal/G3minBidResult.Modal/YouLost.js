import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { currencyFormatter } from 'utils'
import { priceFeedActions } from 'redux/actions'

import { getGameParameters } from 'constants/games'

import { UP, DOWN, LOSER } from 'constants/index'

import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useRandomName } from 'utils/hooks/useRandomName'

import { BidGameButton, Close, ResultModalCss } from './ResultModalCss.styled'
import { IconLib } from 'components/Atoms/IconLib'
import { useToken } from 'utils/hooks/useToken'

export const YouLost = ({ closeModal, variant = LOSER, resultObj }) => {
  const { formatToken: formatUSDC } = useToken('USDC')
  const dispatch = useDispatch()
  const { bidOnNext } = useActiveGameData()
  const { getRandomName } = useRandomName()
  const { gameId, roundIndex, amount, strikePrice, settlementPrice, allPlayers = [], winDirection } = resultObj
  const loseDirection = winDirection === UP ? DOWN : UP
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
      <div className='window_page_overlay you_lost'>
        <div className='close'></div>
        <Close masking onClick={closeModal}>
          &times;
        </Close>

        <h2>You Lost {currencyFormatter(amount)}</h2>
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
            <strong>Strike </strong> {currencyFormatter(formatUSDC(strikePrice))}
          </div>
          <div className='settlement_price'>
            <strong>Settlement</strong> {currencyFormatter(formatUSDC(settlementPrice))}
          </div>
        </div>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>

        <div className='list_of_wrap'>
          <div className='list_of winners bid_down'>
            <h4>
              Losers
              <strong style={{ color: `${loseDirection === UP ? '#00c213' : '#DE0E54'}` }}>
                {loseDirection === UP ? 'Bid Up' : 'Bid Down'}
              </strong>
            </h4>

            <div className='grid'>
              <span className='head'>
                <strong>User</strong>
              </span>
              <span className='head'>
                <strong>Total Bids</strong>
              </span>

              {allPlayers[loseDirection].map((loser, idx) => (
                <React.Fragment key={idx}>
                  <span className='cell userid'>{loser.username || getRandomName(loser.address)}</span>
                  <span className='cell totalbids'>
                    <div class={`triangle ${loseDirection} large`}></div>
                    {currencyFormatter(loser.amount)}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResultModalCss>
  )
}
