import { IconLib } from 'components/Atoms/IconLib'
import { LONG_DASH } from 'constants/index'
import { XFT_LEVELS } from 'constants/xftLevels'
import { useUser } from 'hooks/user/useUser'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { currencyFormatter } from 'utils'

export const XftCarrousel = ({ xftProgressData }) => {
  const { xftLevel, canUpgrade } = xftProgressData
  const xftLevelId = (xftLevel.dec || 1).toString()
  const { account } = useUser('wallet')
  const [selectedNft, setSelectedNft] = useState(xftLevelId)

  const nftIds = Object.keys(XFT_LEVELS)
  nftIds.shift()

  useEffect(() => {
    setSelectedNft(xftLevelId)
  }, [xftLevelId, account])

  return (
    <Wrapper id='cards_container'>
      <div className='cards_container'>
        <div className='section_title'>YOLO XFTs</div>
        {nftIds.map((id, idx) => (
          <input
            key={`input-${idx}`}
            type='radio'
            name='slider'
            id={`_nft_item-${id}`}
            checked={selectedNft === id}
            onChange={() => setSelectedNft(id)}
          />
        ))}
        <div className='cards'>
          {nftIds.map((id, idx) => {
            const nftProps = XFT_LEVELS[id]
            return (
              <label key={`card-${idx}`} className='card' htmlFor={`_nft_item-${id}`} id={`nft-${id}`}>
                {xftLevel.dec === +id && (
                  <CurrentLevel isCurrentLevel={xftLevelId === id} nftBackground={nftProps.background10}>
                    Current level
                  </CurrentLevel>
                )}
                <div className='nft_image'>
                  <NftIcon {...nftProps.iconProps} />
                </div>
                <div className='nft_details'>
                  <div className='nft_title'>{nftProps.caption}</div>
                  <div className='nft_level_title'>{`Level ${id}`}</div>
                  <div className='nft_info'>
                    <div className='values'>
                      <div>{nftProps.neededBids}</div>
                      <div>
                        {isNaN(Number(nftProps.neededAmount))
                          ? LONG_DASH
                          : currencyFormatter(nftProps.neededAmount, { decimalDigits: 0 })}
                      </div>
                      <div>{nftProps.yoloRewards}</div>
                    </div>
                    <div className='labels'>
                      <div>Total bids</div>
                      <div>Total amount bid</div>
                      <div>Yolo rewards</div>
                    </div>
                  </div>
                </div>
                <UpgradeButton canUpgrade={xftLevel.dec === +id && canUpgrade} nftBackground={nftProps.background10}>
                  Ready for upgrade!
                </UpgradeButton>
              </label>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}

const ContainerCss = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/dashboard.css */
  .card {
    padding: 30px;
    background: rgba(129, 170, 255, 0.06);
    border-radius: 15px;
    display: flex;
    position: relative;
    align-items: flex-start;
  }
  .card:first-child {
    grid-area: card1;
  }
  .card:nth-child(2) {
    grid-area: card2;
  }
  .card:nth-child(3) {
    grid-area: card3;
  }

  .cards_container input[type='radio'] {
    display: none;
  }
  .cards_container {
    width: 100vw;
    height: 360px;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    margin: 0 -60px;
    padding: 60px 0 0 0;
  }
  .cards_container .section_title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 0 25px 0;
  }
  .cards_container .card {
    position: absolute;
    max-width: 480px;
    height: 200px;
    left: 0;
    right: 0;
    margin: auto;
    transition: transform 0.4s ease;
    cursor: pointer;
    background: rgba(32, 32, 32, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .cards_container .cards {
    position: relative;
    width: 100%;
    height: 100%;
  }
  #_nft_item-1:checked ~ .cards #nft-2,
  #_nft_item-2:checked ~ .cards #nft-3,
  #_nft_item-3:checked ~ .cards #nft-4,
  #_nft_item-4:checked ~ .cards #nft-5,
  #_nft_item-5:checked ~ .cards #nft-6,
  #_nft_item-6:checked ~ .cards #nft-1 {
    transform: translatex(50%) scale(0.8);
    opacity: 1;
    z-index: 1;
    border: 0;
  }
  #_nft_item-1:checked ~ .cards #nft-3,
  #_nft_item-2:checked ~ .cards #nft-4,
  #_nft_item-3:checked ~ .cards #nft-5,
  #_nft_item-4:checked ~ .cards #nft-6,
  #_nft_item-5:checked ~ .cards #nft-1,
  #_nft_item-6:checked ~ .cards #nft-2 {
    transform: translatex(85%) scale(0.6);
    opacity: 1;
    z-index: 0;
    border: 0;
  }
  #_nft_item-1:checked ~ .cards #nft-4,
  #_nft_item-2:checked ~ .cards #nft-5,
  #_nft_item-3:checked ~ .cards #nft-6,
  #_nft_item-4:checked ~ .cards #nft-1,
  #_nft_item-5:checked ~ .cards #nft-2,
  #_nft_item-6:checked ~ .cards #nft-3 {
    transform: translatex(0) scale(0.2);
    opacity: 1;
    z-index: -1;
    border: 0;
  }
  #_nft_item-1:checked ~ .cards #nft-5,
  #_nft_item-2:checked ~ .cards #nft-6,
  #_nft_item-3:checked ~ .cards #nft-1,
  #_nft_item-4:checked ~ .cards #nft-2,
  #_nft_item-5:checked ~ .cards #nft-3,
  #_nft_item-6:checked ~ .cards #nft-4 {
    transform: translatex(-85%) scale(0.6);
    opacity: 1;
    z-index: 0;
    border: 0;
  }
  #_nft_item-1:checked ~ .cards #nft-6,
  #_nft_item-2:checked ~ .cards #nft-1,
  #_nft_item-3:checked ~ .cards #nft-2,
  #_nft_item-4:checked ~ .cards #nft-3,
  #_nft_item-5:checked ~ .cards #nft-4,
  #_nft_item-6:checked ~ .cards #nft-5 {
    transform: translatex(-50%) scale(0.8);
    opacity: 1;
    z-index: 1;
    border: 0;
  }
  #_nft_item-1:checked ~ .cards #nft-1,
  #_nft_item-2:checked ~ .cards #nft-2,
  #_nft_item-3:checked ~ .cards #nft-3,
  #_nft_item-4:checked ~ .cards #nft-4,
  #_nft_item-5:checked ~ .cards #nft-5,
  #_nft_item-6:checked ~ .cards #nft-6 {
    transform: translatex(0) scale(1);
    opacity: 1;
    z-index: 2;
    box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.5);
  }
  .card * {
    display: flex;
  }
  .card .nft_details {
    align-items: center;
    justify-content: center;
    width: 60%;
    flex-flow: column;
  }
  .card .nft_title {
    font-size: 1.6rem;
    letter-spacing: -0.03em;
    font-weight: 600;
  }
  .card .nft_level_title {
    font-size: 1.1rem;
    padding: 0 0 10px 0;
  }
  .card .nft_image {
    width: 40%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-right: 1px solid white;
  }
  .card .nft_image img {
    width: 130px;
    height: 130px;
  }
  #nft-1.card {
    background: #3a3a3a;
    border: 1px solid #c0c0c0;
  }
  #nft-1.card .nft_title {
    color: #b5b5b5;
  }
  #nft-1.card .nft_image {
    border-right: 1px solid #4b4b4b;
  }
  #nft-2.card {
    background: #25264c;
    border: 1px solid #6817f0;
  }
  #nft-2.card .nft_title {
    color: #8139ff;
  }
  #nft-2.card .nft_image {
    border-right: 1px solid #3f3078;
  }
  #nft-3.card {
    background: #1e3a37;
    border: 1px solid #22f017;
  }
  #nft-3.card .nft_title {
    color: #22f017;
  }
  #nft-3.card .nft_image {
    border-right: 1px solid #1b5e2c;
  }
  #nft-4.card {
    background: #544c2a;
    border: 1px solid #f0ba17;
  }
  #nft-4.card .nft_title {
    color: #f0ba17;
  }
  #nft-4.card .nft_image {
    border-right: 1px solid #806b26;
  }
  #nft-5.card {
    background: #492535;
    border: 1px solid #f01717;
  }
  #nft-5.card .nft_title {
    color: #f01717;
  }
  #nft-5.card .nft_image {
    border-right: 1px solid #70222e;
  }
  #nft-6.card {
    background: #174d6c;
    border: 1px solid #89dbf7;
  }
  #nft-6.card .nft_title {
    color: #89dbf7;
  }
  #nft-6.card .nft_image {
    border-right: 1px solid #326e8d;
  }
  .card .nft_info .values,
  .card .nft_info .labels {
    flex-flow: column;
  }
  .card .nft_info .values div,
  .card .nft_info .labels div {
    height: 28px;
    align-items: center;
    line-height: 100%;
  }
  .card .nft_info .values {
    align-items: flex-end;
    padding: 0 4px 0 0;
  }
  .card .nft_info .values div {
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .card .nft_info .labels {
    align-items: flex-start;
    padding: 0 0 0 4px;
  }
  .card .nft_info .labels div {
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    font-size: 0.75rem;
  }
  @media (max-width: 1200px) {
    #_nft_item-1:checked ~ .cards #nft-2,
    #_nft_item-2:checked ~ .cards #nft-3,
    #_nft_item-3:checked ~ .cards #nft-4,
    #_nft_item-4:checked ~ .cards #nft-5,
    #_nft_item-5:checked ~ .cards #nft-6,
    #_nft_item-6:checked ~ .cards #nft-1 {
      transform: translatex(30%) scale(0.8);
    }
    #_nft_item-1:checked ~ .cards #nft-3,
    #_nft_item-2:checked ~ .cards #nft-4,
    #_nft_item-3:checked ~ .cards #nft-5,
    #_nft_item-4:checked ~ .cards #nft-6,
    #_nft_item-5:checked ~ .cards #nft-1,
    #_nft_item-6:checked ~ .cards #nft-2 {
      transform: translatex(55%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-5,
    #_nft_item-2:checked ~ .cards #nft-6,
    #_nft_item-3:checked ~ .cards #nft-1,
    #_nft_item-4:checked ~ .cards #nft-2,
    #_nft_item-5:checked ~ .cards #nft-3,
    #_nft_item-6:checked ~ .cards #nft-4 {
      transform: translatex(-55%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-6,
    #_nft_item-2:checked ~ .cards #nft-1,
    #_nft_item-3:checked ~ .cards #nft-2,
    #_nft_item-4:checked ~ .cards #nft-3,
    #_nft_item-5:checked ~ .cards #nft-4,
    #_nft_item-6:checked ~ .cards #nft-5 {
      transform: translatex(-30%) scale(0.8);
    }
  }
  @media (max-width: 980px) {
    #_nft_item-1:checked ~ .cards #nft-2,
    #_nft_item-2:checked ~ .cards #nft-3,
    #_nft_item-3:checked ~ .cards #nft-4,
    #_nft_item-4:checked ~ .cards #nft-5,
    #_nft_item-5:checked ~ .cards #nft-6,
    #_nft_item-6:checked ~ .cards #nft-1 {
      transform: translatex(20%) scale(0.8);
    }
    #_nft_item-1:checked ~ .cards #nft-3,
    #_nft_item-2:checked ~ .cards #nft-4,
    #_nft_item-3:checked ~ .cards #nft-5,
    #_nft_item-4:checked ~ .cards #nft-6,
    #_nft_item-5:checked ~ .cards #nft-1,
    #_nft_item-6:checked ~ .cards #nft-2 {
      transform: translatex(40%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-5,
    #_nft_item-2:checked ~ .cards #nft-6,
    #_nft_item-3:checked ~ .cards #nft-1,
    #_nft_item-4:checked ~ .cards #nft-2,
    #_nft_item-5:checked ~ .cards #nft-3,
    #_nft_item-6:checked ~ .cards #nft-4 {
      transform: translatex(-40%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-6,
    #_nft_item-2:checked ~ .cards #nft-1,
    #_nft_item-3:checked ~ .cards #nft-2,
    #_nft_item-4:checked ~ .cards #nft-3,
    #_nft_item-5:checked ~ .cards #nft-4,
    #_nft_item-6:checked ~ .cards #nft-5 {
      transform: translatex(-20%) scale(0.8);
    }
  }
  @media (max-width: 768px) {
    .cards_container .card {
      max-width: 410px;
    }
    .card .nft_image {
      width: 40%;
      padding-right: 20px;
    }
    .card .nft_image img {
      width: 120px;
      height: 120px;
    }
    .card .nft_details {
      width: 60%;
    }
    .card .nft_title {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
    }
    .card .nft_info .values div {
      font-size: 1.2rem;
      letter-spacing: -0.01em;
    }
  }
  @media (max-width: 600px) {
    .cards_container {
      margin: 0 -30px;
      height: 440px;
    }
    .cards_container .section_title {
      padding: 0 0 90px 0;
    }
    .cards_container input[type='radio'] {
      display: flex;
      align-self: center;
      position: absolute;
      top: 130px;
      -webkit-appearance: none;
      appearance: none;
      background-color: transparent;
      width: 30px;
      height: 30px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: translateY(-0.075em);
      cursor: pointer;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: center center;
    }
    .cards_container input[type='radio']:checked {
      background-color: transparent;
    }
    .cards_container input[type='radio']#_nft_item-1 {
      left: 22%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-silver-512.png');
    }
    .cards_container input[type='radio']#_nft_item-1:checked {
      border-color: #fff;
    }
    .cards_container input[type='radio']#_nft_item-2 {
      left: 32%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-orchid-512.png');
    }
    .cards_container input[type='radio']#_nft_item-2:checked {
      border-color: #6817f0;
    }
    .cards_container input[type='radio']#_nft_item-3 {
      left: 42%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-emerald-512.png');
    }
    .cards_container input[type='radio']#_nft_item-3:checked {
      border-color: #22f017;
    }
    .cards_container input[type='radio']#_nft_item-4 {
      left: 52%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-gold-512.png');
    }
    .cards_container input[type='radio']#_nft_item-4:checked {
      border-color: #f0ba17;
    }
    .cards_container input[type='radio']#_nft_item-5 {
      left: 62%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-ruby-512.png');
    }
    .cards_container input[type='radio']#_nft_item-5:checked {
      border-color: #f01717;
    }
    .cards_container input[type='radio']#_nft_item-6 {
      left: 72%;
      background-image: url('http://yolo.tino.me/game-omega-staging/resources/images/nft/yolo_nft-diamond-512.png');
    }
    .cards_container input[type='radio']#_nft_item-6:checked {
      border-color: #89dbf7;
    }
    .cards_container .card {
      max-width: 330px;
    }
    .card .nft_image {
      width: 30%;
      padding-right: 20px;
    }
    .card .nft_image img {
      width: 80px;
      height: 80px;
    }
    .card .nft_details {
      width: 70%;
    }
    .card .nft_title {
      font-size: 1.3rem;
      letter-spacing: -0.02em;
    }
    .card .nft_info .values div {
      font-size: 1.1rem;
      letter-spacing: -0.01em;
    }
    .card .nft_info .labels div {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 480px) {
    #_nft_item-1:checked ~ .cards #nft-2,
    #_nft_item-2:checked ~ .cards #nft-3,
    #_nft_item-3:checked ~ .cards #nft-4,
    #_nft_item-4:checked ~ .cards #nft-5,
    #_nft_item-5:checked ~ .cards #nft-6,
    #_nft_item-6:checked ~ .cards #nft-1 {
      transform: translatex(17%) scale(0.8);
    }
    #_nft_item-1:checked ~ .cards #nft-3,
    #_nft_item-2:checked ~ .cards #nft-4,
    #_nft_item-3:checked ~ .cards #nft-5,
    #_nft_item-4:checked ~ .cards #nft-6,
    #_nft_item-5:checked ~ .cards #nft-1,
    #_nft_item-6:checked ~ .cards #nft-2 {
      transform: translatex(35%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-5,
    #_nft_item-2:checked ~ .cards #nft-6,
    #_nft_item-3:checked ~ .cards #nft-1,
    #_nft_item-4:checked ~ .cards #nft-2,
    #_nft_item-5:checked ~ .cards #nft-3,
    #_nft_item-6:checked ~ .cards #nft-4 {
      transform: translatex(-35%) scale(0.6);
    }
    #_nft_item-1:checked ~ .cards #nft-6,
    #_nft_item-2:checked ~ .cards #nft-1,
    #_nft_item-3:checked ~ .cards #nft-2,
    #_nft_item-4:checked ~ .cards #nft-3,
    #_nft_item-5:checked ~ .cards #nft-4,
    #_nft_item-6:checked ~ .cards #nft-5 {
      transform: translatex(-17%) scale(0.8);
    }
  }
`

const Wrapper = styled.div`
  height: 350px;
  ${ContainerCss};
  ${({ theme }) => theme.breakPoints['600px']} {
    height: 400px;
  }
`
const NftIcon = styled(IconLib)`
  width: 100%;
  height: 130px;
`
const CurrentLevel = styled.div`
  display: ${({ isCurrentLevel }) => (isCurrentLevel ? 'block' : 'hidden')};
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.4);
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 7px 12px 5px 12px;
  line-height: 100%;
  z-index: 1;
  background: ${({ nftBackground }) => nftBackground};
`
const UpgradeButton = styled.button`
  display: ${({ canUpgrade }) => (canUpgrade ? 'block' : 'none !important')};
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: -50px;
  left: 0;
  text-align: center;
  font-size: 1rem;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background: ${({ nftBackground }) => nftBackground};
  color: #fff;
  :hover {
    filter: brightness(1.2);
  }
`
