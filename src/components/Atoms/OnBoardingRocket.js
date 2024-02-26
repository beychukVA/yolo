import styled, { keyframes } from 'styled-components'

import { images } from './ImgLib'

export const OnBoardingRocket = () => {
  return (
    <YoloRocket>
      <img alt='' src={images.YoloRocket}></img>
    </YoloRocket>
  )
}

const slideInBlurredButton = keyframes`
  0% {
    transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 0% 100%;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 0 50%;
    filter: blur(0);
    opacity: 1;
  }
`

const YoloRocket = styled.div`
  width: 150px;
  position: absolute;
  bottom: -55px;
  left: calc(50% - 78px);
  transform: translateX(-50%);
  img {
    width: 100%;
  }
  animation: ${slideInBlurredButton} 1.9s cubic-bezier(0.23, 1, 0.32, 1) both;

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 130px;
    bottom: 80px;
    left: calc(50% - 64px);
  }
  ${({ theme }) => theme.breakPoints['375px']} {
    width: 90px;
    bottom: 55px;
    left: calc(50% - 44px);
  }
`
