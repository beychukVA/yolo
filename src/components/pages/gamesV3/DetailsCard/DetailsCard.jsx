import React from 'react'
import styled, { css } from 'styled-components'
import RoundCard from '../RoundCard/RoundCard'
import { CardSort } from './CardSort/CardSort'
import { CardSubtitle } from './CardSubtitle/CardSubtitle'
import { SortSwitchIcon } from './SortSwitchIcon/SortSwitchIcon'

const DetailsCard = ({ subtitle, sortTitle, rounds }) => {
  return (
    <Section>
      <Container>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardSort>
          {sortTitle}
          <SortSwitchIcon />
        </CardSort>
      </Container>
      {rounds &&
        rounds.map((round, idx) => (
          <RoundCard
            key={idx}
            bidNow={round.bidNow}
            time={round.time}
            icon={round.icon}
            name={round.name}
            number={round.number}
            timer={round.timer}
            price={round.price}
            completed={round.completed}
          />
        ))}
    </Section>
  )
}

export default DetailsCard

const designerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 14px 0;
`

const Section = styled.section`
  ${designerCSS}
`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`
