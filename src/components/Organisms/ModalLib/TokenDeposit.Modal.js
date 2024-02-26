import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { DashboardButton } from 'components/Atoms/button/DashboardButton'
import { IconLib } from 'components/Atoms/IconLib'
import { images } from 'common'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASYNC_STATUS_ID, TIMEOUT } from 'constants/index'
import { useTokenApproval } from 'hooks/contracts/useERC20Approval'
import { useTokenDeposit } from 'hooks/useTokenDeposit'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { currencyFormatter } from 'utils'
import { useLiquidityContract } from 'hooks/contracts/useContract'
import { useToken } from 'utils/hooks/useToken'
import { useYlpBalance } from 'hooks/ylp/useYlpBalance'
import { Zero } from '@ethersproject/constants'
import { MIN_POOL_BALANCE } from 'constants/liquidity'
import { useUser } from 'hooks/user/useUser'

const SUGGESTED_PERCENTS = ['25', '50', '75', '100']

export const TokenDepositModal = ({ closeModal }) => {
  const amountInputRef = useRef()
  const [tokenInputAmount, setTokenInputAmount] = useState('')
  const [tokenUnitAmountBN, setTokenUnitAmountBN] = useState(Zero)
  const { tokenId, parseToken, formatToken } = useToken()

  const { withdrawableBalanceBN } = useYlpBalance()
  const { yoloWalletAmountBN } = useUser('balance')

  const { tokenDeposit, status, hasStatus } = useTokenDeposit()
  const { withdrawableBalance } = useYlpBalance()

  const liquidityContract = useLiquidityContract()
  const { isTokenApproved } = useTokenApproval(liquidityContract.address.toLowerCase())

  const isInsufficientBalanceError = useMemo(
    () => !yoloWalletAmountBN || yoloWalletAmountBN.isZero() || tokenUnitAmountBN.gt(yoloWalletAmountBN),
    [yoloWalletAmountBN, tokenUnitAmountBN]
  )
  const isMinInPoolBalanceError = useMemo(
    () =>
      !yoloWalletAmountBN ||
      yoloWalletAmountBN.isZero() ||
      tokenUnitAmountBN.add(withdrawableBalanceBN).lt(MIN_POOL_BALANCE),
    [yoloWalletAmountBN, tokenUnitAmountBN, withdrawableBalanceBN]
  )

  const onDepositClick = () => {
    if (hasStatus(ASYNC_STATUS_ID.PENDING)) return
    tokenDeposit(tokenUnitAmountBN)
  }

  const onInputChange = (event) => {
    const value = event.target.value.replace(',', '.')
    if (!value) {
      setTokenUnitAmountBN(Zero)
      setTokenInputAmount('')
      return
    }
    const amountRegEx = /^(\d+)(\.)?(\d+)?$/
    if (amountRegEx.test(value)) {
      const valueBN = parseToken(value)
      setTokenUnitAmountBN(valueBN)
      setTokenInputAmount(value)
    }
  }

  const suggestedAmountCalc = (percentage) => {
    const suggestedAmountBN = yoloWalletAmountBN.mul(percentage).div(100)
    setTokenUnitAmountBN(suggestedAmountBN)
    const tokenInputAmount = formatToken(suggestedAmountBN)
    setTokenInputAmount(tokenInputAmount.toString())
  }

  useEffect(() => {
    !isTokenApproved && closeModal()
    amountInputRef.current.focus()
  }, [isTokenApproved, closeModal])

  useEffect(() => {
    let intervalId
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      intervalId = setInterval(() => closeModal(), TIMEOUT.MODAL_AUTO_CLOSE)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [hasStatus, closeModal])

  return (
    <ModalOverlay>
      <ModalBox isError={status.id === ASYNC_STATUS_ID.ERROR}>
        <Close masking onClick={() => closeModal()}>
          &times;
        </Close>
        <ModalHeading>
          <Title> Deposit {tokenId} tokens </Title>
        </ModalHeading>
        <DepositForm onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <WalletBalanceWrapper>
              Wallet Balance:
              <Available>
                {currencyFormatter(formatToken(yoloWalletAmountBN), {
                  noCurrencySign: true
                })}
              </Available>
            </WalletBalanceWrapper>
            <label htmlFor='input_amount_entry'>Amount</label>
            <InputWrap>
              <AmountInput
                ref={amountInputRef}
                type='tel'
                step='any'
                id='input_amount_entry'
                maxLength='9'
                placeholder={currencyFormatter(formatToken(yoloWalletAmountBN), { noCurrencySign: true })}
                value={tokenInputAmount}
                isError={isInsufficientBalanceError || isMinInPoolBalanceError}
                onChange={onInputChange}
                disabled={hasStatus(ASYNC_STATUS_ID.PENDING)}
              ></AmountInput>
            </InputWrap>
          </fieldset>
          <InputError isError={isInsufficientBalanceError}>Insufficient Balance</InputError>
          <InputError isError={isMinInPoolBalanceError}>
            Minimum LP maintenance balance in pool must sum to 400 {tokenId}
          </InputError>
          <AmountSuggestions>
            {SUGGESTED_PERCENTS.map((percent, index) => {
              return (
                <button
                  id={`amountPreset-${tokenInputAmount}`}
                  key={index}
                  onClick={() => suggestedAmountCalc(percent)}
                  disabled={hasStatus(ASYNC_STATUS_ID.PENDING)}
                >
                  {percent === '100' ? 'Max' : `${percent}%`}
                </button>
              )
            })}
          </AmountSuggestions>
          <ButtonsContainers>
            <DepositButton onClick={onDepositClick} disabled={isInsufficientBalanceError || isMinInPoolBalanceError}>
              <ContentSwitcherByState
                activeState={status.id}
                stateObject={{
                  [ASYNC_STATUS_ID.CONFIRMED]: <ConfirmedTick collection='general' name='tick' masking />,
                  [ASYNC_STATUS_ID.ERROR]: 'Retry deposit',
                  default: <SingleDataLoader loading={status.id === ASYNC_STATUS_ID.PENDING} data={'Deposit'} />
                }}
              />
            </DepositButton>
            {status.id === ASYNC_STATUS_ID.ERROR && <CloseButton onClick={closeModal}>Close</CloseButton>}
          </ButtonsContainers>
        </DepositForm>
      </ModalBox>
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
`
const ModalBox = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  //background: rgba(0, 0, 0, 0.5);

  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  min-width: 400px;
  white-space: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);

  &:before {
    position: absolute;
    top: 50%;
    left: calc(50% - 2vw);
    transform: translate(-50%, -50%);
    -webkit-filter: blur(200px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: 15px;
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

  @media (max-width: 480px) {
    padding: 20px;
    display: flex;
    width: 90vw;
    min-width: 300px;
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
  border: ${({ isError }) => (isError ? '1px solid rgba(255,0,0,0.5)' : '')};
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
  font-size: 1.3rem;
  flex-direction: row;
  line-height: 100%;
  padding: 0;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  line-height: 100%;
  font-weight: 600;

  @media (max-width: 480px) {
    margin: 0 0 0 10px;
    padding-top: 12px;
  }
`

const DepositForm = styled.form`
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
const WalletBalanceWrapper = styled.div`
  font-size: 0.9rem;
  display: flex;
  font-weight: 700;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 0 10px 0;
  align-items: center;
`
const Available = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.7rem;
  letter-spacing: -0.03em;
  font-weight: 100;
  padding: 0 0 0 10px;
  align-items: center;
  height: 40px;
  min-width: 150px;
`
const IconYolo = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'YoloTokenIcon',
  dimension: '18px'
})`
  width: 18px;
  height: 18px;
  margin: 0 8px 0 0;
  margin-left: 6px;
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const AmountInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  color: #fff;
  border: ${({ isError }) => (isError ? '1px solid rgba(255,0,0,.6)' : '1px solid rgba(42, 109, 255, 0.5)')};
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: 300;
  width: 100%;
  line-height: 100%;
  :disabled {
    cursor: not-allowed !important;
  }

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
`
const InputError = styled.fieldset`
  flex-direction: column;
  position: relative;
  border: 0;
  background: rgba(255, 0, 0, 0.2);
  padding: 4px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  margin: 4px 0 0 0;
  display: ${({ isError }) => (isError ? 'flex' : 'none')} !important;
`
const AmountSuggestions = styled.div`
  display: flex;
  margin: 5px 0;
  width: 100%;

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
    :disabled {
      cursor: not-allowed !important;
    }
  }

  & button:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & button:nth-child(2) {
    border-radius: 0;
  }

  & button:nth-child(3) {
    border-radius: 0;
  }

  & button:nth-child(4) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
  }
`
const ButtonsContainers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0 0 0;
`
const DepositButton = styled(DashboardButton)`
  height: 43px;
  min-width: 65%;
`
const CloseButton = styled(DepositButton)`
  background: rgba(255, 0, 0, 0.4);
  min-width: 90px;
  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`
const ConfirmedTick = styled(IconLib)`
  height: 1.6rem;
`
