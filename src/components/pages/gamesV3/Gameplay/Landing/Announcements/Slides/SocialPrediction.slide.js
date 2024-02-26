import styled from 'styled-components'

import { images, icons } from 'common'
import { ItemContainer } from '../Carousel/ItemContainer'

export const SocialPredictionSlide = () => {
  return (
    <ItemContainer bg={`${images.bg_landing_slide_1}`}>
      <LeftContainer>
        <h1>See what all the buzz is about with the world’s most fun, engaging, and potentially lucrative</h1>
        <h2>Social Gamified Prediction Platform</h2>
      </LeftContainer>
      <RightContainer>
        <div></div>
      </RightContainer>
    </ItemContainer>
  )
}

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  & > h1 {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    padding: 0 0 10px 0;
    text-align: left;
    line-height: 140%;

    @media (max-width: 1600px) {
      font-size: 1rem;
    }

    @media (max-width: 800px) {
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      font-size: 0.8rem;
      text-align: center;
      order: 2;
    }
  }

  & > h2 {
    font-size: 2.9rem;
    font-weight: 200;
    letter-spacing: -0.05em;
    text-align: left;
    padding: 0 20px 0 0;
    line-height: 110%;

    @media (max-width: 1600px) {
      font-size: 2.6rem;
    }

    @media (max-width: 800px) {
      font-size: 2.2rem;
    }

    @media (max-width: 600px) {
      font-size: 1.7rem;
      text-align: center;
      padding: 5px 0;
      width: 100%;
      order: 1;
    }
  }

  @media (max-width: 600px) {
    order: 2;
    align-items: center;
  }
`

const RightContainer = styled.div`
  display: flex;
  height: 100%;

  & > div {
    height: 100%;
    display: flex;
    align-self: flex-end;
    background: url(${icons.YoloLogoVerticalWhiteIcon}) center center / 240px auto no-repeat;
    background-size: 240px auto;
    width: 240px;

    @media (max-width: 1600px) {
      background-size: 180px auto;
      width: 180px;
    }

    @media (max-width: 800px) {
      background-size: 150px auto;
      width: 150px;
    }

    @media (max-width: 600px) {
      background-size: 130px auto;
      width: 130px;
      height: 80px;
    }
  }

  @media (max-width: 600px) {
    order: 1;
  }
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  outline: none;
  border: none;
  padding: 12px 30px;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 100%;
  border-radius: 1.5em;
  margin: 20px 0 0 0;
  background: linear-gradient(
    180deg,
    #ffffff,
    #fbfcfe,
    #f7f9fe,
    #f3f6fd,
    #eef3fd,
    #eaeffc,
    #e6ecfb,
    #e2e9fb,
    #dee6fa,
    #d9e3f9,
    #d5e0f9,
    #d1ddf8
  );
  color: #2159d1;

  @media (max-width: 600px) {
    padding: 12px 24px;
    font-size: 0.9rem;
    margin-top: 5px;
  }
`
