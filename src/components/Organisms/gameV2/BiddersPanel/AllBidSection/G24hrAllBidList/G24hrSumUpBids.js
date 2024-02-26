import { BucketsLevelIcon, bucketsLevelLimit } from 'components/Atoms/BucketLevelIcon'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { use24hGameRoundData } from 'hooks/games/use24hGameRoundData'
import { useEffect, useMemo } from 'react'

import { G24hrSumUpStyled } from './G24hrSumUpBids.styled'

export const G24hrSumUpBids = () => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { state, getGameRoundData } = use24hGameRoundData()

  const { gameRoundPool } = useGameRoundPool(activeGameId, activeCardRoundIndex)
  const bidders = useMemo(() => gameRoundPool?.bids?.allBids || [], [gameRoundPool?.bids?.allBids])

  const bucketsLimits = bucketsLevelLimit(null, state?.buckets)

  useEffect(() => {
    if (activeGameId && activeCardRoundIndex) {
      getGameRoundData(activeGameId, activeCardRoundIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGameId, activeCardRoundIndex])

  const playersInBuckets = useMemo(() => {
    if (!bidders) return
    const l0 = bidders.filter((bid) => bid.bucketLevel === 0)?.length || 0
    const l1 = bidders.filter((bid) => bid.bucketLevel === 1)?.length || 0
    const l2 = bidders.filter((bid) => bid.bucketLevel === 2)?.length || 0
    const l3 = bidders.filter((bid) => bid.bucketLevel === 3)?.length || 0
    const l4 = bidders.filter((bid) => bid.bucketLevel === 4)?.length || 0
    return [l4, l3, l2, l1, l0]

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidders.length])

  return (
    <G24hrSumUpStyled>
      <div className='module_boxes'>
        <div className='box'>
          {bidders?.length || '0'}
          <strong>Bids</strong>
        </div>
        <div className='box'>
          <div className='bid_types_wrapper'>
            <div className='item_bid_total_wrapper'>
              {playersInBuckets.map((playersCount, idx) => (
                <div key={idx} className='item_bid_total'>
                  {playersCount}
                </div>
              ))}
            </div>
            <div className='item_bid_type_wrapper'>
              {bucketsLimits.reverse().map((bucketLimit, idx) => (
                <div key={idx} className='item_bid_type'>
                  <BucketsLevelIcon level={4 - idx} />
                  {bucketLimit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </G24hrSumUpStyled>
  )
}
