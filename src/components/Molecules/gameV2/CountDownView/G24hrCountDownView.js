import React, { useEffect, useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
import { useGameProgress } from 'hooks/games/useGameProgress'
import { LIVE_OFFSET } from 'constants/index'
import { IconLib } from 'components/Atoms/IconLib'
import gsap, { Expo } from 'gsap'

import { formatDurationMilliseconds } from 'utils'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useLiveRoundData } from 'hooks/gameEngine/useLiveRoundData'

gsap.defaults({
  ease: Expo.easeOut
})

export const G24hrCountDownView = ({ className }) => {
  const { activeGameId, activeCardRoundOffset } = useActiveGameData()
  const { liveRoundData } = useLiveRoundData(activeGameId)

  const timerRef = useRef()
  const firstHrRef = useRef()
  const secondHrRef = useRef()
  const firstMinRef = useRef()
  const secondMinRef = useRef()
  const firstSecRef = useRef()
  const secondSecRef = useRef()

  const [prevArray, setPrevArray] = useState([0, 0, 0, 0])

  const { msTimeLeft, gameDuration, msStartsIn, gamePeriod } = useGameProgress()

  const isNext = useMemo(
    () => activeCardRoundOffset > LIVE_OFFSET || liveRoundData?.status === 'open',
    [activeCardRoundOffset, liveRoundData?.status]
  )
  const nextRoundsOffset = !!activeCardRoundOffset
    ? (activeCardRoundOffset - 1) * (isNext ? gamePeriod : gameDuration)
    : 0
  const nextMsTimeLeft =
    liveRoundData?.status === 'open'
      ? msStartsIn + activeCardRoundOffset * gameDuration
      : (isNext ? msStartsIn : msTimeLeft) + nextRoundsOffset

  const displayText = useMemo(() => formatDurationMilliseconds(nextMsTimeLeft, 'hh:mm:ss'), [nextMsTimeLeft])

  const reloadBtn = document.querySelector('.reload')

  const animateNum = (group, arrayValue, prevValue) => {
    gsap.killTweensOf(group.querySelector('.number-grp-wrp'))
    const arrayValueInt = parseInt(arrayValue)
    if (prevValue !== arrayValue) {
      gsap.set(group.querySelector('.number-grp-wrp'), {
        y: -group.querySelector('.num-' + ((arrayValueInt + 1) % 10))?.offsetTop
      })
      gsap.to(group.querySelector('.number-grp-wrp'), {
        duration: 1,
        y: -group.querySelector('.num-' + arrayValueInt)?.offsetTop
      })
    } else {
      gsap.set(group.querySelector('.number-grp-wrp'), {
        y: -group.querySelector('.num-' + arrayValue)?.offsetTop
      })
    }
  }

  const updateTimerDisplay = (arr) => {
    if (
      !firstHrRef?.current ||
      !secondHrRef?.current ||
      !firstMinRef?.current ||
      !secondMinRef?.current ||
      !secondSecRef?.current ||
      !firstSecRef?.current
    )
      return

    animateNum(firstHrRef.current, arr[0], prevArray[0])
    animateNum(secondHrRef.current, arr[1], prevArray[1])
    animateNum(firstMinRef.current, arr[2], prevArray[2])
    animateNum(secondMinRef.current, arr[3], prevArray[3])
    animateNum(firstSecRef.current, arr[4], prevArray[4])
    animateNum(secondSecRef.current, arr[5], prevArray[5])
    setPrevArray(arr)
  }

  const countdownFinished = () => {
    if (!timerRef.current) return
    setTimeout(function () {
      gsap.set(reloadBtn, { scale: 0.8, display: 'block' })
      gsap.to(timerRef.current, 1, { opacity: 1 })
      gsap.to(reloadBtn, 0.5, { scale: 1, opacity: 1 })
    }, 1000)
  }

  const updateTimer = () => {
    if (!displayText) return

    const timeStr = displayText.replaceAll(':', '')
    const timeNumbers = timeStr.split('')
    updateTimerDisplay(timeNumbers)

    if (timeStr === '000000') countdownFinished()
  }

  useEffect(() => {
    if (!displayText) return
    updateTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText])

  /* prettier-ignore */
  const NumberGroup = () => (
    <NumberGroupWrapper className='number-grp-wrp'>
      <Num isBig={isNext} className='num-0'><p>0</p></Num>
      <Num isBig={isNext} className='num-1'><p>1</p></Num>
      <Num isBig={isNext} className='num-2'><p>2</p></Num>
      <Num isBig={isNext} className='num-3'><p>3</p></Num>
      <Num isBig={isNext} className='num-4'><p>4</p></Num>
      <Num isBig={isNext} className='num-5'><p>5</p></Num>
      <Num isBig={isNext} className='num-6'><p>6</p></Num>
      <Num isBig={isNext} className='num-7'><p>7</p></Num>
      <Num isBig={isNext} className='num-8'><p>8</p></Num>
      <Num isBig={isNext} className='num-9'><p>9</p></Num>
    </NumberGroupWrapper>
  )

  return useMemo(
    () => (
      <Container isBig={isNext} className={className}>
        <TimeWrapper>
          <TimeCounter>
            <Timer ref={timerRef}>
              <TimerClock>
                <DigitGroup>
                  <FirstNumberGroup isBig={isNext} ref={firstHrRef}>
                    <NumberGroup></NumberGroup>
                  </FirstNumberGroup>
                  <SecondNumberGroup isBig={isNext} ref={secondHrRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                </DigitGroup>
                <ClockSeperator isBig={isNext}>
                  <p>:</p>
                </ClockSeperator>
                <DigitGroup>
                  <FirstNumberGroup isBig={isNext} ref={firstMinRef}>
                    <NumberGroup></NumberGroup>
                  </FirstNumberGroup>
                  <SecondNumberGroup isBig={isNext} ref={secondMinRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                </DigitGroup>
                <ClockSeperator isBig={isNext}>
                  <p>:</p>
                </ClockSeperator>
                <DigitGroup>
                  <FirstNumberGroup isBig={isNext} ref={firstSecRef}>
                    <NumberGroup></NumberGroup>
                  </FirstNumberGroup>
                  <SecondNumberGroup isBig={isNext} ref={secondSecRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                </DigitGroup>
              </TimerClock>
            </Timer>
          </TimeCounter>
        </TimeWrapper>
      </Container>
    ),
    [className, isNext]
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position relative;
  margin: -10px 0 0 0;

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0;
  }
`

const BlockIcon = styled(IconLib).attrs(({ isBig }) => ({
  collection: 'crypto',
  name: 'spinningBlock',
  width: (isBig) => (isBig ? '71px' : '65px'),
  height: (isBig) => (isBig ? '75px' : '70px')
}))`
  margin: ${({ isBig }) => (isBig ? '0 10px 0 0' : '0 8px 0 0')};
  @media (max-width: 480px) {
    width: ${({ isBig }) => (isBig ? '58px' : '50px')};
    height: ${({ isBig }) => (isBig ? '56px' : '50px')};
  }
`

const TimeWrapper = styled.div``

const TimeCounter = styled.div``

const Timer = styled.div``

const TimerClock = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`

const DigitGroup = styled.div`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
`

const FirstNumberGroup = styled.div`
  height: ${({ isBig }) => (isBig ? '52px' : '30px')};
  overflow: hidden;
`

const SecondNumberGroup = styled.div`
  height: ${({ isBig }) => (isBig ? '52px' : '30px')};
  overflow: hidden;
`

const ClockSeperator = styled.div`
  & p {
    font-size: ${({ isBig }) => (isBig ? '3.3rem' : '1.8rem')};
    line-height: 120%;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: ${({ isBig }) => (isBig ? '2.7rem' : '1.8rem')};
    }
  }
`

const NumberGroupWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
`

const Num = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  & p {
    font-size: ${({ isBig }) => (isBig ? '3.3rem' : '1.8rem')};
    ${({ isBig }) => (isBig ? 'letter-spacing: -.02em;' : 'letter-spacing: -.04em;')}
    line-height: 120%;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: ${({ isBig }) => (isBig ? '2.7rem' : '1.8rem')};
      ${({ isBig }) => isBig && 'letter-spacing: -.04em;'}
    }
  }
`
