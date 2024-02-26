import { FlipCounter } from 'components/Atoms/FlipCounter'
import React, { useEffect, useState } from 'react'
import { useInterval } from 'react-interval-hook'
import styled from 'styled-components'
import { diffInFromNow } from 'utils'
import { usePrevious } from 'utils/hooks'

const DIFF_INIT = { d: '00', h: '00', m: '00', s: '00' }

export const FlipCountdownDHMS = ({ deadLineMs, flipNumberCSS, onFinish }) => {
  const [timeDiffIn, setTimeDiffIn] = useState(DIFF_INIT)
  const prevDeadLineMs = usePrevious(deadLineMs)
  const { start } = useInterval(
    () => {
      setTimeDiffIn(diffInFromNow(deadLineMs))
    },
    1000,
    {
      autoStart: false,
      immediate: false,
      selfCorrecting: false,
      onFinish
    }
  )

  useEffect(() => {
    const nowTimeStamp = Date.now()
    if (nowTimeStamp >= deadLineMs) {
      onFinish && onFinish()
    }
    if (deadLineMs && prevDeadLineMs !== deadLineMs) {
      start()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeDiffIn, deadLineMs, onFinish])

  return (
    <Container>
      <Header> Time remaining </Header>
      <TimeList>
        <li>
          <FlipCounter digit={timeDiffIn.d} flipNumberCSS={flipNumberCSS} />
          <TimeDescription>days</TimeDescription>
        </li>
        <li>
          <FlipCounter digit={timeDiffIn.h} flipNumberCSS={flipNumberCSS} />
          <TimeDescription>hours</TimeDescription>
        </li>
        <li>
          <FlipCounter digit={timeDiffIn.m} flipNumberCSS={flipNumberCSS} />
          <TimeDescription>minutes</TimeDescription>
        </li>
        <li>
          <FlipCounter digit={timeDiffIn.s} flipNumberCSS={flipNumberCSS} />
          <TimeDescription>seconds</TimeDescription>
        </li>
      </TimeList>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
  flex-flow: column;
  align-items: center;
  display: flex;
  width: 100%;
`
const Header = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 30px;
  text-transform: uppercase;
  line-height: 100%;
  white-space: nowrap;
`
const TimeList = styled.ul`
  display: flex;

  & li {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    display: flex;
  }
`
const TimeDescription = styled.p`
  display: flex;
  text-transform: capitalize;
  font-size: 0.75rem;
  margin: 5px 0 0 0;
`
