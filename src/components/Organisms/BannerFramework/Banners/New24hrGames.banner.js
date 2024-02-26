import React from 'react'
import styled from 'styled-components'

export const New24hrGamesBanner = ({ closeBanner }) => {
  return (
    <BannerWrapper className='rotating_banner two'>
      <Text>
        <strong>Announcing the NEW 24 Hour Game!</strong> We’re not just 3 minutes anymore - now bid in rounds that last
        24 hours. Go to GAMES &gt; 24 hr rounds and check the box to get started…
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
