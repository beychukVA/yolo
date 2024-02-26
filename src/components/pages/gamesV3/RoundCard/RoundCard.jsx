import { icons, images } from 'common'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { PriceDirectionIcon } from '../ComingUpPeek/PriceDirectionIcon'

const RoundCard = ({ bidNow, time, icon, name, number, timer, price, completed }) => {
  const [isDetailOpen, setDetailOpen] = useState(false)

  const open = () => setDetailOpen(true)
  const close = () => setDetailOpen(false)

  return (
    <RoundContainer isOpen={isDetailOpen}>
      {isDetailOpen && (
        <DetailContainer>
          <DetailHeader>
            <Close onClick={() => close()} />
            <HeaderTitle>
              BID IN <Name>{name}</Name> ROUND <HeaderNumber>{number}</HeaderNumber>
            </HeaderTitle>
          </DetailHeader>
          <DetailBody>
            <StartsInContainer>
              <BodyTime>{time}</BodyTime>
              <StartsIn>STARTS IN</StartsIn>
              <BodyTimer> {timer}</BodyTimer>
            </StartsInContainer>
            <ChartContainer>
              <Icon icon={icon} />
              <ChartName>{name}</ChartName>
              <Chart />
            </ChartContainer>
            <BidAmountContainer>
              <BidTitle>Bid amount</BidTitle>
              <BidInput type='text' placeholder='40.00' />
              <USDC>USDC</USDC>
            </BidAmountContainer>
            <SideBidContainer>
              <SideBitTitle>Enter a $2 USDC Side Bid</SideBitTitle>
              <SideBidToggleWrapper>
                <SideBitToogleInput value='on' id='sb_toggle_id' type='checkbox' role='switch' name='sb_toggle_id' />
                <SideBitToogleLabel htmlFor='sb_toggle_id'>
                  <SideBitLabelSlot>NO</SideBitLabelSlot>
                  <SideBitLabelSlot>YES</SideBitLabelSlot>
                </SideBitToogleLabel>
              </SideBidToggleWrapper>
            </SideBidContainer>
            <BalanceContainer>
              <BalanceTitle>Biddable Balance</BalanceTitle>
              <BalanceAmount>$22,156.70</BalanceAmount>
            </BalanceContainer>
            <BiddingButtonContainer>
              <ButtonAbove>
                Bid above
                <PayoutSummary>
                  Payout $159.07
                  <PayoutX>1.64X</PayoutX>
                </PayoutSummary>
              </ButtonAbove>
              <ButtonBelow>
                Bid below
                <PayoutSummary>
                  Payout $159.07
                  <PayoutX>1.64X</PayoutX>
                </PayoutSummary>
              </ButtonBelow>
            </BiddingButtonContainer>
          </DetailBody>
        </DetailContainer>
      )}
      {!isDetailOpen && (
        <>
          <DataContainer
            onClick={() => {
              if (!completed) {
                open()
              }
            }}
          >
            <Time>{time}</Time>
            <Icon icon={icon} />
            <Number>ROUND {number}</Number>
            <PriceDirectionIcon arrow={true} />
            {timer ? <Timer>{timer}</Timer> : <Price>{price}</Price>}
          </DataContainer>
          <Button bidNow={bidNow}>Bid now</Button>
        </>
      )}
    </RoundContainer>
  )
}

export default RoundCard

const BiddingButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 20px 0;
  padding: 0 20px;
`

const PayoutSummary = styled.div`
  font-weight: 300;
  margin: 2px 0 0 0;
  display: inline-block;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  position: relative;
  z-index: 2;
`

const PayoutX = styled.span`
  padding: 2px 4px 1px 4px;
  border-radius: 5px;
  font-size: 0.7rem;
  margin: 0 0 0 3px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
`

const ButtonAbove = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 1px 0;
  padding: 16px 20px;
  background: rgb(0, 135, 13);
  background: linear-gradient(
    180deg,
    #00870d,
    #00860d,
    #00850d,
    #00820c,
    #007f0c,
    #007b0c,
    #00770b,
    #00730b,
    #00700b,
    #006d0a,
    #006c0a,
    #006b0a
  );
  border-radius: 10px 10px 0 0;
  margin: 0 0 1px 0;

  &::before {
    display: block;
    height: 14px;
    width: 14px;
    border: inherit;
    position: absolute;
    left: calc(50% - 7px);
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    border-radius: 0 0 0 0.35em;
    content: '';
    z-index: 0;
    background: hsl(126, 100%, 26%);
    top: -7px;
    transform: rotate(-225deg);
  }
`
const ButtonBelow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background: rgb(175, 11, 66);
  background: linear-gradient(
    180deg,
    #af0b42,
    #ae0b42,
    #ad0b41,
    #aa0b40,
    #a70a3f,
    #a40a3e,
    #a00a3c,
    #9d0a3b,
    #9a093a,
    #970939,
    #960938,
    #950938
  );
  border-radius: 0 0 10px 10px;
  margin: 1px 0 0 0;

  &::before {
    display: block;
    height: 14px;
    width: 14px;
    border: inherit;
    position: absolute;
    left: calc(50% - 7px);
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    border-radius: 0 0 0 0.35em;
    content: '';
    z-index: 0;
    background: hsl(340, 88%, 31%);
    bottom: -7px;
    transform: rotate(-45deg);
  }
`

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px 30px 20px;
`

