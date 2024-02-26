import { BucketsLevelIcon, bucketsLevelLimit } from 'components/Atoms/BucketLevelIcon'
import { IconLib } from 'components/Atoms/IconLib'
import { getGameParameters } from 'constants/games'
import { BigNumber } from 'ethers'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useUser } from 'hooks/user/useUser'
import React, { useEffect, useState } from 'react'
import { useLockBodyScroll } from 'utils/hooks'
import { useRandomName } from 'utils/hooks/useRandomName'
import { useToken } from 'utils/hooks/useToken'
import { BidGameButton, Close, ResultModalCss } from './ResultModalCss.styled'
import { Zero } from '@ethersproject/constants'
import { currencyFormatter } from 'utils'
import { isEmpty } from 'lodash'

export const YouLost = ({ closeModal, resultObj }) => {
  useLockBodyScroll()
  const { bidOnNext } = useActiveGameData()
  const { formatToken: formatUSDC } = useToken('USDC')
  const { getRandomName } = useRandomName()

  const [losingPool, setLosingPool] = useState({})

  const { account } = useUser('wallet')
  const gameId = resultObj.gameId
  const roundIndex = resultObj.roundIndex

  const { gameRoundPool } = useGameRoundPool(gameId, roundIndex)

  useEffect(() => {
    if (!isEmpty(losingPool)) return
    setLosingPool(gameRoundPool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoundPool])

  const { losingPlayers, losingAmounts, buckets, settlementPrice, bids, winBucket } = losingPool

  const losingIndex = losingPlayers?.findIndex((playerAccount) => playerAccount.toLowerCase() === account.toLowerCase())
  const amountBN = losingIndex >= 0 ? BigNumber.from(losingAmounts[losingIndex]) : Zero

  const settlementPriceBN = BigNumber.from(settlementPrice?.toFixed() || '0')

  const bucketLimits = bucketsLevelLimit(winBucket, buckets)

  const loserArray =
    bids?.allBids
      ?.filter((bid) => bid.bucketLevel !== winBucket)
      .map((winner) => {
        const username = winner.username || getRandomName(winner.address)
        return { username, bidBucket: winner.bucketLevel, fiatAmount: winner.amount }
      }) || []

  const gameParams = getGameParameters(gameId)
  const onBidNextClick = () => {
    bidOnNext()
    closeModal()
  }

  return (
    <ResultModalCss>
      <div className='window_page_overlay you_lost'>
        <div className='close'></div>
        <Close masking onClick={closeModal}>
          &times;
        </Close>

        <h2>You Lost -{currencyFormatter(formatUSDC(amountBN))}</h2>
        <div className='round_asset_used asset_row eth'>
          <div className='result_round_length'>24 HR</div>
          <div className='asset_icon_container'>
            <IconLib {...gameParams.iconProps} />
          </div>
          <div className='asset_name'>{gameParams.gameLabel}</div>
        </div>
        <div className='round'>Round {roundIndex}</div>

        <div className='which_rounds'>
          <div className='settlement_price'>
            <strong>Strike Range</strong> {bucketLimits}
          </div>
          <div className='settlement_price'>
            <strong>Settlement</strong> {currencyFormatter(formatUSDC(settlementPriceBN))}
          </div>
        </div>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>

        <div className='list_of_wrap'>
          <div className='list_of winners bid_down'>
            <h4>
              Losers<strong style={{ color: ' #698688' }}>{bucketLimits}</strong>
            </h4>

            <div className='grid'>
              <span className='head'>
                <strong>User</strong>
              </span>
              <span className='head'>
                <strong>Total Bids</strong>
              </span>
              {loserArray.map((loser, idx) => (
                <React.Fragment key={idx}>
                  <span className='cell userid'>{loser.username}</span>
                  <span className='cell totalbids'>
                    {currencyFormatter(loser.fiatAmount)}
                    &nbsp;
                    <BucketsLevelIcon level={loser.bidBucket} />
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
