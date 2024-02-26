import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { isEqual } from 'lodash'

import { getGameParameters } from 'constants/games'

import { IconLib } from 'components/Atoms/IconLib'
import { icons } from 'common'
import { ASYNC_STATUS_ID } from 'constants/index'
import { currencyFormatter } from 'utils'
import { YourBidsTour } from 'components/Organisms/OnBoarding/YourBids.tour'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

import { memoThis } from 'utils/react'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { BucketsLevelIcon } from 'components/Atoms/BucketLevelIcon'
import { map } from 'lodash'
import { isEmpty } from 'lodash'
import { YourBidsStyled } from './YourBids.styled'
import { useSelector } from 'react-redux'
import { selectWalletBids } from 'redux/selectors'
import { usePrevious } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { GAME_TYPES } from 'constants/games/gameTypes'

const MyBidItem = memoThis(({ bid }) => {
  const { formatToken: formatUSDC } = useToken('USDC')

  const txStatus = bid?.status
  const isConfirmed = bid?.isConfirmed
  const isUp = bid?.txParams?.isUp
  const bucketLevel = bid?.txParams?.level
  const gameType = bid?.gameType
  const amount = formatUSDC(bid?.txParams?.amount || 0)
  const bidRoundIndex = bid?.txParams?.bidRoundIndex
  const gameId = bid?.gameId

  const { liveRoundData } = useLiveRoundData(gameId)
  const gameIdCurrentRoundIndex = useMemo(() => +liveRoundData?.roundIndex, [liveRoundData?.roundIndex])
  const isLive = bidRoundIndex === gameIdCurrentRoundIndex && liveRoundData.status !== 'open'
  const statusIcon = txStatus === ASYNC_STATUS_ID.FAILED ? 'alertRed' : isConfirmed ? 'checkBlue' : 'pendingYellow'
  return (
    <BidItem>
      <StatusWrap>
        <Value isFailed={statusIcon === 'alertRed'}>
          <SingleContentToggle
            toggle={gameType === GAME_TYPES.G_3MIN}
            trueContent={<IconArrow isUp={isUp} masking />}
            falseContent={<BucketsLevelIcon level={bucketLevel} />}
          />
          {currencyFormatter(amount || 0)}
          {statusIcon !== 'alertRed' && isLive ? <IconLive /> : ''}
          <SingleContentToggle
            noWrapper
            toggle={gameType === GAME_TYPES.G_3MIN}
            trueContent={<div className='round_length min3'>3 min</div>}
            falseContent={<div className='round_length hr24'>DAY</div>}
          />
        </Value>
        <Right>
          <Status status={statusIcon}>
            <IconStatus name={statusIcon} />
            Round {bidRoundIndex}
          </Status>
        </Right>
      </StatusWrap>
    </BidItem>
  )
})

const BidderList = memoThis(({ marketSymbol, gameParams, allBids, opened, onChangeAsset }) => {
  const { gameLabel, icon } = gameParams || {}
  const processedBids = allBids[marketSymbol]

  return (
    <BidderListWrap>
      <StyledInput
        id={`toggle_${marketSymbol}`}
        type='checkbox'
        onClick={() => onChangeAsset(marketSymbol)}
        readOnly
        checked={opened}
      ></StyledInput>
      <GameWrap htmlFor={`toggle_${marketSymbol}`} className='currency_wrap'>
        <GameIcon gameIcon={icon} />
        <GameName>{gameLabel}</GameName>
      </GameWrap>
      <ScrollList className='bidder_list'>
        {processedBids.length > 0 &&
          processedBids.map((bid, idx) => {
            return <MyBidItem key={`bidKey-${idx}`} bid={bid} />
          })}
      </ScrollList>
    </BidderListWrap>
  )
})

const yourBidProcessor = (allYourBids) => {
  let allMyBids = {}
  let gameList = {}
  allYourBids.forEach((singleBid) => {
    const { gameLabel, icon, marketSymbol, gameType } = getGameParameters(singleBid.gameId)
    // map(gamePoolsData, (roundPoolData, roundId) => {
    const newBid = { ...singleBid, gameType }
    gameList[marketSymbol] = { gameLabel, icon }
    allMyBids[marketSymbol] = [...(allMyBids?.[marketSymbol] || []), newBid]
    return true
    // }
  })
  return { gameList, allMyBids }
}

