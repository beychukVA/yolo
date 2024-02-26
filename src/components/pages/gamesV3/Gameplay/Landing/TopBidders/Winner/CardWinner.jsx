import React from 'react'
import styled from 'styled-components'

export const CardWinner = ({ winner }) => {
  const { icon, name, amountWon } = winner
  return (
    <CardContainer>
      <Icon icon={icon} />
      <Name>{name}</Name>
      <AmountWon>{amountWon}</AmountWon>
    </CardContainer>
  )
}

const CardContainer = styled.a`
  background: hsla(222, 9%, 16%);
  border-radius: 10px;
  padding: 15px 15px 12px 15px;
  font-size: 0.7rem;
  width: 90px;
  transform-origin: center center;
  cursor: pointer;
  text-decoration: none;
  margin: 0 5px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Icon = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 0 5px 0;
  width: 100%;
  border-radius: 10px;
`
const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  margin: 0 0 2px 0;
`
const AmountWon = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  color: hsl(221, 100%, 50%);
  font-weight: 700;
  letter-spacing: -0.01em;
`
