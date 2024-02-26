import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useMemo } from 'react'

import { G3minSumUpStyled } from './G3minSumUpBids.styled'

export const G3minSumUpBids = () => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { gameRoundPool } = useGameRoundPool(activeGameId, activeCardRoundIndex)
  const bidders = useMemo(() => gameRoundPool?.bids?.allBids || [], [gameRoundPool?.bids?.allBids])

  const playersInBuckets = useMemo(() => {
    if (!bidders) return
    const up =
      bidders.filter((bid) => {
        return bid.direction === 'up'
      })?.length || 0
    const down =
      bidders.filter((bid) => {
        return bid.direction === 'down'
      })?.length || 0
    return { up, down }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidders.length])

  return (
    <G3minSumUpStyled>
      <div className='module_boxes'>
        <div className='box'>
          {bidders?.length || '0'}
          <strong>Bids</strong>
        </div>
        <div className='box'>
          <div className='bid_types_wrapper'>
            <div className='item_bid_total_wrapper'>
              <div className='item_bid_total'>{playersInBuckets.up}</div>
              <div className='item_bid_total'>{playersInBuckets.down}</div>
            </div>

            <div className='item_bid_type_wrapper'>
              <div className='item_bid_type'>
                <div className='triangle up huge green light'></div>Above
              </div>
              <div className='item_bid_type'>
                <div className='triangle down huge red light'></div>Below
              </div>
            </div>
          </div>
        </div>
      </div>
    </G3minSumUpStyled>
  )
}
