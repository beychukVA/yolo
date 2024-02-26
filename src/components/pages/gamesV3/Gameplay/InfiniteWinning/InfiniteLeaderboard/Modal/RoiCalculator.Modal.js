import React, { useState } from 'react'
import { icons } from 'common'
import styled from 'styled-components'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { SideOrderToggle } from 'components/pages/gamesV3/SideOrderToggle/SideOrderToggle'
import { currencyFormatter } from 'utils'
import { usePriceFeed, usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useEffect } from 'react'

const positive = [
  { priceMove: '0.01%', ROI: '0.00%', percent: 0.01, exitPrice: '', pnl: '' },
  { priceMove: '0.05%', ROI: '0.04%', percent: 0.05, exitPrice: '', pnl: '' },
  { priceMove: '0.1%', ROI: '0.08%', percent: 0.1, exitPrice: '', pnl: '' },
  { priceMove: '0.5%', ROI: '0.44%', percent: 0.5, exitPrice: '', pnl: '' },
  { priceMove: '1%', ROI: '0.89%', percent: 1, exitPrice: '', pnl: '' },
  { priceMove: '5%', ROI: '4.49%', percent: 5, exitPrice: '', pnl: '' },
  { priceMove: '10%', ROI: '8.99%', percent: 10, exitPrice: '', pnl: '' },
  { priceMove: '50%', ROI: '44.99%', percent: 50, exitPrice: '', pnl: '' },
  { priceMove: '100%', ROI: '44.99%', percent: 100, exitPrice: '', pnl: '' },
  { priceMove: '500%', ROI: '449.99%', percent: 500, exitPrice: '', pnl: '' },
  { priceMove: '1000%', ROI: '899.99%', percent: 1000, exitPrice: '', pnl: '' }
]
const negative = [
  { priceMove: '-0.01%', ROI: '-0.01%', percent: -0.01, exitPrice: '', pnl: '' },
  { priceMove: '-0.05%', ROI: '-0.05%', percent: -0.05, exitPrice: '', pnl: '' },
  { priceMove: '-0.1%', ROI: '-0.10%', percent: -0.1, exitPrice: '', pnl: '' },
  { priceMove: '-0.5%', ROI: '-0.50%', percent: -0.5, exitPrice: '', pnl: '' },
  { priceMove: '-1%', ROI: '-1.00%', percent: -1, exitPrice: '', pnl: '' },
  { priceMove: '-5%', ROI: '-5.00%', percent: -5, exitPrice: '', pnl: '' },
  { priceMove: '-10%', ROI: '-10.00%', percent: -10, exitPrice: '', pnl: '' },
  { priceMove: '-50%', ROI: '-50.00%', percent: -50, exitPrice: '', pnl: '' },
  { priceMove: '-100%', ROI: '-100.00%', percent: -100, exitPrice: '', pnl: '' }
]

