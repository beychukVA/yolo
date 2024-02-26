import React from 'react'
import styled from 'styled-components'

export const DoubleDepositBonusBanner = ({ closeBanner }) => {
  return (
    <BannerWrapper className='rotating_banner two'>
      <Text>
        <strong>DOUBLE DEPOSIT BONUS!</strong> Register and deposit right now and we'll double your bidding money. Use
        the referral code: WELCOME BONUS
      </Text>
    </BannerWrapper>
  )
}

const BannerWrapper = styled.div`
  cursor: default;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  padding: 0 50px;
  background: #2a6dff;
`

const Text = styled.p`
  display: flex;
  flex-flow: row;
  strong {
    font-weight: 600;
    padding: 0 5px;
  }
`
