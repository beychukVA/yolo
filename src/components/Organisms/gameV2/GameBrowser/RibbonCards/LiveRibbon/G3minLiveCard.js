import React, { useMemo, useEffect } from 'react'
import { Zero } from '@ethersproject/constants'

import { useGameProgress } from 'hooks/games/useGameProgress'
import { useConvertAmount } from 'utils/hooks'
import { currencyFormatter, formatTimeStamp } from 'utils'
import { getGameParameters } from 'constants/games'
import { LONG_DASH } from 'constants/index'

import { config } from 'config'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useCurrentPrice } from 'hooks/gameEngine/usePriceFeed'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { LiveCardStyled } from './LiveCard.Styled'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minLiveCard = ({ className, gId, cardRoundOffset }) => {
  const { timeOffsetMs } = useUser('allowed')
  const { gaEvent } = useReactGA4()
  const { activeGameId, activeCardRoundOffset, setActiveGame, updateActiveGame } = useActiveGameData()

  const { currentPrice } = useCurrentPrice(gId)
  const {
    liveRoundData: { strikePriceBN, roundIndex }
  } = useLiveRoundData(gId)
  const convert = useConvertAmount()
  const updateDirection = currentPrice?.valueBN.add(strikePriceBN?.toString() || Zero).toString()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const direction = useMemo(() => (currentPrice?.valueBN.gte(strikePriceBN || Zero) ? 'up' : 'down'), [updateDirection])
  const { LIVE_ROUND_FLASH_TIME, liveTileBackgroundColor } = getGameParameters(gId)
  const { msTimeLeft } = useGameProgress(gId, 0)

  // Memoize some data
  const ownCardRoundIdx = useMemo(() => (roundIndex ? Math.max(roundIndex, 0) : LONG_DASH), [roundIndex])

  const myGameData = useMemo(
    () => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset, checkBidResult: false }),
    [gId, cardRoundOffset]
  )

  const { gameRoundPool } = useGameRoundPool(gId, ownCardRoundIdx)

  const poolAmount = useMemo(
    () => convert(gameRoundPool?.total || 0, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameRoundPool?.total]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shouldFlash = useMemo(() => (msTimeLeft === 0 ? false : msTimeLeft <= LIVE_ROUND_FLASH_TIME), [msTimeLeft])

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === activeGameId

  const onClickLive = () => {
    setActiveGame(myGameData)
    gaEvent('live_round_click', {
      pathId: 'gameBrowser.live.click',
      gameId: gId,
      roundId: ownCardRoundIdx,
      roundOffset: cardRoundOffset,
      poolAmount
    })
  }

  useEffect(() => {
    isActive && setActiveGame(myGameData)
    updateActiveGame(gId, ownCardRoundIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownCardRoundIdx])

  return (
    <LiveCardStyled onClick={onClickLive} shouldFlash={shouldFlash} liveBackgroundColor={liveTileBackgroundColor}>
      <div className={`game live current ${isActive ? 'active' : ''}`} id='ribbonCardBase'>
        <div className='q1'>
          <div className='block_time_wrap'>
            <strong>Time left</strong>
            <div id='real_time_value' className='test'>
              {formatTimeStamp(msTimeLeft + timeOffsetMs, 'mm:ss')}
            </div>
          </div>
        </div>
        <div className='q2'>
          <strong>3 MIN</strong> LIVE ROUND {ownCardRoundIdx}
        </div>
        <div className='q3'>
          <div className='game_status'>
            {poolAmount ? (
              <>
                <div className={`triangle ${direction} large`}></div>
                <div className='gs_data_wrap'>
                  <div className='amount'>{currencyFormatter(poolAmount)}</div>
                </div>
              </>
            ) : (
              LONG_DASH
            )}
          </div>
        </div>
      </div>
    </LiveCardStyled>
  )
}
