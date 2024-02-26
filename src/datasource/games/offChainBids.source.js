import axios from 'axios'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { getGameParameters } from 'constants/games'
import { API } from 'constants/apiEndPoints'
import { formatUnits } from 'ethers/lib/utils'
import { config } from 'config/index'
import { getTokenInfo } from 'constants/tokens'
import { getAuthToken__DEPRECATED } from 'hooks/user/getUserToken__DEPRECATED'
import { isEmpty } from 'lodash'
import { BigNumber } from 'ethers'
import { getPayouts } from 'utils/payout'

import { Zero } from '@ethersproject/constants'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { GAME_TYPES } from 'constants/games/gameTypes'

const defaultTokenDecimals = getTokenInfo(config.DEFAULT_TOKEN, config.DEFAULT_CHAIN_ID).decimals

const calculateWinBucket = (bucketsBP, strikePrice, settlementPrice) => {
  if (isEmpty(bucketsBP)) return null

  const strikePriceBN = BigNumber.from(`${strikePrice}`)
  const settlementPriceBN = BigNumber.from(`${settlementPrice}`)

  const bucketsValues = bucketsBP.map((bucketBasisPoint) => {
    const percentageToAdd = strikePriceBN.mul(bucketBasisPoint).div(10000)
    const bucketValueBN = strikePriceBN.add(percentageToAdd)
    return bucketValueBN
  })
  const winBucket = bucketsValues.findIndex((valueBN) => valueBN.gte(settlementPriceBN))

  return winBucket > 0 ? winBucket : 0
}

