import { icons } from 'common'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { usePriceDirection } from 'hooks/usePriceDirection'
import styled, { css } from 'styled-components'
import { currencyFormatter } from 'utils'

export const AssetInfoModal = ({ closeModal, activeAsset }) => {
  const { priceFeed } = usePriceFeed2(activeAsset.priceFeedSymbol)
  const { direction } = usePriceDirection(priceFeed?.price)
  console.log('Asset Info: ', activeAsset)

  return (
    <ModalOverlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseWindowIcon onClick={() => closeModal()} />
        <Content>
          <AssetTitle>{activeAsset.name}</AssetTitle>
          <AssetSubtitle>({activeAsset.coinSymbol})</AssetSubtitle>
          <AssetIcon icon={activeAsset.icon} />
          <AssetDescription>
            Apple Inc. is an American multinational technology company headquartered in Cupertino, California, United
            States.
          </AssetDescription>
          <PriceContainer className={`${direction}`}>
            <div className='label'>Current / Closed</div>
            <div className={`current_price_display ${direction}`}>
              <div className={`price_direction_icon ${direction}`}></div>
              <label>
                {currencyFormatter(priceFeed?.value, { decimalDigits: activeAsset.fiatDecimals, noCurrencySign: true })}
              </label>
            </div>
            <Amount className={`current_price_display ${direction}`}>
              <label>-0.75$</label>
            </Amount>
          </PriceContainer>
          <HighPrice>
            <div className='label'>High today</div>
            <HighPriceContent>
              <HighPriceIcon />
              <label>$155.19</label>
            </HighPriceContent>
          </HighPrice>
          <LowPrice>
            <div className='label'>Low today</div>
            <LowPriceContent>
              <LowPriceIcon />
              <label>$150.87</label>
            </LowPriceContent>
          </LowPrice>
          <LinkToAsset href={`https://finance.yahoo.com/quote/${activeAsset.aggregationSymbol}`} target='_blank'>
            More info
          </LinkToAsset>
        </Content>
      </ModalBox>
    </ModalOverlay>
  )
}

const LinkToAsset = styled.a`
  outline: none;
  border: none;
  width: 100%;
  padding: 12px 20px;
  font-size: 0.8rem;
  margin: 10px 0 0 0;
  background: linear-gradient(180deg, #000000, #020304, #050609, #07090d, #0a0c10, #0c0f13, #0e1116, #101318);
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  border-radius: 10px;

  &:hover {
    background: linear-gradient(180deg, #000000, #000000, #000000, #000000, #000000, #000000, #000000, #000000);
  }
`

const LowPriceIcon = styled.div`
  background: hsl(0, 0%, 100%);
  height: 14px;
  width: 12px;
  margin: 0 5px 0 0;
  -webkit-mask: url(${icons.high_low_icon}) center center / 100% auto no-repeat;
  mask: url(${icons.high_low_icon}) center center / 100% auto no-repeat;
`

const LowPriceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const LowPrice = styled.div`
  line-height: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: hsla(0, 0%, 100%, 0.1);
  padding: 8px 18px 8px 18px;
  width: 100%;
  border-radius: 0 0 10px 10px;
  margin: 0;

  .label {
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0.7;
  }

  & label {
    font-size: 1.2rem;
    letter-spacing: -0.01em;
    font-weight: 600;
  }
`

const HighPriceIcon = styled.div`
  background: hsl(0, 0%, 100%);
  height: 14px;
  width: 12px;
  margin: 0 5px 0 0;
  transform: rotate(180deg);
  -webkit-mask: url(${icons.high_low_icon}) center center / 100% auto no-repeat;
  mask: url(${icons.high_low_icon}) center center / 100% auto no-repeat;
`

const HighPriceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HighPrice = styled.div`
  line-height: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: hsla(0, 0%, 100%, 0.1);
  padding: 8px 18px 8px 18px;
  width: 100%;
  margin: 0 0 2px 0;

  .label {
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0.7;
  }

  & label {
    font-size: 1.2rem;
    letter-spacing: -0.01em;
    font-weight: 600;
  }
`

