import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { formatTimeFromNow } from 'utils'
import { ACTIVITY_TYPE, UP } from 'constants/index'
import { useUnitConvert } from 'utils/hooks'
import { config } from 'config'
import { useRandomName } from 'utils/hooks/useRandomName'

const { DEFAULT_TOKEN } = config

export const ActivityItem = ({ data }) => {
  const { getRandomName } = useRandomName()
  const username = getRandomName(data.address)
  const { toFiatAmount } = useUnitConvert(false)
  const [activityText, setActivityText] = useState()

  useEffect(() => {
    if (data.activityType === ACTIVITY_TYPE.BID) {
      setActivityText(`Bid ${data.direction} ${toFiatAmount(data.amount, DEFAULT_TOKEN)}`)
    } else if (data.activityType === ACTIVITY_TYPE.WIN) {
      setActivityText(`Won ${toFiatAmount(data.amount, DEFAULT_TOKEN)}`)
    }
  }, [data, toFiatAmount])

  return (
    <Container activityType={data.activityType} isUp={data.direction === UP}>
      <ActivityInside>
        <UsernameTs>
          <Username> {username} </Username>
          <Timestamp> {formatTimeFromNow(new Date(data.timestamp) / 1000)} </Timestamp>
        </UsernameTs>
        <ActivityData activityType={data.activityType} isUp={data.direction === UP}>
          <strong>{activityText}</strong>
          in Round {data.roundNumber}
        </ActivityData>
      </ActivityInside>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 6%;
  border-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  display: flex;
  width: fit-content;
  flex-flow: row;
  align-items: center;
  left: -6%;
  position: relative;
  margin: 2px 0;
  -webkit-box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
  box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);

  ${({ activityType, isUp }) =>
    activityType === ACTIVITY_TYPE.WIN
      ? `background: rgba(42,109,255,.06);`
      : isUp
      ? `background: rgba(1,168,17,.1);
         background-color: rgba(152,183,253,.06);
         background: rgba(42,109,255,.06);`
      : `background: rgba(226,14,85,.1);
         background-color: rgba(152,183,253,.06);
         background: rgba(42,109,255,.06);`}
  & * {
    display: flex;
  }

  ${({ theme }) => theme.breakPoints['1200px']} {
    border-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    left: auto;
    width: auto;
    display: flex;
    margin: 4px 0;
  }
`
const ActivityInside = styled.div`
  flex-flow: column;
  width: 100%;
  font-size: 0.75rem;

  ${({ theme }) => theme.breakPoints['1200px']} {
    align-items: center;
    justify-content: center;
  }
`
const UsernameTs = styled.div`
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.breakPoints['1200px']} {
    width: auto;
  }
`
const Username = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  margin-right: 10px;
`
const Timestamp = styled.div`
  font-size: 0.6rem;
  color: #999;
`
const ActivityData = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  padding: 4px 0 0 0;

  & strong {
    font-weight: 600;
    padding-right: 5px;

    ${({ activityType, isUp }) =>
      activityType === ACTIVITY_TYPE.WIN
        ? `color: rgba(42,109,255,1.0);`
        : isUp
        ? `color: rgba(0,194,19,1.0);`
        : `color: rgba(226,14,85,1.0);`}
  }
  ${({ theme }) => theme.breakPoints['1200px']} {
    padding: 0;
  }
`
