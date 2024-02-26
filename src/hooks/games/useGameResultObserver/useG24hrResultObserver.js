import { useCallback } from 'react'
import { emitCustomEvent } from 'react-custom-events'
import { WINNER, LOSER, PUSH } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'

const BID_EVENTS = {
  [WINNER]: EVENTS.GAME_WON,
  [LOSER]: EVENTS.GAME_LOST,
  [PUSH]: EVENTS.GAME_PUSHED
}

const get24hrResultModalObj = (variant, resultObj) => ({
  // this component will receive `closeModal` prop to close programmatically the modal
  show: true,
  id: 'bid24hrResult',
  props: { variant, resultObj }
})

export const useG24hrResultObserver = () => {
  const { updateModal } = useYoloModal()
  const { account } = useUser('wallet')

  const amIaWinner24hr = useCallback(
    (roundEndedData) => {
      const { gameId, lastRoundIndex, lastGamePool } = roundEndedData
      const { bids, winBucket, winningPlayers } = lastGamePool
      //this check if I have bids in this round

      const iAmPushed = bids.myBids.length === bids.allBids.length

      const iWon = winningPlayers.findIndex((playerAccount) => {
        return isAddressesEqual(playerAccount, account)
      })

      const roundResult = iAmPushed ? PUSH : iWon >= 0 ? WINNER : LOSER

      //Result Modal
      const pushModalObj = get24hrResultModalObj(roundResult, {
        gameId,
        roundIndex: lastRoundIndex
      })
      updateModal(pushModalObj)
      emitCustomEvent(BID_EVENTS[roundResult], { status: roundResult, amountInUSD: '0.00' })
    },
    [account]
  )

  return { amIaWinner24hr }
}
