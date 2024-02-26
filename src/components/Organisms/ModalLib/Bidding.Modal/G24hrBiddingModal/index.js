import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import ms from 'ms.macro'

import { IconLib } from 'components/Atoms/IconLib'
import { images } from 'common'
import { G24hrBiddingModalStyled } from './G24hrBiddingModal.styled'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { use24hGameRoundData } from 'hooks/games/use24hGameRoundData'
import { LONG_DASH } from 'constants/index'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { config } from 'config'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { currencyFormatter } from 'utils'
import { useGameProgress } from 'hooks/games/useGameProgress'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { useTokenApproval } from 'hooks/contracts/useERC20Approval'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useYoloBid } from 'hooks/useYoloBid'
import { useSelector } from 'react-redux'

import { selectHasPendingTx, selectWalletConnectionState } from 'redux/selectors'
import { BidCloseEnd } from './InfoBanners/BidCloseEnd'
import { HasPendingTx } from './InfoBanners/HasPendingTx'
import { NoBiddableBalance } from './InfoBanners/NoBiddableBalance'
import { bucketsLevelLimit } from 'components/Atoms/BucketLevelIcon'
import { useGamesPool } from 'hooks/gamePool/useGamesPool'
import { getPayoutsFactorBN } from 'utils/payout'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config
const SUGGESTED_AMOUNTS = ['40.00', '60.00', '80.00']
const MARGIN_TO_BID_IN_NEXT = ms`30s`
const INITIAL_AMOUNTS = { crypto: '', fiat: '' }

