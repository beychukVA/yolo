import React, { useMemo } from 'react'

import { useGameProgress } from 'hooks/games/useGameProgress'
import { currencyFormatter, formatTimeStamp } from 'utils'
import { LONG_DASH } from 'constants/index'
import { useConvertAmount } from 'utils/hooks'

import { config } from 'config'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { NextCardStyled } from './NextCard.Styled'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minNextCard = ({ className, gId, cardRoundOffset }) => {
  const { timeOffsetMs } = useUser('allowed')
  const { gaEvent } = useReactGA4()
  const { activeGameId, activeCardRoundOffset, setActiveGame } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(gId)
  const gameIdCurrentRoundIndex = useMemo(() => +liveRoundData?.roundIndex, [liveRoundData?.roundIndex])

  const { msTimeLeft, gameDuration } = useGameProgress(gId)
  const nextMsTimeLeft = msTimeLeft + (cardRoundOffset - 1) * gameDuration

  // Memoize some data
  const myGameData = useMemo(() => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset }), [gId, cardRoundOffset])
  const ownCardRoundIdx = useMemo(
    () => (gameIdCurrentRoundIndex ? Math.max(gameIdCurrentRoundIndex + cardRoundOffset, 0) : LONG_DASH),
    [cardRoundOffset, gameIdCurrentRoundIndex]
  )

  const convert = useConvertAmount()

  const { gameRoundPool } = useGameRoundPool(gId, ownCardRoundIdx)
  const poolAmount = useMemo(
    () => convert(gameRoundPool?.total || 0, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameRoundPool?.total]
  )

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === activeGameId

  const onClickNext = () => {
    setActiveGame(myGameData)
    gaEvent('next_round_click', {
      pathId: 'gameBrowser.next.click',
      gameId: gId,
      roundId: ownCardRoundIdx,
      roundOffset: cardRoundOffset,
      poolAmount
    })
  }

  return (
    <NextCardStyled isActive={isActive} onClick={onClickNext}>
      <div className={`game next ${isActive ? 'active' : ''}`} id='ribbonCardBase'>
        <div className='q1'>
          <div className='game_status'>
            <strong>Starts in</strong>
            <div className='gametime'>
              <div className='game_block_value'>{formatTimeStamp(nextMsTimeLeft + timeOffsetMs, 'mm:ss')}</div>
            </div>
          </div>
        </div>
        <div className='q2'>
          <div className='predict_now'>
            BID IN <strong>ROUND {ownCardRoundIdx}</strong>
          </div>
        </div>
        <div className='q3'>
          <div className='game_status'>
            <strong>Payout</strong>
            {poolAmount ? (
              <>
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
    </NextCardStyled>
  )
}
