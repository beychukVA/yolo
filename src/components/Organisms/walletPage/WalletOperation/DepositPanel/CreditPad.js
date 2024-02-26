import { useUser } from 'hooks/user/useUser'
import { useTransak } from 'hooks/yoloWallet/useTransak'
import { useState } from 'react'
import styled from 'styled-components'

export const CreditPad = () => {
  const { isProxy } = useUser('wallet')
  const { initTransak } = useTransak()
  const [fiatInputAmount, setFiatInputAmount] = useState('')

  const onDeposit = () => {
    initTransak(fiatInputAmount)
  }

  const onInputChange = (event) => {
    const value = event.target.value.replace(',', '.')
    if (!value) {
      setFiatInputAmount('')
      return
    }

    const amountRegEx = /^(\d+)(\.)?(\d{0,2})$/
    if (amountRegEx.test(value)) {
      setFiatInputAmount(value)
    }
  }

  return (
    <div className={`tabbed_section ${!isProxy && 'fullWidth'}`}>
      <div className='panel_title'>Credit / Debit Card</div>
      <div className='panel_desc'>Connect to Transak and use your credit/debit card, or mobile options.</div>
      <form>
        <div className='label_row'>
          <label>USDC amount</label>
          <label className='max_amount'>$1 USDC = $1 USD</label>
        </div>
        <AmountInput
          type='tel'
          step='any'
          id='usdc_deposit_amount'
          placeholder='$'
          value={fiatInputAmount}
          onChange={onInputChange}
        />
        <DepositButton type='button' onClick={onDeposit} disabled={!fiatInputAmount}>
          Deposit
        </DepositButton>
      </form>
    </div>
  )
}

const AmountInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 16px !important;
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
    border: ${({ isError }) => (isError ? '1px solid rgba(255,0,0,.6)' : '1px solid rgba(42, 109, 255, 1)')};
    outline: 0;
  }
`
const DepositButton = styled.button`
  color: #fff;
  display: flex;
  justify-content: center;
`
