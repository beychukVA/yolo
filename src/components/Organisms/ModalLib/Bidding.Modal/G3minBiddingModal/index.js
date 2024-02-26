import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ms from 'ms'

import { currencyFormatter } from 'utils'
import { UP, DOWN } from 'constants/index'
import { useConvertAmount } from 'utils/hooks'
import { potentialGain } from 'utils/amounts'

import { selectHasPendingTx, selectWalletConnectionState } from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'
import { images } from 'common'
import { RoundDropdown } from './RoundDropdown'
import { useTokenApproval } from 'hooks/contracts/useERC20Approval'
import { useGameProgress } from 'hooks/games/useGameProgress'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'
import { useReactGA4 } from 'GA4/useReactGA4'
import { BidCloseEnd } from './InfoBanners/BidCloseEnd'
import { HasPendingTx } from './InfoBanners/HasPendingTx'
import { NoBiddableBalance } from './InfoBanners/NoBiddableBalance'
import { useGameLpFeeRate } from 'hooks/games/useGameLpFeeRate'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useYoloBid } from 'hooks/useYoloBid'
import { G3minBiddingModalStyled } from './G3minBiddingModal.styled'
import { useGamePoolAllRounds } from 'hooks/gamePool/useGamesPool'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config
const MARGIN_TO_BID_IN_NEXT = ms('20s')
const INITIAL_AMOUNTS = { crypto: '', fiat: '' }
const SUGGESTED_AMOUNTS = ['40.00', '60.00', '80.00']

