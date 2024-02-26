import { images } from 'common'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { PriceDirectionIcon } from '../ComingUpPeek/PriceDirectionIcon'

const StatisticCard = ({ subtitle, stats }) => {
  return (
    <StatisticContainer>
      <Subtitle>{subtitle}</Subtitle>
      {stats &&
        stats.map((stat, idx) => (
          <GraphContainer key={idx} className='matic'>
            <RoundContainer>
              <HRS>{stat.hrs} HRS</HRS>
              <Icon icon={stat.icon} />
              <Number>ROUND {stat.number}</Number>
              <PriceDirectionIcon arrow={true} />
              <Timer>{stat.timer}</Timer>
            </RoundContainer>
            <SettlesContainer>
              Settles on {stat.date} @ {stat.atTime}
            </SettlesContainer>
            <TimelineGraph />
            <Colorbar />
          </GraphContainer>
        ))}
    </StatisticContainer>
  )
}

export default StatisticCard

const Colorbar = styled.div`
  position: absolute;
  /* background-color: rgb(33,62,125); */
  width: 0;
  height: 100%;
  border-radius: 6px;
  animation: progress 60s infinite linear;
  display: flex;
  top: 0;
  left: 0;

  @keyframes progress {
    0% {
      width: 0%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 90%, rgba(255, 255, 255, 0) 100%);
    }
    25% {
      width: 50%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 90%, rgba(255, 255, 255, 0) 100%);
    }
    50% {
      width: 75%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 90%, rgba(255, 255, 255, 0) 100%);
    }
    75% {
      width: 85%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 90%, rgba(255, 255, 255, 0) 100%);
    }
    100% {
      width: 100%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 90%, rgba(255, 255, 255, 0) 100%);
    }
  }
`

const TimelineGraph = styled.div`
  width: 100%;
  height: 45px;
  background-image: url(${images.temp_24hr_graph_small});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 15px 0;
`

const SettlesContainer = styled.div`
  position: relative;
  z-index: 1;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding: 5px 10px 0 90px;
  font-size: 0.7rem;
`

const StatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  & > div:nth-child(3) {
    background: rgb(61, 40, 108);
  }
`

const Subtitle = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  text-transform: uppercase;
  padding-bottom: 10px;
`

const GraphContainer = styled.div`
  position: relative;
  /* height: 30px; */
  width: 100%;
  border-radius: 6px;
  background: hsl(156, 50%, 20%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 6px 5px 5px 5px;
  margin: 0 0 5px 0;
  cursor: pointer;
`

const RoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const HRS = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  /* background: rgb(20,39,77); */
  background: rgba(0, 0, 0, 0.2);
  padding: 7px 6px 5px 6px;
  line-height: 100%;
  border-radius: 5px;
  margin-left: 5px;
`
const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`

const Number = styled.span`
  margin-right: auto;
`
const Timer = styled.span`
  padding-right: 10px;
`