const getRoundBidsAndWinnerLoserRows = async (gameId, allGameIdRoundsIndex, myAddress) => {
  const postInput = {
    bidRoundIndex: `{${allGameIdRoundsIndex.join()}}`,
    gameId
  }

  const [gameContractInfo] = getSmartContractsInfo([gameId])

  if (!gameContractInfo) {
    return { gameRoundsBidRows: [], winnerLoserRows: [] }
  }
  const gameContractAddress = gameContractInfo?.address

  const accessToken = getAuthToken__DEPRECATED(myAddress)
  const offChainRoundBids = await axios.post(API.BIDS_GET_MULTI_ROUND_BIDS, postInput, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const gameRoundsBidRows = JSON.parse(offChainRoundBids.data.body).rows || []
  const winnerLosers = await axios.post(API.BIDS_GET_MULTI_ROUND_WINNERS_LOSERS, postInput, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const winnerLoserBody = (!!winnerLosers.data && JSON.parse(winnerLosers.data.body)) || []
  const winnerLoserRows = winnerLoserBody.filter((row) => {
    return row.roundsettleddata?.address === gameContractAddress
  })
  return { gameRoundsBidRows, winnerLoserRows }
}

// export const transformRoundDataToReduxStore = (gameId, roundData, myAddress, lpFeeRate) => {
export const transformRoundDataToReduxStore = (gameId, roundData, myAddress) => {
  const aBids = [],
    oBids = [],
    mBids = []

  let up = 0,
    down = 0

  let bucketsAmount = {}

  const rawPlayersUp = []
  const rawPlayersDown = []
  const { gameType } = getGameParameters(gameId)
  const { bids: allBids, winDirection, winBucket, ...rest } = roundData

  if (allBids.length > 0) {
    allBids.map((item) => {
      if (!item.txhash) return true
      const bid = item.bid
      const bidOwnAddress = bid.txInfo.from
      const amount = formatUnits(bid.amount, defaultTokenDecimals)
      const direction = bid.isUp === undefined ? null : bid.isUp ? 'up' : 'down'
      const builtBid = {
        bidRoundIndex: bid.bidRoundIndex,
        amount,
        currency: bid.currency,
        direction,
        bucketLevel: bid.level ?? null,
        id: bid.txInfo.hash,
        txHash: bid.txInfo.hash,
        player: { id: bidOwnAddress },
        confirmations: bid.txInfo.confirmations,
        txType: 'BID',
        address: bidOwnAddress,
        username: item.username, //|| generateName(),
        isPending: false,
        winDirection,
        winBucket
      }
      if (direction === 'up') {
        up += parseFloat(amount) // this is not good, will be floating point errors - only use as last step to display fiat if needed - use bignumber library
        rawPlayersUp.push(bid.address)
      } else {
        down += parseFloat(amount)
        rawPlayersDown.push(bid.address)
      }

      aBids.push(builtBid)
      if (isAddressesEqual(bidOwnAddress, myAddress)) {
        mBids.push(builtBid)
      } else {
        oBids.push(builtBid)
      }
      return true
    })
    // calculate 24hr buckets amount
    if (gameType === GAME_TYPES.G_24HR) {
      bucketsAmount = allBids.reduce(
        (bidBuckets, item, idx) => {
          const bid = item.bid
          if (isEmpty(bid)) return bidBuckets
          const bucket = bid.level
          const amountBN = BigNumber.from(bid.amount)
          const prevBucketValue = bidBuckets[`l${bucket}`] || Zero
          const newValue = prevBucketValue.add(amountBN)
          const newBidBuckets = { ...bidBuckets, [`l${bucket}`]: newValue }
          return newBidBuckets
        },
        { l0: Zero, l1: Zero, l2: Zero, l3: Zero, l4: Zero }
      )
    }
  }

  const total = up + down
  const payouts = getPayouts([up, down])
  const payoutUp = payouts[0] //Number(((total / up) * (1 - fee) || 0).toFixed(2))
  const payoutDown = payouts[1] //Number(((total / down) * (1 - fee) || 0).toFixed(2))
  const playersUp = rawPlayersUp.length
  const playersDown = rawPlayersDown.length
  const players = playersUp + playersDown

  const reduxStoreRow = {
    timestamp: Date.now(),
    bids: { allBids: aBids, othersBids: oBids, myBids: mBids },
    ...rest,
    bucketsAmount,
    winDirection,
    winBucket,
    total,
    up,
    down,
    payoutUp,
    payoutDown,
    players,
    playersUp,
    playersDown
  }

  return reduxStoreRow
}

export const getMultiPoolData = async ({ myAddress, roundsOffset, gamesData }) => {
  const multiPoolArray = await Promise.all(
    gamesData.map(async (game) => {
      const gameId = game.gameId
      const liveRoundIndex = +game.liveRoundIndex
      if (isNaN(liveRoundIndex)) {
        return { [gameId]: {} }
      }

      const allGameIdRoundsIndex = roundsOffset.map((roundOffset) => liveRoundIndex + roundOffset)
      const { gameRoundsBidRows, winnerLoserRows } = await getRoundBidsAndWinnerLoserRows(
        gameId,
        allGameIdRoundsIndex,
        myAddress
      )

      const gamePoolByRoundIndex = allGameIdRoundsIndex.map((roundIdx) => {
        const roundSettledData = winnerLoserRows.find((row) => Number(row.roundindex) === Number(roundIdx))
        const returnValues = roundSettledData?.roundsettleddata?.returnValues || []
        const strikePrice = returnValues?.finalGameInfo?.strikePrice || 0
        const settlementPrice = returnValues?.finalGameInfo?.settlementPrice || 0
        const buckets = returnValues?.finalGameInfo?.levelStrikeBPDeltas || []
        const winDirection = settlementPrice > strikePrice ? 'up' : 'down'
        const winBucket = calculateWinBucket(buckets, strikePrice, settlementPrice)
        const losingAmounts = returnValues?.losingAmounts || []
        const losingPlayers = returnValues?.losingPlayers || []
        const winningAmounts = returnValues?.winningAmounts || []
        const winningPlayers = returnValues?.winningPlayers || []

        const roundData = {
          bids: gameRoundsBidRows.filter((row) => Number(row.roundid) === Number(roundIdx)),
          strikePrice,
          settlementPrice,
          buckets,
          winDirection,
          winBucket,
          losingAmounts,
          losingPlayers,
          winningAmounts,
          winningPlayers
        }

        const reduxStoreRow = transformRoundDataToReduxStore(gameId, roundData, myAddress)
        return { [gameId]: { [roundIdx]: { ...reduxStoreRow } } }
      })
      const multiGameIdPool = gamePoolByRoundIndex.reduce((obj, item) => {
        return (obj[gameId] = { [gameId]: { ...obj[gameId], ...item[gameId] } })
      })

      return multiGameIdPool
    })
  ).catch()
  const multiPool = await multiPoolArray.reduce((obj, item) => ({ ...obj, ...item }))
  return multiPool
}
