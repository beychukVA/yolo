import React, { useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { icons } from 'common'
import { Link } from 'components/Atoms/Link'

import { currencyFormatter } from 'utils'
import { priceFeedActions } from 'redux/actions'

import { Typography } from 'components/Atoms/Typography'
import { getGameParameters } from 'constants/games'

import { capitalizeFirst } from 'utils'
import { UP, DOWN, WINNER, LOSER, PUSH } from 'constants/index'

import { useConvertAmount } from 'utils/hooks'
import { config } from 'config'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useRandomName } from 'utils/hooks/useRandomName'

import html2canvas from 'html2canvas'
import axios from 'axios'
// import { useAccessToken } from 'hooks/user/useBackendAuth'

import { API } from 'constants/apiEndPoints'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { CoinRains } from 'components/Molecules/CoinRains'

const twitterShare = require('twitter-share')

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minBidResultModal = ({ closeModal, variant = WINNER, resultObj }) => {
  const ref = createRef(null)
  const dispatch = useDispatch()
  const { bidOnNext } = useActiveGameData()
  const convert = useConvertAmount()
  const { getRandomName } = useRandomName()

  const { gameId, roundIndex, amount, strikePrice, settlementPrice, allPlayers = [], winDirection } = resultObj
  const loseDirection = winDirection === UP ? DOWN : UP
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, FIAT_MAX_DECIMALS_DIGITS } = getGameParameters(gameId)

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
    <Container id='resultModalContainer' isLoser={variant === LOSER}>
      <Snap ref={ref}>
        {variant === WINNER && <CoinRains />}
        <YouWonLost>{variant === WINNER ? 'You Won!' : variant === LOSER ? 'You Lost' : 'You Pushed'}</YouWonLost>
        <Amount>{currencyFormatter(amount)}</Amount>
        {variant === WINNER && <Notes></Notes>}
        {variant === LOSER && <Notes>Your losses will reflect shortly in your Wallet</Notes>}
        {variant === PUSH && <Notes>Your bid(s) have been returned and will appear shortly in your Wallet</Notes>}
        <CoinContent>
          <CoinIcon />
          ETH / USD
        </CoinContent>
        <WhichRound>Round {roundIndex}</WhichRound>

        <PriceWrap>
          <Price>
            <strong>Strike </strong>
            {currencyFormatter(strikePrice / FIAT_MAX_DECIMALS_DIGITS, { decimalDigits })}
          </Price>
          <Price>
            <strong>Settlement </strong>
            {currencyFormatter(settlementPrice / FIAT_MAX_DECIMALS_DIGITS, { decimalDigits })}
          </Price>
        </PriceWrap>
      </Snap>
      <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>
      <ListWrapper>
        <List direction={winDirection}>
          <Typography variant='caption'>
            {variant !== PUSH ? 'Winners' : ''}
            <strong>{`Bid ${capitalizeFirst(winDirection)}`}</strong>
          </Typography>
          <Grid>
            <GridHead>
              <strong>User</strong>
            </GridHead>
            <GridHead>
              <strong>Total Bids</strong>
            </GridHead>
            {/* TODO:: this should be in a separate or common component to be note redundant */}
            {allPlayers[winDirection].length > 0 &&
              allPlayers[winDirection].map((player, index) => {
                const username = getRandomName(player.address)
                const amountInUSD = convert(player.amount, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }) || 0

                return (
                  <React.Fragment key={index}>
                    <GridCell isMe={player.isMine}>{player.isMine ? 'Your Bid' : username}</GridCell>
                    <GridCell isMe={player.isMine}>
                      {winDirection === UP ? <UpIcon /> : <DownIcon />}
                      {currencyFormatter(amountInUSD.toFixed(2))}
                    </GridCell>
                  </React.Fragment>
                )
              })}
            {/**********************************************************/}
          </Grid>
        </List>
        <List direction={loseDirection}>
          <Typography variant='caption'>
            {variant !== PUSH ? 'Losers' : ''}
            <strong>{`Bid ${capitalizeFirst(loseDirection)}`}</strong>
          </Typography>
          <Grid>
            <GridHead>
              <strong>User</strong>
            </GridHead>
            <GridHead>
              <strong>Total Bids</strong>
            </GridHead>
            {/* TODO:: this should be in a separate or common component to be note redundant */}
            {allPlayers[loseDirection].length > 0 &&
              allPlayers[loseDirection].map((player, index) => {
                const username = getRandomName(player.address)
                const amountInUSD = convert(player.amount, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }) || 0

                return (
                  <React.Fragment key={index}>
                    <GridCell isMe={player.isMine}>{player.isMine ? 'Your Bid' : username}</GridCell>
                    <GridCell isMe={player.isMine}>
                      {loseDirection === UP ? <UpIcon /> : <DownIcon />}
                      {currencyFormatter(amountInUSD.toFixed(2))}
                    </GridCell>
                  </React.Fragment>
                )
              })}
            {/**********************************************************/}
          </Grid>
        </List>
      </ListWrapper>
      {variant === WINNER && (
        <>
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
        </>
      )}
    </Container>
  )
}
const Snap = styled.div`
  width: 60vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(33, 38, 47, 0.6);
  //-webkit-backdrop-filter: blur(5px);
  //backdrop-filter: blur(5px);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
  &:before {
    position: absolute;
    background: ${({ isLoser }) =>
      isLoser
        ? 'linear-gradient(180deg, rgba(23,60,139,0.15) 0%, rgba(10,25,58,0.35) 60%, rgba(10,25,58,0.35) 85%, rgba(23,60,139,0.15) 100%)'
        : 'linear-gradient(180deg, rgba(23, 60, 139, 0.15) 0%, rgba(10, 25, 58, 0.95) 60%, rgba(10, 25, 58, 0.85) 85%, rgba(23, 60, 139, 0.15) 100%)'};
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    content: '';
    transform: translateZ(-50%);
  }

  @-moz-document url-prefix() {
    background: rgba(33, 38, 47, 0.9);
  }
`

