import { images } from 'common'
import React from 'react'
import styled from 'styled-components'
import { CardWinner } from './Winner/CardWinner'

const bidders = [
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  },
  {
    icon: images.profile_photo_temp,
    name: 'TinoN2264',
    amountWon: '$1,265.11'
  }
]

export const TopBidders = (props) => {
  return (
    <TopBiddersContainer>
      <Title>Big Winners</Title>
      <ListBidders>
        {bidders.map((winner) => (
          <CardWinner winner={winner} />
        ))}
      </ListBidders>
    </TopBiddersContainer>
  )
}

const TopBiddersContainer = styled.div`
  width: 80%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 140%;
  text-align: start;
`
const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  text-transform: uppercase;
  width: 100%;
  padding: 5px 30px 0 0;
`
const ListBidders = styled.div`
  width: calc(100% + 12px);
  overflow-x: auto;
  border-radius: 10px;
  margin: 0 12px 20px 0;
  padding: 12px;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  line-height: 100%;
  position: relative;
`