const BalanceTitle = styled.span`
  cursor: default;
`
const BalanceAmount = styled.span`
  cursor: pointer;
`

const DetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(48, 59, 81);
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  -webkit-box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  -moz-box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3);

  border-radius: 6px;
  cursor: pointer;
  /* transition: all 500ms ease; */
`

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BodyTime = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  /* background: rgb(20,39,77); */
  background: rgba(0, 0, 0, 0.2);
  padding: 7px 6px 5px 6px;
  line-height: 100%;
  border-radius: 5px;
  margin-right: 10px;
`

const BodyTimer = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  zoom: 1.4;
  margin-top: -2px;
`

const StartsIn = styled.span`
  text-transform: uppercase;
  font-weight: 200;
  font-size: 0.7rem;
  margin: 3px 10px 0 0;
`

const StartsInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px 0 20px 0;
`

const Chart = styled.div`
  width: 182px;
  height: 43px;
  background-image: url(${images.temp_live_asset_graph_small});
  background-repeat: no-repeat;
  background-size: contain;
`

const ChartName = styled.span`
  font-weight: 400;
  text-transform: uppercase;
`

const BidAmountContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px 0 20px;
`

const BidTitle = styled.span`
  font-size: 0.75rem;
  margin: 0 0 10px 0;
`

const BidInput = styled.input`
  width: 100%;
  /* background: rgb(41,50,66); */
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: none;
  font-size: 1.3rem;
  font-weight: 300;
  text-align: left;
  padding: 10px 20px;
  -webkit-box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);

  &:hover,
  &:focus {
    border: 0;
    outline: 0;
  }
`

const USDC = styled.div`
  position: absolute;
  bottom: 20px;
  right: 45px;
  color: rgb(42, 109, 255);
  font-size: 0.8rem;
  line-height: 100%;
`

const SideBidContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 0 20px 0 20px;
  cursor: default;
`
const SideBitTitle = styled.span``

const SideBidToggleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  & label span {
    display: block;
    transform: translate(0, 50%);
  }

  & label span:nth-child(2) {
    transform: translate(0, 100%) scale(0);
  }

  & input:checked ~ label span:nth-child(2) {
    transform: translate(0, -50%);
  }

  & input:checked ~ label span {
    transform: translate(0, 200%) scale(0);
  }
`

const SideBitToogleInput = styled.input`
  border-radius: 100px;
  cursor: pointer;
  position: relative;
  margin-right: 0;
  width: 45px;
  height: 26px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  background: rgb(22, 33, 54);

  transition-property: background-color, transform, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;

  &:checked {
    background-color: #2159d1;

    &::before {
      transform: translate(100%, -50%);
    }
  }

  &::before {
    display: block;
    background: currentColor;
    border-radius: 50%;
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 22px;
    height: 22px;
    transform: translateY(-50%);

    transition-property: background-color, transform, visibility;
    transition-duration: 0.3s;
    transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;
  }
`

const SideBitToogleLabel = styled.label`
  display: block;
  position: relative;
  top: 0;
  right: 0;
  overflow: hidden;
  padding: 0 0 0 10px;
`

const SideBitLabelSlot = styled.span`
  position: relative;
  top: 0;
  left: 0;
  font-size: 0.8rem;
  font-weight: 600;
  transition-property: background-color, transform, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;
`

const HeaderTitle = styled.span`
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 200;
  padding: 25px 0 10px 0;
  margin: 0 0 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`

const HeaderNumber = styled.span`
  font-weight: 700;
`

const Close = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  -webkit-mask: url(${icons.close_x_icon}) center center / 12px 12px no-repeat;
  mask: url(${icons.close_x_icon}) center center / 12px 12px no-repeat;
  background: rgba(255, 255, 255, 1);
`

const RoundContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgb(39, 55, 73);
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0.5')};
  padding: ${({ isOpen }) => (isOpen ? '0' : '6px 5px 5px 5px')};
  margin: 0 0 5px 0;
  transition: all 500ms ease;
  border-radius: 6px;

  &:hover {
    opacity: 1;
  }
`
const DataContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px 0 5px;
  /* transition: all 500ms ease; */
`

const Button = styled.button`
  display: ${({ bidNow }) => (bidNow ? 'block' : 'none')};
  width: 100%;
  margin: 10px 0 0 0;
  font-size: 0.75rem;
  padding: 8px 0;
  border-radius: 8px;
  background: hsl(213, 73%, 47%);
  background: linear-gradient(
    180deg,
    #2159d1,
    #2159d0,
    #2158cf,
    #2057cd,
    #2056ca,
    #1f55c7,
    #1f53c3,
    #1e52c0,
    #1e51bd,
    #1d50bb,
    #1d4fba,
    #1d4fb9
  );
  box-shadow: 0 0 50px 0px rgb(0 0 0 / 40%);
  -webkit-box-shadow: 0 0 60px 0px rgb(0 0 0 / 50%);
  -moz-box-shadow: 0 0 60px 0px rgba(0, 0, 0, 0.5);
  animation: pulsate 2s ease-out infinite;
`

const Time = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  /* background: rgb(20,39,77); */
  background: rgba(0, 0, 0, 0.2);
  padding: 7px 6px 5px 6px;
  line-height: 100%;
  border-radius: 5px;
`

const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`

const Number = styled.span`
  margin-right: auto;
`

const Name = styled.span`
  color: hsl(262, 75%, 59%);
`

const Timer = styled.span``
const Price = styled.span``