export const RoiCalculatorModal = ({ closeModal }) => {
  const { activeAsset, setActiveAsset } = useLvgState()
  const { priceFeed } = usePriceFeed2(activeAsset.priceFeedSymbol)
  const [isSelectOpen, setSelectOpen] = useState(false)
  const [entryPrice, setEntryPrice] = useState(1000)
  const [bidSide, setBidSide] = useState('up')
  const [bidAmount, setBidAmount] = useState('15')
  const [multiplier, setMultiplier] = useState(1)
  const [customMove, setCustomMove] = useState('')

  const setCurrentPrice = () =>
    setEntryPrice(currencyFormatter(priceFeed?.price, { noCurrencySign: true }).replace(/[^.\d]+/g, ''))

  useEffect(() => setCurrentPrice(), [])

  const toggleSelect = () => setSelectOpen(!isSelectOpen)

  const onlyDigits = (value) => {
    let digits = value?.replace(/[^.\d]+/g, '')
    if (digits && digits.match(/\./g)?.length > 1) {
      digits = digits.substr(0, digits.lastIndexOf('.'))
    }
    return digits
  }

  const onSideToggle = (checked) => {
    if (!checked) {
      setBidSide('up')
    } else {
      setBidSide('down')
    }
  }

  const onOutputChange = (value) => {
    const valueN = Number(value)
    if (valueN > 1000) {
      setMultiplier('1000')
    } else {
      setMultiplier(valueN.toString())
    }
  }

  const onOutputBlur = () => {
    if (Number(multiplier) === 0) {
      setMultiplier('1')
    }
  }

  const checkMinBidAmount = () => Number(bidAmount) >= activeAsset.minimumBidAmount || bidAmount === ''

  const calculateExitPrice = (percent, entryPrice) => {
    const exitAmount = (Number(entryPrice) * percent) / 100
    return (Number(entryPrice) + exitAmount).toFixed(2)
  }

  const getFeeRate = (entryPr, exitPr) => {
    return 0.1
  }

  const getPnL = (entryPrice, exitPrice, side, qty) => {
    let result
    if (side === 'up') {
      //ACZ create a const for this
      if (exitPrice <= entryPrice) {
        result = exitPrice - entryPrice
      } else {
        const rate = getFeeRate(entryPrice, exitPrice)
        result = (1 - rate) * (exitPrice - entryPrice)
      }
    } else if (side === 'down') {
      //ACZ create a const for this
      if (exitPrice >= entryPrice) {
        result = entryPrice - exitPrice
      } else {
        const rate = getFeeRate(entryPrice, exitPrice)
        result = (1 - rate) * (entryPrice - exitPrice)
      }
    } else {
      throw new Error('pnl side is unspecified')
    }

    return result * qty
  }

  const calculatePnL = (entryPrice, exitPrice) => {
    return bidAmount && Number(bidAmount) >= activeAsset.minimumBidAmount
      ? getPnL(Number(entryPrice), exitPrice, bidSide, (Number(bidAmount) / Number(entryPrice)) * multiplier)
      : 0
  }

  const calculateROI = (pnl) => {
    return bidAmount && Number(bidAmount) >= activeAsset.minimumBidAmount
      ? ((pnl * 100) / Number(bidAmount)).toFixed(2)
      : 0
  }

  const reset = () => {
    setCurrentPrice()
    setBidAmount('')
    setMultiplier(1)
    setCustomMove('')
  }

  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalBox
        onClick={(e) => {
          e.stopPropagation()
          if (isSelectOpen) {
            setSelectOpen(false)
          }
        }}
      >
        <CloseWindowIcon onClick={() => closeModal()} />
        <Header>
          ROI Calculator
          <p>
            When you win, YOLOREKT only takes a small fraction of your profit. The bigger the price move, the smaller
            the fraction.
          </p>
        </Header>
        <Body>
          <Content>
            <Section>
              <RowAsset>
                <SelectContainer>
                  <Icon icon={activeAsset.icon} />
                  <Name>{activeAsset.name}</Name>
                  <MenuSelect isShow={isSelectOpen} onClick={() => toggleSelect()} />
                  <SelectDropdown
                    isShow={isSelectOpen}
                    //   onMouseLeave={() => toggleSelect()}
                  >
                    {LVG_ASSETS.map((coin, idx) => (
                      <SelectDropdownItem
                        key={idx}
                        onClick={() => {
                          setActiveAsset(coin)
                          setSelectOpen(false)
                        }}
                      >
                        <Icon icon={coin.icon} />
                        <Name>{coin.name}</Name>
                      </SelectDropdownItem>
                    ))}
                  </SelectDropdown>
                </SelectContainer>
              </RowAsset>
            </Section>
            <Section>
              <CardSubtitle>Entry Price</CardSubtitle>
              <EntryPriceContainer>
                <EntryPriceInput
                  type='text'
                  placeholder='Entry price'
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(onlyDigits(e.target.value))}
                  onBlur={() => {
                    if (!entryPrice || Number(entryPrice) === 0) {
                      setCurrentPrice()
                    }
                  }}
                />
              </EntryPriceContainer>
            </Section>
            <Section>
              <SideOrderToggle context='roi-calculator' onToggle={onSideToggle} />
            </Section>
            <Section className='no-pb'>
              <CardSubtitle>BID AMOUNT</CardSubtitle>
              <BidAmountFiled>
                <BidInput
                  className={`bidInput ${checkMinBidAmount() ? '' : 'error'}`}
                  type='dial'
                  placeholder={`> ${currencyFormatter(activeAsset.minimumBidAmount, {
                    noCurrencySign: true
                  })}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(onlyDigits(e.target.value))}
                />
                <div className={`input_error ${checkMinBidAmount() ? 'hide' : ''}`}>{`minimum of ${currencyFormatter(
                  activeAsset.minimumBidAmount,
                  {
                    noCurrencySign: true
                  }
                )} or greater`}</div>
              </BidAmountFiled>
            </Section>
            <Section>
              <CardSubtitle>MULTIPLIER</CardSubtitle>
              <BustContainer>
                <MultiplyIcon>X</MultiplyIcon>
                <OutputMultiplier
                  id='dial'
                  value={multiplier}
                  onChange={(e) => onOutputChange(onlyDigits(e.target.value))}
                  onBlur={onOutputBlur}
                />
              </BustContainer>
            </Section>
            <Section>
              <CardSubtitle>Custom Price Move %</CardSubtitle>
              <CustomPriceMoveContainer>
                <CustomPriceMove
                  type='text'
                  placeholder='Entry move %'
                  value={customMove}
                  onChange={(e) => setCustomMove(onlyDigits(e.target.value))}
                />
              </CustomPriceMoveContainer>
            </Section>
            <Section>
              <ResetContainer>
                <ResetButton onClick={() => reset()}>Reset</ResetButton>
              </ResetContainer>
            </Section>
          </Content>
          <Output>
            <TableWrapper>
              <GridBody>
                <GridHeader>
                  <HeaderCell>Price Move</HeaderCell>
                  <HeaderCell>ROI</HeaderCell>
                  <HeaderCell>Exit Price</HeaderCell>
                  <HeaderCell>P&L</HeaderCell>
                </GridHeader>
                <GridContent>
                  {bidSide && bidSide === 'up'
                    ? positive &&
                      [...positive].reverse().map((stat) => {
                        const exitPrice = calculateExitPrice(stat.percent, entryPrice)
                        const pnl = calculatePnL(entryPrice, exitPrice)
                        const roi = calculateROI(pnl)
                        return (
                          <>
                            <ContentCell className='up'>{stat.priceMove}</ContentCell>
                            <ContentCell className='up'>{`${roi}%`}</ContentCell>
                            <ContentCell className='up'>{exitPrice}</ContentCell>
                            <ContentCell className='up'>{currencyFormatter(pnl)}</ContentCell>
                          </>
                        )
                      })
                    : negative &&
                      [...negative].reverse().map((stat) => {
                        const exitPrice = calculateExitPrice(stat.percent * -1, entryPrice)
                        const pnl = calculatePnL(entryPrice, exitPrice)
                        const roi = calculateROI(pnl)
                        return (
                          <>
                            <ContentCell className='down'>{stat.priceMove}</ContentCell>
                            <ContentCell className='down'>{`${roi}%`}</ContentCell>
                            <ContentCell className='down'>{exitPrice}</ContentCell>
                            <ContentCell className='down'>{currencyFormatter(pnl)}</ContentCell>
                          </>
                        )
                      })}

                  <ContentCell className='neutral'>0%</ContentCell>
                  <ContentCell className='neutral'>0.00%</ContentCell>
                  <ContentCell className='neutral'>{entryPrice}</ContentCell>
                  <ContentCell className='neutral'>$0.00</ContentCell>

                  {bidSide && bidSide === 'up'
                    ? negative &&
                      negative.map((stat) => {
                        const exitPrice = calculateExitPrice(stat.percent, entryPrice)
                        const pnl = calculatePnL(entryPrice, exitPrice)
                        const roi = calculateROI(pnl)
                        return (
                          <>
                            <ContentCell className='down'>{stat.priceMove}</ContentCell>
                            <ContentCell className='down'>{`${roi}%`}</ContentCell>
                            <ContentCell className='down'>{exitPrice}</ContentCell>
                            <ContentCell className='down'>{currencyFormatter(pnl)}</ContentCell>
                          </>
                        )
                      })
                    : positive &&
                      positive.map((stat) => {
                        const exitPrice = calculateExitPrice(stat.percent * -1, entryPrice)
                        const pnl = calculatePnL(entryPrice, exitPrice)
                        const roi = calculateROI(pnl)
                        return (
                          exitPrice >= 0 && (
                            <>
                              <ContentCell className='up'>{stat.priceMove}</ContentCell>
                              <ContentCell className='up'>{`${roi}%`}</ContentCell>
                              <ContentCell className='up'>{exitPrice}</ContentCell>
                              <ContentCell className='up'>{currencyFormatter(pnl)}</ContentCell>
                            </>
                          )
                        )
                      })}
                </GridContent>
              </GridBody>
            </TableWrapper>
          </Output>
        </Body>
      </ModalBox>
    </ModalOverlay>
  )
}

const ContentCell = styled.label`
  align-items: center;
  font-weight: 500;
  text-align: left;
  display: flex;
  z-index: 0;
  position: relative;
  border-bottom: 0;
  font-size: 0.8rem;
  min-height: 25px;
  /* padding: 6px 8px; */
  justify-content: flex-end;
`
const HeaderCell = styled.label`
  position: sticky;
  top: 0%;
  text-align: left;
  padding: 12px 10px 10px 10px;
  z-index: 1;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase;
  white-space: nowrap;
  border-top: 1px solid transparent;
  cursor: pointer;
  background: transparent;
  border-bottom: 0;
  color: hsl(0, 0%, 100%);
  font-size: 0.7rem;
`
const GridContent = styled.div`
  display: contents;

  .down {
    color: hsl(340, 88%, 46%);
  }

  .neutral {
    color: hsl(0, 0%, 100%);
  }

  .up {
    color: hsl(126, 100%, 38%);
  }
`
const GridHeader = styled.div`
  display: contents;
`
const GridBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  overflow: auto;
  width: 100%;
`
const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  margin: 0;
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
  max-width: 600px;
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
const Header = styled.div`
  z-index: 1;
  position: relative;
  top: 0;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding: 30px;
  background: hsla(214, 18%, 16%, 0.8);
  border-radius: 10px 10px 0 0;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  line-height: 130%;

  & p {
    font-size: 0.8rem;
    line-height: 140%;
    margin: 10px 0 0 0;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`
const Body = styled.div`
  max-height: 600px;
  height: fit-content;
  background-color: hsla(214, 18%, 16%, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0 0 10px 10px;
  padding: 0 30px 30px 0;
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    height: 80vh;
    max-height: 80vh;
    overflow: auto;
    flex-direction: column;
  }
`
const Content = styled.div`
  height: calc(100% + 15px);
  height: 100%;
  width: 40%;
  transition: width 300ms ease-in-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0 0 0 0;
  overflow: hidden;

  .no-pb {
    padding-bottom: 0;
  }

  @media (max-width: 600px) {
    height: fit-content;
    overflow: visible;
    width: 100%;
  }
`
const Output = styled.div`
  width: 60%;
  margin: 5px 0 0 15px;
  height: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`
const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid hsl(220, 11%, 21%);

  :last-child {
    border-bottom: none;
  }
`
const RowAsset = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0 0 30px;

  @media (max-width: 600px) {
    padding: 0 0 0 20px;
  }
`
const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`
const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`
const Name = styled.span`
  font-size: 0.9rem;
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
const SelectDropdown = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  list-style: none;
  background-color: hsl(213, 19%, 11%);
  overflow: hidden;
  -webkit-transition: max-height 0.2s linear;
  -moz-transition: max-height 0.2s linear;
  transition: max-height 0.2s linear;
  z-index: 1;

  max-height: ${({ isShow }) => (isShow ? '200px' : '0')};
`
const SelectDropdownItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background: hsl(218, 23%, 25%);
  }
