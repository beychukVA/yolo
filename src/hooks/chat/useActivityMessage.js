import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectGameIdCurrentRoundIndex } from 'redux/selectors'
import { config } from 'config'
import { ACTIVITY_TYPE, MSG_TYPE, UP } from 'constants/index'
import { GAME_FEE } from 'constants/index'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGamePoolAllRounds } from 'hooks/gamePool/useGamesPool'

export const useActivityMessage = () => {
  const { activeGameId } = useActiveGameData()
  const { allGamePools } = useGamePoolAllRounds(activeGameId)

  const [threshold, setThreshold] = useState(0)
  const [activityMessages, setActivityMessages] = useState([])
  const [lastPastRoundNumber, setLastPastRoundNumber] = useState(0)
  const [lastActiveGameId, setLastActiveGameId] = useState()

  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex(activeGameId))
  const botsAddresses = config.BOTS_ADDRESS.join('|').toLowerCase()

  useEffect(() => {
    if (lastActiveGameId !== activeGameId) {
      setThreshold(0)
      setActivityMessages([])
      setLastPastRoundNumber(0)
      setLastActiveGameId(activeGameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGameId])

  useEffect(() => {
    if (lastPastRoundNumber >= gameIdCurrentRoundIndex) return
    if (!allGamePools) return
    let pastMessages = []
    for (const roundId in allGamePools) {
      if (roundId >= gameIdCurrentRoundIndex) break
      if (roundId < lastPastRoundNumber) continue

      const gamePool = allGamePools[roundId]
      const winDirection = gamePool.winDirection
      const totalUp = gamePool.up
      const totalDown = gamePool.down
      let poolBids = gamePool.bids.myBids.concat(gamePool.bids.othersBids)
      poolBids = poolBids.filter((bid) => !botsAddresses.includes(bid.player.id.toLowerCase()))

      if (!poolBids.length) break

      let maxWinningBid = {},
        maxWinningBidAmount = 0

      poolBids.map((bid) => {
        const bidAmount = parseFloat(bid.amount)
        if (bid.direction === winDirection && bidAmount > maxWinningBidAmount) {
          maxWinningBid = bid
          maxWinningBidAmount = bidAmount
        }
      })
      let winAmount = 0

      if (winDirection == UP) {
        winAmount = ((maxWinningBidAmount / totalUp) * totalDown + maxWinningBidAmount) * GAME_FEE
      } else {
        winAmount = ((maxWinningBidAmount / totalDown) * totalUp + maxWinningBidAmount) * GAME_FEE
      }
      if (maxWinningBid.player?.id) {
        pastMessages.push({
          address: maxWinningBid.player.id,
          messageType: MSG_TYPE.ACTIVITY,
          activityType: ACTIVITY_TYPE.WIN,
          amount: winAmount,
          roundNumber: maxWinningBid.bidRoundIndex,
          timestamp: gamePool.timestamp
        })
      }
    }

    setActivityMessages((prevMessage) => [...prevMessage, ...pastMessages])
    setLastPastRoundNumber(gameIdCurrentRoundIndex)
  }, [allGamePools, gameIdCurrentRoundIndex, lastPastRoundNumber])

  useEffect(() => {
    if (!gameIdCurrentRoundIndex) return
    if (!allGamePools) return
    let totalBids = []
    let futureMessages = []
    let curThreshold = threshold
    for (const roundId in allGamePools) {
      if (roundId <= gameIdCurrentRoundIndex) continue
      const gamePool = allGamePools[roundId]
      totalBids = totalBids.concat(gamePool.bids.myBids, gamePool.bids.othersBids)

      for (let i = 0; i < totalBids.length; i++) {
        const bidAmount = parseFloat(totalBids[i].amount)
        if (bidAmount > curThreshold && totalBids[i].player?.id) {
          futureMessages.push({
            address: totalBids[i].player.id,
            messageType: MSG_TYPE.ACTIVITY,
            activityType: ACTIVITY_TYPE.BID,
            roundNumber: totalBids[i].bidRoundIndex,
            amount: bidAmount,
            direction: totalBids[i].direction,
            timestamp: gamePool.timestamp
          })
          curThreshold = bidAmount
        }
      }
    }
    setActivityMessages((prevMessage) => [...prevMessage, ...futureMessages])
    setThreshold(curThreshold)
  }, [threshold, allGamePools, gameIdCurrentRoundIndex])

  return activityMessages
}
