import React, { useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'

import { currencyFormatter } from 'utils'
import { priceFeedActions } from 'redux/actions'

import { Typography } from 'components/Atoms/Typography'
import { getGameParameters } from 'constants/games'

import { UP, WINNER } from 'constants/index'

import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

import html2canvas from 'html2canvas'
import axios from 'axios'
import { useUser } from 'hooks/user/useUser'

import { API } from 'constants/apiEndPoints'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { CoinRains } from 'components/Molecules/CoinRains'
import {
  BidGameButton,
  Close,
  LearnMoreLink,
  ResultModalCss,
  ShareOnTwitterLink,
  Snap,
  TwitterIcon
} from './ResultModalCss.styled'
import { IconLib } from 'components/Atoms/IconLib'
import { useToken } from 'utils/hooks/useToken'
import { useRandomName } from 'utils/hooks/useRandomName'

const twitterShare = require('twitter-share')

export const YouWon = ({ closeModal, variant = WINNER, resultObj }) => {
  const { formatToken: formatUSDC } = useToken('USDC')
  const ref = createRef(null)
  const dispatch = useDispatch()
  const { bidOnNext } = useActiveGameData()
  const { getRandomName } = useRandomName()

  const { gameId, roundIndex, amount, strikePrice, settlementPrice, allPlayers = [], winDirection } = resultObj
  const { iconProps, gameLabel } = getGameParameters(gameId)

  const { account } = useUser('wallet')
  const { accessToken } = useAccessToken(account)

  const onBidNextClick = () => {
    bidOnNext()
    closeModal({ unupdatePriceScale: true })
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
        <Snap ref={ref}>
          <CoinRains />
          <h2>You Won {currencyFormatter(amount)}!</h2>
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
        </Snap>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>

        <div className='list_of_wrap'>
          <div className='list_of winners bid_down'>
            <h4>
              Winners
              <strong style={{ color: `${winDirection === UP ? '#00c213' : '#DE0E54'}` }}>
                {winDirection === UP ? 'Bid Up' : 'Bid Down'}
              </strong>
            </h4>

            <div className='grid'>
              <span className='head'>
                <strong>User</strong>
              </span>
              <span className='head'>
                <strong>Total Bids</strong>
              </span>

              {allPlayers[winDirection].map((winner, idx) => (
                <React.Fragment key={idx}>
                  <span className='cell userid'>{winner.username || getRandomName(winner.address)}</span>
                  <span className='cell totalbids'>
                    <div class={`triangle ${winDirection} large`}></div>
                    {currencyFormatter(winner.amount)}
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
