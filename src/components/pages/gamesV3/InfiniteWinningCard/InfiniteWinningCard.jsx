import { icons } from 'common'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { currencyFormatter, throttle } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { useLvgOrderManager } from 'hooks/games/lvg/useLvgOrders.js'

import { config } from 'config'
import { SideOrderToggle } from '../SideOrderToggle/SideOrderToggle'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { usePriceDirection } from 'hooks/usePriceDirection'
import { LONG_DASH } from 'constants/index'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import { useEffect } from 'react'
import ms from 'ms.macro'
import { useUser } from 'hooks/user/useUser'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { LvgAssetsSelector } from 'components/Organisms/LvgAssetsDropDown.js'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'

const SIDE_MAPPING = {
  up: 'buy',
  down: 'sell'
}

const SLIDER_RANGE = { min: 1, max: 1000 }

function logSlider(position, leverageRange) {
  const minP = SLIDER_RANGE.min
  const maxP = SLIDER_RANGE.max

  const minV = Math.log(leverageRange.min)
  const maxV = Math.log(leverageRange.max)

  const scale = (maxV - minV) / (maxP - minP)

  if (+position === maxP) return leverageRange.max

  return Math.exp(minV + scale * (position - minP))
}

function logPosition(value, leverageRange) {
  const minP = Number(SLIDER_RANGE.min)
  const maxP = Number(SLIDER_RANGE.max)

  const minV = Math.log(leverageRange.min)
  const maxV = Math.log(leverageRange.max)

  const scale = (maxV - minV) / (maxP - minP)
  return (Math.log(value) - minV) / scale + minP
}