const Amount = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`

const PriceContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  padding: 6px 18px 6px 18px;
  width: 100%;
  margin: 0 0 2px 0;
  width: 100%;
  border-radius: 10px 10px 0 0;

  &.up {
    background: hsl(158, 29%, 16%);
  }

  &.neutral {
    background: hsl(219, 29%, 15%);
  }

  &.down {
    background: hsl(342, 28%, 16%);
  }

  .label {
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0.7;
  }
`

const designerAssetCSS = css`
  .current_price_display {
    border-radius: 10px;
    line-height: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0 0 0 0;
  }

  .current_price_display label {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .current_price_display .price_direction_icon {
    mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
    width: 14px;
    height: 14px;
    margin: 0 5px 0 0;
  }

  .current_price_display.up label {
    color: hsl(126, 100%, 38%);
  }

  .current_price_display .price_direction_icon.up {
    background: hsl(126, 100%, 38%);
    transform: rotate(-180deg);
  }

  .current_price_display.down label {
    color: hsl(340, 88%, 46%);
  }

  .current_price_display .price_direction_icon.down {
    background: hsl(340, 88%, 46%);
    transform: rotate(0deg);
  }

  .current_price_display.neutral {
    background: hsl(219, 29%, 15%);
  }

  .current_price_display.neutral label {
    color: hsl(221, 73%, 47%);
  }

  .current_price_display .price_direction_icon.neutral {
    background: hsl(221, 73%, 47%);
    -webkit-mask: url('../../resources/images/icons/bid_direction_neutral_icon.svg') center center / auto 12px no-repeat;
    mask: url(${icons.bid_direction_neutral_icon}) center center / auto 14px no-repeat;
    width: 14px;
    height: 14px;
    margin: 0 5px 0 0;
  }
`

const AssetDescription = styled.div`
  text-align: center;
  line-height: 140%;
  font-size: 0.75rem;
  margin: 10px 0 15px 0;
`

const AssetIcon = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100px auto;
  width: 100px;
  height: 100px;
  background: url(${({ icon }) => icon});
`

const AssetSubtitle = styled.div`
  font-size: 0.9rem;
  padding: 0 0 10px 0;
  width: 100%;
  text-align: center;
`

const AssetTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  padding: 10px 15px 5px 15px;
  width: 100%;
  text-align: center;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  opacity: 1;
  background: radial-gradient(
    circle at 50% 50%,
    hsla(210, 19%, 16%, 0.6),
    hsla(214, 19%, 15%, 0.6),
    hsla(210, 18%, 13%, 0.6),
    hsla(213, 19%, 12%, 0.6),
    hsla(216, 19%, 10%, 0.6),
    hsla(210, 18%, 9%, 0.7),
    hsla(214, 19%, 7%, 0.7),
    hsla(204, 17%, 6%, 0.8),
    hsla(210, 18%, 4%, 0.9),
    hsla(220, 20%, 3%, 1),
    hsla(180, 14%, 1%, 1),
    hsla(0, 0%, 0%, 1)
  );
  width: 100vw;
  height: 100vh;
  -webkit-transition: opacity 0.5s ease;
  -moz-transition: opacity 0.5s ease;
  -o-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
`
const ModalBox = styled.div`
  position: fixed;
  width: 100%;
  min-width: 300px;
  max-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0 0 100px rgb(0 0 0 / 40%);
  -moz-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 100px rgb(0 0 0 / 40%);
  border-radius: 10px;
  z-index: 99;
  transition: top 0.5s ease;
  -webkit-transition: top 0.5s ease;
  -moz-transition: top 0.5s ease;
  -o-transition: top 0.5s ease;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 800px;
  height: fit-content;
  background-color: hsla(214, 18%, 16%, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px;

  ${designerAssetCSS}
`

const CloseWindowIcon = styled.div`
  top: -5px;
  left: -5px;
  -webkit-mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
  mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
  background: hsl(0, 0%, 100%);
  width: 22px;
  height: 22px;
  display: block;
  position: absolute;
  color: #fff;
  text-decoration: none;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  z-index: 2;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`
