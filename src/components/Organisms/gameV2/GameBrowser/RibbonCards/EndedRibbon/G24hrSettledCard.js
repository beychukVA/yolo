import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { Zero } from '@ethersproject/constants'

import { LONG_DASH } from 'constants/index'

import { useConvertAmount } from 'utils/hooks'

import { config } from 'config'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { SettledCardStyled } from './SettledCard.Styled'
import { currencyFormatter } from 'utils'
import { getPayoutsFactorBN } from 'utils/payout'
import { useToken } from 'utils/hooks/useToken'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G24hrSettledCard = ({ className, gId, cardRoundOffset }) => {
  const { gaEvent } = useReactGA4()
  const { activeGameId, activeCardRoundOffset, setActiveGame } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(gId)
  const { formatToken: formatPayoutFactor } = useToken('BASIS_POINT')

  const gameIdCurrentRoundIndex = useMemo(() => {
    return +liveRoundData?.roundIndex
  }, [liveRoundData?.roundIndex])

  const convert = useConvertAmount()

  // Memoize some data
  const myGameData = useMemo(() => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset }), [gId, cardRoundOffset])
  const ownCardRoundIdx = useMemo(
    () => (gameIdCurrentRoundIndex ? Math.max(gameIdCurrentRoundIndex + cardRoundOffset, 0) : LONG_DASH),
    [cardRoundOffset, gameIdCurrentRoundIndex]
  )

  const {
    gameRoundPool: { total, winDirection, payoutUp, payoutDown, bucketsAmount, winBucket }
  } = useGameRoundPool(gId, ownCardRoundIdx)

  const winPayoutFactor = useMemo(() => {
    if (!bucketsAmount) return LONG_DASH
    if (isEmpty(bucketsAmount)) return LONG_DASH
    const bAmountArray = Object.keys(bucketsAmount).reduce((result, item, idx) => {
      return [...result, bucketsAmount?.[`l${idx}`]]
    }, [])
    const payoutsFactorBN = getPayoutsFactorBN(bAmountArray)
    const winPayoutBucketBN = payoutsFactorBN[winBucket]
    const formattedPayoutFactor = currencyFormatter(formatPayoutFactor(winPayoutBucketBN || Zero), {
      decimalDigits: 2,
      noCurrencySign: true
    })
    return {
      valueBN: winPayoutBucketBN,
      formatted: `${formattedPayoutFactor}X`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketsAmount, winBucket])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const poolAmount = useMemo(() => convert(total || 0, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }), [total])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const payoutAmount = useMemo(() => {
    const payout = winDirection === 'up' ? payoutUp : payoutDown
    return payout === Infinity ? 'MAX' : payout ? `${payout}X` : LONG_DASH
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winDirection])

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === activeGameId

  const onClickPast = () => {
    setActiveGame(myGameData)
    gaEvent('settled_round_click', {
      pathId: 'gameBrowser.settled.click',
      gameId: gId,
      roundId: ownCardRoundIdx,
      roundOffset: cardRoundOffset,
      poolAmount,
      payoutAmount,
      winDirection
    })
  }

  return (
    <SettledCardStyled onClick={onClickPast} isActive={isActive}>
      <div className={`game past yolo ${isActive ? 'active' : ''}`} id='ribbonCardBase'>
        <div className='q1'>
          <div className='game_status'>
            <strong>Payout</strong>
            <div className='gs_data_wrap'>
              <div className={`amount ${winDirection === 'up' ? '' : 'rekt'}`}>{winPayoutFactor.formatted}</div>
            </div>
          </div>
        </div>
        <div className='q2'>
          <div className={`game_status yolo`}>
            <strong>Settled</strong>
            <div className='amount'>ROUND {ownCardRoundIdx}</div>
          </div>
        </div>
        <div className='q3'>
          <div className='game_status'>
            {poolAmount ? (
              <>
                <div className='gs_data_wrap'>
                  <div className={`triangle down ${winDirection} large`}></div>
                  <div className='amount'>{currencyFormatter(poolAmount)}</div>
                </div>
              </>
            ) : (
              LONG_DASH
            )}
          </div>
        </div>
      </div>
    </SettledCardStyled>
  )
}