`
const EntryPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
  padding: 0 0 0 30px;

  @media (max-width: 600px) {
    padding: 0 0 0 20px;
  }
`
const EntryPriceInput = styled.input`
  border: 0;
  outline: 0;
  position: relative;
  z-index: 1;
  font-weight: 300;
  width: 100%;
  background: hsl(218, 23%, 25%);
  font-size: 1rem;
  padding: 10px 15px;
  box-shadow: none;
  border-radius: 5px;
  justify-content: flex-start;
  text-align: left;
`
const CardSubtitle = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  padding: 0 0 0 30px;
`
const BidAmountFiled = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 30px;

  & .bidInput {
    border: 0;
    outline: 0;
    position: relative;
    z-index: 1;
    font-weight: 300;
    width: 100%;
    background: hsl(218, 23%, 25%);
    font-size: 1rem;
    padding: 10px 15px;
    box-shadow: none;
    border-radius: 5px;
    justify-content: flex-start;
    text-align: left;
  }

  & .bidInput.error {
    border: 1px solid hsla(360, 100%, 32%, 1);
  }

  & .input_error {
    padding: 7px 5px 5px 5px;
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
  }

  & .input_error.hide {
    transform: translateY(-100%);
  }
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
const BustContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 0;
  padding: 0 0 0 30px;
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
const OutputMultiplier = styled.input`
  text-align: center;
  justify-content: center;
  -webkit-box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 30%);
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 400;
  background: hsl(218, 23%, 25%);
  width: 100%;
  border: 0;
  outline: none;
`
const CustomPriceMoveContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
  padding: 0 0 0 30px;
`
const CustomPriceMove = styled.input`
  border: 0;
  outline: 0;
  position: relative;
  z-index: 1;
  font-weight: 300;
  width: 100%;
  background: hsl(218, 23%, 25%);
  font-size: 1rem;
  padding: 10px 15px;
  box-shadow: none;
  border-radius: 5px;
  justify-content: flex-start;
  text-align: left;
`
const ResetContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 0;
  padding: 0 0 0 30px;
`
const ResetButton = styled.button`
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  padding: 10px 20px;
  line-height: 100%;
  border-radius: 10px;
  background: linear-gradient(
    0deg,
    #151a20,
    #151a21,
    #161b21,
    #161b22,
    #161c22,
    #171c23,
    #171d23,
    #181d24,
    #181e24,
    #181e25,
    #191f25,
    #191f26
  );
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