export const YourBids = () => {
  const yourBidsRef = useRef()
  const [{ gameList, allMyBids }, setYourBidsInfo] = useState({})
  const { activeGameId, bidOnNext } = useActiveGameData()
  const [selectedAsset, setSelectedAsset] = useState(activeGameId)
  const allYourBidsNew = useSelector(selectWalletBids())
  const allYourBidsPrev = usePrevious(allYourBidsNew)

  useEffect(() => {
    if (!isEqual(allYourBidsPrev, allYourBidsNew)) {
      const yourBidInfo = yourBidProcessor(allYourBidsNew)
      setYourBidsInfo(yourBidInfo)
    }
  }, [allYourBidsNew, allYourBidsPrev])

  useEffect(() => {
    const { marketSymbol } = getGameParameters(activeGameId)
    setSelectedAsset(marketSymbol)
  }, [activeGameId])

  const onChangeAsset = (gameId) => {
    if (selectedAsset !== gameId) {
      setSelectedAsset(gameId)
    } else {
      setSelectedAsset('NO ASSETS SELECTED')
    }
  }
  return (
    <YourBidsStyled>
      <YourBidsTour componentRef={yourBidsRef} />
      <Container id='yourBids' ref={yourBidsRef}>
        <TitleWrapper>
          <Title role='heading' aria-level='3'>
            YOUR BIDS
          </Title>
        </TitleWrapper>
        <SingleContentToggle
          noWrapper
          toggle={!isEmpty(allMyBids)}
          trueContent={map(gameList, (gameParams, marketSymbol, index) => (
            <BidderList
              key={`${marketSymbol}-${index}`}
              marketSymbol={marketSymbol}
              gameParams={gameParams}
              allBids={allMyBids}
              opened={selectedAsset === marketSymbol}
              onChangeAsset={onChangeAsset}
            ></BidderList>
          ))}
          falseContent={
            <BidderListWrap>
              <NoBids>
                No bids available <span onClick={bidOnNext}>Place a bid in the upcoming round</span>
              </NoBids>
            </BidderListWrap>
          }
        />
      </Container>
    </YourBidsStyled>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TitleWrapper = styled.div`
  padding: 10px 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`

const Title = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 700;
`
const BidderListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 5px 20px;
  background: rgba(152, 183, 253, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0px 0px 45px -1px rgb(23 27 34 / 31%);
  margin: 10px 0 0 0;
  overflow-y: auto;

  ${({ theme }) => theme.breakPoints['1200px']} {
    padding: 10px 0 10px 20px;
    border-radius: 10px;
  }

  @-moz-document url-prefix() {
    background: #2e394a;
  }
`
const StyledInput = styled.input`
  display: none;
  visibility: hidden;

  &:checked ~ .currency_wrap:before {
    -webkit-mask: url(${icons.MinusIcon}) center center / 10px 10px no-repeat;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: 18px;
    content: '';

    ${({ theme }) => theme.breakPoints['1200px']} {
      display: none;
    }
  }

  & ~ .currency_wrap:before {
    -webkit-mask: url(${icons.PlusIcon}) center center / 10px 10px no-repeat;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: 18px;
    content: '';

    ${({ theme }) => theme.breakPoints['1200px']} {
      display: none;
    }
  }

  &:checked ~ .bidder_list {
    max-height: 99px;
    overflow-y: scroll;
    width: calc(100% - 15px);
  }

  & ~ .bidder_list {
    max-height: 0;
  }
`
const ScrollList = styled.div`
  overflow-y: hidden;
  transition: max-height 0.3s;
  width: calc(100% - 22px);
`
const NoBids = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  padding: 0 0 5px 0;
  & span {
    cursor: pointer;
    display: block;
    text-decoration: underline;
    text-decoration-color: #666;
    -webkit-text-underline-position: under;
    text-underline-position: under;
    white-space: nowrap;
  }
`
const BidItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  white-space: nowrap;
  padding: 3px 0 3px 15px;
  margin: 0;
  margin-bottom: 3px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
`
const StatusWrap = styled.div`
  justify-content: space-between;
  margin: 0;
  padding: 0 0 0 0;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  flex-flow: row;
`
const Status = styled.div`
  display: flex;
  //width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  max-width: 85%;
  font-size: 0.75rem;
  margin: 0 0 0 20px;
  color: ${({ status }) => (status === 'alertRed' ? '#ff0000' : status === 'pendingYellow' ? '#e5c247' : '#2a6dff')};
  opacity: 1;
`
const valueFailed = css`
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: red;
`
const Value = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 0 0 0;
  font-weight: 200;
  font-size: 0.8rem;
  white-space: nowrap;
  ${({ isFailed }) => (isFailed ? valueFailed : '')}
  .level_ind {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    line-height: 0;
    font-size: 0.7rem;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 6px 0 0;
    padding: 0 0 0 0;
  }
  .level_ind.fifth {
    background: #0dbb21;
  }
  .level_ind.fourth {
    background: #3ba055;
  }
  .level_ind.third {
    background: #698688;
  }
  .level_ind.second {
    background: #a54976;
  }
  .level_ind.first {
    background: #ca1c5a;
  }
`
const IconArrow = styled(IconLib).attrs(({ isUp }) => {
  return {
    collection: 'general',
    name: 'arrowFilled',
    dimension: '10px',
    rotate: isUp ? 'down' : 'up' //don't change, intentionally inverted
  }
})`
  background: ${({ isUp }) => (isUp ? `rgba(0,194,19,1.0)` : `rgba(226,14,85,1.0)`)};
  margin-right: 5px;
  display: flex;
`
const IconLive = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'liveText',
  dimension: '10px'
})`
  width: 34px;
  height: 10px;
  margin: 0 0 0 5px;
`
const IconStatus = styled(IconLib).attrs({
  collection: 'general',
  dimension: '16px'
})`
  width: 16px;
  height: 16px;
  margin: 0 7px 0 0;
`
const IconClose = styled(IconLib).attrs({
  collection: 'general',
  name: 'close2',
  dimension: '9px'
})`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: 0 10px;
  background: rgba(255, 255, 255, 0.3);
  visibility: ${({ isFailed }) => (isFailed ? 'visible' : 'hidden')};
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`
const GameName = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  opacity: 1;
  line-height: 100%;
`
const GameWrap = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 -20px;
  padding: 5px 15px 10px 15px;
  cursor: pointer;
`
const GameIcon = styled.div`
  background: url('${({ gameIcon }) => gameIcon}') center center / auto 16px no-repeat;
  height: 16px;
  width: 16px;
  margin: 0 3px 0 0;
`
const GameTime = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  padding: 3px 4px;
  margin: 0 0 0 5px;

  ${({ theme }) => theme.breakPoints['600px']} {
    margin: 0 5px;
  }
`
const BlockValue = styled.div`
  font-weight: 700;
  line-height: 100%;
  font-size: 0.75rem;

  ${({ theme }) => theme.breakPoints['600px']} {
    font-weight: 600;
    line-height: 100%;
    font-size: 0.65rem;
    top: 0.1em;
    position: relative;
  }
`