const InfiniteWinningCard = () => {
  const { updateModal } = useYoloModal()
  const { activeAsset, setLiveOrder } = useLvgState()
  const { account } = useUser('wallet')

  const [isSelectOpen, setSelectOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidSide, setBidSide] = useState('up')
  const [sliderPosition, setSliderPosition] = useState(1)
  const [leverage, setLeverage] = useState(1)
  const [placeBidError, setPlaceBidError] = useState(false)

  const [maxProfitPrice, setMaxProfitPrice] = useState('')
  const [maxProfitPh, setMaxProfitPh] = useState('')
  const [profit, setProfit] = useState('')
  const [profitPh, setProfitPh] = useState('')

  const [minLosePrice, setMinLosePrice] = useState('')
  const [minLosePh, setMinLosePh] = useState('')
  const [lose, setLose] = useState('')
  const [losePh, setLosePh] = useState('')

  const [takeProfitPrice, setTakeProfitPrice] = useState('')
  const [userStopLossPrice, setUserStopLossPrice] = useState('')

  const [coolingDown, setCoolingDown] = useState(false)
  useTimeoutWhen(() => setCoolingDown(false), ms`1.5s`, coolingDown)
  const checkMinBidAmount = () =>
    Number(bidAmount) * Number(leverage) >= activeAsset.minimumBidAmount && bidAmount !== ''

  const checkBidAmountOutRange = () => {
    const isBelowMin = Number(bidAmount) * Number(leverage) < activeAsset.minimumBidAmount && bidAmount !== ''
    const isAboveMax = Number(bidAmount) * Number(leverage) > activeAsset.maximumBidAmount && bidAmount !== ''
    return isBelowMin ? 'minBidError' : isAboveMax ? 'maxBidError' : false
  }

  const checkBidOrderErrors = () => {
    const isWrongSide = activeAsset.bidSideConstrain === bidSide
    if (isWrongSide) {
      setPlaceBidError(`Current asset is not shortable`)
      return true
    }

    const isBelowMin = Number(bidAmount) * Number(leverage) < activeAsset.minimumBidAmount && bidAmount !== ''
    if (isBelowMin) {
      setPlaceBidError(
        `Your bid must be ${currencyFormatter(activeAsset.minimumBidAmount, {
          noCurrencySign: true
        })} or greater`
      )
      return true
    }

    const isAboveMax = Number(bidAmount) * Number(leverage) > activeAsset.maximumBidAmount && bidAmount !== ''
    if (isAboveMax) {
      setPlaceBidError(
        `Your bid must be ${currencyFormatter(activeAsset.maximumBidAmount, {
          noCurrencySign: true
        })} or lower`
      )
      return true
    }

    return false
  }

  const checkCanSubmit = () => !(bidAmount && checkBidAmountOutRange())

  const { DEFAULT_FIAT } = config

  const { priceFeed } = usePriceFeed2(activeAsset.priceFeedSymbol)
  const { direction } = usePriceDirection(priceFeed?.price)

  const { tokenId, formatToken } = useToken()
  const { yoloWalletAmount, tokenAmount } = useUser('balance')
  const convert = useConvertAmount()

  const { sendOrder } = useLvgOrderManager()

  const calculateBustPrice = (side, lvg, entryPrice) => {
    const maxLvg = activeAsset.leverageRange.max
    const alpha = 0.5
    const a = (1 + alpha) ** (1 / maxLvg)

    let bustPrice
    if (side === 'up') {
      bustPrice = entryPrice * (1 - (2 - a ** lvg) / lvg)
      bustPrice = Math.max(0.15 * entryPrice, bustPrice)
    } else {
      bustPrice = entryPrice * (1 + (2 - a ** lvg) / lvg)
    }
    return bustPrice
  }

  const balance = useMemo(() => {
    const fiatTokenBalance = convert(formatToken(yoloWalletAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const fiatWalletBalance = convert(formatToken(tokenAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const totalBiddableBalance = fiatTokenBalance + fiatWalletBalance
    return currencyFormatter(totalBiddableBalance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DEFAULT_FIAT, yoloWalletAmount, tokenAmount, tokenId])

  const bustPrice = useMemo(() => {
    if (!bidAmount) return 0
    return calculateBustPrice(bidSide, leverage, priceFeed?.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidAmount, priceFeed?.value, leverage, bidSide, activeAsset])

  useEffect(() => {
    let timeout
    const bidAmountErrorRange = checkBidAmountOutRange()
    if (bustPrice && !bidAmountErrorRange) {
      setLiveOrder({
        asset: activeAsset,
        bustPrice,
        side: bidSide
      })
    } else {
      setLiveOrder({})
    }
    timeout = setTimeout(() => setLiveOrder({}), ms`3s`)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leverage, bidAmount])

  useEffect(() => {
    let timeout
    timeout = setTimeout(() => setPlaceBidError(false), ms`3s`)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeBidError])

  const toggleSelect = () => setSelectOpen(!isSelectOpen)

  const onSideToggle = (checked) => {
    if (!checked) {
      setBidSide('up')
    } else {
      setBidSide('down')
    }
  }

  const onSendOrderClickRaw = () => {
    const order = {
      asset: activeAsset.orderSymbol,
      side: SIDE_MAPPING[bidSide],
      amount: Number(bidAmount),
      assetType: activeAsset.type,
      leverage,
      takeProfitPrice,
      userStopLossPrice
    }
    // setCoolingDown(true)
    const bidAmountErrorRange = checkBidAmountOutRange()
    const orderHasError = checkBidOrderErrors()
    // const isError = !checkMinBidAmount()
    // setPlaceBidError(orderHasError)
    if (orderHasError) return
    setBidAmount('')
    sendOrder(order)
  }

  const onSendOrderClick = throttle(onSendOrderClickRaw, 500)

  const onOutputChange = (value) => {
    const valueN = Number(value)
    const position = logPosition(valueN, activeAsset.leverageRange)
    if (valueN < Number(activeAsset.leverageRange.min)) {
      setSliderPosition(activeAsset.leverageRange.min)
      setLeverage(valueN)
    } else if (valueN > Number(activeAsset.leverageRange.max)) {
      setSliderPosition(SLIDER_RANGE.max)
      setLeverage(activeAsset.leverageRange.max)
    } else {
      setSliderPosition(position.toString())
      setLeverage(valueN)
    }
  }

  const onOutputBlur = () => {
    if (leverage < Number(activeAsset.leverageRange.min)) {
      setLeverage(activeAsset.leverageRange.min)
      setSliderPosition(SLIDER_RANGE.min)
    }
  }

  const onlyDigits = (value) => {
    let digits = value?.replace(/[^.\d]+/g, '')
    if (digits && digits.match(/\./g)?.length > 1) {
      digits = digits.substr(0, digits.lastIndexOf('.'))
    }
    return digits
  }

  const onSliderChange = (event) => {
    const position = event.target.value
    const leverage = Math.trunc(logSlider(position, activeAsset.leverageRange))
    setLeverage(leverage)
    setSliderPosition(position)
  }

  const toggleThresholds = () => {
    setMaxProfitPrice('')
    setMaxProfitPh('')
    setProfit('')
    setProfitPh('')
    setMinLosePrice('')
    setMinLosePh('')
    setLose('')
    setLosePh('')
    setTakeProfitPrice('')
    setUserStopLossPrice('')
  }

  useEffect(() => {
    setLeverage(1)
    setSliderPosition(1)
  }, [activeAsset?.type])

  useEffect(() => {
    const currentPrice = priceFeed?.price
    if (profitPh) {
      setProfitPh(() =>
        maxProfitPrice
          ? currencyFormatter((bidAmount * leverage * (+maxProfitPrice - currentPrice)) / currentPrice, {
              noCurrencySign: false,
              decimalDigits: activeAsset.fiatDecimals
            })
          : ''
      )
      if (!!(maxProfitPrice && !isNaN(+maxProfitPrice))) {
        setTakeProfitPrice(maxProfitPrice)
      } else {
        setTakeProfitPrice()
      }
    } else if (maxProfitPh) {
      setMaxProfitPh(() =>
        profit
          ? currencyFormatter(+profit + currentPrice, {
              noCurrencySign: false,
              decimalDigits: activeAsset.fiatDecimals
            })
          : ''
      )
      if (!!(profit && !isNaN(+profit))) {
        setTakeProfitPrice(+profit + currentPrice)
      } else {
        setTakeProfitPrice()
      }
    } else {
      setTakeProfitPrice()
    }

    if (losePh) {
      setLosePh(() =>
        minLosePrice
          ? currencyFormatter((bidAmount * leverage * (+minLosePrice - currentPrice)) / currentPrice, {
              noCurrencySign: false,
              decimalDigits: activeAsset.fiatDecimals
            })
          : ''
      )
      if (!!(minLosePrice && !isNaN(+minLosePrice))) {
        setUserStopLossPrice(minLosePrice)
      } else {
        setUserStopLossPrice()
      }
    } else if (minLosePh) {
      setMinLosePh(() =>
        lose
          ? currencyFormatter(currentPrice - lose, { noCurrencySign: false, decimalDigits: activeAsset.fiatDecimals })
          : ''
      )
      if (!!(lose && !isNaN(+lose))) {
        setUserStopLossPrice(currentPrice - lose)
      } else {
        setUserStopLossPrice()
      }
    } else {
      setUserStopLossPrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFeed?.price, activeAsset?.fiatDecimals])

  const showAssetInfo = () => {
    const assetInfoModalObj = {
      show: true,
      id: 'assetInfo',
      props: { activeAsset },
      backdropClose: false,
      backdropBlurred: false
    }
    updateModal(assetInfoModalObj)
  }

  return (
    <InfiniteContainer>
      <Section>
        <CardSubtitle>
          <strong>SELECT</strong> STOCKS, CRYPTO, OR ETF ASSETS
        </CardSubtitle>
        <RowAsset>
          <SelectContainer>
            <LvgAssetsSelector />
            <AssetInfoButton
              data-hint='Asset Info'
              className='hint--rounded hint--small hint--top'
              onClick={() => showAssetInfo()}
            />
            <div className={`current_price_display ${direction}`}>
              <div className={`price_direction_icon ${direction}`}></div>
              <label>
                {currencyFormatter(priceFeed?.value, { decimalDigits: activeAsset.fiatDecimals, noCurrencySign: true })}
              </label>
            </div>
          </SelectContainer>
        </RowAsset>
      </Section>
      <Section>
        <SideOrderToggle context='infinite-tab' onToggle={onSideToggle} />
      </Section>
      <Section>
        <CardSubtitle>BID AMOUNT</CardSubtitle>
        <BidAmountFiled>
          <BidInput
            type='dial'
            placeholder='0.00'
            value={bidAmount}
            onChange={(e) => setBidAmount(onlyDigits(e.target.value))}
          />
        </BidAmountFiled>
      </Section>
      <Section>
        <CardSubtitle>MULTIPLIER</CardSubtitle>
        <SliderContainer>
          <Slider
            type='range'
            value={sliderPosition}
            min={SLIDER_RANGE.min}
            max={SLIDER_RANGE.max}
            onChange={onSliderChange}
          />
          <SliderLabels>
            <GreenLabelContainer>
              <SliderLabelGreen></SliderLabelGreen>
              <LabelGreenSpan>Safe & Boring</LabelGreenSpan>
            </GreenLabelContainer>
            <RedLabelContainer>
              <SliderLabelRed></SliderLabelRed>
              <LabelRedSpan>Risky & Fun</LabelRedSpan>
            </RedLabelContainer>
          </SliderLabels>
        </SliderContainer>
        <BustContainer>
          <MultiplyIcon>X</MultiplyIcon>
          <Output
            id='dial'
            value={leverage}
            onChange={(e) => onOutputChange(onlyDigits(e.target.value))}
            onBlur={onOutputBlur}
          />
          <BreakAmount>
            <div>Bust</div>
            <div className='strong'>
              {leverage === '0' ? LONG_DASH : currencyFormatter(bustPrice, { decimalDigits: activeAsset.fiatDecimals })}
            </div>
          </BreakAmount>
        </BustContainer>
      </Section>
      <Section>
        <SideBidToggleWrapper>
          <CardSubtitle className='flex'>SET P/L CLOSE THRESHOLDS</CardSubtitle>
          <SideBitToogleInput
            onClick={toggleThresholds}
            value='on'
            id='pl_toggle_id'
            type='checkbox'
            role='switch'
            name='pl_toggle_id'
          />
          <PLCollapsedContent className='collapsed_content'>
            {/* <span>Close bid at max price / Profit</span> */}
            <span>Close bid at max price</span>
            <CollapsedInputContainer className='mb'>
              <CollapsedInput
                placeholder={maxProfitPh || 'Max Price'}
                value={maxProfitPrice}
                onChange={(e) => {
                  setMaxProfitPrice(e.target.value)
                  setProfit('')
                  setProfitPh(() =>
                    e.target.value
                      ? currencyFormatter(+e.target.value - priceFeed?.price, { noCurrencySign: false })
                      : ''
                  )
                }}
              />
              <CollapsedInput
                placeholder={profitPh || 'Profit'}
                disabled={true}
                value={profit}
                onChange={(e) => {
                  setProfit(e.target.value)
                  setMaxProfitPrice('')
                  setMaxProfitPh(() =>
                    e.target.value
                      ? currencyFormatter(+e.target.value + priceFeed?.price, { noCurrencySign: false })
                      : ''
                  )
                }}
              />
            </CollapsedInputContainer>
            {/* <span>Close Bid at min price / Loss</span> */}
            <span>Close Bid at min price</span>
            <CollapsedInputContainer>
              <CollapsedInput
                placeholder={minLosePh || 'Min Price'}
                value={minLosePrice}
                onChange={(e) => {
                  setMinLosePrice(e.target.value)
                  setLose('')
                  setLosePh(() =>
                    e.target.value
                      ? currencyFormatter(priceFeed?.price - e.target.value, {
                          noCurrencySign: false
                        })
                      : ''
                  )
                }}
              />
              <CollapsedInput
                placeholder={losePh || 'Loss'}
                disabled={true}
                value={lose}
                onChange={(e) => {
                  setLose(e.target.value)
                  setMinLosePrice('')
                  setMinLosePh(() =>
                    e.target.value
                      ? currencyFormatter(priceFeed?.price - e.target.value, { noCurrencySign: false })
                      : ''
                  )
                }}
              />
            </CollapsedInputContainer>
          </PLCollapsedContent>
        </SideBidToggleWrapper>
      </Section>
      <section>
        <BalanceContainer>
          <BalanceTitle>Biddable Balance</BalanceTitle>
          <BalanceAmount>{balance}</BalanceAmount>
        </BalanceContainer>
        <BiddingButtonContainer>
          <BidButton
            disabled={!account}
            className={`bidInput ${placeBidError ? 'error' : ''}`}
            onClick={onSendOrderClick}
          >
            Place bid
          </BidButton>
          {account && <div className={`input_error ${placeBidError ? '' : 'hide'}`}>{placeBidError}</div>}
        </BiddingButtonContainer>
      </section>
    </InfiniteContainer>
  )
}

export default InfiniteWinningCard

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

const AssetInfoButton = styled.button`
  background: hsla(0, 0%, 100%, 0.1) url(${icons.info_icon}) center center / auto 10px no-repeat;
  padding: 10px;
  margin: 0 0 0 0;
  border-radius: 6px;
  display: flex;
  width: fit-content;
  height: fit-content;
`

const BidAmountFiled = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  flex-direction: column;

  & .bidInput {
    width: 100%;
    background: hsl(218, 23%, 25%);
    -webkit-box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: 300;
    text-align: center;
    padding: 10px;
    position: relative;
    z-index: 1;
  }
`

const RowAsset = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
const BidButton = styled.button`
  background: rgb(33, 89, 209);
  border-radius: 15px;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgb(33, 89, 209);
  display: flex;
  padding: 16px 20px;
  line-height: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  position: relative;
  justify-content: center;
  text-transform: uppercase;
  /* &:before {
    height: 14px;
    display: block;
    width: 14px;
    border: inherit;
    position: absolute;
    left: calc(50% - 7px);
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    border-radius: 0 0 0 0.35em;
    content: '';
    z-index: 0;
  } */
  &:hover {
    filter: brightness(110%);
    box-shadow: 0 0 35px 0px rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
  &:disabled {
    cursor: not-allowed !important;
    filter: none !important;
    box-shadow: none !important;
    opacity: 0.5;
  }
`
const BiddingButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 20px 0;

  & .bidInput.error {
    border: 1px solid hsla(360, 100%, 32%, 1);
  }

  & .input_error {
    padding: 15px 5px 5px 5px;
    text-align: center;
    background: hsla(360, 100%, 16%, 1);
    margin: -10px 0 0 0;
    border-radius: 0 0 10px 10px;
    line-height: 120%;
    position: relative;
    z-index: 0;
    font-size: 0.75rem;
    transform: translateY(0);
    transition: all 500ms ease;
    width: 100%;
  }

  & .input_error.hide {
    transform: translateY(-100%);
    z-index: 0;
  }
`

const BalanceTitle = styled.span`
  cursor: default;
  text-transform: uppercase;
`
const BalanceAmount = styled.span`
  cursor: pointer;
`

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 30px 0;
`

const CollapsedInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &.mb {
    margin-bottom: 10px;
  }
`
const CollapsedInput = styled.input`
  background: hsl(217, 23%, 25%);
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  width: calc(60% - 5px);
  border: 0;

  &:hover,
  &:focus {
    border: 0;
    outline: none;
  }
  &:disabled {
    ::placeholder {
      text-align: right;
    }
    background: transparent;
    width: calc(50% - 5px);
    text-justify: left;
  }
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const PLCollapsedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  transition-property: background-color, transform, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;
`

const SideBitToogleInput = styled.input`
  border-radius: 100px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0;
  width: 45px;
  height: 26px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  background: rgb(22, 33, 54);
  margin-left: auto;

  transition-property: background-color, transform, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;

  &:checked {
    background-color: #2159d1;

    &::before {
      transform: translate(100%, -50%);
    }
  }

  &:checked + .collapsed_content {
    display: block;
    transform: translate(0, 0) scale(1);
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

const SideBidToggleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  & .collapsed_content {
    transform: translate(0, 100%) scale(0);
    display: none;
  }
`

const BreakAmount = styled.div`
  width: 40%;
  padding: 0 0 0 20px;
  align-items: flex-start;
  flex-flow: column;
  justify-content: center;
  font-size: 0.7rem;

  & .strong {
    font-weight: 500;
    font-size: 0.85rem;
    padding-top: 5px;
  }
`

const Output = styled.input`
  background: hsl(218, 23%, 25%);
  -webkit-box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 400;
  width: 60%;
  text-align: center;
  justify-content: center;
  border: 0;
  outline: 0;
`

const MultiplyIcon = styled.div`
  position: absolute;
  top: calc(50% + 1px);
  transform: translateY(-50%);
  left: 40px;
  content: '';
  display: block;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 100%;
`

const BustContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 0;
`

const SliderContainer = styled.div`
  /* padding-top: 15px; */
  padding-bottom: 0;
  position: relative;
  z-index: 1;
  width: 100%;
`
const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 7px;
  cursor: pointer;
  background: rgb(0, 194, 19);
  border-radius: 5px;
  background-image: linear-gradient(rgb(222, 14, 84), rgb(222, 14, 84));
  background-size: ${({ value }) => `${(value * 100) / SLIDER_RANGE.max}%`} 100%;
  background-repeat: no-repeat;
  transition: none !important;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
  }

  ::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
  }
`

const SliderLabels = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  position: relative;
  z-index: 0;
`

const RedLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

const GreenLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const SliderLabelGreen = styled.label`
  font-size: 0.7rem;
  padding: 20px 0 0 0;
  margin: -10px 0 0 0;
  position: relative;
  border-left: 1px solid rgb(116, 119, 124);
`
const LabelGreenSpan = styled.span`
  display: flex;
  position: relative;
  padding: 5px 0 0 0;
  /* background: rgb(34, 39, 47); */
  left: -1px;
  color: rgb(0, 194, 19);
`
const SliderLabelRed = styled.label`
  font-size: 0.7rem;
  padding: 20px 0 0 0;
  margin: -10px 0 0 0;
  position: relative;
  border-right: 1px solid rgb(116, 119, 124);
`
const LabelRedSpan = styled.span`
  display: flex;
  position: relative;
  padding: 5px 0 0 0;
  /* background: rgb(34, 39, 47); */
  right: -1px;
  color: rgb(222, 14, 84);
`

const InfiniteContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 5px 0;
  opacity: 1;

  & section:nth-child(1) {
    padding-top: 0;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid hsl(220, 11%, 21%);

  &.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  & span.flex {
    padding-bottom: 0;
  }
`
const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${designerAssetCSS}
`

const CardSubtitle = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 20px;
`

const IconSelected = styled.div`
  width: 18px;
  height: 18px;
  margin: 0 5px 0 0;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`
const NameSelected = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 15px 0 0;
  /* min-width: 60px; */
`
const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`
const Name = styled.span`
  font-weight: 300;
  margin: 0 15px 0 0;
`

const MenuSelect = styled.div`
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  cursor: pointer;
  transition: all 150ms ease-in;
  transform: rotate(${({ isShow }) => (isShow ? '0deg' : '-180deg')});
`
const BidInput = styled.input`
  width: 100%;
  background: hsl(218, 23%, 25%);
  -webkit-box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  padding: 10px;
  border: 0;
  margin: 0 0 5px 0;

  &:hover,
  &:focus {
    border: 0;
    outline: 0;
  }
`

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const InputOption = styled.div`
  cursor: pointer;
  background: rgb(17, 19, 23);
  padding: 10px 0;
  width: 100%;
  margin-right: 3px;
  text-align: center;
  border-radius: 5px;
  justify-content: center;

  &:hover {
    background: rgb(0, 0, 0);
  }
`
