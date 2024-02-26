import { IconLib } from 'components/Atoms/IconLib'
import { getGameParameters } from 'constants/games'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLockBodyScroll } from 'utils/hooks'
import { BidGameButton, ResultModalCss, Close } from './ResultModalCss.styled'
import { useToken } from 'utils/hooks/useToken'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { BigNumber } from 'ethers'
import { bucketsLevelLimit } from 'components/Atoms/BucketLevelIcon'
import { currencyFormatter } from 'utils'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

export const YouPushed = ({ closeModal, resultObj }) => {
  useLockBodyScroll()
  const { bidOnNext } = useActiveGameData()
  const { formatToken: formatUSDC } = useToken('USDC')

  const [pushedPool, setPushedPool] = useState({})

  const gameId = resultObj.gameId
  const roundIndex = resultObj.roundIndex

  const { gameRoundPool } = useGameRoundPool(gameId, roundIndex)

  useEffect(() => {
    if (!isEmpty(pushedPool)) return
    setPushedPool(gameRoundPool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoundPool])

  const { buckets, settlementPrice, winBucket } = pushedPool

  const settlementPriceBN = BigNumber.from(settlementPrice?.toFixed() || '0')

  const bucketLimits = bucketsLevelLimit(winBucket, buckets)

  const gameParams = getGameParameters(gameId)
  const onBidNextClick = () => {
    bidOnNext()
    closeModal()
  }

  return (
    <ResultModalCss>
      <div className='window_page_overlay you_won'>
        <div className='close'></div>
        <Close masking onClick={closeModal}>
          &times;
        </Close>
        <h2>You Pushed</h2>
        <div className='round_asset_used asset_row eth'>
          <div className='result_round_length'>24 HR</div>
          <div className='asset_icon_container'>
            <IconLib {...gameParams.iconProps} />
          </div>
          <div className='asset_name'>{gameParams.gameLabel}</div>
        </div>
        <div className='round'>Round {roundIndex}</div>

        <div className='which_rounds'>
          <div className='settlement_price'>
            <strong>Strike Range</strong> {bucketLimits}
          </div>
          <div className='settlement_price'>
            <strong>Settlement</strong> {currencyFormatter(formatUSDC(settlementPriceBN))}
          </div>
        </div>

        <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>
      </div>
    </ResultModalCss>
  )
}
