import React, { useMemo } from 'react'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'
import { LONG_DASH } from 'constants/index'

import { useConvertAmount } from 'utils/hooks'
import { IconLib } from 'components/Atoms/IconLib'

import { RibbonCardBase, GameStatus, DataWrap, Amount } from '../shared-comps'
import { config } from 'config'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useGameRoundPool } from 'hooks/gamePool/useGamesPool'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { SettledCardStyled } from './SettledCard.Styled'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minSettledCard = ({ className, gId, cardRoundOffset }) => {
  const { gaEvent } = useReactGA4()
  const { activeGameId, activeCardRoundOffset, setActiveGame } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(gId)

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
    gameRoundPool: { total, winDirection, payoutUp, payoutDown }
  } = useGameRoundPool(gId, ownCardRoundIdx)

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
              <div className={`amount ${winDirection === 'up' ? '' : 'rekt'}`}>{payoutAmount}</div>
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

  // return (
  //   <RibbonWrapper className={className} isActive={isActive} onClick={onClickPast}>
  //     <LeftWrapper>
  //       <GameStatusLeft>
  //         <strong>Payout</strong>
  //         <DataWrapLeft>
  //           {payoutAmount !== LONG_DASH ? <Payout isUp={winDirection === 'up'}>{payoutAmount}</Payout> : LONG_DASH}
  //         </DataWrapLeft>
  //       </GameStatusLeft>
  //     </LeftWrapper>
  //     <CenterWrapper>
  //       <GameStatusCenter className='yolo'>
  //         <strong>SETTLED</strong>
  //         <Round>ROUND {ownCardRoundIdx}</Round>
  //       </GameStatusCenter>
  //     </CenterWrapper>
  //     <RightWrapper>
  //       <GameStatusRight>
  //         {poolAmount ? (
  //           <>
  //             <IconArrow
  //               masking
  //               rotate={winDirection === 'up' ? 'down' : 'up'}
  //               isUp={winDirection === 'up'}
  //             ></IconArrow>
  //             <DataWrapRight>
  //               <IconTime></IconTime>
  //               <PoolAmount>{currencyFormatter(poolAmount)}</PoolAmount>
  //             </DataWrapRight>
  //           </>
  //         ) : (
  //           LONG_DASH
  //         )}
  //       </GameStatusRight>
  //     </RightWrapper>
  //   </RibbonWrapper>
  // )
}

const RibbonWrapper = styled(RibbonCardBase)`
  background-color: rgba(64, 74, 94, 0.6);
  margin-bottom: 4px;

  ${({ isActive }) =>
    isActive &&
    `  opacity: 1;
    border: 1px solid rgba(42, 109, 255, 0.2);
    box-shadow: 0 0 50px 0 rgb(0 0 0 / 70%);
    z-index: 2;
  `}
  &::after {
    ${({ isActive }) =>
      isActive &&
      `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(
      38deg,
      rgba(42, 109, 255, 0.5) 0%,
      rgba(42, 109, 255, 0.75) 25%,
      rgba(42, 109, 255, 0.85) 50%,
      rgba(42, 109, 255, 0.75) 75%,
      rgba(42, 109, 255, 0.5) 100%
    );
    border-radius: 10px;
    z-index: -1;`};
  }
`
const LeftWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 22%;
  padding: 0 0 0 5px;
  font-weight: 600;

  & strong {
    margin-left: 0;
    font-weight: 600;
  }
`
const Payout = styled(Amount)`
  color: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.65rem;
  }
`
const CenterWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 46%;
  color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  font-size: 0.7rem;
`
const RightWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 22%;

  & strong {
    margin-left: 0;
  }
`
const GameStatusLeft = styled(GameStatus)`
  & strong {
    margin-left: 0;
    font-weight: 600;
  }
`
const GameStatusCenter = styled(GameStatus)`
  line-height: 140%;
  font-weight: 600;
  white-space: nowrap;
  flex-direction: row;
  display: flex;
  align-items: center;

  & strong {
    font-size: 0.75rem;
    color: #01a812;
    color: #fff;
    font-weight: 800;
    margin-right: 5px;
    line-height: 140%;
    white-space: nowrap;

    ${({ theme }) => theme.breakPoints['480px']} {
      font-size: 0.7rem;
      line-height: 0;
    }
  }
`
const GameStatusRight = styled(GameStatus)`
  display: flex;
  align-items: center;

  & strong {
    margin-left: 0;
  }
`
const DataWrapLeft = styled(DataWrap)`
  padding: 0 0 0 0;
`
const DataWrapRight = styled(DataWrap)`
  justify-content: center;
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp', dimension: '12px' })`
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 10px;
    height: 10px;
    -webkit-mask-size: 10px 10px;
    margin-right: 0;
  }
`
const Round = styled(Amount)`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.7rem;
    padding-top: 2px;
    font-weight: 400;
    line-height: 0;
  }
`
const IconTime = styled.div``
const PoolAmount = styled(Amount)`
  line-height: 100%;
  padding: 2px 0 0 0;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 0;
    font-size: 0.65rem;
  }
`
