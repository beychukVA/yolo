import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectWalletTxs } from 'redux/selectors'

import { TX_TYPE, YOUR_BIDS_ROUNDS_PERSISTANCE } from 'constants/index'

import { useConvertAmount } from 'utils/hooks'
import { LIVE_OFFSET } from 'constants/index'

import { BiddersBoard } from './BiddersBoard'
import { useGamesList } from 'hooks/games/useGamesList'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'
import { BigNumber } from 'ethers'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGamesPool } from 'hooks/gamePool/useGamesPool'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

export const BiddersPanel = (props) => {
  const { tokenId, formatToken } = useToken()
  const { username } = useUser('profile')
  const { account } = useUser('wallet')
  const { activeGameId, activeCardRoundOffset, activeCardRoundIndex } = useActiveGameData()
  const { gamesList } = useGamesList()
  const getLiveRoundData = useLiveRoundData()

  const { pools } = useGamesPool()
  const gamePool = useMemo(() => {
    return pools?.[activeGameId]?.[activeCardRoundIndex]
  }, [pools, activeGameId, activeCardRoundIndex])

  const allMyBidsFromLiveRoundIndex = useMemo(() => {
    const liveRoundIndex = activeCardRoundIndex - activeCardRoundOffset
    const allGamePoolAsArray = Object.entries(pools?.[activeGameId] || {})
    const gamePoolFromRoundIndex = allGamePoolAsArray.filter(([key, value]) => key >= liveRoundIndex)
    const allMyBidsFromLiveRoundIndex = gamePoolFromRoundIndex.map(([key, value]) => value.bids.myBids).flat()
    return allMyBidsFromLiveRoundIndex
  }, [activeCardRoundIndex, activeCardRoundOffset, activeGameId, pools])

  const txs = useSelector(selectWalletTxs())

  const [exchangeRate, setExchangeRate] = useState([])
  const convert = useConvertAmount()

  const buildBiddersListOnNext = (offChainMyBids, gameId) => {
    const currentRoundIndexes = +getLiveRoundData(gameId)?.roundIndex
    if (txs && currentRoundIndexes) {
      const walletTxs = Object.values(txs) || []

      const myBidsInWallet = walletTxs.filter((tx) => {
        const bidInfo = tx.txParams
        const isInGameId = tx.gameId === gameId
        const isBid =
          tx.txType === TX_TYPE.BID && bidInfo.bidRoundIndex >= currentRoundIndexes - YOUR_BIDS_ROUNDS_PERSISTANCE

        return isInGameId && isBid
      })

      const myBids = myBidsInWallet.map((bidTx) => {
        const txHash = bidTx.hash
        const txStatus = bidTx.status
        const isHiddenInUi = !!bidTx.isHiddenInUi
        const subGraphBid = offChainMyBids.find((sgBid) => {
          return sgBid.id?.includes(`${txHash}`)
        })
        const builtBid = {
          amount: formatToken(BigNumber.from(`${bidTx.txParams.amount}`)),
          direction: bidTx.txParams.isUp === undefined ? undefined : bidTx.txParams.isUp ? 'up' : 'down',
          bucketLevel: bidTx.txParams.level,
          gameId: bidTx?.gameId || '',
          id: bidTx.txParams.bidId,
          player: { id: account },
          confirmations: bidTx.confirmations,
          isPending: bidTx.txParams.bidRoundIndex >= currentRoundIndexes ? true : false,
          txType: 'BID',
          username: '',
          bidRoundIndex: bidTx.txParams.bidRoundIndex
        }
        const composedBid = {
          ...(subGraphBid || builtBid),
          txStatus,
          isHiddenInUi,
          walletTxInfo: bidTx
        }
        return composedBid
      })
      return myBids
    }
  }

  const calcBidders = () => {
    let myBids = []
    let othersBids = []
    if (gamePool) {
      const { othersBids: offChainOthersBids, myBids: offChainMyBids } = gamePool.bids
      const mBids =
        activeCardRoundOffset >= LIVE_OFFSET
          ? buildBiddersListOnNext(allMyBidsFromLiveRoundIndex, activeGameId) || []
          : offChainMyBids
      const oBids = offChainOthersBids || []
      if (mBids.length) {
        mBids.map((bid) => {
          const amount = (parseFloat(bid.amount) * exchangeRate).toFixed(2)
          const isMine = true
          const newBidder = { ...bid, amount, isMine, username }
          myBids.push(newBidder)
          return bid
        })
      }

      if (oBids.length) {
        oBids.map((bid) => {
          const amount = (parseFloat(bid.amount) * exchangeRate).toFixed(2)
          const isMine = bid.player.id === account
          const newBidder = { ...bid, amount, isMine }
          othersBids.push(newBidder)
          return bid
        })
      }
    }

    const bidders = { myBids, othersBids }
    return bidders
  }

  const calcAllMyBids = () => {
    let myBids = {}
    gamesList.map((gameId) => {
      const currentRoundIndexes = +getLiveRoundData(gameId)?.roundIndex
      const roundIndex = currentRoundIndexes + activeCardRoundOffset
      const gamePool = roundIndex && pools[gameId] ? pools[gameId][roundIndex] : null
      let poolBids = []
      if (gamePool) {
        const { myBids: offChainMyBids } = gamePool.bids
        const allGamePoolAsArray = Object.entries(pools[gameId])
        const gamePoolFromRoundIndex = allGamePoolAsArray.filter(([key, value]) => key >= currentRoundIndexes)
        const myBidsFromLiveRoundIndexForGameId = gamePoolFromRoundIndex.map(([key, value]) => value.bids.myBids).flat()
        const mBids =
          activeCardRoundOffset >= LIVE_OFFSET
            ? buildBiddersListOnNext(myBidsFromLiveRoundIndexForGameId, gameId) || []
            : offChainMyBids
        if (mBids.length) {
          mBids.map((bid) => {
            const amount = (parseFloat(bid.amount) * exchangeRate).toFixed(2)
            const isMine = true
            const newBidder = { ...bid, amount, isMine, username }
            poolBids.push(newBidder)
            return bid
          })
        }
      }
      myBids[gameId] = poolBids
      return true
    })
    return myBids
  }

  const calcGaugeValues = () => {
    let position = 50,
      totalBids = 0,
      up = 0,
      down = 0,
      playersUp = 0,
      playersDown = 0,
      totalBucketWon = 0,
      totalBucketLost = 0

    if (gamePool) {
      const { up: cryptoUp = 0, down: cryptoDown = 0, bids = [] } = gamePool
      up = cryptoUp * exchangeRate || 0
      down = cryptoDown * exchangeRate || 0
      totalBids = up + down

      bids.allBids.map((bid) => {
        if (!bid.bucketLevel) return true
        if (!bid.winBucket) return true
        if (bid.bucketLevel === bid.winBucket) {
          totalBucketWon = totalBucketWon + Number(bid.amount)
        } else {
          totalBucketLost = totalBucketLost + Number(bid.amount)
        }
        return true
      })

      const allBids = [...bids.myBids, ...bids.othersBids]
      if (up > down) {
        position = down !== 0 ? +(50 + (Math.log10(up / down) * 100 * 50) / 130).toFixed(0) : 100
        position = position > 95 ? 95 : position // 20 to 1 in log is 1.3 - beyond that meter is saturated
      } else if (up < down) {
        position = up !== 0 ? +(50 - (Math.log10(down / up) * 100 * 50) / 130).toFixed(0) : 0
        position = position < 5 ? 5 : position
      }
      const filteredPlayersByRound = allBids.filter((player) => Number(player.bidRoundIndex) === activeCardRoundIndex)
      playersUp = filteredPlayersByRound.filter((player) => player.direction === 'up').length
      playersDown = filteredPlayersByRound.length - playersUp
    }
    return {
      totalBids: totalBids.toFixed(2),
      position,
      up: up.toFixed(2),
      down: down.toFixed(2),
      playersUp,
      playersDown,
      totalBucketWon,
      totalBucketLost
    }
  }

  useEffect(() => {
    const exchangeRate = convert(1, tokenId, DEFAULT_FIAT, { number: true }) || 0
    setExchangeRate(exchangeRate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool])

  return (
    <StyledBiddersBoard
      {...props}
      data={{
        gaugeValues: calcGaugeValues(),
        allMyBids: calcAllMyBids(),
        activeCardRoundIndex,
        activeCardRoundOffset
      }}
    />
  )
}

const StyledBiddersBoard = styled(BiddersBoard)`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
`
