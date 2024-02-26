import axios from 'axios'
import html2canvas from 'html2canvas'
import twitterShare from 'twitter-share'

import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'
import { API } from 'constants/apiEndPoints'
import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useUser } from 'hooks/user/useUser'
import { useAccessToken } from 'hooks/user/useAccessToken'
import React, { useEffect, useRef, useState } from 'react'
import { useLockBodyScroll } from 'utils/hooks'
import {
  BidGameButton,
  LearnMoreLink,
  ShareOnTwitterLink,
  Snap,
  TwitterIcon,
  ResultModalCss,
  Close
} from './ResultModalCss.styled'
import { CoinRains } from 'components/Molecules/CoinRains'
import { BucketsLevelIcon, bucketsLevelLimit } from 'components/Atoms/BucketLevelIcon'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'
import { useRandomName } from 'utils/hooks/useRandomName'
import { currencyFormatter } from 'utils'
import { isEmpty } from 'lodash'

export const YouWon = ({ closeModal, resultObj }) => {
  useLockBodyScroll()
  const { bidOnNext } = useActiveGameData()
  const { formatToken: formatUSDC } = useToken('USDC')
  const { getRandomName } = useRandomName()

  const [winningPool, setWinningPool] = useState({})

  const ref = useRef(null)
  const { account } = useUser('wallet')
  const { accessToken } = useAccessToken(account)

  const gameId = resultObj.gameId
  const roundIndex = resultObj.roundIndex

  const { gameRoundPool } = useGameRoundPool(gameId, roundIndex)

  useEffect(() => {
    if (!isEmpty(winningPool)) return
    setWinningPool(gameRoundPool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoundPool])

  const { winningPlayers, winningAmounts, buckets, settlementPrice, bids, winBucket } = winningPool

  const winningIndex = winningPlayers?.findIndex(
    (playerAccount) => playerAccount.toLowerCase() === account.toLowerCase()
  )
  const winingAmount = winningIndex >= 0 ? winningAmounts[winningIndex]?.split('.')[0] : '0'
  const amountBN = BigNumber.from(winingAmount)

  const settlementPriceBN = BigNumber.from(settlementPrice?.toFixed() || '0')

  const bucketLimits = bucketsLevelLimit(winBucket, buckets)

  const winnerArray =
    bids?.allBids
      ?.filter((bid) => bid.bucketLevel === winBucket)
      .map((winner) => {
        const username = winner.username || getRandomName(winner.address)
        return { username, bidBucket: winner.bucketLevel, fiatAmount: winner.amount }
      }) || []

  const gameParams = getGameParameters(gameId)
  const onBidNextClick = () => {
    bidOnNext()
    closeModal()
  }

  const captureElement = () => {
    html2canvas(ref.current, {
      backgroundColor: '#12203c'
    }).then(async (canvas) => {
      const image = canvas.toDataURL('image/png', 1.0)
      const blob = await fetch(image).then((res) => res.blob())
      const formData = new FormData()
      formData.append('file', blob, 'test.png')

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'multipart/form-data'
      }
      axios.post(API.SHARE_TWITTER_IMAGE, formData, { headers }).then((response) => {
        const params = {
          text: '👋 Holo! I won money!! 🎊🎉🥳 ',
          url: response?.data?.body?.htmlUrl,
          hashtags: ['ETH', 'Tesla', 'Polygon', 'yolorekt']
        }
        const tweetLink = twitterShare(params)
        const a = document.createElement('a')
        a.href = "javascript:window.open('" + tweetLink + "','_blank','height=400,width=600');"
        a.click()
      })
    })
  }

  return (
    <ResultModalCss>
      <div className='window_page_overlay you_won'>
        <div className='close'></div>
        <Close masking onClick={closeModal}>
          &times;
        </Close>
        <Snap ref={ref}>
          <CoinRains />
          <h2>You Won {currencyFormatter(formatUSDC(amountBN))}!</h2>
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
        </Snap>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>

        <div className='list_of_wrap'>
          <div className='list_of winners bid_down'>
            <h4>
              Winners<strong style={{ color: ' #698688' }}>{bucketLimits}</strong>
            </h4>

            <div className='grid'>
              <span className='head'>
                <strong>User</strong>
              </span>
              <span className='head'>
                <strong>Total Bids</strong>
              </span>
              {winnerArray.map((winner, idx) => (
                <React.Fragment key={idx}>
                  <span className='cell userid'>{winner.username}</span>
                  <span className='cell totalbids'>
                    {currencyFormatter(winner.fiatAmount)}
                    &nbsp;
                    <BucketsLevelIcon level={winner.bidBucket} />
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <ShareOnTwitterLink onClick={captureElement}>
          <Typography variant='caption' size='0.8'>
            Share on Twitter&nbsp;|&nbsp;Get $5
          </Typography>
          <TwitterIcon />
        </ShareOnTwitterLink>
        <LearnMoreLink href='https://docs.yolorekt.finance/instruction-guide/sharing/twitter'>
          <Typography variant='caption' size='0.8'>
            Learn more
          </Typography>
        </LearnMoreLink>
      </div>
    </ResultModalCss>
  )
}
