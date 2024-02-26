import { useCallback } from 'react'
import { emitCustomEvent } from 'react-custom-events'
import { DOWN, UP, WINNER, LOSER, PUSH, GAME_FEE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { config } from 'config'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

const BID_EVENTS = {
  [WINNER]: EVENTS.GAME_WON,
  [LOSER]: EVENTS.GAME_LOST,
  [PUSH]: EVENTS.GAME_PUSHED
}

const get3minResultModalObj = (variant, resultObj) => ({
  // this component will receive `closeModal` prop to close programmatically the modal
  show: true,
  id: 'bid3minResult',
  props: { variant, resultObj }
})

const getMyNetBid = (lastGamePool, isPushed) => {
  const { winDirection, bids, up: totalUpBids, down: totalDownBids } = lastGamePool
  const myBids = bids.myBids
  let myNetBid = 0

  myBids.forEach((bid) => {
    // TODO: all this with BN lib and get dynamic fee value from each game contract
    const bidAmount = parseFloat(bid.amount)
    const bidDirection = bid.direction

    if (isPushed) {
      myNetBid += bidAmount
      return
    }

    if (winDirection === bid.direction && bidDirection === UP) {
      myNetBid += ((bidAmount / totalUpBids) * totalDownBids + bidAmount) * GAME_FEE
    } else if (winDirection === bid.direction && bidDirection === DOWN) {
      myNetBid += ((bidAmount / totalDownBids) * totalUpBids + bidAmount) * GAME_FEE
    } else {
      myNetBid -= bidAmount
    }
  })
  return myNetBid
}

export const useG3minResultObserver = () => {
  const convert = useConvertAmount()
  const { updateModal } = useYoloModal()

  const { account } = useUser('wallet')
  const { tokenId } = useToken()

  const amIaWinner3min = useCallback(
    (roundEndedData) => {
      const { amIin, pushed, gameId, lastRoundIndex, lastGamePool } = roundEndedData
      const { strikePrice, settlementPrice, bids } = lastGamePool

      //this check if I have bids in this round
      if (!amIin) {
        // we can manage some kind of toast here to create more engagement
        return
      }

      //defining useful const and methods
      const winDirection = lastGamePool.winDirection
      const myNetBid = getMyNetBid(lastGamePool, pushed)
      const amountInUSD = convert(myNetBid, tokenId, DEFAULT_FIAT, { number: true }) || 0
      const roundResult = pushed ? PUSH : myNetBid > 0 ? WINNER : LOSER

      const allPlayers = () => {
        const allOffChainBids = bids?.othersBids || []
        const upBids = []
        const downBids = []
        allOffChainBids.forEach((bid) => {
          const amount = parseFloat(bid.amount)
          if (bid.direction === UP) {
            const amountInUSD = convert(amount, tokenId, DEFAULT_FIAT, { number: true }) || 0
            const editedBid = {
              ...bid,
              bidAmountInUSD: amountInUSD.toFixed(2),
              isMine: isAddressesEqual(bid.player.id, account)
            }
            upBids.push(editedBid)
          } else {
            const amountInUSD = convert(amount, tokenId, DEFAULT_FIAT, { number: true }) || 0
            const editedBid = {
              ...bid,
              bidAmountInUSD: amountInUSD.toFixed(2),
              isMine: isAddressesEqual(bid.player.id, account)
            }
            downBids.push(editedBid)
          }
        })

        return {
          up: upBids,
          down: downBids
        }
      }

      //Result Modal
      const pushModalObj = get3minResultModalObj(roundResult, {
        gameId,
        roundIndex: lastRoundIndex,
        amount: amountInUSD.toFixed(2),
        strikePrice,
        settlementPrice,
        allPlayers: allPlayers(),
        winDirection
      })
      updateModal(pushModalObj)
      emitCustomEvent(BID_EVENTS[roundResult], { status: roundResult, amountInUSD })
    },
    [account, convert, tokenId]
  )

  return { amIaWinner3min }
}