export const G24hrBiddingModal = ({ closeModal }) => {
  const { gaEvent } = useReactGA4()
  const amountInputRef = useRef()
  const { formatToken: formatFactor } = useToken('BASIS_POINT')
  const { tokenId, parseToken, formatToken } = useToken()
  const convert = useConvertAmount()
  const { activeGameId, activeCardRoundIndex } = useActiveGameData()
  const { msTimeLeft } = useGameProgress()
  const { state, getGameRoundData } = use24hGameRoundData()
  const { yoloWalletAmount, tokenAmount } = useUser('balance')

  const [gameContractInfo] = getSmartContractsInfo([activeGameId])
  const { isTokenApproved } = useTokenApproval(gameContractInfo.address.toLowerCase())

  const isConnected = useSelector(selectWalletConnectionState())
  const isPendingTx = useSelector(selectHasPendingTx())

  const { yoloBidState, yoloBidResetState, yoloBid } = useYoloBid({ callback: closeModal })

  const [bidInProgress, setBidInProgress] = useState(false)
  const [amount, setAmount] = useState(INITIAL_AMOUNTS)
  const [hasPendingTx, setHasPendingTx] = useState(false)
  const [cantBid, setCantBid] = useState(false)
  const [balance, setBalance] = useState('$0.00')
  const [isCloseToEnd, setIsCloseToEnd] = useState(false)
  const [isDisabled, setDisabled] = useState(!isConnected || !amount.fiat)

  const { pools } = useGamesPool()

  const levelPayoutFactorBN = useMemo(() => {
    const bucketsAmount = pools?.[activeGameId]?.[activeCardRoundIndex]?.bucketsAmount || {}
    //if (isEmpty(bucketsAmount)) return
    const bAmountArray = Object.keys(bucketsAmount).reduce((result, item, idx) => {
      return [...result, bucketsAmount?.[`l${idx}`]]
    }, [])
    const payoutsFactorBN = getPayoutsFactorBN(bAmountArray)
    return payoutsFactorBN

    // console.log('ACZ bAmountArray -->', bAmountArray)
  }, [pools, activeGameId, activeCardRoundIndex])

  const bucketsLimits = bucketsLevelLimit(null, state?.buckets)

  useEffect(() => {
    if (activeGameId && activeCardRoundIndex) getGameRoundData(activeGameId, activeCardRoundIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGameId, activeCardRoundIndex])

  useEffect(() => {
    setBidInProgress(false)
  }, [yoloBidState?.isError])

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
    !amount.crypto && setAmount(INITIAL_AMOUNTS)
    setDisabled(!isConnected || !amount.fiat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, isConnected])

  useEffect(() => {
    const isCloseToEnd = msTimeLeft <= MARGIN_TO_BID_IN_NEXT ? true : false
    setIsCloseToEnd(isCloseToEnd)
    setDisabled(isCloseToEnd)
  }, [activeCardRoundIndex, msTimeLeft])

  const isMaxInteger = (value) => {
    // whole numbers part should not be more than 5 digits
    const limitRegex = /(\d{6,})/
    return limitRegex.test(value)
  }

  const isValidDecimalNumber = (value) => {
    const isNumberWithDecimalOnChange = (str) => /^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(str)
    return !!value ? isNumberWithDecimalOnChange(value) && value >= 0 : true
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
    const fiatTokenBalance = convert(formatToken(yoloWalletAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const fiatWalletBalance = convert(formatToken(tokenAmount), tokenId, DEFAULT_FIAT, { number: true }) || 0
    const totalBiddableBalance = fiatTokenBalance + fiatWalletBalance

    setBalance(currencyFormatter(totalBiddableBalance))
  }, [convert, yoloWalletAmount, tokenAmount, tokenId])

  const onBidClick = async (bucketLevel) => {
    if (!parseFloat(amount.crypto)) return
    if (msTimeLeft <= MARGIN_TO_BID_IN_NEXT) return
    const bidData = {
      amount: parseToken(amount.crypto.replace(/,/g, '')).toString(),
      level: bucketLevel,
      bidRoundIndex: activeCardRoundIndex
    }
    if (isTokenApproved) {
      yoloBid({ bidData, gameId: activeGameId, tokenId })
      setBidInProgress(bucketLevel)
      gaEvent('bid_click', {
        pathId: 'modal.bid',
        gameId: activeGameId,
        bidRoundIndex: activeCardRoundIndex,
        msTimeLeft,
        amount: amount.crypto.replace(/,/g, ''),
        amountBN: parseToken(amount.crypto.replace(/,/g, '')),
        bucketLevel: bucketLevel
      })
    }
    return true
  }

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
          <G24hrBiddingModalStyled>
            <div className='window_heading bid_up'>
              <div className='title'>
                Bid in
                <div className='round_number'>
                  <span>Round</span>
                  <div className='round'>{activeCardRoundIndex}</div>
                </div>
              </div>
            </div>
            <form className='bid_form'>
              <fieldset>
                <label htmlFor='input_bid_entry'>Bid amount</label>
                <div className='input_wrap'>
                  <input
                    className='amount'
                    id='input_bid_entry'
                    type='tel'
                    placeholder={SUGGESTED_AMOUNTS[0]}
                    maxLength='9'
                    ref={amountInputRef}
                    value={amount.fiat}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    disabled={hasPendingTx}
                  />
                </div>
                <div className='currency_wrap'>USDC</div>
                <div className='alerts_option_input'>
                  <label htmlFor='game_alerts' className='game_alerts_input_label'>
                    Get game alerts via email
                  </label>
                  <input type='text' placeholder='Enter a valid email address' />
                </div>
              </fieldset>
              <div className='bid_balance_remainder'>
                <div className='ab'>Biddable Balance</div>
                {<strong>{balance}</strong>}
              </div>
              {yoloBidState.isError && <div className='field_error'>Your bid is not set. Please try again.</div>}
              <div className='button_row_wrapper'>
                {bucketsLimits.reverse().map((bucket, idx) => {
                  const bucketLevel = bucketsLimits.length - 1 - idx
                  return (
                    <fieldset key={idx} className='button_row'>
                      <div className={`bid_button_modal_wrap level${bucketLevel}`}>
                        <button
                          type='button'
                          onClick={() => onBidClick(bucketLevel)}
                          className='place_bid-up'
                          disabled={isDisabled || cantBid}
                        >
                          <div className='bid_copy'>
                            <SingleDataLoader
                              loading={bidInProgress === bucketLevel}
                              data={`Bid ${bucketsLimits[idx] || LONG_DASH}`}
                            />
                          </div>
                          <div className='pg'>
                            <strong>Payout</strong>
                            <div>
                              <SingleContentToggle
                                noWrapper
                                toggle={amount.fiat}
                                falseContent={'$0.00 '}
                                trueContent={`${currencyFormatter(
                                  amount.fiat * formatFactor(levelPayoutFactorBN[idx])
                                )} `}
                              />
                              {/* {formatUnits(
                                levelPayoutBasisPointsBN[idx]
                                  .mul(100)
                                  .mul(amount.fiat ? (+amount.fiat).toFixed(2) : '0'),
                                2
                              )} */}
                              {/* <span className='payout'>{formatPercentage(levelPayoutBasisPointsBN[idx])}X</span> */}
                              <span className='payout'>
                                {`${currencyFormatter(formatFactor(levelPayoutFactorBN[idx]), {
                                  decimalDigits: 2,
                                  noCurrencySign: true
                                })}`}
                                X
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </fieldset>
                  )
                })}
              </div>
            </form>
          </G24hrBiddingModalStyled>
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
const InfoBannerContainer = styled.div`
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
`
