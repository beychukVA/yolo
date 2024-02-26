import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import { currencyFormatter } from 'utils'
import { UP, DOWN } from 'constants/index'
import { useConvertAmount } from 'utils/hooks'

import { PredictView } from './PredictView'
import { NextPredictView } from './NextPredictView'
import { config } from 'config'
import { useGameLpFeeRate } from 'hooks/games/useGameLpFeeRate'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'

const { DEFAULT_FIAT, DEFAULT_TOKEN } = config

export const PredictionWidget = () => {
  const { activeGameId, activeCardRoundOffset, activeCardRoundIndex } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(activeGameId)

  const { gameRoundPool } = useGameRoundPool(activeGameId, activeCardRoundIndex)

  const {
    nextLpFeeRate: { N: fee }
  } = useGameLpFeeRate(activeGameId)

  const convert = useConvertAmount()

  const [myBids, setMyBids] = useState([])

  const livePastPotentialGain = (direction, fiatAmount = '') => {
    //Payout Amount = Payout Ratio × Value Locked / Cohort (Your Side) Total × (1 — Treasury Fee)
    const amountInCrypto = convert(fiatAmount, DEFAULT_FIAT, DEFAULT_TOKEN, { number: true })
    let rawGain = 0
    if (direction === UP && gameRoundPool) {
      rawGain = gameRoundPool.up !== 0 ? amountInCrypto * gameRoundPool.payoutUp * (1 - fee) : 0
    } else if (direction === DOWN && gameRoundPool) {
      rawGain = gameRoundPool.down !== 0 ? amountInCrypto * gameRoundPool.payoutDown * (1 - fee) : 0
    }
    const fiatGain = rawGain !== 0 ? convert(rawGain, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }) : 0
    return currencyFormatter(fiatGain)
  }

  const getMyBids = () => {
    const { bids } = gameRoundPool
    const offChainMyBids = bids?.myBids || []
    return offChainMyBids.map((bid) => {
      const amount = convert(bid.amount, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true })
      return { ...bid, amount }
    })
  }

  useEffect(() => {
    if (!isEmpty(gameRoundPool)) {
      setMyBids(getMyBids())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoundPool])

  const endedGamesProps = {
    potentialGain: livePastPotentialGain,
    myBids,
    gamePool: gameRoundPool
  }

  const liveGameProps = {
    potentialGain: livePastPotentialGain,
    myBids,
    gamePool: gameRoundPool
  }

  const nextGamesProps = {
    gamePool: gameRoundPool
  }

  const getContentToShow = () =>
    activeCardRoundOffset < 0 ? (
      <PredictView {...endedGamesProps} />
    ) : activeCardRoundOffset > 0 ? (
      <NextPredictView {...nextGamesProps} />
    ) : liveRoundData?.status === 'open' ? (
      <NextPredictView {...nextGamesProps} />
    ) : (
      <PredictView {...liveGameProps} />
    )

  return getContentToShow()
}
