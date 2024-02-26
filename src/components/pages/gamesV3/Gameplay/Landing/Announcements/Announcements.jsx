import styled from 'styled-components'
import { Carousel } from './Carousel/Carousel'
import { CarouselItem } from './Carousel/CarouselItem'
import { SocialPredictionSlide } from './Slides/SocialPrediction.slide'
import { WelcomeFutureSlide } from './Slides/WelcomeFuture.slide'
import { StocksNowLiveSlide } from './Slides/StocksNowLive.slide'
import { RewardsPoolSlide } from './Slides/RewardsPool.slide'

export const Announcements = () => {
  return (
    <>
      <AnnouncementsContainer>
        <Carousel>
          <CarouselItem>
            <RewardsPoolSlide />
          </CarouselItem>
          <CarouselItem>
            <StocksNowLiveSlide />
          </CarouselItem>
          <CarouselItem>
            <WelcomeFutureSlide />
          </CarouselItem>
          <CarouselItem>
            <SocialPredictionSlide />
          </CarouselItem>
        </Carousel>
      </AnnouncementsContainer>
    </>
  )
}

const AnnouncementsContainer = styled.div`
  width: 80%;
  /* max-height: 250px;
  min-height: 250px; */
  height: 250px;
  border-radius: 10px;
  background: hsla(0, 0%, 0%, 0.2);
  margin: 0 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 140%;
  text-align: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 800px) {
    width: 95%;
  }
`
