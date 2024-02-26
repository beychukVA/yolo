import React, { useMemo } from 'react'
import styled from 'styled-components'

import { getGameParameters } from 'constants/games'

import { NextPriceGraph } from 'components/Organisms/PriceGraph/NextPriceGraph'
import { useGameLpFeeRate } from 'hooks/games/useGameLpFeeRate'
import { Tooltip } from 'components/Atoms/Tooltip'
import { CountDownView } from 'components/Molecules/gameV2/CountDownView'
import { NextGameView } from 'components/Molecules/gameV2/NextGameView'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'
import { formatTimeStamp, formatUTCTimestampToLocale } from 'utils'

export const G24hrNextPlay = () => {
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(activeGameId)
  const { gameLabel, icon, roundLength } = getGameParameters(activeGameId)

  const isRoundEnded = useMemo(() => {
    const { isRoundEnded } = liveRoundData
    return isRoundEnded
  }, [liveRoundData])

  const {
    nextLpFeeRate: { N: fee }
  } = useGameLpFeeRate(activeGameId)

  const timeSpan = useMemo(() => {
    if (!liveRoundData?.startTime) return '-'
    const startDay = formatUTCTimestampToLocale(+liveRoundData.startTime * 1000, '%hh:%mm')
    const endDay = formatUTCTimestampToLocale(+liveRoundData.startTime * 1000 + roundLength, '%hh:%mm')
    return `${startDay} - ${endDay}`
  }, [liveRoundData?.startTime, roundLength])

  const roundDate = useMemo(() => {
    const startDay = formatTimeStamp(+liveRoundData.startTime * 1000, 'MMMM DD')
    const endDay = formatTimeStamp(+liveRoundData.startTime * 1000 + roundLength, 'DD')
    return `${startDay} - ${endDay}`
  }, [liveRoundData?.startTime, roundLength])

  return (
    <Container>
      <RoundInfo>
        <TitleArea>
          <NextGameView />
          <RoundNumber>
            Round
            <div>{Math.max(activeCardRoundIndex, 0)}</div>
          </RoundNumber>
          <RoundLeft>
            <RoundDate> {roundDate} </RoundDate>
            <RoundTime> {timeSpan} </RoundTime>
          </RoundLeft>
        </TitleArea>
      </RoundInfo>
      <BlocksInfo />
      <AssetPriceInfo>
        <AssetWrap>
          <AssetName>
            <AssetIcon assetIcon={icon}></AssetIcon>
            {gameLabel}
          </AssetName>
        </AssetWrap>
        {!isRoundEnded && <NextPriceGraph />}
      </AssetPriceInfo>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  display: flex;
  margin: 0 2.5vw;
  padding: 15px 0 60px 0;
  flex-wrap: wrap;

  &:after {
    position: absolute;
    background: rgba(42, 109, 255, 0.3);
    filter: blur(160px);
    width: 50vw;
    height: 50vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
    content: '';
    border-radius: 50%;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 10px 0;
  }
`

const RoundLeft = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
`

const RoundDate = styled.div`
  font-size: 1rem;
  font-weight: 300;
`
const RoundTime = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-style: italic;
  font-size: 0.75rem;
  opacity: 0.7;
  margin: 0 0 20px 0;
`

const RoundInfo = styled.div`
  justify-content: center;
  margin: 0;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
const BlocksInfo = styled(CountDownView)`
  padding: 40px 0;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 15px 0;
  }
`
const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 0;
  margin: 0;
  border-bottom: 0;
  position: relative;
`
const ComingUp = styled.div`
  font-size: 2.1rem;
  justify-content: center;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 8px 16px;
  display: flex;
  line-height: 100%;
  background: #1f2531;
  color: #fff;
  font-weight: 700;
  position: relative;
  border-radius: 10px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 1) 0%, rgba(42, 109, 255, 1) 15%) center center / 400% 400%;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0;
    font-size: 1.6rem;
  }
`
const RoundNumber = styled.div`
  font-size: 1.4rem;
  margin: 15px 0 0 0;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & div {
    font-weight: 700;
    padding-left: 6px;

    ${({ theme }) => theme.breakPoints['480px']} {
      width: auto;
      text-overflow: default;
    }
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 10px 0 0 0;
    font-size: 1.2rem;
  }
`
const PoolAmount = styled.div`
  font-size: 1.3rem;
  color: #fff;
  font-weight: 700;

  & strong {
    font-weight: 200;
    margin-right: 4px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.9rem;
    margin: 0;
  }
`
const AssetPriceInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 130px;
  ${({ theme }) => theme.breakPoints['480px']} {
    height: 60px;
  }
`
const AssetWrap = styled.div`
  width: 30%;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.9rem;
  font-weight: 700;
  flex-direction: column;
  padding: 0 5px 0 0;
  display: flex;

  ${({ theme }) => theme.breakPoints['1200px']} {
    width: 35%;
    padding: 0 0 0 0;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 25%;
    padding: 0 0 0 0;
    font-size: 0.8rem;
  }
`
const AssetName = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  font-weight: 400;
`
const AssetIcon = styled.div`
  background: url('${({ assetIcon }) => assetIcon}') center center / auto 23px no-repeat;
  height: 23px;
  width: 23px;
  margin: 0 5px 0 0;
`
