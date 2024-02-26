import React from 'react'
import styled from 'styled-components'
// import { BannerWrapper } from './cssStyledWrapper'

export const BetaEndedBanner = ({ closeBanner }) => {
  return (
    <BannerWrapper className='rotating_banner two'>
      <Text>
        The Beta program has ended and the public release of Yolorekt will come in a few weeks. Please stay tuned for
        updates.
      </Text>
    </BannerWrapper>
  )
}

const BannerWrapper = styled.div`
  cursor: pointer;
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
  :hover {
    color: #fff;
  }
`

const Text = styled.p`
  display: flex;
  flex-flow: row;
  strong {
    font-weight: 600;
    padding: 0 5px;
  }
`