export const G3minBiddingModal = ({ closeModal }) => {
  const { gaEvent } = useReactGA4()
  const { tokenId, parseToken, formatToken } = useToken()
  const { msTimeLeft } = useGameProgress()
  const { activeGameId, activeGameHexId, activeCardRoundOffset, activeCardRoundIndex } = useActiveGameData()
  const amountInputRef = useRef()
  const { yoloBidState, yoloBidResetState, yoloBid } = useYoloBid({ callback: closeModal })

  const { allGamePools } = useGamePoolAllRounds(activeGameId)

  const isConnected = useSelector(selectWalletConnectionState())
  const isPendingTx = useSelector(selectHasPendingTx())

  const [selectedRound, setSelectedRound] = useState(activeCardRoundIndex)

  const [gameContractInfo] = getSmartContractsInfo([activeGameId])
  const { isTokenApproved } = useTokenApproval(gameContractInfo.address.toLowerCase())

  const { yoloWalletAmount, tokenAmount } = useUser('balance')

  const [amount, setAmount] = useState(INITIAL_AMOUNTS)
  const [balance, setBalance] = useState('$0.00')

  const [payoutsAndGainsUp, setPayoutsAndGainsUp] = useState({})
  const [payoutsAndGainsDown, setPayoutsAndGainsDown] = useState({})

  const [isCloseToEnd, setIsCloseToEnd] = useState(false)
  const [hasPendingTx, setHasPendingTx] = useState(false)

  const [cantBid, setCantBid] = useState(false)
  const [bidInProgress, setBidInProgress] = useState(false)

  const convert = useConvertAmount()

  const {
    nextLpFeeRate: { N: fee }
  } = useGameLpFeeRate(activeGameId)

  const [isDisabled, setDisabled] = useState(!isConnected || !amount.fiat)

  const onBidClick = async (isUp) => {
    if (!parseFloat(amount.crypto)) {
      return
    }

    const bidData = {
      amount: parseToken(amount.crypto.replace(/,/g, '')).toString(),
      isUp,
      bidRoundIndex: selectedRound
    }
    if (isTokenApproved) {
      yoloBid({ bidData, gameId: activeGameId, gameHexId: activeGameHexId, tokenId })
      setBidInProgress(isUp ? 'up' : 'down')
      gaEvent('bid_click', {
        pathId: 'modal.bid',
        gameId: activeGameId,
        bidRoundIndex: selectedRound,
        msTimeLeft,
        amount: amount.crypto.replace(/,/g, ''),
        amountBN: parseToken(amount.crypto.replace(/,/g, '')),
        isUp
      })
    }
    return true
  }

  useEffect(() => {
    if (!isPendingTx) {
      setHasPendingTx(false)
      setAmount({})
      setDisabled(false)
    } else {
      setHasPendingTx(true)
      setDisabled(true)
    }
  }, [isPendingTx])

  useEffect(() => {
    const isCloseToEnd = activeCardRoundOffset <= 1 && msTimeLeft <= MARGIN_TO_BID_IN_NEXT ? true : false
    activeCardRoundIndex > selectedRound && setSelectedRound(activeCardRoundIndex)
    setIsCloseToEnd(isCloseToEnd)
    setDisabled(isCloseToEnd)
  }, [activeCardRoundOffset, selectedRound, activeCardRoundIndex, msTimeLeft])

  const isValidDecimalNumber = (value) => {
    const isNumberWithDecimalOnChange = (str) => /^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(str)
    return !!value ? isNumberWithDecimalOnChange(value) && value >= 0 : true
  }

  const isMaxInteger = (value) => {
    // whole numbers part should not be more than 5 digits
    const limitRegex = /(\d{6,})/
    return limitRegex.test(value)
  }

  const formatBidAmount = (value) => {
    // number cannot have more than two decimal places
    const amountRegEx = /((\d{1,5}).*)?(\.\d{2}).*/

    return value.replace(amountRegEx, '$2$3')
  }

  const setPayoutAmount = (value) => {
    yoloBidResetState()
    if (isMaxInteger(value)) {
      return
    }

    const bidAmount = formatBidAmount(value)
    if (isValidDecimalNumber(bidAmount)) {
      const balanceN = parseFloat(balance.replace('$', '').replace(',', ''))
      const bidAmountN = parseFloat(bidAmount || 0)

      if (balanceN < bidAmountN) {
        setCantBid(true)
      } else {
        setCantBid(false)
      }

      const balanceInCrypto = convert(bidAmount, DEFAULT_FIAT, tokenId, { format: false })
      setAmount({
        crypto: bidAmount ? balanceInCrypto : '',
        fiat: bidAmount
      })
    }
  }

  useEffect(() => {
    !isTokenApproved && closeModal()
    amountInputRef.current.focus()
  }, [isTokenApproved, closeModal])

  useEffect(() => {
    const { potentialRawGain: potRawGainUp, potentialPayout: potPayoutUp } = potentialGain(
      allGamePools?.[selectedRound],
      fee,
      UP,
      amount.crypto
    )
    const { potentialRawGain: potRawGainDown, potentialPayout: potPayoutDown } = potentialGain(
      allGamePools?.[selectedRound],
      fee,
      DOWN,
      amount.crypto
    )
    const fiatGainUp = convert(potRawGainUp, tokenId, DEFAULT_FIAT, { number: true }) || 0
    const fiatGainDown = convert(potRawGainDown, tokenId, DEFAULT_FIAT, { number: true }) || 0

    setPayoutsAndGainsUp({ potGain: currencyFormatter(fiatGainUp), potPayout: potPayoutUp })
    setPayoutsAndGainsDown({ potGain: currencyFormatter(fiatGainDown), potPayout: potPayoutDown })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, allGamePools, selectedRound])

  useEffect(() => {
    !amount.crypto && setAmount(INITIAL_AMOUNTS)
    setDisabled(!isConnected || !amount.fiat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, isConnected])

  useEffect(() => {
    const fiatTokenBalance = convert(formatToken(yoloWalletAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const fiatWalletBalance = convert(formatToken(tokenAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const totalBiddableBalance = fiatTokenBalance + fiatWalletBalance

    setBalance(currencyFormatter(totalBiddableBalance))
  }, [convert, yoloWalletAmount, tokenAmount, tokenId])

  return (
    <ModalOverlay id='modal_overlay'>
      <ModalWrapper id='modal_window_wrapper'>
        <Close masking onClick={() => closeModal()}>
          &times;
        </Close>
        <InfoBannerContainer>
          {isCloseToEnd && <BidCloseEnd timeLeft={msTimeLeft} />}
          {hasPendingTx && <HasPendingTx />}
          {cantBid && <NoBiddableBalance closeModal={closeModal} />}
        </InfoBannerContainer>
        <ModalContent>
          <G3minBiddingModalStyled>
            <div className='window_heading bid_up'>
              <div className='title'>
                Bid in
                <div className='round_number'>
                  <span>Round</span>
                  <RoundDropdown round={selectedRound} setRound={setSelectedRound} activeRound={activeCardRoundIndex} />
                </div>
              </div>
            </div>
            <form className='bid_form'>
              <fieldset>
                <label htmlFor='input_bid_entry'>Bid amount</label>
                <div className='input_wrap'>
                  <input
                    type='tel'
                    className='amount'
                    id='input_bid_entry'
                    placeholder={SUGGESTED_AMOUNTS[0]}
                    maxLength='9'
                    ref={amountInputRef}
                    value={amount.fiat}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    disabled={hasPendingTx}
                  />
                </div>
                <div className='currency_wrap'>{tokenId}</div>
                <div className='amount_suggestions'>
                  {SUGGESTED_AMOUNTS.map((amount, index) => (
                    <div id={`amountPreset-${amount}`} key={index} onClick={() => setPayoutAmount(amount)}>
                      {amount}
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className='bid_balance_remainder'>
                <div className='ab'>Biddable Balance</div>
                <strong>{balance}</strong>
              </div>
              {yoloBidState.isError && <div className='field_error'>Your bid is not set. Please try again.</div>}
              <fieldset className='button_row'>
                <div className='bid_button_modal_wrap up'>
                  <button
                    className='place_bid-up'
                    type='button'
                    onClick={() => onBidClick(true)}
                    disabled={isDisabled || cantBid}
                  >
                    <div className='bid_copy'>
                      <SingleDataLoader loading={bidInProgress === 'up'} data='Bid up' />
                    </div>
                    <div className='pg'>
                      <strong>Payout</strong>
                      <div>
                        {cantBid ? '$0.00' : payoutsAndGainsUp.potGain}
                        <span className='payout'>{cantBid ? '0.00X' : payoutsAndGainsUp.potPayout}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </fieldset>
              <fieldset className='button_row'>
                <div className='bid_button_modal_wrap down'>
                  <button
                    className='place_bid-down'
                    type='button'
                    onClick={() => onBidClick(false)}
                    disabled={isDisabled || cantBid}
                  >
                    <div className='bid_copy'>
                      <SingleDataLoader loading={bidInProgress === 'down'} data='Bid down' />
                    </div>
                    <div className='pg'>
                      <strong>Payout</strong>
                      <div>
                        {cantBid ? '$0.00' : payoutsAndGainsDown.potGain}{' '}
                        <span className='payout'>{cantBid ? '0.00X' : payoutsAndGainsDown.potPayout}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </fieldset>
            </form>
          </G3minBiddingModalStyled>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: relative;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.breakPoints['480px']} {
    background: rgba(25, 30, 39, 0.8);
  }
`
const ModalWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  background: rgba(128, 170, 255, 0.3);
  min-width: 400px;
  white-space: wrap;
  backdrop-filter: blur(30px);
  ${({ theme }) => theme.breakPoints['480px']} {
    min-width: 25px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 0 1px 50px 0px rgba(0, 0, 0, 0.3);
    z-index: -1;
    border-radius: 15px;
  }
  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
`
const ModalContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  width: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 20px;
  }
`
const Close = styled(IconLib).attrs({ collection: 'general', name: 'closeOutline', dimension: '25px' })`
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -8px;
  text-align: center;
  text-decoration: none;
  top: -8px;
  z-index: 1;
  background: rgba(255, 255, 255, 1);

  @media (max-width: 480px) {
    left: -8px;
    top: -8px;
  }
`
const ModalHeading = styled.div`
  font-weight: 700;
  display: flex;
  white-space: nowrap;
  text-align: left;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  flex-direction: row;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.3rem;
  }
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  line-height: 100%;
  font-weight: 300;

  @media (max-width: 480px) {
    margin: 0 0 0 10px;
    padding-top: 12px;
  }
`

const RoundNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;

  & span {
    font-weight: 700;
    line-height: 100%;
    padding: 0 0 0 8px;
  }

  & .round {
    display: flex;
    line-height: 100%;
    font-weight: 700;
    border-radius: 10px;
    margin: -6px 0 0 4px;
    padding: 6px 8px;
    font-size: 1.6rem;
    border: 1px solid transparent;
    position: relative;

    @media (max-width: 480px) {
      font-size: 1.3rem;
      padding: 6px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  &:hover .round {
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;

    @media (max-width: 480px) {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  }
`
const BidForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0 0 0;
  width: 100%;

  & * {
    font-weight: 300;
  }

  & fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }

  & label {
    font-size: 0.8rem;
    padding: 0 0 5px 0;
  }
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;

  @media (max-width: 480px) {
    width: 190px;
  }
`
const AmountInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  color: #fff;
  border: 1px solid rgba(42, 109, 255, 0.5);
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: 300;
  width: 100%;
  line-height: 100%;

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:focus {
    -webkit-box-shadow: 0 0 60px 0 rgba(42, 109, 255, 1);
    outline: 0;
  }
  &:disabled {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')} !important;
  }
`
const AmountSuggestions = styled.div`
  display: flex;
  margin: 5px 0 20px 0;

  & button {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 0;
    color: white;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0 3px 0 0;
    text-align: center;
    width: 100%;
    height: 36px;
  }

  & button:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & button:nth-child(2) {
    border-radius: 0;
  }

  & button:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
  }
`
const CurrencyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: flex-start;
  position: absolute;
  left: 255px;
  top: calc(50% - 18px);
  transform: translateY(-50%);

  @media (max-width: 480px) {
    left: 200px;
    font-size: 1.1rem;
  }
`
const IconUSD = styled(IconLib).attrs({ collection: 'general', name: 'usd' })`
  width: 18px;
  height: 24px;
  margin: 0 5px 0 0;

  @media (max-width: 480px) {
    width: 13px;
    height: 19px;
    margin: 0 3px 0 0;
  }
`
const BidBalanceRemainder = styled.div`
  font-size: 0.9rem;

  & strong {
    padding: 0 0 0 5px;
    font-weight: 700;
  }
`
const PayoutContainer = styled.div`
  font-weight: 300;
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;

  & strong {
    padding-right: 9px;
    opacity: 0.5;
    font-size: 0.75;
  }
`
const Payout = styled.span`
  background: ${({ isUp }) =>
    isUp
      ? `linear-gradient(0deg, rgba(0, 135, 13, .5) 0%, rgba(1, 168, 17, .5) 100%)`
      : `linear-gradient(0deg, rgba(175, 11, 66, .5) 0%, rgba(226, 14, 85, .5) 100%)`};
  padding: 2px 4px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0 0 0 3px;
  font-weight: 600;
`
const YoloBalance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ButtonRow = styled.fieldset`
  display: flex;
  flex-direction: row !important;
  padding: 20px 0 0 0;
`
const BidButtonWrap = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PlaceBidButton = styled.button.attrs({ type: 'button' })`
  background: ${({ isUp }) =>
    isUp
      ? `linear-gradient(0deg, rgba(0, 135, 13, 1) 0%, rgba(1, 168, 17, 1) 100%)`
      : `linear-gradient(0deg, rgba(175, 11, 66, 1) 0%, rgba(226, 14, 85, 1) 100%)`};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  width: calc(100% - 4px);
  padding: 10px;
  margin: 0 2px;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    ${({ isUp, disabled }) =>
      disabled ? '' : isUp ? `background: rgba(1, 168, 17, 1);` : `background: rgba(226, 14, 85, 1);`}
  }
`
const InfoBannerContainer = styled.div`
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
`
