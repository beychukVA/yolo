import styled, { css } from 'styled-components'
import { icons, images, logos } from 'common'

const designerCss = css`
  .asset .asset_icon {
    background: url(${({ featuredAsset }) => featuredAsset.icon});
  }

  .futures_logo {
    background: url(${logos.futures_logo}) center center / 200px auto no-repeat;
    width: 200px;
    height: 45px;
    display: flex;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/lb_bids_stats.css */
  .asset .asset_icon {
    height: 14px;
    width: 14px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/landing.css */
  .carousel__slide h1 {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    padding: 0 0 10px 0;
    text-align: left;
    line-height: 140%;
  }
  .carousel__slide h2 {
    font-size: 2.9rem;
    font-weight: 200;
    letter-spacing: -0.05em;
    text-align: left;
    padding: 0 20px 0 0;
    line-height: 110%;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/landing_carousel.css */
  .carousel__slide {
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .carousel__slide:nth-of-type(1) {
    transform: translateX(0%);
  }
  .carousel__slide {
    height: calc(100% - 25px);
    border-radius: 10px;
    position: absolute;
    overflow-y: auto;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 30px 60px;
  }
  .carousel__slide {
    overflow: hidden;
  }
  .carousel__slide .left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .carousel__slide .right {
    display: flex;
    height: 100%;
    justify-content: flex-end;
  }
  .carousel__slide.futures_rewards_pool {
    padding: 0;
  }
  .carousel__slide.futures_rewards_pool {
    position: absolute;
    background-image: url(${images.futures_rewards_pool_bg});
    background-size: cover;
    background-position: bottom center;
    width: 100%;
    height: 100%;
  }
  .carousel__slide.futures_rewards_pool h1 {
    font-size: 3.2rem;
    font-weight: 200;
    letter-spacing: -0.045em;
    padding: 0 80px 0 0;
    text-align: left;
    line-height: 130%;
    text-shadow: 0;
  }
  .carousel__slide.futures_rewards_pool h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }
  .carousel__slide.futures_rewards_pool .left {
    padding: 30px 40px;
  }
  .carousel__slide.futures_rewards_pool .right {
    background: hsla(0, 0%, 100%, 0.05);
    backdrop-filter: blur(20px);
  }
  .carousel__slide.futures_rewards_pool .right .thisweek_info {
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .carousel__slide.futures_rewards_pool .right .thisweek_info .dates {
    font-size: 1.5rem;
    font-weight: 200;
    padding: 0 0 15px 0;
    text-align: left;
  }
  .carousel__slide.futures_rewards_pool .right .thisweek_info .subtitle {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    text-align: left;
  }
  .carousel__slide.futures_rewards_pool .right .thisweek_info .rewards_feature_asset {
    width: fit-content;
    display: flex;
    margin: 10px 0 0 0;
    background: hsla(0, 0%, 0%, 0.4);
    border: 0;
    border-radius: 10px;
    padding: 15px 20px;
    align-items: center;
  }
  .carousel__slide.futures_rewards_pool .right .thisweek_info .rewards_feature_asset p {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: -0.03em;
    margin: 0 0 0 10px;
    text-align: left;
    white-space: nowrap;
  }

  .carousel__slide.futures_rewards_pool .right .thisweek_info .rewards_feature_asset .asset .asset_icon {
    width: 50px;
    height: 50px;
    background-size: 50px auto;
  }
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/res.css */
  @media (max-width: 1600px) {
    .carousel__slide h1 {
      font-size: 1rem;
    }
    .carousel__slide h2 {
      font-size: 2.6rem;
    }
  }
  @media (max-width: 1200px) {
    .carousel__slide {
      padding: 30px 30px;
    }
  }
  @media (max-width: 800px) {
    .carousel__slide h1 {
      font-size: 0.9rem;
    }
    .carousel__slide h2 {
      font-size: 2.2rem;
    }
  }
  @media (max-width: 600px) {
    .carousel__slide {
      flex-direction: column;
      padding: 20px;
      justify-content: center;
      height: calc(100% - 25px);
    }
    .carousel__slide h1 {
      font-size: 0.8rem;
      text-align: center;
      order: 2;
    }
    .carousel__slide h2 {
      font-size: 1.7rem;
      text-align: center;
      padding: 5px 0;
      width: 100%;
      order: 1;
    }
    .carousel__slide .left {
      order: 2;
      align-items: center;
    }
    .carousel__slide .right {
      order: 1;
    }
  }
`
const developerCSS = css``

export const RewardsPoolSlideCss = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${designerCss}
  ${developerCSS}
`
