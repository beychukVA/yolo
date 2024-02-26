import React from 'react'
import styled from 'styled-components'

import { images } from 'components/Atoms/ImgLib'

export const ContestHeader = () => {
  return (
    <Container>
      <PageInfo>
        <PageTitle>Referral Program</PageTitle>
      </PageInfo>
      <YolorektLogo>
        <ImageYolorekt alt='' src={images.YoloTokenStackedSolid}></ImageYolorekt>
      </YolorektLogo>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
`
const PageInfo = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-flow: column;
`
const PageTitle = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 100%;
  padding: 0 0 5px 0;
`
const PageDate = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-weight: 300;
`
const YolorektLogo = styled.div`
  display: flex;
  justify-content: center;
  width: 210px;

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 50px 0 0 0;
  }
`
const ImageYolorekt = styled.img`
  visibility: visible;
  display: flex;
  width: 210px;
`
