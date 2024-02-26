import styled from 'styled-components'

import { images } from 'common'
import { ItemContainer } from '../Carousel/ItemContainer'
import { useLayoutV3State } from 'hooks/useLayoutV3State'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const StocksNowLiveSlide = () => {
  const { setCurrentGame } = useLayoutV3State()
  const handleCardSelected = () => setCurrentGame(GAME_TYPES.G_LVG)
  return (
    <ItemContainerMod bg={`${images.futures_stocks_slide_bg_3}`}>
      <LeftContainer>
        <h1>
          The first leveraged trading experience to offer <strong>Stocks</strong> - <span>NOW LIVE</span>
        </h1>
        <Button onClick={handleCardSelected}>Start trading</Button>
      </LeftContainer>
      <RightContainer>
        <img alt='futures_stocks_image_2' src={images.futures_stocks_image_2} />
      </RightContainer>
    </ItemContainerMod>
  )
}

const ItemContainerMod = styled(ItemContainer)`
  padding: 30px;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }
`

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  & > h1 {
    font-size: 2.4rem;
    font-weight: 200;
    letter-spacing: -0.045em;
    padding: 0 80px 0 0;
    text-align: left;
    line-height: 130%;
    strong {
      font-weight: 800;
    }
    span {
      -webkit-text-stroke: 5px hsla(0, 0%, 100%, 0.2);
      -webkit-text-fill-color: white;
      font-weight: 800;
    }

    @media (max-width: 1600px) {
      font-size: 1.7rem;
      letter-spacing: -0.02em;
      padding: 0 20px 0 0;
      line-height: 120%;
    }

    @media (max-width: 800px) {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
      padding: 0 20px 0 0;
      line-height: 120%;
    }

    @media (max-width: 600px) {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
      padding: 0 0 0 0;
      line-height: 120%;
      display: inline;
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    order: 1;
    align-items: center;
  }
`

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 300px;

  & > img {
    width: 100%;
  }

  @media (max-width: 1600px) {
    min-width: 200px;
    img {
      width: 94%;
    }
  }

  @media (max-width: 800px) {
    min-width: 200px;
    img {
      width: 94%;
    }
  }

  @media (max-width: 600px) {
    img {
      width: 30%;
    }
  }

  @media (max-width: 600px) {
    min-width: 100%;
    width: 100%;
    justify-content: center;
    order: 2;
    align-items: flex-end;
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
