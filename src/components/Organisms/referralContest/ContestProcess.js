import React from 'react'
import styled from 'styled-components'

export const ContestProcess = () => {
  return (
    <Container id='how-it-work'>
      <Title>How does this work? It's easy...</Title>
      <Steps>
        <ul>
          <StepNumber>1</StepNumber>
          <StepDesc>Send link via email</StepDesc>
        </ul>
        <ul>
          <StepNumber>2</StepNumber>
          <StepDesc>Bids are made based on your referrals</StepDesc>
        </ul>
        <ul>
          <StepNumber>3</StepNumber>
          <StepDesc>For each valid referral, you receive USDC</StepDesc>
        </ul>
      </Steps>
    </Container>
  )
}

const Container = styled.div`
  width: calc(100% + 120px);
  padding: 60px;
  margin: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  flex-flow: column;
  position: relative;

  & * {
    display: flex;
  }
`
const Title = styled.h1`
  font-size: 2.1rem;
  font-weight: 100;
  letter-spacing: -0.02em;
  line-height: 110%;
  text-align: center;
  padding: 0 0 5px 0;
`
const Steps = styled.div`
  width: 100%;
  flex-flow: row;
  margin: 40px 0 0 0;

  & ul {
    width: 33.3%;
    align-items: center;
    flex-flow: column;
    padding: 0 3%;
  }
`
const StepNumber = styled.li`
  font-size: 2.6rem;
  font-weight: 700;
  border: 1px solid rgba(42, 109, 255, 0.8);
  padding: 15px 25px;
  line-height: 100%;
  border-radius: 15px;
  margin: 0 0 20px 0;
`
const StepDesc = styled.li`
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
`