const YouWonLost = styled(Typography)`
  font-size: 5.8rem;
  font-weight: 200;
  position: relative;
  z-index: 9;
  letter-spacing: -0.05em;
  margin: 0;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 4.3rem;
  }
`
const Amount = styled(Typography)`
  font-size: 3.1rem;
  font-weight: 800;
  position: relative;
  z-index: 9;
  letter-spacing: -0.03em;
  margin: 20px 0 5px 0;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 2.7rem;
    letter-spacing: -0.02em;
    margin: 5px 0;
  }
`
const WhichRound = styled.div`
  z-index: 9;
  padding: 20px 0 10px 0;
  font-size: 1.3rem;
  font-weight: 800;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 5px 0;
  }
`
const PriceWrap = styled.div`
  position: relative;
  z-index: 9;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px 30px;
  margin: 0;
  text-align: center;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 15px 30px;
    margin: 5px 0;
  }
`
const Price = styled.div`
  font-size: 1rem;
  font-weight: 300;
  padding: 0 0 0 0;
`
const Notes = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 300;
  position: relative;
  z-index: 9;
  text-align: center;
  opacity: 0.6;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.7rem;
    max-width: 350px;
    opacity: 0.6;
  }
`
const BidGameButton = styled.button`
  background: rgba(36, 89, 202, 1);
  border-radius: 15px;
  padding: 8px 24px;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  margin: 10px 0 0 0;
  position: relative;
  z-index: 9;
  color: rgba(255, 255, 255, 1);

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 8px 24px;
    font-size: 0.9rem;
  }
`
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  position: relative;
  z-index: 8;
  ${({ theme }) => theme.breakPoints['480px']} {
    flex-direction: row;
    margin: 15px 0 0 0;
  }
`
const List = styled.div`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  max-height: 250px;
  min-width: 240px;
  h5 {
    font-size: 1rem;
    font-weight: 800;
    padding: 12px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: rgba(255, 255, 255, 1);
    strong {
      display: block;
      text-transform: none;
      font-weight: 500;
      color: ${({ direction }) => (direction === 'up' ? 'rgba(0, 194, 19, 1)' : 'rgba(178, 5, 58, 1)')};
      ${({ theme }) => theme.breakPoints['480px']} {
        display: inline-block;
        padding: 0 0 0 6px;
      }
    }
    ${({ theme }) => theme.breakPoints['480px']} {
      font-size: 0.9rem;
    }
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    max-height: 200px;
    min-width: 180px;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
const GridCell = styled.span`
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ isMe }) => (isMe ? 'background: rgba(0,0,0,.2);' : '')}

  &:last-child, &:nth-last-child(2) {
    border-bottom: 0;
  }
`
const GridHead = styled(GridCell)`
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  strong {
    font-weight: 600;
    margin: 0 3px 0 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 6px 12px;
  }
`
const DownIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #9b0030 transparent transparent transparent;
  margin-right: 5px;
`
const UpIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent #01a812 transparent;
  margin-right: 5px;
`
const ShareOnTwitterLink = styled.div`
  display: flex;
  position: relative;
  z-index: 7;
  font-size: 0.9rem;
  text-decoration: none;
  border: 1px solid #1da1f2;
  border-radius: 15px;
  padding: 8px 20px 8px 20px;
  line-height: 100%;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(29, 161, 242, 0.3);
  }
`

const TwitterIcon = styled.div`
  -webkit-mask: url(${icons.TwitterIcon}) center center / auto 16px no-repeat;
  mask: url(${icons.TwitterIcon}) center center / auto 16px no-repeat;
  background: #1da1f2;
  width: 16px;
  height: 16px;
  margin: 0 0 0 10px;
`

const LearnMoreLink = styled(Link)`
  position: relative;
  z-index: 7;
  font-size: 0.8rem;
  display: flex;
  margin: 5px 0 0 0;
  &:hover {
    text-decoration: none;
  }
`
const CoinContent = styled.div`
  z-index: 9;
  padding: 10px 0 10px 0;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  position: relative;
  padding: 8px 20px 8px 20px;
  line-height: 100%;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`
const CoinIcon = styled.div`
  background: url(${icons.eth_icon}) center center / 18px auto no-repeat;
  width: 26px;
  height: 26px;
  margin: 0 10px 0 0px;
`
