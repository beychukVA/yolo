import { useEffect, useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
import { useGameProgress } from 'hooks/games/useGameProgress'
import { LIVE_OFFSET } from 'constants/index'
import { Tooltip } from 'components/Atoms/Tooltip'
import { IconLib } from 'components/Atoms/IconLib'
import gsap, { Expo } from 'gsap'

import { formatTimeStamp } from 'utils'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useUser } from 'hooks/user/useUser'

gsap.defaults({
  ease: Expo.easeOut
})

export const G3minCountDownView = ({ className }) => {
  const { timeOffsetMs } = useUser('allowed')
  const { activeCardRoundOffset } = useActiveGameData()

  const timerRef = useRef()
  const firstMinRef = useRef()
  const secondMinRef = useRef()
  const firstSecRef = useRef()
  const secondSecRef = useRef()

  const [prevArray, setPrevArray] = useState([0, 0, 0, 0])

  const { msTimeLeft, gameDuration } = useGameProgress()
  const nextRoundsOffset = !!activeCardRoundOffset ? (activeCardRoundOffset - 1) * gameDuration : 0
  const nextMsTimeLeft = msTimeLeft + nextRoundsOffset
  const isNext = useMemo(() => activeCardRoundOffset > LIVE_OFFSET, [activeCardRoundOffset])

  const displayText = useMemo(
    () => formatTimeStamp(nextMsTimeLeft + timeOffsetMs || 0, 'mm:ss'),
    [timeOffsetMs, nextMsTimeLeft]
  )

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
    if (!firstMinRef?.current || !secondMinRef?.current || !secondSecRef?.current || !firstSecRef?.current) return

    animateNum(firstMinRef.current, arr[0], prevArray[0])
    animateNum(secondMinRef.current, arr[1], prevArray[1])
    animateNum(firstSecRef.current, arr[2], prevArray[2])
    animateNum(secondSecRef.current, arr[3], prevArray[3])
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
    let time = {
      min: displayText.split(':')[0],
      sec: displayText.split(':')[1]
    }

    let timestr
    let timeNumbers
    let date = new Date()

    date.setHours(0)
    date.setMinutes(time.min)
    date.setSeconds(time.sec)

    let newDate = new Date(date.valueOf())
    let temp = newDate.toTimeString().split(' ')
    let tempsplit = temp[0].split(':')

    time.min = tempsplit[1]
    time.sec = tempsplit[2]

    timestr = time.min + time.sec
    timeNumbers = timestr.split('')
    if (timeNumbers[0] === '0') {
      firstMinRef.current.style.display = 'none'
    } else {
      firstMinRef.current.style.display = 'block'
    }
    updateTimerDisplay(timeNumbers)

    if (timestr === '0000') countdownFinished()
  }

  useEffect(() => {
    if (!displayText) return
    updateTimer()
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
                <MinutesGroup>
                  <SecondNumberGroup isBig={isNext} ref={firstMinRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                  <SecondNumberGroup isBig={isNext} ref={secondMinRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                </MinutesGroup>
                <ClockSeperator isBig={isNext}>
                  <p>:</p>
                </ClockSeperator>
                <SecondsGroup>
                  <FirstNumberGroup isBig={isNext} ref={firstSecRef}>
                    <NumberGroup></NumberGroup>
                  </FirstNumberGroup>
                  <SecondNumberGroup isBig={isNext} ref={secondSecRef}>
                    <NumberGroup></NumberGroup>
                  </SecondNumberGroup>
                </SecondsGroup>
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

const MinutesGroup = styled.div`
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

const SecondsGroup = styled.div`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
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

const BlocksRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isBig }) => (isBig ? 'center' : 'flex-end')};
`

const BlocksValue = styled.div`
  font-size: ${({ isBig }) => (isBig ? '1.4rem' : '1rem')};
  ${({ isBig }) => isBig && 'letter-spacing: -.02rem;'}
  ${({ isBig }) => isBig && 'width: auto;'}
  font-weight: 400;
  line-height: 100%;

  @media (max-width: 480px) {
    font-size: ${({ isBig }) => (isBig ? '1.1rem' : '.9rem')};
  }
`

const BlocksTooltip = styled(Tooltip)`
  & .bottom {
    ${({ theme }) => theme.breakPoints['1200px']} {
      transform: translate(-100%, 0);
    }
  }
`

const BlocksWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const BlocksLeft = styled.div`
  font-size: 0.7rem;
  line-height: 0;
`

const StartEndBlocks = styled.div`
  & div {
    display: flex;
    flex-wrap: nowrap;
    flex: 1 1 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  & strong {
    font-weight: 700;
    padding: 0 0 0 6px;
  }
`
